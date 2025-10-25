# Campaign Discount System

## Overview
The Clean Departure platform now supports flexible campaign discounts (10-50%) that admins can configure and manage through AppSheet integration. This allows for promotional pricing that can be activated/deactivated as needed.

## Features

### Campaign Discount Fields
- **Campaign Discount %**: Percentage discount (0-50%)
- **Campaign Active**: Boolean to enable/disable the campaign
- **Campaign Description**: Marketing message displayed to customers
- **Campaign Start Date**: When the campaign begins (optional)
- **Campaign End Date**: When the campaign expires (optional)

### Pricing Structure (Square Feet)
- **Base Rate**: Price per square foot (converted from m² to sq ft)
- **Frequency Discounts**: Weekly/Monthly recurring discounts
- **Campaign Discounts**: Promotional discounts on top of frequency discounts
- **Distance Fees**: Additional charges for service areas beyond 40 miles

## AppSheet Integration

### Required AppSheet Table: "Pricing"
```
service_id (Text) - Service identifier
price_per_sqft (Number) - Base rate per square foot
weekly_discount (Number) - Weekly frequency discount %
monthly_discount (Number) - Monthly frequency discount %
distance_fee (Number) - Fee per mile beyond free limit
free_distance (Number) - Free distance limit in miles
campaign_discount (Number) - Campaign discount % (0-50)
campaign_active (Yes/No) - Whether campaign is active
campaign_description (Text) - Marketing message
campaign_start (Date) - Campaign start date
campaign_end (Date) - Campaign end date
```

### Example Pricing Data
```
Service: residential_cleaning
Price per sq ft: $0.17
Weekly discount: 10%
Monthly discount: 5%
Campaign discount: 25%
Campaign active: Yes
Campaign description: "Spring Cleaning Special - 25% Off!"
```

## Admin Management

### AppSheet Dashboard
Admins can use AppSheet to:
1. **Set Campaign Discounts**: Configure promotional percentages
2. **Activate/Deactivate**: Toggle campaigns on/off instantly
3. **Schedule Campaigns**: Set start and end dates
4. **Update Descriptions**: Change marketing messages
5. **Sync to Website**: Push changes to live pricing

### Clean Departure Admin Panel
- **AppSheet Tab**: Sync pricing and campaign data
- **Real-time Updates**: Changes appear immediately after sync
- **Booking Preview**: Customers see campaign discounts in pricing breakdown

## Customer Experience

### Booking Form Pricing Display
```
Base rate (1,500 sq ft × $0.17/sq ft): $255.00
🎁 Weekly discount (10%): -$25.50
🎯 Campaign Discount (25%): -$57.38
Distance fee (FREE up to 40 miles): $0.00
Total Price: $172.12
```

### Campaign Discount Visibility
- Prominent red highlighting for campaign discounts
- Campaign description shown below discount
- Stacks with frequency discounts for maximum savings

## Business Benefits

### Flexibility
- **Seasonal Promotions**: Spring cleaning, holiday specials
- **Competitive Response**: Quick price adjustments
- **Customer Acquisition**: Attractive introductory offers
- **Revenue Management**: Dynamic pricing strategies

### Control
- **Instant Activation**: Enable campaigns immediately
- **Targeted Services**: Different discounts per service type
- **Time-Limited Offers**: Automatic expiration dates
- **Marketing Integration**: Coordinated with advertising campaigns

## Implementation Details

### API Endpoints
- `GET /api/pricing/calculate/:serviceId` - Includes campaign discounts
- `POST /api/appsheet/sync/pricing` - Syncs campaign data from AppSheet
- `GET /api/pricing/` - Lists all pricing with campaign info

### Database Fields (Firestore)
```javascript
{
  pricePerSqFt: 0.17,
  weeklyDiscount: 10,
  monthlyDiscount: 5,
  campaignDiscount: 25,
  campaignDiscountActive: true,
  campaignDescription: "Spring Cleaning Special - 25% Off!",
  campaignStartDate: "2025-03-01",
  campaignEndDate: "2025-03-31"
}
```

## Unit Conversion (m² to sq ft)
- **Previous**: Pricing per square meter (m²)
- **Current**: Pricing per square foot (sq ft)
- **Conversion**: 1 m² ≈ 10.764 sq ft
- **Example**: $1.80/m² → $0.17/sq ft

## Best Practices

### Campaign Strategy
1. **Test Small**: Start with 10-15% discounts
2. **Monitor Impact**: Track booking conversion rates
3. **Time-Limited**: Create urgency with end dates
4. **Clear Messaging**: Explain the value proposition
5. **Stack Smartly**: Combine with frequency discounts

### Technical Management
1. **Regular Syncs**: Update pricing data frequently
2. **Monitor Performance**: Check API response times
3. **Backup Pricing**: Keep default values in code
4. **Error Handling**: Graceful fallbacks if AppSheet unavailable

## Troubleshooting

### Common Issues
- **Campaign Not Showing**: Check `campaignDiscountActive` field
- **Wrong Pricing**: Verify AppSheet table field names
- **Sync Failures**: Test AppSheet API connection
- **Old Pricing**: Clear browser cache after updates

### Testing Campaign Discounts
1. Set up test campaign in AppSheet
2. Sync data through admin panel
3. Create test booking to verify pricing
4. Check email notifications include correct amounts
5. Deactivate test campaign when done