import psycopg2
# app.py
from dotenv import load_dotenv
import os
load_dotenv()
POSTGRESPASS = os.getenv('POSTGRESPASS')
POSTGRESUSER = os.getenv('POSTGRESUSER')
POSTGRESHOST = os.getenv('POSTGRESHOST')
POSTGRESPORT = os.getenv('POSTGRESPORT')
POSTGRESDBNAME = os.getenv('POSTGRESDBNAME')

conn = psycopg2.connect(f"user={POSTGRESUSER} password={POSTGRESPASS} host={POSTGRESHOST} port={POSTGRESPORT} dbname={POSTGRESDBNAME}")

def upload_patient_case(userid : str):
    with conn: # assuming we have connection
        with conn.cursor() as dbcurs:
            try:
                dbcurs.execute(f"INSERT INTO patient_cases (healthID) VALUES ('{userid}')")
            except (Exception, psycopg2.DatabaseError) as error:
                print(error)