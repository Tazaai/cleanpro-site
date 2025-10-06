# 🧹 CleanPro Platform — Business Plan & Development Guide

## 🎯 Goal
Professional cleaning platform where clients can book services, see transparent pricing, and get dynamic discounts.  
**All business logic (pricing, discounts, distance, loyalty) is implemented in the backend for stability and easy management.**  
Frontend only handles booking forms and displaying price previews.

---

## 📌 Objectives
1. **Booking System**
   - Collect client info: name, address, contact.
   - Service selection (residential, deep, office, move-in/out).
   - HQ address → used for distance calculations.

2. **Dynamic Pricing**
   - Price per m² (sqft auto-converted).
   - Free travel up to 40 miles.
   - Dynamic fee per mile after 40 miles.
   - Max distance cap (default 120 miles).
   - Price preview breakdown: base price, distance fee, discounts, total.

3. **Discounts**
   - First booking = standard price.
   - Weekly discount if rebook < 7 days.
   - Monthly discount if rebook < 30 days.
   - Loyalty discount (e.g., 2.5%).
   - Discounts only apply after first booking.

4. **Admin Control (via AppSheet + Firestore)**
   - Non-tech admin can edit:
     - `pricePerM2`
     - `weeklyDiscount`, `monthlyDiscount`, `loyaltyDiscount`
     - `distanceFee`
     - `freeMiles` (default 40)
     - `maxDistance` (default 120)
   - Config stored in Firestore (`config/pricing`).

5. **Transparency**
   - Clients always see a preview:
     - Base cleaning price
     - Distance fee
     - Discounts
     - Final total

---

## 📊 Revenue Model
- One-time bookings → standard price.  
- Recurring bookings → loyalty pricing + discounts.  
- Premium upsell: deep cleaning, office packages, move-in/out.  

---

## 🚀 Roadmap
1. **Backend & Core Logic**
   - Express routes: `/api/services`, `/api/pricing`, `/api/quotes`, `/api/calendar`, `/api/maps`.
   - Firestore setup (`services`, `config/pricing`, `bookings`).
   - Dynamic pricing in `/api/quotes`.

2. **Booking System**
   - Frontend booking form (React).
   - Submit data to backend.
   - Price preview fetched from backend `/api/quotes`.

3. **Discounts & Loyalty**
   - Backend checks booking history in Firestore.
   - Applies weekly/monthly/loyalty discounts automatically.

4. **Admin App**
   - AppSheet manages pricing rules + distance caps.
   - Firestore as single source of truth.

5. **Scale & Polish**
   - Google Calendar sync.
   - Payments (Stripe/PayPal).
   - Marketing site.

---

## 📂 Firestore Data Model

**services**  
```json
{
  "id": "residential_cleaning",
  "pricePerM2": 1.8,
  "weeklyDiscount": 0.10,
  "monthlyDiscount": 0.05,
  "distanceFee": 0.5
}
