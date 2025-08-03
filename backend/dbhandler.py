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

upload_patient_case("1011012")
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