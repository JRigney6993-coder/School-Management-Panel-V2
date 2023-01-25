import eel
import bcrypt
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb+srv://jrigney6993:1076993@school-cluster.oafpkhl.mongodb.net/?retryWrites=true&w=majority")
db = client["school-cluster"]
users = db["users"]

@eel.expose
def register_user(username, password):
    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    # Insert the new user into the database
    users.insert_one({
        "username": username,
        "password": hashed_password
    })
    print("User registered successfully.")

@eel.expose
def delete_user(username):
    # Find the user in the database
    user = users.find_one({"username": username})
    if user:
        # Delete the user from the database
        users.delete_one({"username": username})
        return True
    else:
        return False

@eel.expose
def login(username, password):
    # Find the user in the database
    user = users.find_one({"username": username})
    if user:
        # Compare the hashed password in the database with the provided password
        if bcrypt.checkpw(password.encode('utf-8'), user["password"]):
            return True
        else:
            return False