import os
from typing import Dict
from llama_index.core.settings import Settings
from llama_index.llms.together import TogetherLLM
from llama_index.core.embeddings import resolve_embed_model


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


def embedding_config_from_env() -> Dict:
    model = os.getenv("EMBEDDING_MODEL")
    dimension = os.getenv("EMBEDDING_DIM")

    config = {
        "model": model,
        "dimension": int(dimension) if dimension is not None else None,
    }
    return config


def init_settings():
    # llm_configs = llm_config_from_env()
    # embedding_configs = embedding_config_from_env()

    llm = TogetherLLM(
        model="mistralai/Mistral-7B-Instruct-v0.2",
        api_key=os.getenv("TOGETHER_API_KEY"),
    )
    embed_model = resolve_embed_model("local:BAAI/bge-small-en-v1.5")

    # Settings.llm = OpenAI(**llm_configs)
    # Settings.embed_model = OpenAIEmbedding(**embedding_configs)
    Settings.llm = llm
    Settings.embed_model = embed_model
    Settings.chunk_size = int(os.getenv("CHUNK_SIZE", "1024"))
    Settings.chunk_overlap = int(os.getenv("CHUNK_OVERLAP", "20"))
