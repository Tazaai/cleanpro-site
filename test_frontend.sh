#!/bin/bash
# ~/cleanpro-site/test_frontend.sh

FRONTEND_URL="https://cleanpro-frontend-5539254765.europe-west1.run.app"
echo "Testing frontend at: $FRONTEND_URL"
echo

call() {
  local name=$1
  local url=$2
  echo "=== $name ==="
  code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  echo "$url → (HTTP $code)"
  echo
}

# 1. Root routes check
for path in "/" "/booking" "/contact" "/about"; do
  call "Route $path" "$FRONTEND_URL$path"
done

# 2. Auto-detect assets from HTML
echo "=== Assets (auto-detected) ==="
ASSETS=$(curl -s $FRONTEND_URL | grep -Eo 'assets/[a-z0-9.-]+\.(js|css)' | sort -u)
for file in $ASSETS; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL/$file")
  echo "$file → (HTTP $code)"
done
echo

# 3. Crawl homepage links
echo "=== Broken links check (homepage only) ==="
LINKS=$(curl -s $FRONTEND_URL | grep -Eo 'href="[^"]+"' | cut -d '"' -f2 | grep '^/' | sort -u)
for link in $LINKS; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL$link")
  echo "$FRONTEND_URL$link → (HTTP $code)"
done
echo

# 4. Print API base in HTML
echo "=== API base check ==="
curl -s $FRONTEND_URL | grep -o "https://cleanpro-backend-5539254765.europe-west1.run.app" | head -n 1
echo

# 5. Print first 20 lines of homepage HTML
echo "=== Homepage snippet ==="
curl -s $FRONTEND_URL | head -n 20
echo

# 6. Console errors/warnings via Puppeteer
echo "=== Browser console errors/warnings ==="
node <<'EOF'
import puppeteer from 'puppeteer';

const url = process.env.FRONTEND_URL || "https://cleanpro-frontend-5539254765.europe-west1.run.app";

const run = async () => {
  const browser = await puppeteer.launch({headless: "new", args: ["--no-sandbox"]});
  const page = await browser.newPage();

  page.on("console", msg => {
    if (["error", "warning"].includes(msg.type()))
      console.log(`[${msg.type()}] ${msg.text()}`);
  });

  await page.goto(url, {waitUntil: "networkidle2", timeout: 60000});
  await new Promise(r => setTimeout(r, 5000));

  await browser.close();
};
run();
EOF
