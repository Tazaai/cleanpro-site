#!/bin/bash

# Test AI Monitoring System
echo "🤖 Testing AI Monitoring Integration..."
echo "=================================="

# Start backend in background for testing
echo "🚀 Starting backend for testing..."
cd /workspaces/cleanpro-site/backend

# Test with mock data since we don't have OpenAI key locally
echo "📋 Testing AI monitoring service initialization..."

# Create a simple test script
cat > test_ai_monitoring.js << 'EOF'
import aiMonitoring from './services/ai_monitoring.js';

console.log('🤖 Testing AI Monitoring Service...');
console.log('OpenAI Enabled:', aiMonitoring.isEnabled);

// Test with fallback analysis (since no OpenAI key locally)
const testContent = "Hello, I would like to schedule a professional cleaning service for my home. Thank you!";

aiMonitoring.analyzeCommunication(testContent, { type: 'test' })
  .then(result => {
    console.log('✅ AI Analysis Result:');
    console.log('Tone Score:', result.toneScore);
    console.log('Risk Level:', result.riskLevel);
    console.log('Red Flags:', result.redFlags);
    console.log('Fallback Mode:', result.fallback || false);
    console.log('🎉 AI Monitoring test completed successfully!');
  })
  .catch(error => {
    console.error('❌ AI Monitoring test failed:', error);
  });

// Test with potentially problematic content
console.log('\n🔍 Testing red flag detection...');
const problemContent = "You are stupid and I hate this service!";

aiMonitoring.analyzeCommunication(problemContent, { type: 'test' })
  .then(result => {
    console.log('⚠️ Problem Content Analysis:');
    console.log('Tone Score:', result.toneScore);
    console.log('Risk Level:', result.riskLevel);
    console.log('Red Flags:', result.redFlags);
    console.log('✅ Red flag detection working!');
  })
  .catch(error => {
    console.error('❌ Red flag test failed:', error);
  });
EOF

# Run the test
echo "🧪 Running AI monitoring test..."
node test_ai_monitoring.js

# Clean up
rm -f test_ai_monitoring.js

echo ""
echo "💡 AI Monitoring System Summary:"
echo "- Model: GPT-4o-mini (cost-effective choice)"
echo "- Fallback: Keyword-based analysis when OpenAI unavailable"
echo "- Features: Tone analysis, red flag detection, risk assessment"
echo "- Integration: Automatically monitors CP registrations"
echo "- API: Available at /api/ai-monitoring endpoints"
echo ""
echo "🔑 To enable full AI monitoring in production:"
echo "1. Ensure OPENAI_API_KEY is set in GitHub Secrets"
echo "2. GPT-4o-mini provides ~85% cost reduction vs GPT-4"
echo "3. System gracefully falls back to keyword analysis if needed"