import os
from pathlib import Path

import typer
import yaml
from pydantic import BaseModel
from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider
from pydantic_ai.settings import ModelSettings

app = typer.Typer()


class Config(BaseModel):
    prompt: str
    count: int = 1


@app.command()
def generate(
    internal_directory: str = typer.Option(..., "-i", "--internal-directory", help="Internal directory"),
    prompt: str = typer.Option(..., "-p", "--prompt", help="Prompt"),
    count: int = typer.Option(1, "-n", "--count", help="Number of posts to generate"),
) -> None:
    yaml_path = Path(internal_directory) / "agents" / "nota-generator.yaml"

    try:
        with open(yaml_path, encoding="utf-8") as file:
            config_data = yaml.safe_load(file)
            system_prompt = config_data.get("system-prompt", "")
    except FileNotFoundError:
        typer.echo(f"Error: Configuration file not found at {yaml_path}", err=True)
        raise typer.Exit(1) from None
    except yaml.YAMLError as e:
        typer.echo(f"Error: Failed to parse YAML file: {e}", err=True)
        raise typer.Exit(1) from None
    except Exception as e:
        typer.echo(f"Error: Failed to read configuration file: {e}", err=True)
        raise typer.Exit(1) from None

    if not system_prompt:
        typer.echo("Error: 'system_prompt' field not found or empty in configuration file", err=True)
        raise typer.Exit(1) from None

    _agent = Agent(
        OpenAIModel(
            model_name=os.getenv("OLLAMA_MODEL") or "qwen3:1.7b",
            provider=OpenAIProvider(base_url=os.getenv("OLLAMA_URL") or "http://localhost:11434/v1", api_key="ollama"),
        ),
        model_settings=ModelSettings(
            max_tokens=512,
            temperature=0.7,
            top_p=0.9,
        ),
        system_prompt=system_prompt,
    )

    cfg = Config(prompt=prompt, count=count)
    typer.echo(f"Generating {cfg.count} post(s) with prompt: {cfg.prompt!r}")
    for _i in range(cfg.count):
        response = _agent.run_sync(user_prompt=f"{prompt}")
        typer.echo(f"- {response.output.strip()}")


if __name__ == "__main__":
    app()
