import os
import requests
import json
from llama_parse import LlamaParse
from llama_index.core import SimpleDirectoryReader
from llama_index.core.schema import Document

DATA_DIR = "data"  # directory containing the documents

BASE_URL = "https://wiki.stixor.com/"
HEADERS = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + os.getenv("OUTLINE_API_KEY", "API"),
}


def get_documents():
    documents = []
    collections = get_all_collections()
    for collection in collections:
        documents.append(
            Document(
                doc_id=collection["id"],
                text=collection["description"] or "",
                extra_info={
                    "title": collection["name"],
                    "url": BASE_URL + collection["url"],
                    "created_at": collection["createdAt"],
                    "type": "collection",
                },
            )
        )
        documents.extend(get_collection_documents(collection["id"]))
    return documents


def get_all_collections():
    collections_url = "api/collections.list"
    res = requests.post(BASE_URL + collections_url, headers=HEADERS)
    response_data = res.json()
    return response_data["data"]


def get_collection_documents(collection_id):
    documents_url = "api/collections.documents"
    data = {
        "id": collection_id,
    }
    res = requests.post(
        BASE_URL + documents_url, headers=HEADERS, data=json.dumps(data)
    )

    collection_docs = []
    for document in res.json()["data"]:
        collection_docs.extend(get_child_documents(document))

    return collection_docs


def get_child_documents(document):
    document_url = "api/documents.info"

    docs = []
    for child in document["children"]:
        docs.extend(get_child_documents(child))

    res = requests.post(
        BASE_URL + document_url,
        headers=HEADERS,
        data=json.dumps({"id": document["id"]}),
    )
    doc = res.json()["data"]
    docs.append(
        Document(
            text=doc["text"],
            doc_id=doc["id"],
            extra_info={
                "title": doc["title"],
                "url": BASE_URL + doc["url"],
                "created_at": doc["createdAt"],
                "created_by": doc["createdBy"]["name"],
                "type": "document",
                "collection_id": doc["collectionId"],
            },
        )
    )
    return docs
