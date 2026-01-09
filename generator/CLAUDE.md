# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See [AGENTS.md](../AGENTS.md) for complete repository guidelines.

## Commands

```bash
poetry install              # Install dependencies
poetry run ruff check .     # Lint
poetry run ruff format .    # Format
poetry run mypy             # Type check (strict mode)
poetry run pytest           # Run tests
poetry run pytest -v        # Verbose test output

# Run CLI (requires OLLAMA_URL and OLLAMA_MODEL env vars)
poetry run tldrists-gen notae generate -i <internal-dir> -p "<topic>" -n <count>
```

## Project Structure

```
src/tldrists_generator/
├── cli.py              # Typer app entry point
├── __main__.py         # Module execution support
└── commands/
    └── notae.py        # Notae generation command (Pydantic AI + Ollama)

tests/
├── conftest.py         # Shared fixtures (CliRunner)
└── unit/               # Tests mirror src/ structure
```

## Code Requirements

- **Python 3.12 only** (>=3.12,<3.13)
- **Strict MyPy** - All functions must have type annotations
- **Ruff lint rules**: E, F, UP, B, SIM, I (120-char lines, double quotes)
- Use **Pydantic models** for configuration objects
- Use **CliRunner** from Typer for CLI tests

## Testing

- Test files: `test_<module>.py`
- Test functions: `test_<behavior>`
- Each new command needs a help-screen test
- Mock external services (Ollama)

## Environment

```bash
export OLLAMA_URL="http://localhost:11434/v1"
export OLLAMA_MODEL="qwen3:1.7b"
```
