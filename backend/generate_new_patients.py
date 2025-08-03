import dbhandler
from Medicine import Medicine
from PatientCase import PatientCase

# Priority 1 - Critical/Emergency (highest priority)
dbhandler.upload_patient_information("1234567890", 
                           67,
                           "Sarah Johnson", 
                           [
                               Medicine(
                                   medicationID="nitroglycerin",
                                   dosage="0.4mg",
                                   prescribedDate="2024/01/15"
                               ),
                               Medicine(
                                   medicationID="aspirin",
                                   dosage="325mg",
                                   prescribedDate="2024/01/15"
                               ),
                           ],
                           [
                               PatientCase(
                                   patientName="Sarah Johnson",
                                   symptoms=["chest pain", "shortness of breath", "sweating"],
                                   priority=1,
                                   status="waiting"
                               ),
                           ]
                 )

# Priority 2 - Urgent
dbhandler.upload_patient_information("2345678901", 
                           34,
                           "Michael Chen", 
                           [
                               Medicine(
                                   medicationID="ibuprofen",
                                   dosage="800mg",
                                   prescribedDate="2024/01/10"
                               ),
                           ],
                           [
                               PatientCase(
                                   patientName="Michael Chen",
                                   symptoms=["severe abdominal pain", "nausea", "fever"],
                                   priority=2,
                                   status="waiting"
                               ),
                           ]
                 )

# Priority 3 - Moderate
dbhandler.upload_patient_information("3456789012", 
                           28,
                           "Emily Rodriguez", 
                           [
                               Medicine(
                                   medicationID="acetaminophen",
                                   dosage="500mg",
                                   prescribedDate="2024/01/12"
                               ),
                           ],
                           [
                               PatientCase(
                                   patientName="Emily Rodriguez",
                                   symptoms=["migraine", "light sensitivity", "nausea"],
                                   priority=3,
                                   status="waiting"
                               ),
                           ]
                 )

# Priority 4 - Low
dbhandler.upload_patient_information("4567890123", 
                           45,
                           "David Thompson", 
                           [
                               Medicine(
                                   medicationID="diphenhydramine",
                                   dosage="25mg",
                                   prescribedDate="2024/01/08"
                               ),
                           ],
                           [
                               PatientCase(
                                   patientName="David Thompson",
                                   symptoms=["rash", "itching", "mild swelling"],
                                   priority=4,
                                   status="waiting"
                               ),
                           ]
                 )

# Priority 5 - Non-urgent (lowest priority)
dbhandler.upload_patient_information("5678901234", 
                           52,
                           "Lisa Williams", 
                           [
                               Medicine(
                                   medicationID="vitamin_d",
                                   dosage="1000IU",
                                   prescribedDate="2024/01/05"
                               ),
                           ],
                           [
                               PatientCase(
                                   patientName="Lisa Williams",
                                   symptoms=["fatigue", "mild headache"],
                                   priority=5,
                                   status="waiting"
                               ),
                           ]
                 )

# Additional Priority 1 - Another critical case
dbhandler.upload_patient_information("6789012345", 
                           19,
                           "James Wilson", 
                           [
                               Medicine(
                                   medicationID="epinephrine",
                                   dosage="0.3mg",
                                   prescribedDate="2024/01/15"
                               ),
                           ],
                           [
                               PatientCase(
                                   patientName="James Wilson",
                                   symptoms=["difficulty breathing", "swelling", "hives"],
                                   priority=1,
                                   status="waiting"
                               ),
                           ]
                 )

# Priority 2 - Trauma case
dbhandler.upload_patient_information("7890123456", 
                           31,
                           "Amanda Foster", 
                           [
                               Medicine(
                                   medicationID="tramadol",
                                   dosage="50mg",
                                   prescribedDate="2024/01/14"
                               ),
                           ],
                           [
                               PatientCase(
                                   patientName="Amanda Foster",
                                   symptoms=["broken arm", "pain", "swelling"],
                                   priority=2,
                                   status="waiting"
                               ),
                           ]
                 )

# Priority 3 - Respiratory issue
dbhandler.upload_patient_information("8901234567", 
                           38,
                           "Robert Kim", 
                           [
                               Medicine(
                                   medicationID="albuterol",
                                   dosage="90mcg",
                                   prescribedDate="2024/01/13"
                               ),
                           ],
                           [
                               PatientCase(
                                   patientName="Robert Kim",
                                   symptoms=["wheezing", "cough", "chest tightness"],
                                   priority=3,
                                   status="waiting"
                               ),
                           ]
                 )

print("Generated 8 new patients with various priority levels:")
print("- Priority 1 (Critical): Sarah Johnson (cardiac), James Wilson (allergic reaction)")
print("- Priority 2 (Urgent): Michael Chen (abdominal), Amanda Foster (trauma)")
print("- Priority 3 (Moderate): Emily Rodriguez (migraine), Robert Kim (respiratory)")
print("- Priority 4 (Low): David Thompson (allergic rash)")
print("- Priority 5 (Non-urgent): Lisa Williams (fatigue)") 