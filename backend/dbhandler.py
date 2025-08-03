import mongodbhelper
import csv
import json
import datetime
import geminihelper
import postgreshelper
from Medicine import Medicine
from PatientCase import PatientCase

def upload_patient_case(healthId : str):
    patientinfo = postgreshelper.get_patient_information(healthId)
    # get the status 
    res = mongodbhelper.add_case(healthId, age=patientinfo[3])
    postgreshelper.upload_patient_case(healthId, res)

def upload_patient_information(healthId , age, name, medication , history):
    res = postgreshelper.get_patient_information(healthId)
    if (res):
        print("alr added")
        return None
    # create medication url
    medications = []
    histories = []
    for i in medication:
        medications.append(str(mongodbhelper.add_medicine(i.medicationID , i.dosage , i.prescribedDate)))
    for i in history:
        histories.append(str(mongodbhelper.add_case(i.patientName, i.symptoms, i.status, i.priority, age)))
    res = postgreshelper.upload_patient_information(healthId , age , name , medications, histories)
    return res

def update_patient_case_status(healthId : str, newstatus : str):
    res = postgreshelper.get_patient_case(healthId)
    mongodbhelper.update_case_set_status(res[3], newstatus)

def update_patient_case_priority(healthId : str, priority : int):
    res = postgreshelper.get_patient_case(healthId)
    mongodbhelper.update_case_set_priority(res[3], priority)

def update_patient_case_symptoms(healthId : str, symptoms : list):
    res = postgreshelper.get_patient_case(healthId)
    mongodbhelper.update_case_set_symptoms(res[3], symptoms)

def get_case_from_id(healthId : str):
    res = postgreshelper.get_patient_case(healthId)
    return mongodbhelper.get_case_from_id(res[3])

def get_patient_info(healthId : str):
    ret_dict = dict()
    res = postgreshelper.get_patient_information(healthId)
    ret_dict['age'] = res[3]
    # get medication data
    ret_dict['medications'] = []
    ret_dict['cases'] = []
    for i in res[4]:
        ret_dict['medications'].append(mongodbhelper.get_medicine_from_id(i))
    for i in res[5]:
        ret_dict['cases'].append(mongodbhelper.get_case_from_id(i))
    ret_dict['date'] = res[1].strftime('%m/%d/%Y')
    ret_dict['current_case'] = get_case_from_id(healthId)
    return ret_dict

def get_gemini_rag():
    contents = mongodbhelper.get_all_cases()
    ret_dict = dict()
    for case in contents:
        ret_dict[str(case['_id'])] = {"patientName" : case['patientName'], "symptoms" : case['symptoms'], "priority" : case['priority']}

    with open("geminicases.csv", "w", newline="") as f:
        w = csv.DictWriter(f, ret_dict.keys())
        w.writeheader()
        w.writerow(ret_dict)

get_gemini_rag()
