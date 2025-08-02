from flask import Flask, request
from flask_cors import CORS, cross_origin
import postgreshelper

app = Flask(__name__) # designates this script as the root apth
cors = CORS(app) # allow CORS for all domains on all routes.
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def index():
    return "hello world"

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

if __name__ == "__main__": # if running this file directly
    app.run(debug=True, port=3000) # run the app
    #app.run(host="0.0.0.0", debug=True, port=3000) # expose to all ips