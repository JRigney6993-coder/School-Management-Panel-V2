from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://jrigney6993:1076993@school-cluster.oafpkhl.mongodb.net/?retryWrites=true&w=majority")
db = client["school-cluster"]

students = db["students"]
teachers = db["teachers"]


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


def update_student(ID, selector, change):
    students.update_one({"ID": ID}, {"$set": {selector: change}})


def add_student(student_id, teacher_id, period):
    teachers.update_one({"ID": teacher_id}, {"$push": {period: student_id}})


def remove_student(student_id, teacher_id, period):
    teachers.update_one({"ID": teacher_id}, {"$pop": {period: student_id}})
