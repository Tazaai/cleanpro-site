const { chromium } = require('playwright');

(async () => {
  console.log('🧪 Testing address autocomplete functionality...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('https://cleanpro-frontend-2a5pka5baa-ew.a.run.app');
    await page.waitForLoadState('networkidle');
    
    // Find the address input by placeholder
    const addressInput = await page.locator('input[placeholder*="Start typing your address"]');
    await addressInput.waitFor({ state: 'visible' });
    
    console.log('✅ Address input field found');
    
    // Click and type in the address field
    await addressInput.click();
    await addressInput.fill('1600 Amphitheatre');
    
    // Wait for autocomplete to load
    await page.waitForTimeout(3000);
    
    // Check for autocomplete suggestions (Google Places uses .pac-container)
    const suggestions = await page.locator('.pac-container .pac-item').count();
    console.log(`📍 Autocomplete suggestions found: ${suggestions}`);
    
    if (suggestions > 0) {
      console.log('🎉 Address autocomplete is working!');
      // Get first few suggestions
      for (let i = 0; i < Math.min(3, suggestions); i++) {
        const suggestion = await page.locator('.pac-container .pac-item').nth(i).textContent();
        console.log(`📝 Suggestion ${i + 1}: ${suggestion}`);
      }
      
      // Click the first suggestion
      await page.locator('.pac-container .pac-item').first().click();
      await page.waitForTimeout(1000);
      
      // Get the final value in the input field
      const finalValue = await addressInput.inputValue();
      console.log(`🏠 Final address value: ${finalValue}`);
    } else {
      console.log('⚠️ No autocomplete suggestions found');
    }
    
    // Take a screenshot
    await page.screenshot({ path: 'address-autocomplete-final.png', fullPage: true });
    console.log('📸 Screenshot saved as address-autocomplete-final.png');
    
  } catch (error) {
    console.error('❌ Error testing address autocomplete:', error.message);
  }
  
  await browser.close();
})();
