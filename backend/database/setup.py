from pymongo import MongoClient
import bcrypt

client = MongoClient("mongodb://localhost:27017/")
db = client["resume_analyzer"]
users_collection = db["users"]

username = "admin"
password = "admin123"

hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

users_collection.insert_one({"username": username, "password": hashed_password})

print("Admin user created!")
