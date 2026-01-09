# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See [AGENTS.md](AGENTS.md) for complete repository guidelines.

## Project Overview

TLDRists is a philosophical microblogging platform with two main components:
- **generator/** - Python 3.12 CLI tool for generating philosophical quotations ("notae") using AI
- **website/** - Hugo static site displaying content with multilingual support (en, de, la, da, fr, grc)

## Build & Development Commands

### Generator (Python)

```bash
cd generator
poetry install                    # Install dependencies
poetry run ruff check .           # Lint
poetry run ruff format .          # Format
poetry run mypy                   # Type check
poetry run pytest                 # Run tests
poetry run pytest -v              # Verbose test output

# Run CLI (requires OLLAMA_URL and OLLAMA_MODEL env vars)
poetry run tldrists-gen notae generate -i internal -p "Topic" -n 3
```

### Website (Hugo)

```bash
cd website
hugo server -D                    # Dev server with drafts
hugo build --minify               # Production build
```

## Architecture

### Generator Structure
- `src/tldrists_generator/cli.py` - Main Typer CLI entry point
- `src/tldrists_generator/commands/notae.py` - Notae generation with Pydantic AI + Ollama
- `tests/unit/` - Pytest tests mirroring module structure; use `CliRunner` for CLI tests
- `tests/conftest.py` - Shared pytest fixtures

### Website Structure
- `hugo.toml` - Site config with multilingual setup
- `content/notae/` - Content files with language suffixes (e.g., `_index.de.md`)
- `themes/tldrists/layouts/` - Custom theme templates
- `themes/tldrists/assets/` - CSS/JS assets
- `data/notae.json` - Sample nota data structure

## Code Style

- Python: Ruff defaults, 120-char lines, double quotes, snake_case
- Use Pydantic models for configuration objects
- Hugo templates: lowercase filenames, partials in `_partials/`
- Test files named `test_<module>.py`, functions `test_<behavior>`

## Commit Style

Follow Conventional Commits: `feat:`, `fix:`, `chore:`, `build(deps):` with subject lines under 72 characters.

## Environment Variables

```bash
export OLLAMA_URL="http://localhost:11434/v1"
export OLLAMA_MODEL="qwen3:1.7b"
```

## CI/CD

- Generator workflow: Ruff lint, MyPy type check, pytest tests
- Website workflow: Hugo build, HTML5 validation, Lighthouse audits (light/dark themes)
- CI fetches internal prompts from `fmueller/tldrists-internal` repo
