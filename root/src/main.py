import bcrypt
import eel
from pymongo import MongoClient

eel.init("root/public")

# Connects to database/cluster
client = MongoClient(
    "mongodb+srv://jrigney6993:1076993@school-cluster.oafpkhl.mongodb.net/?retryWrites=true&w=majority")
db = client["school-cluster"]

students = db["students"]
teachers = db["teachers"]
admins = db["admins"]
management = db["management"]
events = db["events"]
reports = db["reports"]

#######################
# Universal Functions #
#######################


def bcrypt_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

# --------------------------------------------------------------------------------


def event_ids_rewrite(collection):
    _collection = collection.find()
    for i, document in enumerate(_collection):
        collection.update_one({'_id': document['_id']}, {'$set': {'ID': i}})

# --------------------------------------------------------------------------------


@eel.expose
def get_document_num(collection):
    _collection = db[collection]
    return _collection.count_documents({})

# --------------------------------------------------------------------------------


@eel.expose
def load_document(collection):
    _collection = db[collection]
    return list(_collection.find({}))

# --------------------------------------------------------------------------------


@eel.expose
def remove_document(collection, id, email=None):
    _collection = db[collection]
    if email is None:
        _collection.delete_one({"ID": id})
    else:
        _collection.delete_one({"Email": email, "ID": id})
    event_ids_rewrite(_collection)

# --------------------------------------------------------------------------------


@eel.expose
def update_document(collection, query, update):
    collection = db[collection]
    collection.update_one(query, update)

# --------------------------------------------------------------------------------


@eel.expose
def add_attendees(event_id, student_id):
    if event_id <= events.count_documents({}):
        students.update_one({"ID": student_id}, {"$inc": {"Points": 1}})
        events.update_one({"ID": event_id}, {
                          "$push": {"Attendees": student_id}})
    else:
        return False


#########
# Login #
#########


@eel.expose
def login(email, password):
    user = teachers.find_one({"Email": email}) or admins.find_one(
        {"Email": email}) or management.find_one({"Email": email})

    if user and bcrypt.checkpw(password.encode('utf-8'), user["Password"]):
        return user["Password"].decode()
    else:
        return False

############
# Creation #
############


@eel.expose
def add_student(full_name, email):
    full_name = full_name.split(" ")
    student = {
        "First_Name": full_name[0],
        "Last_Name": full_name[1],
        "Email": email,
        "ID": students.count_documents({}),
        "Points": 0,
        "Absences": 0,
        "Referrals": [],
        "Prizes": [],
        "Grades": {
            "Period_1": 100,
            "Period_2": 100,
            "Period_3": 100,
            "Period_4": 100
        }
    }
    students.insert_one(student)

# --------------------------------------------------------------------------------


@eel.expose
def create_teacher(first_name, last_name, email, password):
    teacher = {
        "First_name": first_name,
        "Last_name": last_name,
        "Email": email,
        "ID": teachers.count_documents({}),
        "Breaks": 0,
        "Password": bcrypt_password(password),
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

# --------------------------------------------------------------------------------


@eel.expose
def create_admin(first_name, last_name, email, password):
    admin = {
        "First_name": first_name,
        "Last_name": last_name,
        "Email": email,
        "Password": bcrypt_password(password),
        "ID": admins.count_documents({}),
        "Breaks": 0,
        "Profile_pic": "",
        "Bio": ""
    }
    admins.insert_one(admin)

# --------------------------------------------------------------------------------


@eel.expose
def create_event(start_date, end_date, event_name, desc, location):
    event = {
        "Event_Name": event_name,
        "Event_Type": desc,
        "Location": location,
        "Start_Date": start_date,
        "End_Date": end_date,
        "Attendees": [],
        "ID": events.count_documents({})
    }
    events.insert_one(event)

#####################
# Report Management #
#####################


# Start the index.html file / Brings user to the login page
eel.start("dashboard.html")
