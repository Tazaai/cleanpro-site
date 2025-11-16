const { chromium } = require('playwright');

(async () => {
  console.log('🇩🇰 Testing Danish address autocomplete...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Listen for console messages
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('🚨 Console Error:', msg.text());
    }
  });
  
  try {
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
    
    console.log('✅ Page loaded successfully');
    
    // Wait for address input to be available
    const addressInput = await page.locator('#address-input');
    await addressInput.waitFor({ state: 'visible' });
    
    console.log('✅ Address input field found');
    
    // Test Danish addresses
    const danishAddresses = [
      'Rådhuspladsen, Copenhagen, Denmark',
      'Nyhavn, København, Denmark', 
      'H.C. Andersens Boulevard, Copenhagen',
      'Strøget, Copenhagen'
    ];
    
    for (const address of danishAddresses) {
      console.log(`\n🧪 Testing: ${address}`);
      
      // Clear and type in the address field
      await addressInput.click();
      await addressInput.fill('');
      await addressInput.type(address, { delay: 100 });
      
      // Wait for autocomplete to load
      await page.waitForTimeout(3000);
      
      // Check for Google Places autocomplete suggestions
      const suggestions = await page.locator('.pac-container .pac-item').count();
      console.log(`📍 Autocomplete suggestions found: ${suggestions}`);
      
      if (suggestions > 0) {
        console.log('🎉 Danish address autocomplete is working!');
        // Get first few suggestions
        for (let i = 0; i < Math.min(3, suggestions); i++) {
          const suggestion = await page.locator('.pac-container .pac-item').nth(i).textContent();
          console.log(`📝 Suggestion ${i + 1}: ${suggestion}`);
        }
      } else {
        console.log('⚠️ No autocomplete suggestions for this Danish address');
      }
    }
    
    // Take a screenshot of the final state
    await page.screenshot({ path: 'danish-address-test.png', fullPage: true });
    console.log('\n📸 Screenshot saved as danish-address-test.png');
    
  } catch (error) {
    console.error('❌ Error testing Danish addresses:', error.message);
  }
  
  await browser.close();
})();