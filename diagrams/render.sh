#!/usr/bin/env bash
# Renders diagrams/*.mmd to src/img/diagrams/. Output is committed; the site
# and dev.to serve static images, so no Mermaid runtime ships to readers.
#   SVG for every diagram (used on codacon.ai)
#   PNG for English diagrams (dev.to: the syndication workflow swaps .svg -> .png)
# Requires Node and a Chromium; set PUPPETEER_EXECUTABLE_PATH if Puppeteer has
# not downloaded its own. Not a package.json dependency on purpose.
set -euo pipefail
cd "$(dirname "$0")"
MMDC="npx --yes @mermaid-js/mermaid-cli@11.4.2"
OUT=../src/img/diagrams
mkdir -p "$OUT"
for src in *.mmd; do
  name="${src%.mmd}"
  $MMDC -q -i "$src" -o "$OUT/$name.svg" -c mermaid.config.json -b white ${PUPPETEER_CONFIG:+-p "$PUPPETEER_CONFIG"}
  # Give the SVG an intrinsic size so <img> scales it like any other image.
  node -e '
    const fs = require("fs"), f = process.argv[1];
    let s = fs.readFileSync(f, "utf8");
    const [, , w, h] = s.match(/viewBox="([^"]+)"/)[1].split(" ").map(Number);
    s = s.replace(/<svg([^>]*?) width="100%"/, `<svg$1 width="${Math.ceil(w)}" height="${Math.ceil(h)}"`)
         .replace(/ style="max-width: [^"]*"/, "");
    fs.writeFileSync(f, s);
  ' "$OUT/$name.svg"
  case "$name" in
    *.en) $MMDC -q -i "$src" -o "$OUT/$name.png" -c mermaid.config.json -b white -s 2 ${PUPPETEER_CONFIG:+-p "$PUPPETEER_CONFIG"} ;;
  esac
done
