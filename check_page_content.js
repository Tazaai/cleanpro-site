const { chromium } = require('playwright');

(async () => {
  console.log('🔍 Checking page content and structure...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('https://cleanpro-frontend-2a5pka5baa-ew.a.run.app');
    await page.waitForLoadState('networkidle');
    
    // Get page title and basic info
    const title = await page.title();
    console.log(`📄 Page title: ${title}`);
    
    // Check if there are any forms
    const forms = await page.locator('form').count();
    console.log(`📋 Forms found: ${forms}`);
    
    // Check for input fields
    const inputs = await page.locator('input').count();
    console.log(`📝 Input fields found: ${inputs}`);
    
    // Check for address-related inputs
    const addressInputs = await page.locator('input[placeholder*="address"]').count();
    console.log(`🏠 Address inputs found: ${addressInputs}`);
    
    // Get all input placeholders
    const allInputs = await page.locator('input').all();
    console.log('📝 Input field placeholders:');
    for (let input of allInputs) {
      const placeholder = await input.getAttribute('placeholder');
      if (placeholder) {
        console.log(`  - ${placeholder}`);
      }
    }
    
    // Get current URL
    const currentUrl = page.url();
    console.log(`🌐 Current URL: ${currentUrl}`);
    
    // Take a screenshot
    await page.screenshot({ path: 'page-content-check.png', fullPage: true });
    console.log('📸 Screenshot saved as page-content-check.png');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  await browser.close();
})();
