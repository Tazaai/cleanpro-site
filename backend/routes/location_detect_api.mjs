import express from 'express';
import { z } from 'zod';

const router = express.Router();

// Location detection schema
const locationQuerySchema = z.object({
  ip: z.string().optional(),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  address: z.string().optional()
});

// Validation middleware
const validateSchema = (schema) => (req, res, next) => {
  try {
    req.query = schema.parse(req.query);
    next();
  } catch (error) {
    console.error('Validation error:', error);
    return res.status(400).json({
      ok: false,
      error: 'Invalid request parameters',
      details: error.errors
    });
  }
};

// Country/region data with localization settings
const REGION_CONFIG = {
  'US': {
    currency: 'USD',
    currency_symbol: '$',
    locale: 'en-US',
    units: 'imperial',
    area_unit: 'sqft',
    distance_unit: 'miles',
    tax_rate: 0.0875, // Average US sales tax
    time_zone: 'America/New_York',
    phone_format: '+1 (XXX) XXX-XXXX',
    date_format: 'MM/DD/YYYY'
  },
  'CA': {
    currency: 'CAD',
    currency_symbol: 'C$',
    locale: 'en-CA',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.13, // HST
    time_zone: 'America/Toronto',
    phone_format: '+1 (XXX) XXX-XXXX',
    date_format: 'DD/MM/YYYY'
  },
  'GB': {
    currency: 'GBP',
    currency_symbol: '£',
    locale: 'en-GB',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.20, // VAT
    time_zone: 'Europe/London',
    phone_format: '+44 XXXX XXXXXX',
    date_format: 'DD/MM/YYYY'
  },
  'AU': {
    currency: 'AUD',
    currency_symbol: 'A$',
    locale: 'en-AU',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.10, // GST
    time_zone: 'Australia/Sydney',
    phone_format: '+61 X XXXX XXXX',
    date_format: 'DD/MM/YYYY'
  },
  'DE': {
    currency: 'EUR',
    currency_symbol: '€',
    locale: 'de-DE',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.19, // VAT
    time_zone: 'Europe/Berlin',
    phone_format: '+49 XXX XXXXXXX',
    date_format: 'DD.MM.YYYY'
  },
  'FR': {
    currency: 'EUR',
    currency_symbol: '€',
    locale: 'fr-FR',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.20, // VAT
    time_zone: 'Europe/Paris',
    phone_format: '+33 X XX XX XX XX',
    date_format: 'DD/MM/YYYY'
  },
  'DK': {
    currency: 'DKK',
    currency_symbol: 'kr',
    locale: 'da-DK',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.25, // Danish VAT
    time_zone: 'Europe/Copenhagen',
    phone_format: '+45 XX XX XX XX',
    date_format: 'DD-MM-YYYY'
  },
  'SE': {
    currency: 'SEK',
    currency_symbol: 'kr',
    locale: 'sv-SE',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.25, // Swedish VAT
    time_zone: 'Europe/Stockholm',
    phone_format: '+46 XX XXX XX XX',
    date_format: 'YYYY-MM-DD'
  },
  'NO': {
    currency: 'NOK',
    currency_symbol: 'kr',
    locale: 'nb-NO',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.25, // Norwegian VAT
    time_zone: 'Europe/Oslo',
    phone_format: '+47 XXX XX XXX',
    date_format: 'DD.MM.YYYY'
  },
  // Asia-Pacific
  'IN': {
    currency: 'INR',
    currency_symbol: '₹',
    locale: 'en-IN',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.18, // GST
    time_zone: 'Asia/Kolkata',
    phone_format: '+91 XXXXX XXXXX',
    date_format: 'DD/MM/YYYY'
  },
  'JP': {
    currency: 'JPY',
    currency_symbol: '¥',
    locale: 'ja-JP',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.10, // Consumption tax
    time_zone: 'Asia/Tokyo',
    phone_format: '+81 XX XXXX XXXX',
    date_format: 'YYYY/MM/DD'
  },
  'CN': {
    currency: 'CNY',
    currency_symbol: '¥',
    locale: 'zh-CN',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.13, // VAT
    time_zone: 'Asia/Shanghai',
    phone_format: '+86 XXX XXXX XXXX',
    date_format: 'YYYY-MM-DD'
  },
  'SG': {
    currency: 'SGD',
    currency_symbol: 'S$',
    locale: 'en-SG',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.07, // GST
    time_zone: 'Asia/Singapore',
    phone_format: '+65 XXXX XXXX',
    date_format: 'DD/MM/YYYY'
  },
  'KR': {
    currency: 'KRW',
    currency_symbol: '₩',
    locale: 'ko-KR',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.10, // VAT
    time_zone: 'Asia/Seoul',
    phone_format: '+82 XX XXXX XXXX',
    date_format: 'YYYY. MM. DD.'
  },
  // Middle East & Turkey
  'TR': {
    currency: 'TRY',
    currency_symbol: '₺',
    locale: 'tr-TR',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.18, // KDV (VAT)
    time_zone: 'Europe/Istanbul',
    phone_format: '+90 XXX XXX XX XX',
    date_format: 'DD.MM.YYYY'
  },
  'AE': {
    currency: 'AED',
    currency_symbol: 'د.إ',
    locale: 'ar-AE',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.05, // VAT
    time_zone: 'Asia/Dubai',
    phone_format: '+971 XX XXX XXXX',
    date_format: 'DD/MM/YYYY'
  },
  'SA': {
    currency: 'SAR',
    currency_symbol: 'ر.س',
    locale: 'ar-SA',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.15, // VAT
    time_zone: 'Asia/Riyadh',
    phone_format: '+966 XX XXX XXXX',
    date_format: 'DD/MM/YYYY'
  },
  // Africa
  'ZA': {
    currency: 'ZAR',
    currency_symbol: 'R',
    locale: 'en-ZA',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.15, // VAT
    time_zone: 'Africa/Johannesburg',
    phone_format: '+27 XX XXX XXXX',
    date_format: 'YYYY/MM/DD'
  },
  'EG': {
    currency: 'EGP',
    currency_symbol: 'ج.م',
    locale: 'ar-EG',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.14, // VAT
    time_zone: 'Africa/Cairo',
    phone_format: '+20 XX XXXX XXXX',
    date_format: 'DD/MM/YYYY'
  },
  // South America
  'BR': {
    currency: 'BRL',
    currency_symbol: 'R$',
    locale: 'pt-BR',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.17, // ICMS average
    time_zone: 'America/Sao_Paulo',
    phone_format: '+55 XX XXXX XXXX',
    date_format: 'DD/MM/YYYY'
  },
  'AR': {
    currency: 'ARS',
    currency_symbol: '$',
    locale: 'es-AR',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.21, // IVA
    time_zone: 'America/Argentina/Buenos_Aires',
    phone_format: '+54 XX XXXX XXXX',
    date_format: 'DD/MM/YYYY'
  },
  'CL': {
    currency: 'CLP',
    currency_symbol: '$',
    locale: 'es-CL',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.19, // IVA
    time_zone: 'America/Santiago',
    phone_format: '+56 X XXXX XXXX',
    date_format: 'DD-MM-YYYY'
  },
  // Additional European countries
  'IT': {
    currency: 'EUR',
    currency_symbol: '€',
    locale: 'it-IT',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.22, // IVA
    time_zone: 'Europe/Rome',
    phone_format: '+39 XXX XXX XXXX',
    date_format: 'DD/MM/YYYY'
  },
  'ES': {
    currency: 'EUR',
    currency_symbol: '€',
    locale: 'es-ES',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.21, // IVA
    time_zone: 'Europe/Madrid',
    phone_format: '+34 XXX XXX XXX',
    date_format: 'DD/MM/YYYY'
  },
  'NL': {
    currency: 'EUR',
    currency_symbol: '€',
    locale: 'nl-NL',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.21, // BTW
    time_zone: 'Europe/Amsterdam',
    phone_format: '+31 X XXXX XXXX',
    date_format: 'DD-MM-YYYY'
  },
  'CH': {
    currency: 'CHF',
    currency_symbol: 'Fr',
    locale: 'de-CH',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.077, // MWST
    time_zone: 'Europe/Zurich',
    phone_format: '+41 XX XXX XX XX',
    date_format: 'DD.MM.YYYY'
  },
  // More countries
  'MX': {
    currency: 'MXN',
    currency_symbol: '$',
    locale: 'es-MX',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.16, // IVA
    time_zone: 'America/Mexico_City',
    phone_format: '+52 XX XXXX XXXX',
    date_format: 'DD/MM/YYYY'
  },
  'RU': {
    currency: 'RUB',
    currency_symbol: '₽',
    locale: 'ru-RU',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.20, // НДС
    time_zone: 'Europe/Moscow',
    phone_format: '+7 XXX XXX XX XX',
    date_format: 'DD.MM.YYYY'
  },
  'NZ': {
    currency: 'NZD',
    currency_symbol: 'NZ$',
    locale: 'en-NZ',
    units: 'metric',
    area_unit: 'sqm',
    distance_unit: 'km',
    tax_rate: 0.15, // GST
    time_zone: 'Pacific/Auckland',
    phone_format: '+64 XX XXX XXXX',
    date_format: 'DD/MM/YYYY'
  }
};

// Default fallback configuration
const DEFAULT_CONFIG = {
  currency: 'USD',
  currency_symbol: '$',
  locale: 'en-US',
  units: 'metric',
  area_unit: 'sqm',
  distance_unit: 'km',
  tax_rate: 0.0,
  time_zone: 'UTC',
  phone_format: '+X XXX XXX XXXX',
  date_format: 'YYYY-MM-DD',
  country: 'UNKNOWN'
};

// Simple IP to country mapping (in production, use a proper GeoIP service)
const IP_TO_COUNTRY = {
  // US IP ranges (simplified)
  '192.168.': 'US', // Private (default to US for testing)
  '127.0.0.': 'US', // Localhost
  '10.0.': 'US',    // Private
  '172.16.': 'US',  // Private
};

// Detect country from IP address
const detectCountryFromIP = (ip) => {
  if (!ip) return null;
  
  // Check for private/local IPs
  for (const prefix in IP_TO_COUNTRY) {
    if (ip.startsWith(prefix)) {
      return IP_TO_COUNTRY[prefix];
    }
  }
  
  // In production, use a real GeoIP service like MaxMind
  // For now, default to US for unknown IPs
  return 'US';
};

// Get client's real IP address
const getClientIP = (req) => {
  return req.headers['x-forwarded-for'] ||
         req.headers['x-real-ip'] ||
         req.connection?.remoteAddress ||
         req.socket?.remoteAddress ||
         req.connection?.socket?.remoteAddress ||
         req.ip ||
         '127.0.0.1';
};

// Auto-detect location and return localization settings
router.get('/', validateSchema(locationQuerySchema), async (req, res) => {
  try {
    let detectedCountry = null;
    let confidence = 'low';
    let detection_method = 'fallback';
    
    // Method 1: Use provided coordinates to detect country
    if (req.query.lat && req.query.lng) {
      // In production, use reverse geocoding API (Google Maps, etc.)
      // For now, use simple lat/lng to country mapping
      const lat = req.query.lat;
      const lng = req.query.lng;
      
      // North America
      if (lat >= 24 && lat <= 49 && lng >= -125 && lng <= -66) {
        detectedCountry = 'US';
        confidence = 'high';
        detection_method = 'coordinates';
      } else if (lat >= 41 && lat <= 83 && lng >= -141 && lng <= -52) {
        detectedCountry = 'CA';
        confidence = 'high';
        detection_method = 'coordinates';
      } else if (lat >= 14 && lat <= 33 && lng >= -118 && lng <= -86) {
        detectedCountry = 'MX';
        confidence = 'high';
        detection_method = 'coordinates';
      }
      // Europe
      else if (lat >= 49 && lat <= 61 && lng >= -8 && lng <= 2) {
        detectedCountry = 'GB';
        confidence = 'high';
        detection_method = 'coordinates';
      } else if (lat >= 47 && lat <= 55 && lng >= 5 && lng <= 15) {
        detectedCountry = 'DE';
        confidence = 'high';
        detection_method = 'coordinates';
      } else if (lat >= 42 && lat <= 51 && lng >= -5 && lng <= 8) {
        detectedCountry = 'FR';
        confidence = 'high';
        detection_method = 'coordinates';
      } else if (lat >= 54 && lat <= 58 && lng >= 8 && lng <= 15) {
        detectedCountry = 'DK';
        confidence = 'high';
        detection_method = 'coordinates';
      } else if (lat >= 55 && lat <= 69 && lng >= 11 && lng <= 24) {
        detectedCountry = 'SE';
        confidence = 'high';
        detection_method = 'coordinates';
      } else if (lat >= 58 && lat <= 71 && lng >= 4 && lng <= 31) {
        detectedCountry = 'NO';
        confidence = 'high';
        detection_method = 'coordinates';
      } else if (lat >= 36 && lat <= 42 && lng >= 26 && lng <= 45) {
        detectedCountry = 'TR';
        confidence = 'high';
        detection_method = 'coordinates';
      }
      // Asia-Pacific  
      else if (lat >= -44 && lat <= -10 && lng >= 113 && lng <= 154) {
        detectedCountry = 'AU';
        confidence = 'high';
        detection_method = 'coordinates';
      } else if (lat >= 8 && lat <= 37 && lng >= 68 && lng <= 97) {
        detectedCountry = 'IN';
        confidence = 'high';
        detection_method = 'coordinates';
      } else if (lat >= 30 && lat <= 46 && lng >= 129 && lng <= 146) {
        detectedCountry = 'JP';
        confidence = 'high';
        detection_method = 'coordinates';
      } else if (lat >= 18 && lat <= 54 && lng >= 73 && lng <= 135) {
        detectedCountry = 'CN';
        confidence = 'high';
        detection_method = 'coordinates';
      } else if (lat >= 1 && lat <= 2 && lng >= 103 && lng <= 104) {
        detectedCountry = 'SG';
        confidence = 'high';
        detection_method = 'coordinates';
      }
      // Middle East & Africa
      else if (lat >= 22 && lat <= 26 && lng >= 51 && lng <= 56) {
        detectedCountry = 'AE';
        confidence = 'high';
        detection_method = 'coordinates';
      } else if (lat >= -35 && lat <= -22 && lng >= 16 && lng <= 33) {
        detectedCountry = 'ZA';
        confidence = 'high';
        detection_method = 'coordinates';
      }
      // South America
      else if (lat >= -34 && lat <= 5 && lng >= -74 && lng <= -35) {
        detectedCountry = 'BR';
        confidence = 'high';
        detection_method = 'coordinates';
      } else if (lat >= -55 && lat <= -21 && lng >= -73 && lng <= -53) {
        detectedCountry = 'AR';
        confidence = 'high';
        detection_method = 'coordinates';
      }
    }
    
    // Method 2: Parse address if provided (higher priority than IP) - Global country detection
    if (!detectedCountry && req.query.address) {
      const address = req.query.address.toLowerCase();
      
      // Global country name and code mappings
      const countryPatterns = {
        'US': ['usa', 'united states', 'america', ', us', 'u.s.a'],
        'CA': ['canada', ', ca', 'canadian'],
        'GB': ['uk', 'united kingdom', 'england', 'scotland', 'wales', ', gb', 'britain'],
        'AU': ['australia', ', au', 'australian'],
        'DE': ['germany', 'deutschland', ', de', 'german'],
        'FR': ['france', 'française', ', fr', 'french'],
        'IT': ['italy', 'italia', ', it', 'italian'],
        'ES': ['spain', 'españa', ', es', 'spanish'],
        'NL': ['netherlands', 'holland', ', nl', 'dutch'],
        'CH': ['switzerland', 'schweiz', ', ch', 'swiss'],
        'DK': ['denmark', 'danmark', ', dk', 'danish'],
        'SE': ['sweden', 'sverige', ', se', 'swedish'],
        'NO': ['norway', 'norge', ', no', 'norwegian'],
        'TR': ['turkey', 'türkiye', ', tr', 'turkish', 'istanbul', 'ankara'],
        'IN': ['india', ', in', 'indian', 'mumbai', 'delhi', 'bangalore'],
        'CN': ['china', ', cn', 'chinese', 'beijing', 'shanghai'],
        'JP': ['japan', ', jp', 'japanese', 'tokyo', 'osaka'],
        'KR': ['korea', 'south korea', ', kr', 'korean', 'seoul'],
        'SG': ['singapore', ', sg'],
        'AE': ['uae', 'emirates', 'dubai', 'abu dhabi', ', ae'],
        'SA': ['saudi arabia', 'saudi', ', sa', 'riyadh'],
        'ZA': ['south africa', ', za', 'south african', 'cape town', 'johannesburg'],
        'EG': ['egypt', ', eg', 'egyptian', 'cairo'],
        'BR': ['brazil', 'brasil', ', br', 'brazilian', 'são paulo', 'rio de janeiro'],
        'AR': ['argentina', ', ar', 'argentinian', 'buenos aires'],
        'CL': ['chile', ', cl', 'chilean', 'santiago'],
        'MX': ['mexico', 'méxico', ', mx', 'mexican', 'mexico city'],
        'RU': ['russia', 'russian', ', ru', 'moscow'],
        'NZ': ['new zealand', ', nz', 'zealand', 'auckland']
      };
      
      // Check for country matches
      for (const [countryCode, patterns] of Object.entries(countryPatterns)) {
        if (patterns.some(pattern => address.includes(pattern))) {
          detectedCountry = countryCode;
          confidence = 'medium';
          detection_method = 'address_parsing';
          break;
        }
      }
    }
    
    // Method 3: Use IP address (lower priority)
    if (!detectedCountry) {
      const clientIP = req.query.ip || getClientIP(req);
      detectedCountry = detectCountryFromIP(clientIP);
      if (detectedCountry) {
        confidence = 'medium';
        detection_method = 'ip_address';
      }
    }
    
    // Get localization settings
    const config = detectedCountry && REGION_CONFIG[detectedCountry] 
      ? { ...REGION_CONFIG[detectedCountry], country: detectedCountry }
      : { ...DEFAULT_CONFIG };
    
    // Global pricing conversion factors (relative to USD baseline)
    const pricingMultipliers = {
      // North America
      'US': 1.0,   'CA': 1.25,  'MX': 0.35,
      // Europe  
      'GB': 0.80,  'DE': 0.85,  'FR': 0.85,  'IT': 0.85,  'ES': 0.75,  'NL': 0.88,  'CH': 0.92,
      'DK': 0.90,  'SE': 0.95,  'NO': 0.92,  'RU': 0.25,
      // Asia-Pacific
      'AU': 1.45,  'NZ': 1.35,  'JP': 0.70,  'CN': 0.30,  'IN': 0.15,  'SG': 0.95,  'KR': 0.65,
      // Middle East & Turkey  
      'TR': 0.20,  'AE': 0.75,  'SA': 0.60,
      // Africa
      'ZA': 0.25,  'EG': 0.10,
      // South America
      'BR': 0.35,  'AR': 0.20,  'CL': 0.45
    };
    
    config.pricing_multiplier = pricingMultipliers[detectedCountry] || 1.0;
    
    console.log(`✅ Location detected: ${detectedCountry || 'UNKNOWN'} via ${detection_method}`);
    
    return res.json({
      ok: true,
      data: {
        detected_country: detectedCountry,
        confidence,
        detection_method,
        localization: config,
        client_ip: getClientIP(req),
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error detecting location:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to detect location',
      data: {
        localization: DEFAULT_CONFIG
      }
    });
  }
});

// Get supported regions
router.get('/regions', (req, res) => {
  try {
    const regions = Object.keys(REGION_CONFIG).map(countryCode => ({
      country_code: countryCode,
      ...REGION_CONFIG[countryCode],
      supported: true
    }));
    
    return res.json({
      ok: true,
      data: {
        supported_regions: regions,
        default_region: DEFAULT_CONFIG,
        total_regions: regions.length
      }
    });
  } catch (error) {
    console.error('Error fetching regions:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to fetch supported regions'
    });
  }
});

// Convert price between currencies/regions
router.post('/convert-price', async (req, res) => {
  try {
    const { amount, from_country, to_country } = req.body;
    
    if (!amount || !from_country || !to_country) {
      return res.status(400).json({
        ok: false,
        error: 'amount, from_country, and to_country are required'
      });
    }
    
    const fromConfig = REGION_CONFIG[from_country];
    const toConfig = REGION_CONFIG[to_country];
    
    if (!fromConfig || !toConfig) {
      return res.status(400).json({
        ok: false,
        error: 'Unsupported country code'
      });
    }
    
    // Global currency conversion multipliers (relative to USD)
    const multipliers = {
      // North America
      'US': 1.0, 'CA': 1.25, 'MX': 0.35,
      // Europe  
      'GB': 0.80, 'DE': 0.85, 'FR': 0.85, 'IT': 0.85, 'ES': 0.75, 'NL': 0.88, 'CH': 0.92,
      'DK': 0.90, 'SE': 0.95, 'NO': 0.92, 'RU': 0.25,
      // Asia-Pacific
      'AU': 1.45, 'NZ': 1.35, 'JP': 0.70, 'CN': 0.30, 'IN': 0.15, 'SG': 0.95, 'KR': 0.65,
      // Middle East & Turkey  
      'TR': 0.20, 'AE': 0.75, 'SA': 0.60,
      // Africa
      'ZA': 0.25, 'EG': 0.10,
      // South America
      'BR': 0.35, 'AR': 0.20, 'CL': 0.45
    };
    
    const fromMultiplier = multipliers[from_country] || 1.0;
    const toMultiplier = multipliers[to_country] || 1.0;
    
    // Convert to USD base, then to target currency
    const usdAmount = amount / fromMultiplier;
    const convertedAmount = usdAmount * toMultiplier;
    
    return res.json({
      ok: true,
      data: {
        original_amount: amount,
        converted_amount: Math.round(convertedAmount * 100) / 100,
        from_currency: fromConfig.currency,
        to_currency: toConfig.currency,
        from_symbol: fromConfig.currency_symbol,
        to_symbol: toConfig.currency_symbol,
        conversion_rate: toMultiplier / fromMultiplier
      }
    });
  } catch (error) {
    console.error('Error converting price:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to convert price'
    });
  }
});

// Get timezone for location
router.get('/timezone', async (req, res) => {
  try {
    const { lat, lng, country } = req.query;
    
    let timezone = 'UTC';
    let country_code = country;
    
    // If country provided, use its timezone
    if (country && REGION_CONFIG[country]) {
      timezone = REGION_CONFIG[country].time_zone;
    }
    // If coordinates provided, determine timezone (simplified)
    else if (lat && lng) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      
      // Simple timezone detection based on longitude
      const utcOffset = Math.round(longitude / 15);
      timezone = `UTC${utcOffset >= 0 ? '+' : ''}${utcOffset}`;
    }
    
    return res.json({
      ok: true,
      data: {
        timezone,
        country_code,
        current_time: new Date().toISOString(),
        utc_offset: timezone.includes('UTC') ? timezone : 'Unknown'
      }
    });
  } catch (error) {
    console.error('Error detecting timezone:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to detect timezone'
    });
  }
});

export default router;