import dbhandler
from Medicine import Medicine
from PatientCase import PatientCase

dbhandler.upload_patient_information("5538201346", 
                           45,
                           "richard astley", 
                           [
                               
                           Medicine(
                                medicationID="adderall",
                                dosage="20mg",
                                prescribedDate="2023/04/23"
                            ),
                               
                           Medicine(
                                medicationID="vicodin",
                                dosage="10mg",
                                prescribedDate="2022/09/16"
                            ),
                            
                           ],
                           [
                            PatientCase(
                                patientName="richard astley",
                                symptoms=["coughing", "laughing"],
                                priority=4,
                                status="left"
                            ),
                            PatientCase(
                                patientName="richard astley",
                                symptoms=["bleeding"],
                                priority=5,
                                status="waiting"
                            ),
                           ]
                 )
