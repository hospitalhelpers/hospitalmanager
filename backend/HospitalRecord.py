class HospitalRecord():
    def __init__(self, age:int, 
                 healthcard_id : int,
                 phone_number : str = "null",

                   ):
        self.age = age
        self.healthcard_id = healthcard_id
        self.phone_number = phone_number


class HospitalHistory():
    def __init__(self):
        self.history = []

    def add_history(self, ):

    