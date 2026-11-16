#!/bin/sh
set -eu

cd "$(dirname "$0")/../PhuongHoangDemo/GameAssets/game"
npm exec --yes --package=esbuild@0.28.2 -- esbuild palace-app.mjs \
  --bundle --format=iife --target=safari16 --charset=utf8 \
  --outfile=palace-ios.js
