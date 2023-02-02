import eel
import bcrypt
from pymongo import MongoClient
from py import student_management

# Connect to eel
eel.init("web")
    
# Connect to MongoDB
client = MongoClient("mongodb+srv://jrigney6993:1076993@school-cluster.oafpkhl.mongodb.net/?retryWrites=true&w=majority")
db = client["school-cluster"]
users = db["staff"]
school_data = db["school-data"]


@eel.expose
def register_user(username, password, admin):
    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    # Insert the new user into the database
    users.insert_one({
        "username": username,
        "password": hashed_password,
        "admin": admin,
        "classes": [
            {
                "subject": "test",
                "students": [],
                "class-grade": 100
            }
        ]
    })
    print("User registered successfully.")


@eel.expose
def delete_user(username):
    # Find the user in the database
    user = users.find_one({"username": username})
    if user:
        # Delete the user from the database
        users.delete_one({"username": username})
        return "User deleted successfully."

    else:
        return "User not found."


@eel.expose
def login(username, password):
    # Find the user in the database
    user = users.find_one({"username": username})
    # Compare the hashed password in the database with the provided password
    if user and bcrypt.checkpw(password.encode('utf-8'), user["password"]):
        return True
    else:
        return False


@eel.expose
def show_users():
    users_data = users.find()
    for user in users_data:
        print(user)


student_management.main()



# Start the index.html file / Brings user to the login page
eel.start("index.html", size=(740, 600), position=(600, 200))
