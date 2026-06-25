# LuckyTools Portfolio

Static portfolio and product site for LuckyTools, ready to deploy with GitHub Pages.

## Project Structure

```text
.
├── index.html              # Main landing page
├── about.html              # About page
├── contact.html            # Contact page
├── ecosystem.html          # Community/plugin ecosystem page
├── guide.html              # Usage guide
├── licenses.html           # License and privacy information
├── releases.html           # Updates and release notes
├── sw.js                   # Service worker cleanup file
├── assets/
│   ├── css/                # Site styles
│   ├── images/             # PNG/JPG visual assets
│   └── videos/             # MP4 demos and previews
├── tools/
│   └── maintenance/        # Old local maintenance scripts
├── legacy/                 # Archived older copy of the site
└── .github/workflows/      # GitHub Pages deployment workflow
```

## Deploy

Push this folder to the `main` branch of the GitHub repository. The included GitHub Actions workflow deploys the static site to GitHub Pages automatically.

## Notes

- Keep public pages in the project root so GitHub Pages URLs stay simple.
- Put new images in `assets/images/`.
- Put new videos in `assets/videos/`.
- Put shared styles in `assets/css/style.css`.
- The `legacy/` and `tools/` folders are kept for reference and are not required by the live pages.
