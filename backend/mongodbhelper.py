from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import certifi
import os
from Medicine import Medicine
from PatientCase import PatientCase
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
    res = db["Medications"].find()
    return res

def add_case(patientName : str = "daniel", symptoms : list = [], status : str = "waiting", priority : int = 0):
    try:
        case = PatientCase(
                patientName=patientName,
                symptoms=symptoms,
                status=status,
                priority=priority)
        
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
        "priority": res["priority"]
    }
    return returndict
    
def get_all_cases():
    res = db["Cases"].find()
    return res