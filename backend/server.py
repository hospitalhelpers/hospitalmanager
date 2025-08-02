from flask import Flask, request
from flask_cors import CORS, cross_origin
import postgreshelper
import mongodbhelper

app = Flask(__name__) # designates this script as the root apth
cors = CORS(app) # allow CORS for all domains on all routes.
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def index():
    return "hello world"

"""
curl -X POST -H "Content-Type: application/json" -d '{"name" : "david"}' http://127.0.0.1:3000/upload_userid
"""
@app.route('/upload_userid', methods = ['POST'])
def upload_userid():
    if request.method == 'POST':
        # parse the request as JSON
        print(request.json)
        if (request.json['userid']):
            # upload userid to postgres
            postgreshelper.upload_patient_case(request.json['userid'])
    # save this user id to database
    return "please use post"

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
curl -X POST -H "Content-Type: application/json" -d '{"patientName" : "daniel", "symptoms" : ["death"]}' http://127.0.0.1:3000/upload_case
"""
@app.route('/upload_case', methods = ['POST'])
def upload_case():
    if request.method == 'POST':
        # parse the request as JSON
        print(request.json)
        if (request.json['patientName']):
            # upload userid to postgres
            res = mongodbhelper.add_case(request.json['patientName'], request.json['symptoms'])
            return str(res)  # Convert ObjectId to string
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
            res = mongodbhelper.get_case_from_id(request.json['id'])
            print(res)
            return res
    # save this user id to database
    return "please use post"


if __name__ == "__main__": # if running this file directly
    app.run(debug=True, port=3000) # run the app
    #app.run(host="0.0.0.0", debug=True, port=3000) # expose to all ips