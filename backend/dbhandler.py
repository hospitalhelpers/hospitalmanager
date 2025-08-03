import mongodbhelper
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

def upload_patient_information(healthId , age, name, medication , history ):
    # create medication url
    medications = []
    histories = []
    for i in medication:
        medications.append(str(mongodbhelper.add_medicine(i.medicationID , i.dosage , i.prescribedDate)))
    for i in history:
        histories.append(str(mongodbhelper.add_case(i.patientName, i.symptoms)))
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

#print(get_patient_info("1011012"))

#upload_patient_information("1011012", 
#                           20,
#                           "daniam", 
#                           [
#                               
#                           Medicine(
#                                medicationID="adderall",
#                                dosage="20mg",
#                                prescribedDate="2020"
#                            ),
#                               
#                           Medicine(
#                                medicationID="vicodin",
#                                dosage="10mg",
#                                prescribedDate="2014"
#                            ),
#                            
#                           ],
#                           [
#                            PatientCase(
#                                patientName="daniel cooler",
#                                symptoms=["coughing", "laughing"],
#                            ),
#                            PatientCase(
#                                patientName="daniel cooler",
#                                symptoms=["lethargy"],
#                            ),
#                           ]
#                 )