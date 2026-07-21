import numpy as np

from services.embedding_service import create_embedding
import services.faiss_service as faiss_service
from utils.mongodb import intern_collection


def search_interns(query, top_k=5):
    if faiss_service.index.ntotal == 0:
        return []

    query_text = f"Find interns skilled in {query}"
    query_vector = create_embedding(query_text)
    query_vector = np.array(
        [query_vector],
        dtype=np.float32
    )

    distances, indices = faiss_service.index.search(
        query_vector,
        min(top_k, faiss_service.index.ntotal)
    )

    results = []
    seen = set()

    for idx in indices[0]:
        if idx < 0:
            continue
        if idx >= len(faiss_service.interns_metadata):
            continue
        
        email, matched_skill = faiss_service.interns_metadata[idx]

        if email in seen:
            continue

        intern = intern_collection.find_one(
            {"email": email},
            {"_id": 0}
        )

        if intern:
            intern["matchedSkill"] = matched_skill
            results.append(intern)
            seen.add(email)

    return results