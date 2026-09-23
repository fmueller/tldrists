# Repository Guidelines

## Project Structure & Module Organization
- `generator/` hosts the Python 3.12 CLI that generates nota entries; source lives under `src/tldrists_generator`, and Typer command modules sit in `commands/`.
- Tests reside in `generator/tests`, split into `unit/` packages mirroring the module path; add shared fixtures to `conftest.py`.
- `website/` is the Hugo project: global config in `hugo.toml`, content under `content/`, theme overrides in `themes/tldrists/`, and static assets in `static/`.

## Build, Test, and Development Commands
- Prepare an orb or checkout: `mise run setup`.
- Install generator dependencies: `mise exec -- uv sync --directory generator --locked --dev`.
- Lint and format: `mise exec -- uv run --directory generator ruff check` and `mise exec -- uv run --directory generator ruff format`.
- Type-check: `mise exec -- uv run --directory generator mypy`.
- Run tests: `mise exec -- uv run --directory generator pytest`.
- Run the CLI: `mise exec -- uv run --directory generator tldrists-gen notae generate -i internal -p "Topic" -n 3`.
- Build the website: `cd website && hugo`; live preview with `hugo server -D`.

## Coding Style & Naming Conventions
- Python follows Ruff defaults with 120-character lines, spaces for indentation, and double-quoted strings; prefer Pydantic models for configuration objects.
- Package and module names use `snake_case`; Typer commands appear as lowercase subcommands.
- Hugo templates live in `layouts/` with consistent lowercase filenames; keep new partials under `_partials/`.

## Testing Guidelines
- Write pytest cases beside the feature in `generator/tests/unit/...`, naming files `test_<module>.py` and functions `test_<behavior>`.
- Use `CliRunner` for CLI assertions and mock external services; ensure each new command has a help-screen test.
- Run `mise run check` locally before pushing; add smoke tests or shortcode snapshots when changing Hugo output.

## Commit & Pull Request Guidelines
- Follow Conventional Commits as seen in history (`chore:`, `build(deps):`, `feat:`) and keep subject lines under 72 characters.
- Commit messages need a blank line and a descriptive body with lines no longer than 72 characters; automated attribution and agent authors are rejected.
- Squash noisy dependency updates; reference issues with `#id` where relevant.
- Pull requests should describe the change, list tests executed, and include screenshots or URLs for visible website updates.

## Agent & Environment Setup
- The nota generator uses Ollama-compatible OpenAI endpoints; export `OLLAMA_URL` and `OLLAMA_MODEL` before invoking the CLI.
- Keep secret keys out of commits; prefer `.env` files that stay Git-ignored.
