from flask import Flask, request, jsonify

from services.faiss_service import populate_faiss
from services.search_service import search_interns

app = Flask(__name__)

populate_faiss()

@app.route("/")
def home():
    return "SkillManager AI Service Running"

@app.route("/search", methods=["POST"])
def search():

    data = request.get_json()
    query = data.get("query", "")
    results = search_interns(query)
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True, port=5001)