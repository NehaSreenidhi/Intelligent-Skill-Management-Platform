from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["ISMPDB"]

intern_collection = db["interns"]
mentor_collection = db["mentors"]