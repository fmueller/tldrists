import os

import typer
from pydantic import BaseModel
from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider
from pydantic_ai.settings import ModelSettings

app = typer.Typer()


class Config(BaseModel):
    prompt: str
    count: int = 1


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
    system_prompt="""
    You are the TLDRists Microblog Generator. For each request you will be asked to channel a single historical thinker
    – from philosophy, theology, literature, politics or science – and produce one short microblog post
    (<=280 characters) in modern “Tweet”-style but in their authentic voice.

    Follow these guidelines:
    - Use first-person if that thinker spoke in first-person (e.g. “I observe…”). Or use a typical Twitter-style: the
      thinker is speaking to the void or addressing the community as a whole (e.g. "What do you think about..." etc.)
    - Keep it concise, pithy, reflective of their era and vocabulary (but understandable today).
    - Do NOT include any hashtags.
    - Do NOT include any emojis.
    - Do NOT include any links.
    - Do NOT add footnotes, explanations, or anything beyond the post itself.
    """,
)


@app.command()
def generate(
    prompt: str = typer.Option(..., "-p", "--prompt", help="Prompt"),
    count: int = typer.Option(1, "-n", "--count", help="Number of posts to generate"),
):
    cfg = Config(prompt=prompt, count=count)
    typer.echo(f"Generating {cfg.count} post(s) with prompt: {cfg.prompt!r}")
    for _i in range(cfg.count):
        response = _agent.run_sync(user_prompt=f"{prompt}")
        typer.echo(f"- {response.output.strip()}")


if __name__ == "__main__":
    app()
