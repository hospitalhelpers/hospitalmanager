import mongodbhelper
import geminihelper
import postgreshelper
from Medicine import Medicine
from PatientCase import PatientCase


def upload_patient_case(healthId : str):
    patientinfo = postgreshelper.get_patient_information(healthId)
    # get the status 
    res = mongodbhelper.add_case(healthId, age=patientinfo[3])
    postgreshelper.upload_patient_case(healthId, res)

def upload_patient_information(healthId , age, name, medication , history ):
    # create medication url
    medicine = mongodbhelper.add_medicine(medication.medicationID , medication.dosage , medication.prescribedDate)
    hist = mongodbhelper.add_case(history.patientName, history.symptoms)
    # create the history url
    res = postgreshelper.upload_patient_information(healthId , age , name , medicine, hist)
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
#upload_patient_information("1011012", 
#                           20,
#                           "daniam", 
#                           Medicine(
#                                medicationID="adderall",
#                                dosage="20mg",
#                                prescribedDate="2020"
#                            ),
#                            PatientCase(
#                                patientName="daniel cooler",
#                                symptoms=["coughing", "laughing"],
#                            ),
#                 )