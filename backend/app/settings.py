import os
from typing import Dict
from llama_index.core.settings import Settings
from llama_index.llms.together import TogetherLLM
from llama_index.core.embeddings import resolve_embed_model
from llama_index.llms.openai import OpenAI


def llm_config_from_env() -> Dict:
    from llama_index.core.constants import DEFAULT_TEMPERATURE

    model = os.getenv("MODEL")
    temperature = os.getenv("LLM_TEMPERATURE", DEFAULT_TEMPERATURE)
    max_tokens = os.getenv("LLM_MAX_TOKENS")

    config = {
        "model": model,
        "temperature": float(temperature),
        "max_tokens": int(max_tokens) if max_tokens is not None else None,
    }
    return config


def init_settings():
    use_open_ai = os.getenv("USE_OPENAI", False)
    llm_configs = llm_config_from_env()
    embed_model_name = os.getenv("EMBEDDING_MODEL")

    llm = None
    embed_model = None

    if use_open_ai is True:
        llm = OpenAI(**llm_configs)
        embed_model = resolve_embed_model("default")
    else:
        llm = TogetherLLM(
            llm_configs["model"],
            api_key=os.getenv("TOGETHER_API_KEY"),
        )
        embed_model = resolve_embed_model(embed_model_name)

    Settings.llm = llm
    Settings.embed_model = embed_model
    Settings.chunk_size = int(os.getenv("CHUNK_SIZE", "1024"))
    Settings.chunk_overlap = int(os.getenv("CHUNK_OVERLAP", "20"))
