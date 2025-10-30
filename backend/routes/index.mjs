import express from 'express';

// Domain routers
import authRouter from './auth/index.mjs';
import paymentsRouter from './payments/index.mjs';
import analyticsRouter from './analytics/index.mjs';

// Legacy routes (to be organized later)
import adminApi from './admin_api.mjs';
import adminsheetApi from './adminsheet_api.mjs';
import aiMonitoringApi from './ai_monitoring_api.mjs';
import appsheetApi from './appsheet_api.mjs';
import bookingApi from './booking_api.mjs';
import bookingsApi from './bookings_api.mjs';
import calendarApi from './calendar_api.mjs';
import configApi from './config_api.mjs';
import coordinationPointsApi from './coordination_points_api.mjs';
import createBookingApi from './createBooking_api.mjs';
import distanceApi from './distance_api.mjs';
import emailApi from './email_api.mjs';
import gcalendarApi from './gcalendar_api.mjs';
import legalApi from './legal_api.mjs';
import mapsApi from './maps_api.mjs';
import notificationsApi from './notifications_api.mjs';
import pricingApi from './pricing_api.mjs';
import quotesApi from './quotes_api.mjs';
import servicesApi from './services_api.mjs';
import smartMatchingApi from './smart_matching_api.mjs';

const router = express.Router();

// Domain-organized routes
router.use('/auth', authRouter);
router.use('/payments', paymentsRouter);
router.use('/analytics', analyticsRouter);

// Legacy routes (maintain existing paths)
router.use('/admin', adminApi);
router.use('/adminsheet', adminsheetApi);
router.use('/ai-monitoring', aiMonitoringApi);
router.use('/appsheet', appsheetApi);
router.use('/booking', bookingApi);
router.use('/bookings', bookingsApi);
router.use('/calendar', calendarApi);
router.use('/config', configApi);
router.use('/coordination-points', coordinationPointsApi);
router.use('/create-booking', createBookingApi);
router.use('/distance', distanceApi);
router.use('/email', emailApi);
router.use('/gcalendar', gcalendarApi);
router.use('/legal', legalApi);
router.use('/maps', mapsApi);
router.use('/notifications', notificationsApi);
router.use('/pricing', pricingApi);
router.use('/quotes', quotesApi);
router.use('/services', servicesApi);
router.use('/smart-matching', smartMatchingApi);

export default router;