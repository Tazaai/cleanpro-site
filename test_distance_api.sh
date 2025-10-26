#!/bin/bash

echo "🗺️ Distance API Test"
echo "===================="
echo "Backend URL: https://cleanpro-backend-2a5pka5baa-ew.a.run.app"
echo ""

echo "1️⃣ Testing Distance API nearest..."
echo "URL: https://cleanpro-backend-2a5pka5baa-ew.a.run.app/api/distance/nearest?address=515%20W%20Broadway%2C%20Glendale%2C%20CA%2091204%2C%20USA"
nearest_response=$(curl -s "https://cleanpro-backend-2a5pka5baa-ew.a.run.app/api/distance/nearest?address=515%20W%20Broadway%2C%20Glendale%2C%20CA%2091204%2C%20USA")
echo "Response:"
echo "$nearest_response" | jq . 2>/dev/null || echo "$nearest_response"
echo ""

echo "2️⃣ Testing Distance API coverage..."
echo "URL: https://cleanpro-backend-2a5pka5baa-ew.a.run.app/api/distance/coverage"
coverage_response=$(curl -s "https://cleanpro-backend-2a5pka5baa-ew.a.run.app/api/distance/coverage")
echo "Response:"
echo "$coverage_response" | jq . 2>/dev/null || echo "$coverage_response"
echo ""

echo "📋 Test Summary:"
if echo "$nearest_response" | jq -e '.ok == true' >/dev/null 2>&1; then
    echo "✅ Distance API nearest: Working"
else
    echo "❌ Distance API nearest: Failed"
    echo "Error details:"
    echo "$nearest_response" | jq -r '.error // "Unknown error"' 2>/dev/null || echo "Parse error"
fi

if echo "$coverage_response" | jq -e '.ok == true' >/dev/null 2>&1; then
    echo "✅ Distance API coverage: Working"
else
    echo "❌ Distance API coverage: Failed"
fi