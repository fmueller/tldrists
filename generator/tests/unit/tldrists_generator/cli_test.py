from typer.testing import CliRunner

from tldrists_generator.cli import app


def test_app_exposes_notae_subcommand(runner: CliRunner) -> None:
    result = runner.invoke(app, ["--help"])
    assert result.exit_code == 0
    assert "notae" in result.stdout
