import React from 'react';
import { toast } from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE || window.API_BASE || "https://cleanpro-backend-5539254765.europe-west1.run.app";

class LocalizationEngine {
  constructor() {
    this.currentLocation = null;
    this.settings = {
      country: 'US',
      currency: 'USD',
      language: 'en',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      numberFormat: 'en-US'
    };
    this.isInitialized = false;
    this.cache = new Map();
    this.listeners = new Set();
    
    // Initialize on first import
    this.init();
  }

  // Initialize localization engine
  async init() {
    if (this.isInitialized) return;
    
    try {
      // Load from localStorage first
      const cached = localStorage.getItem('cleanpro_localization');
      if (cached) {
        this.settings = { ...this.settings, ...JSON.parse(cached) };
      }

      // Auto-detect location
      await this.detectLocation();
      
      this.isInitialized = true;
      this.notifyListeners();
    } catch (error) {
      console.error('Failed to initialize localization:', error);
      // Use default US settings
      this.isInitialized = true;
      this.notifyListeners();
    }
  }

  // Auto-detect user location
  async detectLocation() {
    try {
      const response = await fetch(`${API_BASE}/api/location/detect`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.ok && data.data) {
          this.currentLocation = data.data;
          this.updateSettings(data.data);
          this.saveToStorage();
          
          console.log('Location detected:', data.data);
          return data.data;
        }
      }

      // Fallback to browser geolocation if API fails
      return await this.getBrowserLocation();
    } catch (error) {
      console.error('Location detection failed:', error);
      return await this.getBrowserLocation();
    }
  }

  // Browser geolocation fallback
  async getBrowserLocation() {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Reverse geocode to get country
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            // Try to determine country from coordinates (simplified)
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const country = this.getCountryFromTimezone(timezone);
            
            const locationData = {
              country: country,
              currency: this.getCurrencyForCountry(country),
              timezone: timezone,
              coordinates: { lat, lng }
            };

            this.currentLocation = locationData;
            this.updateSettings(locationData);
            this.saveToStorage();
            
            resolve(locationData);
          } catch (error) {
            console.error('Geolocation processing failed:', error);
            resolve(null);
          }
        },
        (error) => {
          console.warn('Geolocation denied or failed:', error);
          resolve(null);
        },
        { timeout: 10000 }
      );
    });
  }

  // Update localization settings
  updateSettings(locationData) {
    if (!locationData) return;

    const updates = {};

    if (locationData.country) {
      updates.country = locationData.country;
      updates.currency = locationData.currency || this.getCurrencyForCountry(locationData.country);
      updates.language = this.getLanguageForCountry(locationData.country);
    }

    if (locationData.timezone) {
      updates.timezone = locationData.timezone;
    }

    // Update date and number formats based on country
    if (updates.country) {
      const formats = this.getFormatsForCountry(updates.country);
      Object.assign(updates, formats);
    }

    this.settings = { ...this.settings, ...updates };
    this.notifyListeners();
  }

  // Get currency for country
  getCurrencyForCountry(country) {
    const currencyMap = {
      'US': 'USD', 'CA': 'CAD', 'GB': 'GBP', 'AU': 'AUD', 'NZ': 'NZD',
      'DE': 'EUR', 'FR': 'EUR', 'IT': 'EUR', 'ES': 'EUR', 'NL': 'EUR',
      'AT': 'EUR', 'BE': 'EUR', 'FI': 'EUR', 'IE': 'EUR', 'PT': 'EUR',
      'GR': 'EUR', 'LU': 'EUR', 'MT': 'EUR', 'CY': 'EUR', 'SK': 'EUR',
      'SI': 'EUR', 'EE': 'EUR', 'LV': 'EUR', 'LT': 'EUR',
      'JP': 'JPY', 'KR': 'KRW', 'CN': 'CNY', 'IN': 'INR',
      'BR': 'BRL', 'MX': 'MXN', 'AR': 'ARS', 'CL': 'CLP',
      'CH': 'CHF', 'SE': 'SEK', 'NO': 'NOK', 'DK': 'DKK',
      'PL': 'PLN', 'CZ': 'CZK', 'HU': 'HUF', 'RO': 'RON'
    };
    return currencyMap[country] || 'USD';
  }

  // Get language for country
  getLanguageForCountry(country) {
    const languageMap = {
      'US': 'en', 'CA': 'en', 'GB': 'en', 'AU': 'en', 'NZ': 'en', 'IE': 'en',
      'DE': 'de', 'AT': 'de', 'CH': 'de',
      'FR': 'fr', 'BE': 'fr', 'LU': 'fr',
      'ES': 'es', 'MX': 'es', 'AR': 'es', 'CL': 'es',
      'IT': 'it', 'PT': 'pt', 'BR': 'pt',
      'NL': 'nl', 'RU': 'ru', 'JP': 'ja', 'KR': 'ko',
      'CN': 'zh', 'IN': 'hi', 'SE': 'sv', 'NO': 'no',
      'DK': 'da', 'FI': 'fi', 'PL': 'pl', 'CZ': 'cs', 'HU': 'hu'
    };
    return languageMap[country] || 'en';
  }

  // Get formats for country
  getFormatsForCountry(country) {
    const formatMap = {
      'US': { dateFormat: 'MM/DD/YYYY', numberFormat: 'en-US' },
      'CA': { dateFormat: 'MM/DD/YYYY', numberFormat: 'en-CA' },
      'GB': { dateFormat: 'DD/MM/YYYY', numberFormat: 'en-GB' },
      'AU': { dateFormat: 'DD/MM/YYYY', numberFormat: 'en-AU' },
      'DE': { dateFormat: 'DD.MM.YYYY', numberFormat: 'de-DE' },
      'FR': { dateFormat: 'DD/MM/YYYY', numberFormat: 'fr-FR' },
      'IT': { dateFormat: 'DD/MM/YYYY', numberFormat: 'it-IT' },
      'ES': { dateFormat: 'DD/MM/YYYY', numberFormat: 'es-ES' },
      'JP': { dateFormat: 'YYYY/MM/DD', numberFormat: 'ja-JP' },
      'KR': { dateFormat: 'YYYY.MM.DD', numberFormat: 'ko-KR' },
      'CN': { dateFormat: 'YYYY/MM/DD', numberFormat: 'zh-CN' }
    };
    return formatMap[country] || { dateFormat: 'MM/DD/YYYY', numberFormat: 'en-US' };
  }

  // Get country from timezone
  getCountryFromTimezone(timezone) {
    const timezoneMap = {
      'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US',
      'America/Los_Angeles': 'US', 'America/Toronto': 'CA', 'America/Vancouver': 'CA',
      'Europe/London': 'GB', 'Europe/Berlin': 'DE', 'Europe/Paris': 'FR',
      'Europe/Rome': 'IT', 'Europe/Madrid': 'ES', 'Europe/Amsterdam': 'NL',
      'Asia/Tokyo': 'JP', 'Asia/Seoul': 'KR', 'Asia/Shanghai': 'CN',
      'Australia/Sydney': 'AU', 'Australia/Melbourne': 'AU'
    };
    return timezoneMap[timezone] || 'US';
  }

  // Format currency
  formatCurrency(amount, options = {}) {
    const currency = options.currency || this.settings.currency;
    const locale = options.locale || this.settings.numberFormat;
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: options.minimumFractionDigits || 2,
      maximumFractionDigits: options.maximumFractionDigits || 2
    }).format(amount);
  }

  // Format date
  formatDate(date, options = {}) {
    const locale = options.locale || this.settings.numberFormat;
    const formatOptions = {
      year: 'numeric',
      month: options.month || 'short',
      day: 'numeric',
      ...options.dateOptions
    };

    if (options.includeTime) {
      formatOptions.hour = 'numeric';
      formatOptions.minute = '2-digit';
      formatOptions.timeZone = this.settings.timezone;
    }

    return new Intl.DateTimeFormat(locale, formatOptions).format(new Date(date));
  }

  // Format number
  formatNumber(number, options = {}) {
    const locale = options.locale || this.settings.numberFormat;
    
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: options.minimumFractionDigits || 0,
      maximumFractionDigits: options.maximumFractionDigits || 3,
      style: options.style || 'decimal'
    }).format(number);
  }

  // Convert currency (simplified - would need real API)
  async convertCurrency(amount, fromCurrency, toCurrency = null) {
    toCurrency = toCurrency || this.settings.currency;
    
    if (fromCurrency === toCurrency) {
      return amount;
    }

    // Check cache first
    const cacheKey = `${fromCurrency}_${toCurrency}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < 3600000) { // 1 hour cache
      return amount * cached.rate;
    }

    try {
      // In a real implementation, you'd use a currency API
      // For now, using simplified conversion rates
      const rates = this.getSimplifiedRates();
      const usdAmount = fromCurrency === 'USD' ? amount : amount / (rates[fromCurrency] || 1);
      const convertedAmount = toCurrency === 'USD' ? usdAmount : usdAmount * (rates[toCurrency] || 1);
      
      // Cache the rate
      this.cache.set(cacheKey, {
        rate: convertedAmount / amount,
        timestamp: Date.now()
      });
      
      return convertedAmount;
    } catch (error) {
      console.error('Currency conversion failed:', error);
      return amount; // Return original amount on failure
    }
  }

  // Simplified exchange rates (in production, use real API)
  getSimplifiedRates() {
    return {
      'USD': 1.0, 'EUR': 0.85, 'GBP': 0.73, 'CAD': 1.35, 'AUD': 1.50,
      'JPY': 110, 'KRW': 1200, 'CNY': 6.5, 'CHF': 0.92, 'SEK': 8.5,
      'NOK': 8.8, 'DKK': 6.3, 'PLN': 3.9, 'CZK': 22, 'HUF': 290,
      'BRL': 5.2, 'MXN': 20, 'INR': 74
    };
  }

  // Get localized text (placeholder for i18n)
  getText(key, defaultText, variables = {}) {
    // In a full implementation, this would load from translation files
    let text = defaultText;
    
    // Replace variables
    Object.keys(variables).forEach(varKey => {
      text = text.replace(`{{${varKey}}}`, variables[varKey]);
    });
    
    return text;
  }

  // Get current settings
  getSettings() {
    return { ...this.settings };
  }

  // Manually set location
  setLocation(locationData) {
    this.currentLocation = locationData;
    this.updateSettings(locationData);
    this.saveToStorage();
  }

  // Override specific setting
  setSetting(key, value) {
    this.settings[key] = value;
    this.saveToStorage();
    this.notifyListeners();
  }

  // Save to localStorage
  saveToStorage() {
    try {
      localStorage.setItem('cleanpro_localization', JSON.stringify(this.settings));
    } catch (error) {
      console.error('Failed to save localization settings:', error);
    }
  }

  // Add change listener
  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  // Notify all listeners
  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.settings);
      } catch (error) {
        console.error('Localization listener error:', error);
      }
    });
  }

  // Get user-friendly country name
  getCountryName(countryCode = null) {
    const code = countryCode || this.settings.country;
    const countryNames = {
      'US': 'United States', 'CA': 'Canada', 'GB': 'United Kingdom',
      'AU': 'Australia', 'NZ': 'New Zealand', 'DE': 'Germany', 'FR': 'France',
      'IT': 'Italy', 'ES': 'Spain', 'NL': 'Netherlands', 'AT': 'Austria',
      'BE': 'Belgium', 'CH': 'Switzerland', 'SE': 'Sweden', 'NO': 'Norway',
      'DK': 'Denmark', 'FI': 'Finland', 'JP': 'Japan', 'KR': 'South Korea',
      'CN': 'China', 'IN': 'India', 'BR': 'Brazil', 'MX': 'Mexico'
    };
    return countryNames[code] || code;
  }

  // Check if metric system should be used
  useMetricSystem() {
    return !['US', 'LR', 'MM'].includes(this.settings.country);
  }

  // Format distance
  formatDistance(meters) {
    if (this.useMetricSystem()) {
      if (meters < 1000) {
        return `${Math.round(meters)}m`;
      }
      return `${(meters / 1000).toFixed(1)}km`;
    } else {
      const feet = meters * 3.28084;
      if (feet < 5280) {
        return `${Math.round(feet)}ft`;
      }
      return `${(feet / 5280).toFixed(1)}mi`;
    }
  }

  // Format area
  formatArea(squareMeters) {
    if (this.useMetricSystem()) {
      return `${Math.round(squareMeters)}m²`;
    } else {
      const squareFeet = squareMeters * 10.764;
      return `${Math.round(squareFeet)}ft²`;
    }
  }

  // Get timezone offset
  getTimezoneOffset() {
    return new Date().toLocaleString('en', { 
      timeZone: this.settings.timezone, 
      timeZoneName: 'short' 
    }).split(' ').pop();
  }

  // Format phone number for country
  formatPhoneNumber(phoneNumber) {
    // Simplified phone formatting - would need full libphonenumber in production
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    switch (this.settings.country) {
      case 'US':
      case 'CA':
        if (cleaned.length === 10) {
          return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        }
        if (cleaned.length === 11 && cleaned[0] === '1') {
          return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
        }
        break;
      case 'GB':
        if (cleaned.length === 11 && cleaned.startsWith('44')) {
          return `+44 ${cleaned.slice(2, 6)} ${cleaned.slice(6)}`;
        }
        break;
    }
    
    return phoneNumber; // Return original if can't format
  }
}

// Create singleton instance
const localizationEngine = new LocalizationEngine();

// React hook for using localization
export const useLocalization = () => {
  const [settings, setSettings] = React.useState(localizationEngine.getSettings());

  React.useEffect(() => {
    const unsubscribe = localizationEngine.addListener(setSettings);
    return unsubscribe;
  }, []);

  return {
    settings,
    formatCurrency: localizationEngine.formatCurrency.bind(localizationEngine),
    formatDate: localizationEngine.formatDate.bind(localizationEngine),
    formatNumber: localizationEngine.formatNumber.bind(localizationEngine),
    formatDistance: localizationEngine.formatDistance.bind(localizationEngine),
    formatArea: localizationEngine.formatArea.bind(localizationEngine),
    formatPhoneNumber: localizationEngine.formatPhoneNumber.bind(localizationEngine),
    convertCurrency: localizationEngine.convertCurrency.bind(localizationEngine),
    getText: localizationEngine.getText.bind(localizationEngine),
    getCountryName: localizationEngine.getCountryName.bind(localizationEngine),
    useMetricSystem: localizationEngine.useMetricSystem.bind(localizationEngine),
    detectLocation: localizationEngine.detectLocation.bind(localizationEngine),
    setLocation: localizationEngine.setLocation.bind(localizationEngine),
    setSetting: localizationEngine.setSetting.bind(localizationEngine)
  };
};

export default localizationEngine;