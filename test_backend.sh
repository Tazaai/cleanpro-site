#!/bin/bash
# ~/cleanpro-site/test_backend.sh

BASE_URL="https://cleanpro-backend-5539254765.europe-west1.run.app"
echo "Testing backend at: $BASE_URL"
echo

call() {
  local name=$1
  local method=$2
  local path=$3
  local data=$4

  echo "=== $name ==="
  if [ "$method" = "POST" ]; then
    curl -s -w " (HTTP %{http_code})\n" -X POST "$BASE_URL$path" \
      -H "Content-Type: application/json" -d "$data"
  else
    curl -s -w " (HTTP %{http_code})\n" "$BASE_URL$path"
  fi
  echo
}

# Tests
call "Health check" GET "/"
call "Services" GET "/api/services"
call "Pricing" GET "/api/pricing"
call "Calendar" GET "/api/calendar"
call "Maps distance" GET "/api/maps/distance?origin=Los+Angeles&destination=San+Diego"
call "Google Calendar" GET "/api/gcalendar"
call "Coordination Points" GET "/api/coordination_points"
