from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://jrigney6993:1076993@school-cluster.oafpkhl.mongodb.net/?retryWrites=true&w=majority")
db = client["school-cluster"]

management = db["management"]
admins = db["admin"]
teachers = db["teachers"]


def create_admin(first_name, last_name, email, Id, password):
    admin = {
        "First_name": first_name,
        "Last_name": last_name,
        "Email": email,
        "Password": "",
        # (must incrypt the password)
        "ID": Id,
        "Profile_pic": "",
        "Bio": ""
    }
    admins.insert_one(admin)


def remove_admin(first_name, last_name, email, Id):
    admin = {
        "First_name": first_name,
        "Last_name": last_name,
        "Email": email,
        "ID": Id
    }

    admins.delete_one(admin)


def create_teacher(first_name, last_name, email, password):
    teacher = {
        "First_name": first_name,
        "Last_name": last_name,
        "Email": email,
        "ID": teachers.count_documents({}),
        "Password": password,
        # (must incrypt the password)
        "Profile_pic": "",
        "Bio": "",
        "Classes": {
            "Period_1": [],
            "Period_2": [],
            "Period_3": [],
            "Period_4": [],
        }
    }

    teachers.insert_one(teacher)


def remove_teacher(email, ID):
    teacher = {
        "Email": email,
        "ID": ID
    }

    teachers.delete_one(teacher)
