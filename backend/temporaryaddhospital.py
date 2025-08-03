import mongodbhelper

newstruct = {
    "Floors" : {
        "Floor1" : {
            "Room1" : {
                "Bed1" : None,
                "Bed2" : None,
                "Bed3" : None,
                "Bed4" : None,
            },
            "Room2" : {
                "Bed1" : None,
                "Bed2" : None,
                "Bed3" : None,
                "Bed4" : None,
            },
            "Room3" : {
                "Bed1" : None,
                "Bed2" : None,
                "Bed3" : None,
                "Bed4" : None,
            },
            "Room4" : {
                "Bed1" : None,
                "Bed2" : None,
                "Bed3" : None,
                "Bed4" : None,
            },
        },
        "Floor2" : {
            "Room1" : {
                "Bed1" : None,
                "Bed2" : None,
                "Bed3" : None,
                "Bed4" : None,
            },
            "Room2" : {
                "Bed1" : None,
                "Bed2" : None,
                "Bed3" : None,
                "Bed4" : None,
            },
            "Room3" : {
                "Bed1" : None,
                "Bed2" : None,
                "Bed3" : None,
                "Bed4" : None,
            },
            "Room4" : {
                "Bed1" : None,
                "Bed2" : None,
                "Bed3" : None,
                "Bed4" : None,
            },
        },
        "Floor3" : {
            "Room1" : {
                "Bed1" : None,
                "Bed2" : None,
                "Bed3" : None,
                "Bed4" : None,
            },
            "Room2" : {
                "Bed1" : None,
                "Bed2" : None,
                "Bed3" : None,
                "Bed4" : None,
            },
            "Room3" : {
                "Bed1" : None,
                "Bed2" : None,
                "Bed3" : None,
                "Bed4" : None,
            },
            "Room4" : {
                "Bed1" : None,
                "Bed2" : None,
                "Bed3" : None,
                "Bed4" : None,
            },
        },
    }
}

#mongodbhelper.add_hospital_structure(newstruct)
print(mongodbhelper.get_all_hospital())