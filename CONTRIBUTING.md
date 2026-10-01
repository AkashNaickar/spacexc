# Contributing

Thanks for taking a look at `spacexc`. This is a small static site, so the
contribution process is intentionally lightweight.

## Getting set up

There is nothing to install and nothing to build.

```bash
git clone https://github.com/AkashNaickar/spacexc.git
cd spacexc
python -m http.server 8080
# open http://localhost:8080
```

## Before you open a pull request

Run the same checks CI runs:

```bash
node scripts/check-site.mjs
npx --yes html-validate@9 "*.html"
```

- `check-site.mjs` verifies per-page metadata, resolves every local `src`/`href`
  on disk, checks that every `<img>` has `alt` text and rejects duplicate `id`s.
- `html-validate` validates the HTML against its recommended ruleset.

Both must pass. If you add or move pages or assets, make sure the new
references resolve.

## Pull requests

- Branch from `main` using a short descriptive name (for example
  `fix/mobile-menu-focus`).
- Keep commits small, imperative and human-sounding (for example
  `fix broken logo link on mobile`). Do not use emoji-only or generic messages.
- Fill in the pull request template.
- Describe how you tested the change. Screenshots are welcome for visual
  changes.

## Style

- Match the existing formatting: two-space indentation, lowercase CSS
  properties, existing class naming.
- Keep the site dependency-free unless there is a strong reason not to.
- Do not commit secrets, tokens or credentials. If you think you have found one,
  see [`SECURITY.md`](SECURITY.md) instead of opening a public issue.

## Reporting bugs and requesting features

Open an issue using the provided templates. Be specific and include the browser
and steps to reproduce where relevant.

By participating you agree to follow the
[Code of Conduct](CODE_OF_CONDUCT.md).
