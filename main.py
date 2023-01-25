import eel
# import json
# import bcrypt
  
eel.init("login")  
  
# @eel.expose    
# def register_user(username, password, job):
#     # Hash the password using bcrypt library
#     hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt(12))
#     # Create the user object with hashed password converted to hex
#     new_user = {"username": username, "password": hashed_password.hex(), "job": job}
    
#     with open("users.json", "a+") as json_file:
#         json_file.seek(0)
#         data = json.load(json_file) if json_file.read(1) else {"users": []}
#         for user in data["users"]:
#             if user["username"] == username:
#                 return "username already exists"
#         data["users"].append(new_user)
#         json_file.seek(0)
#         json.dump(data, json_file)

# @eel.expose
# def login(username, password):
#     with open("users.json", "r") as json_file:
#         data = json.load(json_file)
#     for user in data["users"]:
#         if user["username"] == username:
#             hashed_password_from_file = bytes.fromhex(user["password"])
#             if bcrypt.checkpw(password.encode(), hashed_password_from_file):
#                     return "yes"
#     return "no"

# register_user("jrigney6993","1076993","teacher")

# Start the index.html file
eel.start("index.html")