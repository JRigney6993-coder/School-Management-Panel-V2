from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://jrigney6993:1076993@school-cluster.oafpkhl.mongodb.net/?retryWrites=true&w=majority")
db = client["school-cluster"]

events = db["events"]
students = db["students"]


def create_event(start_date, end_date, event_name, location):
    event = {
        "Event_name": event_name,
        "Location": location,
        "Start_date": start_date,
        "End_date": end_date,
        "ID": events.count_documents({})
    }

    events.insert_one(event)


def add_attendees(event_id, student_id):
    if event_id < events.count_documents({}):
        students.update_one({"ID": student_id}, {"$inc": {"Points": 1}})
    else:
        print("Event does not exist")
