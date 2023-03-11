from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://jrigney6993:1076993@school-cluster.oafpkhl.mongodb.net/?retryWrites=true&w=majority")
db = client["school-cluster"]

students = db["students"]


def add_student(first_name, last_name, email):
    student = {
        "First_Name": first_name,
        "Last_Name": last_name,
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
