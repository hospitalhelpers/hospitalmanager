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

def upload_patient_case(userid : str, mongodbid : str = None):
    with conn: # assuming we have connection
        with conn.cursor() as dbcurs:
            try:
                dbcurs.execute(f"INSERT INTO patient_cases (healthid, caseURI) VALUES ('{userid}','{mongodbid}')")
            except (Exception, psycopg2.DatabaseError) as error:
                print(error)

def get_patient_case(userid : str):
    with conn: # assuming we have connection
        with conn.cursor() as dbcurs:
            try:
                dbcurs.execute(f"SELECT * FROM patient_cases where healthid='{userid}'")
                results = dbcurs.fetchall()
                if (results):
                    return results[0]
            except (Exception, psycopg2.DatabaseError) as error:
                print(error)

def get_all_cases():
    with conn: # assuming we have connection
        with conn.cursor() as dbcurs:
            try:
                dbcurs.execute(f"SELECT * FROM patient_cases")
                results = dbcurs.fetchall()
                if (results):
                    return results
            except (Exception, psycopg2.DatabaseError) as error:
                print(error)

def upload_patient_information(userid : str, age : int = 0, name : str = "", current_medication : list = [], history : list = []):
    with conn: # assuming we have connection
        with conn.cursor() as dbcurs:
            try:
                dbcurs.execute(f"INSERT INTO patient_information (healthid, age, name, medications, history) VALUES ('{userid}','{age}','{name}',ARRAY{current_medication},ARRAY{history})")
            except (Exception, psycopg2.DatabaseError) as error:
                print(error)

def get_patient_information(userid : str):
    with conn: # assuming we have connection
        with conn.cursor() as dbcurs:
            try:
                dbcurs.execute(f"SELECT * FROM patient_information where healthid='{userid}'")
                results = dbcurs.fetchall()
                if (results):
                    return results[0]
            except (Exception, psycopg2.DatabaseError) as error:
                print(error)