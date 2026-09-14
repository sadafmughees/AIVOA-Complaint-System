from pathlib import Path

# backend folder
backend_folder = Path(__file__).resolve().parent

# .env file location
env_file = backend_folder / ".env"

# Ask for API key without displaying it on screen
import getpass

api_key = getpass.getpass("Enter your Groq API key: ")

env_content = f"""GROQ_API_KEY={api_key}
GROQ_MODEL=gemma2-9b-it
"""

env_file.write_text(env_content, encoding="utf-8")

print("\n.env file created successfully!")
print(f"Location: {env_file}")