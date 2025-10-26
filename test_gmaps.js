// Quick test to check if Google Maps API is loading
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('🔍 Testing Google Maps API loading...');
  
  await page.goto('https://cleanpro-frontend-5539254765.europe-west1.run.app/', { 
    waitUntil: 'networkidle' 
  });
  
  // Wait a bit for Google Maps to load
  await page.waitForTimeout(3000);
  
  // Check if Google Maps script loaded
  const googleLoaded = await page.evaluate(() => {
    return {
      googleExists: !!window.google,
      mapsExists: !!(window.google && window.google.maps),
      placesExists: !!(window.google && window.google.maps && window.google.maps.places),
      scriptSrcs: Array.from(document.querySelectorAll('script[src*="maps.googleapis.com"]')).map(s => s.src)
    };
  });
  
  console.log('📊 Google Maps API Status:', googleLoaded);
  
  // Check for address input field
  const addressInput = await page.locator('#address-input');
  const inputExists = await addressInput.isVisible();
  console.log('📍 Address input field visible:', inputExists);
  
  if (inputExists) {
    // Try to type in address field and see if autocomplete appears
    await addressInput.click();
    await addressInput.fill('123 Main St');
    await page.waitForTimeout(2000);
    
    // Check if any dropdown/suggestions appear
    const suggestions = await page.locator('[role="listbox"], .pac-container, [class*="suggestion"], [class*="autocomplete"]');
    const suggestionsVisible = await suggestions.count();
    console.log('📝 Autocomplete suggestions found:', suggestionsVisible);
  }
  
  await page.screenshot({ path: 'gmaps-test.png', fullPage: true });
  console.log('📸 Screenshot saved as gmaps-test.png');
  
  await browser.close();
})();