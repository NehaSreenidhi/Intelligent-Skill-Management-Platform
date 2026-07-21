from sentence_transformers import SentenceTransformer

print("Loading embedding model...")
embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)
print("Embedding model loaded.")

def create_embedding(text: str):
    return embedding_model.encode(text)