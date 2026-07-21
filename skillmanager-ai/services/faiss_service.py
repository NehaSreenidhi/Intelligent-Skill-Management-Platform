import faiss
import numpy as np

from utils.mongodb import intern_collection
from services.embedding_service import create_embedding

DIMENSION = 384
index = faiss.IndexFlatL2(DIMENSION)
interns_metadata = []

def populate_faiss():

    global interns_metadata

    interns_metadata = []

    index.reset()

    embeddings = []

    interns = intern_collection.find()

    for intern in interns:

        email = intern.get("email","")

        skills = intern.get("skills",[])

        for skill in skills:

            skill_name = skill.get("skillName","").strip()
            skill_level = skill.get("skillLevel","").strip()

            if not skill_name:
                continue

            text = f"{skill_name} at {skill_level} level"

            vector = create_embedding(text)

            embeddings.append(vector)

            interns_metadata.append((email, skill_name))

    if len(embeddings) > 0:

        embeddings = np.array(
            embeddings,
            dtype=np.float32
        )

        index.add(embeddings)

    print("Indexed", index.ntotal, "skills.")