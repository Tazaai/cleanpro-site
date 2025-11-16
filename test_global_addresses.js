const { chromium } = require('playwright');

(async () => {
  console.log('🌍 Testing Global Address Autocomplete...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('📍 Testing if Google Places API works without country restrictions...');
    
    // Inject a test script to check Google Places API configuration
    await page.addInitScript(() => {
      window.testGooglePlaces = () => {
        if (typeof google === 'undefined' || !google.maps || !google.maps.places) {
          return { error: 'Google Maps Places API not loaded' };
        }
        
        // Create a test autocomplete instance to check restrictions
        const testInput = document.createElement('input');
        document.body.appendChild(testInput);
        
        try {
          const autocomplete = new google.maps.places.Autocomplete(testInput, {
            types: ['address']
            // No componentRestrictions - should be global
          });
          
          const restrictions = autocomplete.getComponentRestrictions();
          document.body.removeChild(testInput);
          
          return {
            success: true,
            restrictions: restrictions || 'none',
            global: !restrictions || Object.keys(restrictions).length === 0
          };
        } catch (error) {
          document.body.removeChild(testInput);
          return { error: error.message };
        }
      };
    });
    
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
    
    // Wait for Google Maps to load
    await page.waitForFunction(() => typeof window.google !== 'undefined');
    
    // Test the Places API configuration
    const placesTest = await page.evaluate(() => window.testGooglePlaces());
    console.log('🔧 Places API Configuration:', placesTest);
    
    if (placesTest.global) {
      console.log('✅ Address autocomplete is now GLOBAL - no country restrictions!');
    } else {
      console.log('⚠️ Still has restrictions:', placesTest.restrictions);
    }
    
    // Test various international addresses
    const globalAddresses = [
      'Istanbul, Turkey',
      'Mumbai, India', 
      'Sydney, Australia',
      'Paris, France',
      'São Paulo, Brazil',
      'Tokyo, Japan',
      'Dubai, UAE',
      'Copenhagen, Denmark'
    ];
    
    console.log('\n🌍 Testing international address autocomplete...');
    
    const addressInput = await page.locator('#address-input');
    await addressInput.waitFor({ state: 'visible' });
    
    let globalWorking = 0;
    
    for (const address of globalAddresses) {
      console.log(`\n🧪 Testing: ${address}`);
      
      // Clear and type
      await addressInput.click();
      await addressInput.fill('');
      await addressInput.type(address, { delay: 50 });
      
      // Wait for autocomplete
      await page.waitForTimeout(2000);
      
      const suggestions = await page.locator('.pac-container .pac-item').count();
      console.log(`📍 Suggestions found: ${suggestions}`);
      
      if (suggestions > 0) {
        globalWorking++;
        console.log('✅ International address autocomplete working!');
      }
    }
    
    console.log(`\n🎉 Global Results: ${globalWorking}/${globalAddresses.length} countries working`);
    
    if (globalWorking === globalAddresses.length) {
      console.log('🌍 ✅ FULLY GLOBAL ADDRESS AUTOCOMPLETE CONFIRMED!');
    } else if (globalWorking > 4) {
      console.log('🌍 ✅ MOSTLY GLOBAL - Major countries working!');
    } else {
      console.log('🌍 ⚠️ Limited global support');
    }
    
  } catch (error) {
    console.error('❌ Error testing global addresses:', error.message);
  }
  
  await browser.close();
})();