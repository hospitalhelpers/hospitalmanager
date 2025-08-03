import mongodbhelper
import geminihelper
import postgreshelper
from Medicine import Medicine
from PatientCase import PatientCase


def upload_patient_case(patientName : str):
    patientinfo = postgreshelper.get_patient_information(healthId)
    breakpoint()
    mongodbhelper.add_case(healthId)
    postgreshelper.upload_patient_case()

def upload_patient_information(healthId , age, name, medication : list, history : list):
    # create medication url
    medicationslist = []
    for i in medication:
        res = mongodbhelper.add_medicine(i.medicationId , i.dosage , i.prescribedDate)
        medicationslist.append(res)
    historylist = []
    for i in history:
        res = mongodbhelper.add_case(i.patientName, i.symptoms)
        historylist.append(res)
    # create the history url
    postgreshelper.upload_patient_information(healthId , age , name , medicationslist, historylist)

medicines =[
    Medicine(
        medicationID="adderall",
        dosage="20mg",
        prescribedDate="2020"
    ),
]
cases = [
    PatientCase(patientName="daniel cooler",
                symptoms=["coughing", "laughing"],
                ),
]

#upload_patient_case("daniel")