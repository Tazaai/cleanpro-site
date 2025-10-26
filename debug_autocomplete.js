const { chromium } = require('playwright');

(async () => {
  console.log('🔍 Debugging address autocomplete...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Listen for console messages
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('🚨 Console Error:', msg.text());
    } else if (msg.text().includes('google') || msg.text().includes('Maps') || msg.text().includes('autocomplete')) {
      console.log('📝 Console:', msg.text());
    }
  });
  
  try {
    await page.goto('https://cleanpro-frontend-2a5pka5baa-ew.a.run.app');
    await page.waitForLoadState('networkidle');
    
    // Check if Google Maps API loaded
    const googleStatus = await page.evaluate(() => {
      return {
        google: typeof window.google !== 'undefined',
        maps: typeof window.google?.maps !== 'undefined',
        places: typeof window.google?.maps?.places !== 'undefined',
        Autocomplete: typeof window.google?.maps?.places?.Autocomplete !== 'undefined'
      };
    });
    
    console.log('��️ Google Maps API Status:', googleStatus);
    
    // Find the address input
    const addressInput = await page.locator('input[placeholder*="Start typing your address"]');
    await addressInput.waitFor({ state: 'visible' });
    
    // Check if autocomplete is attached to the input
    const inputHasAutocomplete = await page.evaluate(() => {
      const input = document.querySelector('input[placeholder*="Start typing your address"]');
      if (input) {
        // Check for Google's autocomplete class or data attributes
        return {
          hasGoogleClass: input.classList.contains('pac-target-input'),
          hasDataAttribute: input.hasAttribute('data-google-autocomplete'),
          inputElement: input.outerHTML
        };
      }
      return null;
    });
    
    console.log('🎯 Input Autocomplete Status:', inputHasAutocomplete);
    
    // Try typing and wait longer
    await addressInput.click();
    await addressInput.fill('Google, Mountain View');
    
    // Wait and check multiple times
    for (let i = 0; i < 5; i++) {
      await page.waitForTimeout(1000);
      const suggestions = await page.locator('.pac-container .pac-item').count();
      console.log(`⏱️ Attempt ${i + 1}: ${suggestions} suggestions found`);
      if (suggestions > 0) break;
    }
    
    // Take a screenshot
    await page.screenshot({ path: 'debug-autocomplete.png', fullPage: true });
    console.log('📸 Screenshot saved as debug-autocomplete.png');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  await browser.close();
})();
