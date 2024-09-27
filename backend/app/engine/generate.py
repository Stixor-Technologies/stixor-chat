from dotenv import load_dotenv

load_dotenv()

import logging
from llama_index.core.indices import VectorStoreIndex
from llama_index.core.storage import StorageContext

import os
from app.engine.constants import PGVECTOR_SCHEMA, PGVECTOR_TABLE
from sqlalchemy import create_engine, text


from app.engine.loader import get_documents
from app.engine.utils import init_pg_vector_store_from_env
from urllib.parse import urlparse

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()


def embeddings_exist():
    # Get the original connection string from the environment variable
    original_conn_string = os.environ.get("PG_CONNECTION_STRING")
    if not original_conn_string:
        raise ValueError("PG_CONNECTION_STRING environment variable is not set.")

    # The PGVectorStore requires both two connection strings, one for psycopg2 and one for asyncpg
    # Update the configured scheme with the psycopg2 and asyncpg schemes
    original_scheme = urlparse(original_conn_string).scheme + "://"
    conn_string = original_conn_string.replace(
        original_scheme, "postgresql+psycopg2://"
    )

    engine = create_engine(conn_string)
    with engine.connect() as connection:
        # Check if the embeddings table exists in the specified schema
        table_exists_query = text(
            f"""
            SELECT EXISTS (
                SELECT 1 
                FROM information_schema.tables 
                WHERE table_schema = :schema_name 
                AND table_name = 'data_{PGVECTOR_TABLE}'
            )
        """
        )
        result = connection.execute(
            table_exists_query,
            {"schema_name": PGVECTOR_SCHEMA},
        )
        table_exists = result.scalar()
        print(f"Table exists: {table_exists}")
        if not table_exists:
            return False

        # Check if the embeddings table contains any data
        count_query = text(
            f"SELECT COUNT(*) FROM {PGVECTOR_SCHEMA}.data_{PGVECTOR_TABLE}"
        )
        result = connection.execute(count_query)
        row_count = result.scalar()
        return row_count > 0


def generate_datasource():
    logger.info("Creating new index")

    if embeddings_exist():
        logger.info("Embeddings already exist, skipping creation.")
        return

    # load the documents and create the index
    documents = get_documents()
    store = init_pg_vector_store_from_env()
    storage_context = StorageContext.from_defaults(vector_store=store)
    VectorStoreIndex.from_documents(
        documents,
        storage_context=storage_context,
        show_progress=True,  # this will show you a progress bar as the embeddings are created
    )
    logger.info(
        f"Successfully created embeddings in the PG vector store, schema={store.schema_name} table={store.table_name}"
    )
