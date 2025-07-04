#!/bin/bash

set -e

BUNDLE_ID="com.realtoapp.ios"

echo "🚀 Launching app in simulator..."
xcrun simctl launch booted "$BUNDLE_ID"

echo "🌐 Starting Metro in dev client mode..."
npx expo start --dev-client
