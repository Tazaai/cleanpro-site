import OpenAI from 'openai';
import { getDb } from '../firebase.js';

class AIMonitoringService {
  constructor() {
    this.openai = null;
    this.isEnabled = false;
    this.initialize();
  }

  initialize() {
    try {
      if (process.env.OPENAI_API_KEY) {
        this.openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });
        this.isEnabled = true;
        console.log('🤖 OpenAI monitoring service initialized');
      } else {
        console.log('⚠️ OpenAI API key not found - AI monitoring disabled');
        this.isEnabled = false;
      }
    } catch (error) {
      console.error('❌ Failed to initialize OpenAI service:', error);
      this.isEnabled = false;
    }
  }

  // Core function: Analyze communication tone and detect red flags
  async analyzeCommunication(content, context = {}) {
    if (!this.isEnabled) {
      return this.getFallbackAnalysis(content);
    }

    try {
      const prompt = this.buildAnalysisPrompt(content, context);
      
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an AI safety monitor for a cleaning services marketplace. Analyze communications for tone, professionalism, and potential red flags. Respond only with valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.3
      });

      const result = JSON.parse(response.choices[0].message.content);
      await this.logAnalysis(content, result, context);
      
      return result;
    } catch (error) {
      console.error('❌ OpenAI analysis failed:', error);
      return this.getFallbackAnalysis(content);
    }
  }

  buildAnalysisPrompt(content, context) {
    return `Analyze this communication for a cleaning services platform:

Content: "${content}"
Context: ${JSON.stringify(context)}

Provide analysis as JSON with this exact structure:
{
  "toneScore": [1-10 scale, 10=excellent, 1=very poor],
  "professionalismScore": [1-10 scale],
  "redFlags": [array of specific concerns found],
  "riskLevel": ["low", "medium", "high", "critical"],
  "recommendations": [array of improvement suggestions],
  "summary": "Brief summary of communication quality"
}

Red flags to detect:
- Unprofessional language
- Inappropriate requests
- Discriminatory content
- Threatening language
- Scam indicators
- Privacy violations
- Safety concerns`;
  }

  getFallbackAnalysis(content) {
    // Basic keyword-based analysis when OpenAI is unavailable
    const redFlagKeywords = [
      'stupid', 'idiot', 'hate', 'kill', 'threat', 'scam', 'fraud',
      'racist', 'sexist', 'discriminat', 'harass', 'abuse', 'violence',
      'illegal', 'drugs', 'weapon', 'steal', 'cheat'
    ];

    const professionalKeywords = [
      'please', 'thank', 'professional', 'quality', 'service', 'clean',
      'schedule', 'appointment', 'respect', 'courteous'
    ];

    const lowercaseContent = content.toLowerCase();
    const redFlags = redFlagKeywords.filter(keyword => 
      lowercaseContent.includes(keyword)
    );
    
    const professionalWords = professionalKeywords.filter(keyword =>
      lowercaseContent.includes(keyword)
    );

    const toneScore = redFlags.length > 0 ? 
      Math.max(1, 6 - redFlags.length * 2) : 
      Math.min(10, 6 + professionalWords.length);

    return {
      toneScore,
      professionalismScore: toneScore,
      redFlags: redFlags.map(flag => `Contains keyword: ${flag}`),
      riskLevel: redFlags.length > 2 ? 'high' : redFlags.length > 0 ? 'medium' : 'low',
      recommendations: redFlags.length > 0 ? 
        ['Review communication for inappropriate content', 'Consider professional communication training'] :
        ['Maintain professional tone'],
      summary: `Fallback analysis: ${redFlags.length} red flags detected`,
      fallback: true
    };
  }

  // Monitor CP registration communications
  async monitorCPRegistration(registrationData) {
    const communicationContent = [
      registrationData.business_name,
      registrationData.services_offered?.join(' ') || '',
      registrationData.special_notes || '',
      registrationData.contact_person
    ].join(' ');

    const analysis = await this.analyzeCommunication(communicationContent, {
      type: 'cp_registration',
      cpId: registrationData.id,
      timestamp: new Date().toISOString()
    });

    // Add AI analysis to registration data
    registrationData.ai_monitoring = {
      initial_assessment: analysis,
      last_updated: new Date().toISOString(),
      monitoring_enabled: true
    };

    return analysis;
  }

  // Monitor booking communications
  async monitorBookingCommunication(bookingData, communicationType = 'booking_request') {
    const communicationContent = [
      bookingData.special_instructions || '',
      bookingData.notes || '',
      bookingData.customer_comments || ''
    ].join(' ');

    if (!communicationContent.trim()) {
      return null; // No content to analyze
    }

    const analysis = await this.analyzeCommunication(communicationContent, {
      type: communicationType,
      bookingId: bookingData.id,
      customerId: bookingData.customer_id,
      cpId: bookingData.coordination_point_id,
      timestamp: new Date().toISOString()
    });

    return analysis;
  }

  // Real-time chat monitoring (for future chat feature)
  async monitorChatMessage(message, participants) {
    const analysis = await this.analyzeCommunication(message.content, {
      type: 'chat_message',
      messageId: message.id,
      senderId: message.sender_id,
      recipientId: message.recipient_id,
      participants: participants,
      timestamp: message.timestamp
    });

    // Immediate action for critical issues
    if (analysis.riskLevel === 'critical') {
      await this.triggerEmergencyAlert(analysis, message, participants);
    }

    return analysis;
  }

  async triggerEmergencyAlert(analysis, originalContent, context) {
    try {
      const db = getDb();
      const alertData = {
        type: 'ai_critical_alert',
        analysis: analysis,
        original_content: originalContent,
        context: context,
        timestamp: new Date().toISOString(),
        status: 'pending_review',
        escalated: false
      };

      await db.collection('ai_alerts').add(alertData);
      
      // TODO: Integrate with email notification system when available
      console.log('🚨 CRITICAL AI ALERT:', analysis.summary);
      
    } catch (error) {
      console.error('❌ Failed to create AI alert:', error);
    }
  }

  async logAnalysis(content, analysis, context) {
    try {
      const db = getDb();
      const logData = {
        content_hash: this.hashContent(content), // Don't store full content for privacy
        analysis: analysis,
        context: context,
        timestamp: new Date().toISOString(),
        ai_model: this.isEnabled ? 'gpt-4o-mini' : 'fallback'
      };

      await db.collection('ai_monitoring_logs').add(logData);
    } catch (error) {
      console.error('❌ Failed to log AI analysis:', error);
    }
  }

  hashContent(content) {
    // Simple hash for content identification without storing actual content
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
  }

  // Get monitoring statistics for admin dashboard
  async getMonitoringStats(timeframe = '7d') {
    try {
      const db = getDb();
      const startDate = new Date();
      
      switch (timeframe) {
        case '24h':
          startDate.setDate(startDate.getDate() - 1);
          break;
        case '7d':
          startDate.setDate(startDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(startDate.getDate() - 30);
          break;
      }

      const snapshot = await db.collection('ai_monitoring_logs')
        .where('timestamp', '>=', startDate.toISOString())
        .get();

      const logs = snapshot.docs.map(doc => doc.data());
      
      const stats = {
        total_analyses: logs.length,
        average_tone_score: logs.reduce((sum, log) => sum + (log.analysis.toneScore || 0), 0) / logs.length || 0,
        risk_distribution: {
          low: logs.filter(log => log.analysis.riskLevel === 'low').length,
          medium: logs.filter(log => log.analysis.riskLevel === 'medium').length,
          high: logs.filter(log => log.analysis.riskLevel === 'high').length,
          critical: logs.filter(log => log.analysis.riskLevel === 'critical').length
        },
        red_flags_detected: logs.reduce((sum, log) => sum + (log.analysis.redFlags?.length || 0), 0),
        timeframe: timeframe,
        generated_at: new Date().toISOString()
      };

      return stats;
    } catch (error) {
      console.error('❌ Failed to get monitoring stats:', error);
      return null;
    }
  }
}

// Export singleton instance
export const aiMonitoring = new AIMonitoringService();
export default aiMonitoring;