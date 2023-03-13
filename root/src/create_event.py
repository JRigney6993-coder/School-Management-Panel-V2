from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://jrigney6993:1076993@school-cluster.oafpkhl.mongodb.net/?retryWrites=true&w=majority")
db = client["school-cluster"]

events = db["events"]


def create_event(start_date, end_date, event_name, location):
    event = {
        "Event_name": event_name,
        "Location": location,
        "Start_date": start_date,
        "End_date": end_date,
        "ID": events.count_documents({})
    }

    events.insert_one(event)
