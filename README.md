# Subrat Mohanty — SRE Portfolio

Public portfolio for [Subrat Mohanty](https://www.linkedin.com/in/subratmohanty), built with React and Vite and deployed free through GitHub Pages.

## What this portfolio demonstrates

- AWS production ownership across multi-environment service platforms
- SLI/SLO reliability, incident response, RCA, runbooks, and MTTR improvement
- ML platform operations with SageMaker, Temporal, and AWS Batch
- CI/CD, secure container delivery, infrastructure automation, and cloud cost control
- Production AI tools for log analysis, incident-pattern retrieval, security gates, and database operations
- Sanitized RED, USE, delivery, ML-operations, and incident-intelligence dashboards

All dashboard values and architecture labels are deterministic, sanitized examples. This repository does not connect to employer systems or contain production credentials, customer data, internal hostnames, or proprietary code.

## Local development

Requirements: Node.js 22 and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:5173`.

## Quality checks

```bash
npm run lint
npm run build
npm run preview
```

The production build is generated in `dist/`.

## Free GitHub Pages deployment

The repository must be public and named:

```text
isubratmohanty.github.io
```

In GitHub:

1. Open **Settings → Pages**.
2. Set the deployment source to **GitHub Actions**.
3. Push to `main`.
4. Follow the **Deploy portfolio to GitHub Pages** workflow in the Actions tab.
5. Open `https://isubratmohanty.github.io`.

Every push to `main` runs lint, builds the Vite application, and deploys the generated `dist/` artifact. HTTPS is provided by GitHub Pages.

## Security and privacy

- Never add AWS credentials, API keys, tokens, private logs, customer data, or employer identifiers.
- Frontend environment variables are public after build and must not contain secrets.
- Keep all operational dashboard data sanitized and deterministic.
- Review resume and contact details before making the repository public.
