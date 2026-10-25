#!/usr/bin/env bash
# Regenerate the private team-building brochure PDF from brochure/brochure.html.
# Needs Google Chrome or Chromium. Output: private/brochure/TMC-Team-Building-Brochure.pdf
set -euo pipefail
cd "$(dirname "$0")/.."
CHROME="${CHROME:-$(command -v google-chrome || command -v chromium || command -v chromium-browser)}"
"$CHROME" --headless=new --no-sandbox --disable-gpu --no-pdf-header-footer \
  --allow-file-access-from-files --virtual-time-budget=8000 \
  --print-to-pdf="private/brochure/TMC-Team-Building-Brochure.pdf" \
  "file://$PWD/brochure/brochure.html"
echo "Wrote private/brochure/TMC-Team-Building-Brochure.pdf"
