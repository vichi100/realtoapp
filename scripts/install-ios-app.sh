#!/bin/bash

set -e

APP_NAME="realtoapp"
DIST_DIR="./dist"

echo "📁 Looking for built .app file in $DIST_DIR..."
APP_PATH=$(find $DIST_DIR -name "*.app" | head -n 1)

if [ -z "$APP_PATH" ]; then
  echo "❌ Could not find .app build. Please run 'npm run ios:build' first."
  exit 1
fi

echo "📱 Booting iPhone 16 Pro simulator (or using existing one)..."
xcrun simctl boot "iPhone 16 Pro" || true

echo "📦 Installing app..."
xcrun simctl install booted "$APP_PATH"
