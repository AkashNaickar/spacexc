# Security Policy

## Scope

`spacexc` is a static website. It ships no server, no build step and no
environment variables, and it stores nothing server-side. The account page is a
client-side demo whose state lives in the browser's `localStorage`.

The realistic security surface is therefore limited to:

- Cross-site scripting through page content or the account form.
- A secret accidentally committed to the repository or its history.
- A vulnerable GitHub Actions dependency.

## Supported versions

Only the latest commit on `main` (and the current Vercel deployment) is
supported.

## Reporting a vulnerability

Please do **not** open a public issue for a security problem. Instead, use
GitHub's private reporting channel:

1. Open the **Security** tab of this repository.
2. Choose **Report a vulnerability** to start a private advisory.

Include what you found, where, and the steps to reproduce it. I will
acknowledge the report as soon as I can and follow up in the advisory thread.
There is no formal response SLA — this is a personal project maintained on a
best-effort basis.

Please do not include real credentials, personal data or destructive payloads in
a report.

## Out of scope

- The demo `localStorage` account state (it is intentionally client-side and
  non-authenticating).
- Third-party content linked from the footer or navigation placeholders.
