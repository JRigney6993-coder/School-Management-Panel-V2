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

####################
# Useful Functions #
####################


def bcrypt_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

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

######################
# Student Management #
######################


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


@eel.expose
def update_student(ID, selector, change):
    students.update_one({"ID": ID}, {"$set": {selector: change}})


@eel.expose
def add_student_class(student_id, teacher_id, period):
    teachers.update_one({"ID": teacher_id}, {
                        "$push": {f"Classes.{period}": student_id}})


@eel.expose
def remove_student_class(student_id, teacher_id, period):
    teachers.update_one({"ID": teacher_id}, {
                        "$pop": {f"Classes.{period}": student_id}})


@eel.expose
def add_absence(student_id, absences):
    students.update_one({"ID": student_id}, {"$inc": {"Absences": absences}})


@eel.expose
def add_grade(student_id, period, grade):
    students.update_one({"ID": student_id}, {
                        "$set": {"Grades": {period: grade}}})


@eel.expose
def add_referrals(student_id, referral):
    students.update_one({"ID": student_id}, {"$set": {"Referrals": referral}})
######################
# Teacher Management #
######################


@eel.expose
def create_teacher(first_name, last_name, email, password):
    teacher = {
        "First_name": first_name,
        "Last_name": last_name,
        "Email": email,
        "ID": teachers.count_documents({}),
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


@eel.expose
def remove_teacher(email, ID):
    teachers.delete_one({"Email": email, "ID": ID})

####################
# Admin Management #
####################


@eel.expose
def create_admin(first_name, last_name, email, password):
    admin = {
        "First_name": first_name,
        "Last_name": last_name,
        "Email": email,
        "Password": bcrypt_password(password),
        "ID": admins.count_documents({}),
        "Profile_pic": "",
        "Bio": ""
    }
    admins.insert_one(admin)


@eel.expose
def remove_admin(email, Id):
    admins.delete_one({"Email": email, "ID": Id})

####################
# Event Management #
####################


@eel.expose
def get_event_num():
    return events.count_documents({})


@eel.expose
def load_events():
    return list(events.find({}))


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


@eel.expose
def remove_event(event_id):
    events.delete_one({"ID": event_id})


@eel.expose
def add_attendees(event_id, student_id):
    if event_id <= events.count_documents({}):
        students.update_one({"ID": student_id}, {"$inc": {"Points": 1}})
        events.update_one({"ID": event_id}, {
                          "$push": {"Attendees": student_id}})
    else:
        return False

#####################
# Report Management #
#####################


# Start the index.html file / Brings user to the login page
eel.start("index.html", size=(1400, 900))
