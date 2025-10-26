const { chromium } = require('playwright');

(async () => {
  console.log('🧪 Testing address autocomplete functionality...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Navigate to the site
    await page.goto('https://cleanpro-frontend-2a5pka5baa-ew.a.run.app');
    await page.waitForLoadState('networkidle');
    
    // Wait for the form to load
    await page.waitForSelector('[data-testid="booking-form"]', { timeout: 10000 });
    
    // Find the address input field
    const addressInput = await page.locator('input[placeholder*="address"]').first();
    await addressInput.waitFor({ state: 'visible' });
    
    console.log('✅ Address input field found');
    
    // Click and type in the address field
    await addressInput.click();
    await addressInput.fill('1600 Amphitheatre Parkway, Mountain View');
    
    // Wait a moment for autocomplete to load
    await page.waitForTimeout(2000);
    
    // Check for autocomplete suggestions
    const suggestions = await page.locator('.pac-container .pac-item').count();
    console.log(`📍 Autocomplete suggestions found: ${suggestions}`);
    
    if (suggestions > 0) {
      console.log('🎉 Address autocomplete is working!');
      // Get first suggestion text
      const firstSuggestion = await page.locator('.pac-container .pac-item').first().textContent();
      console.log(`📝 First suggestion: ${firstSuggestion}`);
    } else {
      console.log('⚠️ No autocomplete suggestions found');
    }
    
    // Take a screenshot
    await page.screenshot({ path: 'address-autocomplete-test.png', fullPage: true });
    console.log('📸 Screenshot saved as address-autocomplete-test.png');
    
  } catch (error) {
    console.error('❌ Error testing address autocomplete:', error.message);
  }
  
  await browser.close();
})();
