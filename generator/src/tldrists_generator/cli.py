import typer

from .commands import notae

app = typer.Typer(help="The microblogging generator for TLDRists")

app.add_typer(notae.app, name="notae")
