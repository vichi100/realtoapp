# Maestro Setup Guide

This project already contains Maestro test flows under `.maestro/ios/`.
This file explains how to install the Maestro CLI, run tests locally, and add basic CI steps.

---

## 1) Install Maestro CLI (macOS)

Maestro provides prebuilt binaries and installers. The project uses Maestro YAML flows under `.maestro/ios`. Choose one of the installation methods below:

- Homebrew (recommended if you use Homebrew):

  ```bash
  brew install maestro
  ```

- Download binary from releases: visit the Maestro docs or GitHub releases and download the macOS binary, then add it to your `PATH`:

  ```bash
  # example — adjust path and filename after you download
  chmod +x ./maestro-darwin
  sudo mv ./maestro-darwin /usr/local/bin/maestro
  maestro --version
  ```

If you can't find a Homebrew formula, download the CLI from Maestro's official docs or GitHub releases.

## 2) Verify installation

```bash
maestro --version
# or
maestro help
```

## 3) Prepare the app and device

- iOS: build an `.app` or `.ipa` and install it on a simulator or device (or use the app from Xcode). Make sure the `appId` in your YAML matches the installed app's bundle id. Many existing flows use `appId: com.realtoapp.ios`.
- Android: build an `.apk` or `.aab` and install it on an emulator or device. Update YAML `appId` to the Android package name.

## 4) Run Maestro tests

Examples (project root):

- Run a single file:
```bash
maestro ios test --file .maestro/ios/login.yaml
```

- Run all tests in the folder:
```bash
maestro ios test --dir .maestro/ios
```

- For Android (if you have flows under `.maestro/android`):
```bash
maestro android test --file .maestro/android/login.yaml
```

Notes:
- Many flows in this repo accept environment variables via `env:` at the top of the YAML. Example: `MOBILE_NUMBER`.
- Use `clearState: true` in the `launchApp` step to force a fresh app state before flows that require clean login.

## 5) Common Troubleshooting

- If a test fails to find a control, check the visible text or accessibility labels used in the YAML and the app code (for RN, use `accessibilityLabel` / `testID`).
- If device/simulator cannot be found, confirm `xcrun simctl list` (iOS) or `adb devices` (Android) show a running target.
- If YAML references an `appId` that differs from the installed app, update the YAML to match the app under test.

## 6) Running in CI

Add a step to install the Maestro CLI in your CI environment (download binary or use Homebrew on macOS runners). Then run the same `maestro ios test --dir .maestro/ios` command as part of your job.

Example (GitHub Actions snippet for macOS runner — adjust to your runner and Maestro install):

```yaml
jobs:
  maestro:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Maestro
        run: |
          brew install maestro || true
          # or download the binary if brew formula isn't available
      - name: Run Maestro tests
        run: |
          maestro ios test --dir .maestro/ios
```

## 7) How this repo is already configured

- Many existing flows live in `.maestro/ios/` (login.yaml, check_tabs.yaml, etc.). You can open and edit those for your needs.
- Example test names: `.maestro/ios/login.yaml`, `.maestro/ios/navigation.yaml`, `.maestro/ios/search.yaml`.

---

If you want, I can:

- Attempt to install Maestro in this environment and run one of the existing flows (tell me which simulator/device to target), or
- Create a minimal starter YAML that demonstrates login and navigation (I already created a few example flows), or
- Add accessibility labels to components in `src/` to make element selection more robust (I can modify RN code to add `accessibilityLabel` or `testID`).

Tell me which of the above you'd like me to do next.
