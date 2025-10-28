// =============================================================
// 🧩 AdminSheet Database Schema Initialization
// =============================================================

import { initFirebase, getDb } from './firebase.js';

async function initializeAdminSheetSchema() {
  console.log('🔥 Initializing AdminSheet database schema...');
  
  try {
    await initFirebase();
    const db = await getDb();
    
    // 1. CoordinationPoints Collection
    console.log('📍 Setting up CoordinationPoints collection...');
    const coordinationPointsRef = db.collection('coordinationPoints');
    
    // Check if collection has data
    const existingCPs = await coordinationPointsRef.limit(1).get();
    if (existingCPs.empty) {
      // Add sample coordination points
      const sampleCPs = [
        {
          name: 'Clean Departure 1',
          address: 'San Francisco, CA, USA',
          tax_id: 'CP001-SF',
          stripe_identity_status: 'pending',
          active: true,
          admin_approved: true,
          custom_fee_percentage: 15,
          ai_quality_score: 8.5,
          communication_score: 9.0,
          contact_email: 'cp1@cleandeparture.com',
          contact_phone: '+1-555-0101',
          created_at: new Date().toISOString()
        },
        {
          name: 'Clean Departure 2', 
          address: 'Los Angeles, CA, USA',
          tax_id: 'CP002-LA',
          stripe_identity_status: 'verified',
          active: true,
          admin_approved: true,
          custom_fee_percentage: 15,
          ai_quality_score: 7.8,
          communication_score: 8.5,
          contact_email: 'cp2@cleandeparture.com',
          contact_phone: '+1-555-0102',
          created_at: new Date().toISOString()
        }
      ];
      
      for (const cp of sampleCPs) {
        await coordinationPointsRef.add(cp);
      }
      console.log('✅ Sample coordination points created');
    }
    
    // 2. EscrowSettings Collection
    console.log('💳 Setting up EscrowSettings collection...');
    const escrowRef = db.collection('escrowSettings').doc('global');
    const escrowDoc = await escrowRef.get();
    
    if (!escrowDoc.exists) {
      await escrowRef.set({
        hold_period_hours: 48,
        auto_release_enabled: true,
        region_settings: {
          us: { hold_period_hours: 48 },
          eu: { hold_period_hours: 72 },
          default: { hold_period_hours: 48 }
        },
        release_trigger_date_type: 'scheduled_cleaning_date',
        ai_optimization_enabled: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      console.log('✅ Escrow settings initialized');
    }
    
    // 3. RegionalSettings Collection
    console.log('🌍 Setting up RegionalSettings collection...');
    const regionalSettings = [
      {
        country: 'us',
        currency: 'USD',
        unit_system: 'imperial',
        language: 'en',
        tax_requirements: 'Federal EIN required for business entities',
        tax_id_mandatory: true,
        ai_suggested_adjustments: {
          platform_fee: 15,
          hold_period: 48
        }
      },
      {
        country: 'ca',
        currency: 'CAD',
        unit_system: 'metric', 
        language: 'en',
        tax_requirements: 'Business Number (BN) required',
        tax_id_mandatory: true,
        ai_suggested_adjustments: {
          platform_fee: 16,
          hold_period: 48
        }
      },
      {
        country: 'gb',
        currency: 'GBP',
        unit_system: 'metric',
        language: 'en', 
        tax_requirements: 'UTR number required for self-employed',
        tax_id_mandatory: false,
        ai_suggested_adjustments: {
          platform_fee: 17,
          hold_period: 72
        }
      }
    ];
    
    for (const region of regionalSettings) {
      const regionRef = db.collection('regionalSettings').doc(region.country);
      const regionDoc = await regionRef.get();
      
      if (!regionDoc.exists) {
        await regionRef.set({
          ...region,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      }
    }
    console.log('✅ Regional settings initialized');
    
    // 4. PaymentHolds Collection (empty - populated at runtime)
    console.log('💰 Setting up PaymentHolds collection...');
    const paymentHoldsRef = db.collection('paymentHolds');
    console.log('✅ PaymentHolds collection ready');
    
    // 5. RegistrationTerms Collection
    console.log('📋 Setting up RegistrationTerms collection...');
    const termsRef = db.collection('registrationTerms').doc('global');
    const termsDoc = await termsRef.get();
    
    if (!termsDoc.exists) {
      await termsRef.set({
        quality_standards: 'All coordination points must maintain professional standards, provide quality service, and ensure customer satisfaction. Services must be completed to agreed specifications and within scheduled timeframes.',
        satisfaction_requirements: 'Customer satisfaction is our top priority. All coordination points must maintain a minimum 4.0-star rating and respond to customer concerns within 24 hours. Repeated quality issues may result in account suspension.',
        conduct_policies: 'Professional behavior is required at all times. This includes respectful communication, punctuality, proper attire, and adherence to safety protocols. Inappropriate conduct, harassment, or discrimination will result in immediate suspension.',
        tax_compliance_text: 'All coordination points are responsible for their own tax compliance and reporting. This includes income tax, sales tax (where applicable), and any business licensing requirements in their jurisdiction.',
        insurance_requirements: 'Adequate liability insurance coverage is required for all service providers. Minimum coverage amounts vary by region but must include general liability and professional indemnity protection.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      console.log('✅ Registration terms initialized');
    }
    
    // 6. FeeStructure Collection
    console.log('💵 Setting up FeeStructure collection...');
    const feeRef = db.collection('feeStructure').doc('global');
    const feeDoc = await feeRef.get();
    
    if (!feeDoc.exists) {
      await feeRef.set({
        base_platform_fee: 15,
        cp_custom_fees: {},
        regional_adjustments: {
          us: 15,
          ca: 16,
          gb: 17,
          eu: 18
        },
        subscription_fees: {
          monthly: 29.99,
          yearly: 299.99,
          enterprise: 999.99
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      console.log('✅ Fee structure initialized');
    }
    
    // 7. AIReports Collection (empty - populated by AI system)
    console.log('🤖 Setting up AIReports collection...');
    const aiReportsRef = db.collection('aiReports');
    console.log('✅ AIReports collection ready');
    
    // 8. CommunicationLogs Collection (empty - populated at runtime)
    console.log('💬 Setting up CommunicationLogs collection...');
    const communicationRef = db.collection('communicationLogs');
    console.log('✅ CommunicationLogs collection ready');
    
    // 9. RedFlags Collection (empty - populated at runtime)
    console.log('🚩 Setting up RedFlags collection...');
    const redFlagsRef = db.collection('redFlags');
    console.log('✅ RedFlags collection ready');
    
    // 10. ReviewAnalysis Collection (empty - populated at runtime)
    console.log('⭐ Setting up ReviewAnalysis collection...');
    const reviewAnalysisRef = db.collection('reviewAnalysis');
    console.log('✅ ReviewAnalysis collection ready');
    
    // 11. ContactSharing Collection (empty - populated at runtime)
    console.log('📞 Setting up ContactSharing collection...');
    const contactSharingRef = db.collection('contactSharing');
    console.log('✅ ContactSharing collection ready');
    
    // Additional collections for enhanced functionality
    console.log('🔧 Setting up additional collections...');
    
    // PaymentDisputes Collection
    const paymentDisputesRef = db.collection('paymentDisputes');
    console.log('✅ PaymentDisputes collection ready');
    
    // AIOptimizations Collection  
    const aiOptimizationsRef = db.collection('aiOptimizations');
    console.log('✅ AIOptimizations collection ready');
    
    console.log('🎉 AdminSheet database schema initialization complete!');
    console.log('📊 Collections created/verified:');
    console.log('   • coordinationPoints (with sample data)');
    console.log('   • escrowSettings (with defaults)');
    console.log('   • regionalSettings (US, CA, GB)'); 
    console.log('   • paymentHolds (ready for runtime data)');
    console.log('   • registrationTerms (with policies)');
    console.log('   • feeStructure (with regional fees)');
    console.log('   • aiReports (ready for AI data)');
    console.log('   • communicationLogs (ready for monitoring)');
    console.log('   • redFlags (ready for incidents)');
    console.log('   • reviewAnalysis (ready for AI analysis)');
    console.log('   • contactSharing (ready for contact mgmt)');
    console.log('   • paymentDisputes (ready for dispute handling)');
    console.log('   • aiOptimizations (ready for AI recommendations)');
    
    return true;
    
  } catch (error) {
    console.error('❌ AdminSheet schema initialization failed:', error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeAdminSheetSchema()
    .then(() => {
      console.log('✅ Schema initialization successful');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Schema initialization failed:', error);
      process.exit(1);
    });
}

export { initializeAdminSheetSchema };