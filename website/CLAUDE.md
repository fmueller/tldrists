# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See [AGENTS.md](../AGENTS.md) for complete repository guidelines.

## Commands

```bash
hugo server -D              # Dev server with drafts
hugo build --minify         # Production build
```

## Project Structure

```
content/
├── _index.md               # Home page
└── notae/
    ├── _index.md           # English
    └── _index.de.md        # German (language suffix pattern)

themes/tldrists/
├── layouts/
│   ├── baseof.html         # Base template
│   ├── home.html           # Homepage
│   ├── page.html           # Single pages
│   ├── section.html        # Section lists
│   ├── notae/
│   │   ├── list.html       # Notae listing
│   │   └── single.html     # Single nota
│   └── _partials/          # Reusable components
│       ├── head.html
│       ├── header.html
│       ├── footer.html
│       └── menu.html
└── assets/
    ├── css/
    └── js/

data/
└── notae.json              # Sample nota data structure
```

## Multilingual

- Default language: English (`en`)
- Secondary: German (`de`)
- Content files use language suffixes: `_index.de.md`, `about.de.md`
- Notae data supports: en, de, la, da, fr, grc

## Conventions

- Template filenames: lowercase
- New partials go in `_partials/`
- Icons via Hugo module: `github.com/hugomods/icons/vendors/lucide`

## CI Validation

- HTML5 validation on build output
- Lighthouse audits for both light and dark themes
