# 📊 Clean Departure AppSheet Integration Guide

## 🎯 Overview
Clean Departure now includes complete AppSheet integration, allowing non-technical admins to manage pricing, coordination points, and other business data through AppSheet's user-friendly interface while keeping the main application synchronized.

## 🔧 Setup Requirements

### Environment Variables
Add these to your Cloud Run deployment:

```bash
APPSHEET_API_KEY=your_appsheet_api_key_here
APPSHEET_APP_ID=your_appsheet_app_id_here
```

### AppSheet App Structure
Your AppSheet app should include these tables:

#### 1. CoordinationPoints Table
| Column | Type | Description |
|--------|------|-------------|
| ID | Text | Unique identifier |
| Name | Text | Coordination point name |
| Address | Text | Full address |
| Contact | Text | Contact person name |
| Phone | Phone | Contact phone number |
| Email | Email | Contact email |
| Active | Yes/No | Whether point is active |
| Latitude | Number | GPS latitude (optional) |
| Longitude | Number | GPS longitude (optional) |

#### 2. Pricing Table
| Column | Type | Description |
|--------|------|-------------|
| ServiceID | Text | Service identifier (e.g., "standard_cleaning") |
| PricePerM2 | Decimal | Base rate per square foot |
| WeeklyDiscount | Decimal | Weekly frequency discount (0.15 = 15%) |
| MonthlyDiscount | Decimal | Monthly frequency discount (0.08 = 8%) |
| DistanceFee | Decimal | Price per mile over free limit ($1.50) |
| FreeDistance | Number | Free distance limit in miles (40) |

#### 3. Bookings Table (Optional)
| Column | Type | Description |
|--------|------|-------------|
| BookingID | Text | Unique booking identifier |
| CustomerName | Text | Customer full name |
| CustomerEmail | Email | Customer email |
| CustomerPhone | Phone | Customer phone |
| Service | Enum | Service type |
| SquareMeters | Number | Area in square feet |
| Frequency | Enum | Booking frequency |
| Date | Date | Scheduled date |
| TimeSlot | Enum | Morning/Afternoon |
| Address | LongText | Service address |
| NearestHQ | Text | Assigned coordination point |
| TotalPrice | Price | Total booking cost |
| Status | Enum | Booking status |
| CreatedAt | DateTime | Creation timestamp |
| SpecialInstructions | LongText | Additional notes |

## 🚀 API Endpoints

### Synchronization Endpoints

#### Sync Coordination Points
```http
POST /api/appsheet/sync/coordination-points
Authorization: Bearer <admin_jwt_token>
```

**Response:**
```json
{
  "ok": true,
  "message": "Coordination points synced successfully",
  "synced": 5
}
```

#### Sync Pricing Data
```http
POST /api/appsheet/sync/pricing
Authorization: Bearer <admin_jwt_token>
```

**Response:**
```json
{
  "ok": true,
  "message": "Pricing synced successfully",
  "synced": 4
}
```

#### Sync All Data
```http
POST /api/appsheet/sync/all
Authorization: Bearer <admin_jwt_token>
```

**Response:**
```json
{
  "ok": true,
  "message": "AppSheet sync completed",
  "results": {
    "coordinationPoints": {
      "synced": 5,
      "error": null
    },
    "pricing": {
      "synced": 4,
      "error": null
    }
  }
}
```

### Data Push Endpoints

#### Push Booking to AppSheet
```http
POST /api/appsheet/push/booking/{bookingId}
Authorization: Bearer <admin_jwt_token>
```

**Response:**
```json
{
  "ok": true,
  "message": "Booking pushed to AppSheet successfully"
}
```

### Configuration Endpoints

#### Check Configuration
```http
GET /api/appsheet/config
Authorization: Bearer <admin_jwt_token>
```

**Response:**
```json
{
  "ok": true,
  "config": {
    "configured": true,
    "apiKeyPresent": true,
    "appIdPresent": true,
    "baseUrl": "https://api.appsheet.com/api/v2/apps"
  }
}
```

#### Test Connection
```http
POST /api/appsheet/test
Authorization: Bearer <admin_jwt_token>
```

**Response:**
```json
{
  "ok": true,
  "message": "AppSheet connection successful",
  "recordCount": 5
}
```

## 🎛️ Admin Dashboard Integration

### AppSheet Tab Features

#### 📋 Configuration Status
- Visual indicator showing whether AppSheet is properly configured
- Clear error messages if API key or App ID is missing
- Connection status with real-time testing

#### 🔄 Sync Controls
1. **Test Connection** - Verify AppSheet API connectivity
2. **Sync Coordination Points** - Pull latest coordination points from AppSheet
3. **Sync Pricing** - Pull latest pricing data from AppSheet
4. **Sync All Data** - Complete synchronization of all supported data

#### 📊 Sync Results
- Success/failure notifications for each sync operation
- Record counts and detailed error messages
- Automatic dashboard refresh after successful sync

### Admin Dashboard Navigation
```
Admin Dashboard → 📊 AppSheet Tab
```

## 🔄 Synchronization Workflow

### From AppSheet to Clean Departure

1. **Admin updates data in AppSheet**
   - Edit pricing in user-friendly AppSheet interface
   - Add/modify coordination points
   - Update service configurations

2. **Admin triggers sync in Clean Departure**
   - Login to Clean Departure admin dashboard
   - Navigate to AppSheet tab
   - Click appropriate sync button

3. **Data flows to Clean Departure**
   - API calls AppSheet to fetch latest data
   - Validates and transforms data format
   - Updates Firestore collections
   - Provides sync confirmation

### Data Mapping

#### Coordination Points Mapping
```javascript
AppSheet → Firestore
{
  "ID" → document ID,
  "Name" → name,
  "Address" → address,
  "Contact" → contact,
  "Phone" → phone,
  "Email" → email,
  "Active" → active,
  "Latitude" → latitude,
  "Longitude" → longitude
}
```

#### Pricing Data Mapping
```javascript
AppSheet → Firestore
{
  "ServiceID" → document ID,
  "PricePerM2" → pricePerM2,
  "WeeklyDiscount" → weeklyDiscount,
  "MonthlyDiscount" → monthlyDiscount,
  "DistanceFee" → distanceFeePerMile,
  "FreeDistance" → freeDistanceLimit
}
```

## 🛡️ Security & Permissions

### Authentication Requirements
- All AppSheet endpoints require admin authentication
- JWT token with admin role required
- API key and App ID stored as environment variables

### Data Validation
- Input validation for all synchronized data
- Type checking and format verification
- Error handling with descriptive messages

### Error Handling
- Connection timeout handling
- Invalid data format detection
- Partial sync failure recovery

## 📱 Usage Examples

### Daily Admin Workflow

1. **Morning Setup**
   ```bash
   # Admin logs into Clean Departure
   # Navigates to Admin Dashboard → AppSheet tab
   # Clicks "Test Connection" to verify connectivity
   ```

2. **Update Pricing**
   ```bash
   # Admin opens AppSheet app
   # Updates pricing for specific services
   # Returns to Clean Departure
   # Clicks "Sync Pricing" button
   # Confirms sync success notification
   ```

3. **Add New Coordination Point**
   ```bash
   # Admin adds new location in AppSheet
   # Includes all required fields (name, address, contact info)
   # Returns to Clean Departure
   # Clicks "Sync Coordination Points"
   # Verifies new point appears in booking system
   ```

### Troubleshooting

#### Common Issues

**"AppSheet Not Configured" Error**
- Check environment variables are set correctly
- Verify `APPSHEET_API_KEY` and `APPSHEET_APP_ID` values
- Restart Cloud Run service after adding environment variables

**"Connection Failed" Error**
- Test internet connectivity
- Verify AppSheet API key is valid and active
- Check AppSheet App ID is correct
- Ensure AppSheet app has required tables

**"Sync Failed" Partial Errors**
- Check AppSheet table structure matches expected format
- Verify required columns exist and have correct data types
- Review sync results for specific error messages

#### Debug Steps

1. **Check Configuration**
   ```bash
   GET /api/appsheet/config
   # Verify all required settings are present
   ```

2. **Test Connection**
   ```bash
   POST /api/appsheet/test
   # Confirms API connectivity and basic functionality
   ```

3. **Review Logs**
   ```bash
   # Check Cloud Run logs for detailed error messages
   # Look for AppSheet API response codes and error details
   ```

## 🎉 Benefits

### For Business Users
- ✅ **User-Friendly Interface**: Manage data through familiar AppSheet interface
- ✅ **No Technical Knowledge Required**: Update pricing and locations without coding
- ✅ **Mobile Access**: Use AppSheet mobile app for on-the-go updates
- ✅ **Collaboration**: Multiple admins can work together in AppSheet

### For Developers
- ✅ **Separation of Concerns**: Business logic separate from technical implementation
- ✅ **Real-time Sync**: Data stays current with manual sync triggers
- ✅ **Error Handling**: Robust error detection and reporting
- ✅ **Scalability**: Easy to add new data types and sync operations

### For Customers
- ✅ **Accurate Pricing**: Always up-to-date pricing from AppSheet
- ✅ **Current Locations**: Latest coordination points and service areas
- ✅ **Reliable Service**: Consistent data across all platforms

---

## 🚀 **Live Implementation**

### URLs
- **Frontend**: https://cleanpro-frontend-5539254765.europe-west1.run.app
- **Backend**: https://cleanpro-backend-5539254765.europe-west1.run.app
- **Admin Dashboard**: Login → Admin Dashboard → 📊 AppSheet Tab

### Status
✅ **Fully Implemented and Deployed**  
✅ **Ready for AppSheet Configuration**  
✅ **Complete Admin Interface Available**

The AppSheet integration is now **live and ready to use**! Simply configure your AppSheet API credentials and start managing your business data through the user-friendly AppSheet interface while keeping Clean Departure automatically synchronized.