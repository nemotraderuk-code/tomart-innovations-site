# Tomart Innovations website

A premium, responsive, lightweight one-page website for `tomartinnovations.com`. It uses plain HTML, CSS and JavaScript, with no build step or runtime dependencies.

## Configure integrations

All launch-time placeholders are in **`site-config.js`**. Edit only that file to configure:

- `whatsapp.number` — international format, digits only (for example `447700900123`).
- `whatsapp.message` — the pre-filled WhatsApp message.
- `contactForm.endpoint` — a Formspree, Web3Forms, serverless function, or compatible form endpoint.
- `legal.privacy` and `legal.terms` — public URLs for your legal pages.
- `chatbot.enabled` and `chatbot.apiEndpoint` — reserved for a future secure chatbot backend.

Never put secret API keys in this repository or in `site-config.js`. A future AI integration should call a secure server-side endpoint, such as a Vercel Function, so credentials stay private.

Until configured, the WhatsApp button scrolls to the contact form and the form displays a safe preview-mode message instead of losing an enquiry.

## Files

- `index.html` — content, semantic page structure, metadata and structured data.
- `styles.css` — responsive design system, components, animations and accessibility preferences.
- `script.js` — navigation, reveal effects, form submission states and integration hooks.
- `site-config.js` — the single configuration point for external services.
- `favicon.svg` — site icon.
- `robots.txt` and `sitemap.xml` — search-engine discovery files.

## Deploy to Vercel

1. Push or upload this folder to the repository connected to your Vercel project.
2. Keep the Framework Preset set to **Other**.
3. Leave the Build Command empty and set the Output Directory to `.` if Vercel asks for one.
4. Deploy the latest commit. No dependency installation or build step is required.
5. Confirm `tomartinnovations.com` remains assigned under Project Settings → Domains.
6. Test the contact form and WhatsApp link with their production values.

Vercel serves these static files directly. Existing DNS settings do not need to change when redeploying the same project.

## Before launch

1. Configure every placeholder in `site-config.js`.
2. Confirm `hello@tomartinnovations.com` exists.
3. Publish privacy and terms pages before collecting personal information.
4. Add a social sharing image later and reference it with `og:image` and `twitter:image` metadata.
5. Replace concept projects with verified client work as the portfolio grows.
