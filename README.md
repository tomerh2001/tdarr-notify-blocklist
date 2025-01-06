# Tdarr Notify Blocklist
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![XO code style](https://shields.io/badge/code_style-5ed9c7?logo=xo&labelColor=gray)](https://github.com/xojs/xo)
[![Snyk Security](../../actions/workflows/snyk-security.yml/badge.svg)](../../actions/workflows/snyk-security.yml)
[![CodeQL](../../actions/workflows/codeql.yml/badge.svg)](../../actions/workflows/codeql.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/tomerh2001/tdarr-notify-blocklist/badge)](https://securityscorecards.dev/viewer/?uri=github.com/tomerh2001/tdarr-notify-blocklist)

**Tdarr Notify Blocklist** is a lightweight automation tool that integrates **Tdarr** with **Sonarr** and **Radarr** to ensure your media library stays clean and healthy.

When a file fails a healthcheck in Tdarr, this tool automatically:

1. Notifies Sonarr/Radarr of the failed healthcheck.
2. Adds the problematic release to the blocklist to prevent re-downloads of the same release.
3. Deletes the faulty file from your library.
4. Initiates a new search in Sonarr/Radarr to download a replacement.
