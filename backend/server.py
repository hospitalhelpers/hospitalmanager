from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import dbhandler
import langchaingemini
#import postgreshelper
#import mongodbhelper

app = Flask(__name__) # designates this script as the root apth

# Simple CORS configuration
CORS(app, origins="*", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

@app.route('/')
def index():
    return "hello world"

"""
curl -X POST -H "Content-Type: application/json" -d '{"medicationID" : "1010011", "dosage" : "20mg"}' http://127.0.0.1:3000/upload_medicine
"""
@app.route('/upload_medicine', methods = ['POST'])
def upload_medicine():
    if request.method == 'POST':
        # parse the request as JSON
        print(request.json)
        if (request.json['medicationID']):
            # upload userid to postgres
            res = mongodbhelper.add_medicine(request.json['medicationID'], request.json['dosage'])
            return str(res)  # Convert ObjectId to string
    # save this user id to database
    return "please use post"

"""
curl -X GET -H "Content-Type: application/json" -d '{"id" : "688e8dc83b3c263913ed0b8d"}' http://127.0.0.1:3000/get_medicine
"""
@app.route('/get_medicine', methods = ['GET', 'POST'])
def get_medicine():
    if request.method == 'GET':
        # For GET requests, try to get id from query parameters
        patient_id = request.args.get('id')
        if not patient_id and request.is_json:
            patient_id = request.json.get('id') if request.json else None
    elif request.method == 'POST':
        # For POST requests, get id from JSON body
        patient_id = request.json.get('id') if request.json else None
    
    if patient_id:
        # upload userid to postgres
        res = mongodbhelper.get_medicine_from_id(patient_id)
        print(res)
        return res
    # save this user id to database
    return "please provide id"

"""
curl -X GET -H "Content-Type: application/json" -d '{"id" : "688e9659e62ca1a6e511dac3"}' http://127.0.0.1:3000/get_case
"""
@app.route('/get_case', methods = ['GET', 'POST'])
def get_case():
    if request.method == 'GET':
        # For GET requests, try to get id from query parameters
        patient_id = request.args.get('id')
        if not patient_id and request.is_json:
            patient_id = request.json.get('id') if request.json else None
    elif request.method == 'POST':
        # For POST requests, get id from JSON body
        patient_id = request.json.get('id') if request.json else None
    
    if patient_id:
        # upload userid to postgres
        res = dbhandler.get_case_from_id(patient_id)
        print(res)
        return res
    # save this user id to database
    return "please provide id"

@app.route('/add_patient_case', methods = ['POST'])
def add_patient_case():
    if request.method == 'POST':
        # parse the request as JSON
        print(request.json)
        if (request.json['id']):
            if dbhandler.get_patient_existence(request.json['id']):
                # upload userid to postgres
                res = dbhandler.upload_patient_case(request.json['id'])
                print(res)
                return "done"
            return "does not exist"
    # save this user id to database
    return "please use post"

@app.route('/update_patient_case_status', methods = ['POST'])
def update_patient_case_status():
    if request.method == 'POST':
        # parse the request as JSON
        print(request.json)
        if (request.json['id'] and request.json['status']):
            # upload userid to postgres
            res = dbhandler.update_patient_case_status(request.json['id'], request.json['status'])
            print(res)
            return res
    # save this user id to database
    return "please use post"

@app.route('/update_patient_case_symptoms', methods = ['POST'])
def update_patient_case_symptoms():
    if request.method == 'POST':
        # parse the request as JSON
        print(request.json)
        if (request.json['id'] and request.json['symptoms']):
            # upload userid to postgres
            res = dbhandler.update_patient_case_symptoms(request.json['id'], request.json['symptoms'])
            print(res)
            return res
    # save this user id to database
    return "please use post"

@app.route('/update_patient_case_priority', methods = ['POST'])
def update_patient_case_priority():
    if request.method == 'POST':
        # parse the request as JSON
        print(request.json)
        if (request.json['id'] and request.json['priority']):
            # upload userid to postgres
            res = dbhandler.update_patient_case_status(request.json['id'], request.json['priority'])
            print(res)
            return res
    # save this user id to database
    return "please use post"

@app.route('/get_patient_data', methods = ['GET', 'POST'])
def get_patient_data():
    if request.method == 'GET':
        # For GET requests, try to get id from query parameters
        patient_id = request.args.get('id')
        if not patient_id and request.is_json:
            patient_id = request.json.get('id') if request.json else None
    elif request.method == 'POST':
        # For POST requests, get id from JSON body
        patient_id = request.json.get('id') if request.json else None
    
    if patient_id:
        # upload userid to postgres
        res = dbhandler.get_patient_info(patient_id)
        print(res)
        return res
    # save this user id to database
    return "please provide id"

@app.route('/get_priority', methods = ['GET', 'POST'])
def get_priority():
    if request.method == 'POST':
        # For POST requests, get id from JSON body
        patient_id = request.json.get('id') if request.json else None
    
    if patient_id:
        # upload userid to postgres
        dbhandler.get_gemini_rag()
        res = langchaingemini.get_user_score(dbhandler.get_case_from_id(patient_id))
        print(res)
        return res
    # save this user id to database
    return "please provide id"

@app.route('/get_current_cases', methods = ['GET'])
def get_current_cases():
    if request.method == 'GET':
        # upload userid to postgres
        cases = dbhandler.get_current_cases()
        if cases:
            print(cases)
            return cases
        return "damn"
    # save this user id to database
    return "please use GET"

if __name__ == "__main__": # if running this file directly
    app.run(debug=True, port=3000) # run the app
    #app.run(host="0.0.0.0", debug=True, port=3000) # expose to all ips
