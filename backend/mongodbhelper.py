from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import certifi
import os
from Medicine import Medicine
from PatientCase import PatientCase
from HospitalStructure import HospitalStructure
from bson import ObjectId

ca = certifi.where()
load_dotenv()
ATLAS_URI = os.getenv('ATLAS_URI')
client = MongoClient(ATLAS_URI, server_api=ServerApi('1'), tlsCAFile=ca)
client.admin.command('ping')
db = client["HealthApp"]
print("Pinged your deployment. You successfully connected to MongoDB!")

def add_medicine(medicationID : str = "somemedicine", dosage : str = "somedosage", prescribedDate : str = "somedate"):
    try:
        medicine = Medicine(
            medicationID=medicationID,
            dosage=dosage,
            prescribedDate=prescribedDate
        )
        res = db["Medications"].insert_one(medicine.model_dump())
        print("res: ", res.inserted_id)
        return res.inserted_id
    except Exception as e:
        print(e)
        return 0

def get_medicine_from_id(id : str):
    res = db["Medications"].find_one({"_id": ObjectId(id)})
    returndict = {
        "medicationID" : res["medicationID"],
        "dosage" : res["dosage"],
        "prescribedDate" : res["prescribedDate"],
    }
    return returndict

def get_all_medicine():
    res = list(db["Medications"].find())
    return res

def add_case(patientName : str = "daniel", symptoms : list = [], status : str = "waiting", priority : int = 0, age : int = 0):
    try:
        case = PatientCase(
                patientName=patientName,
                symptoms=symptoms,
                status=status,
                priority=priority,
                age=age
                )
        
        res = db["Cases"].insert_one(case.model_dump())
        print("res: ", res.inserted_id)
        return res.inserted_id
    except Exception as e:
        print(e)
        return 0
    
def get_case_from_id(id : str):
    res = db["Cases"].find_one({"_id": ObjectId(id)})
    returndict = {
        "patientName": res["patientName"],
        "symptoms": res["symptoms"],
        "status": res["status"],
        "priority": res["priority"],
        "age": res["age"]
    }
    return returndict
    
def get_all_cases():
    res = list(db["Cases"].find())
    return res

def add_hospital_structure(floordict : dict, floorstructure : dict = None):
    try:
        case = HospitalStructure(
                Floors=floordict,
                FloorStructure=floorstructure
                )
        res = db["HospitalStruct"].insert_one(case.model_dump())
        print("res: ", res.inserted_id)
        return res.inserted_id
    except Exception as e:
        print(e)
        return 0
    
def get_all_hospital():
    res = list(db["HospitalStruct"].find())
    return res

def update_case_set_symptoms(caseid : str, symptoms : list):
    db.updateOne({"caseId" : ObjectId(caseid)}, {"$set" : {"symptoms" : symptoms}})

def update_case_set_status(caseid : str, status : str):
    db.updateOne({"caseId" : ObjectId(caseid)}, {"$set" : {"status" : status}})

def update_case_set_priority(caseid : str, priority : str):
    db.updateOne({"caseId" : ObjectId(caseid)}, {"$set" : {"priority" : priority}})


update_case_set_priority("688e95e31047ff4a1902c131", 20)