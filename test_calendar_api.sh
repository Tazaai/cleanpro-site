#!/bin/bash

echo "🗓️ Calendar API Test"
echo "===================="
echo "Backend URL: https://cleanpro-backend-2a5pka5baa-ew.a.run.app"
echo ""

echo "1️⃣ Testing Calendar API health..."
echo "URL: https://cleanpro-backend-2a5pka5baa-ew.a.run.app/api/calendar"
calendar_response=$(curl -s "https://cleanpro-backend-2a5pka5baa-ew.a.run.app/api/calendar")
echo "Response:"
echo "$calendar_response" | jq . 2>/dev/null || echo "$calendar_response"
echo ""

echo "2️⃣ Testing Config API capacity..."
echo "URL: https://cleanpro-backend-2a5pka5baa-ew.a.run.app/api/config/capacity"
config_response=$(curl -s "https://cleanpro-backend-2a5pka5baa-ew.a.run.app/api/config/capacity")
echo "Response:"
echo "$config_response" | jq . 2>/dev/null || echo "$config_response"
echo ""

echo "📋 Test Summary:"
if echo "$calendar_response" | jq -e '.ok == true' >/dev/null 2>&1; then
    echo "✅ Calendar API: Working"
else
    echo "❌ Calendar API: Failed or not available"
fi

if echo "$config_response" | jq -e '.ok == true' >/dev/null 2>&1; then
    echo "✅ Config API: Working"
else
    echo "❌ Config API: Failed or not available"
fi