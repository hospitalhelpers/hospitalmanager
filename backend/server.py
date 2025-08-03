from flask import Flask, request
from flask_cors import CORS, cross_origin
import dbhandler
#import postgreshelper
#import mongodbhelper

app = Flask(__name__) # designates this script as the root apth
cors = CORS(app) # allow CORS for all domains on all routes.
app.config['CORS_HEADERS'] = 'Content-Type'

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
@app.route('/get_medicine', methods = ['GET'])
def get_medicine():
    if request.method == 'GET':
        # parse the request as JSON
        print(request.json)
        if (request.json['id']):
            # upload userid to postgres
            res = mongodbhelper.get_medicine_from_id(request.json['id'])
            print(res)
            return res
    # save this user id to database
    return "please use post"

"""
curl -X GET -H "Content-Type: application/json" -d '{"id" : "688e9659e62ca1a6e511dac3"}' http://127.0.0.1:3000/get_case
"""
@app.route('/get_case', methods = ['GET'])
def get_case():
    if request.method == 'GET':
        # parse the request as JSON
        print(request.json)
        if (request.json['id']):
            # upload userid to postgres
            res = dbhandler.get_case_from_id(request.json['id'])
            print(res)
            return res
    # save this user id to database
    return "please use get"

@app.route('/add_patient_case', methods = ['POST'])
def add_patient_case():
    if request.method == 'POST':
        # parse the request as JSON
        print(request.json)
        if (request.json['id']):
            # upload userid to postgres
            res = dbhandler.upload_patient_case(request.json['id'])
            print(res)
            return res
    # save this user id to database
    return "please use post"

@app.route('/update_patient_case_status', methods = ['POSt'])
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

@app.route('/get_patient_data', methods = ['GET'])
def get_patient_data():
    if request.method == 'GET':
        # parse the request as JSON
        print(request.json)
        if (request.json['id']):
            # upload userid to postgres
            res = dbhandler.get_patient_info(request.json['id'])
            print(res)
            return res
    # save this user id to database
    return "please use GET"

if __name__ == "__main__": # if running this file directly
    app.run(debug=True, port=3000) # run the app
    #app.run(host="0.0.0.0", debug=True, port=3000) # expose to all ips