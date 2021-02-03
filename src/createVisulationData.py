from retrieveData import getJsonData
import json
import os


CURRENT_DIR = current_dir = os.path.dirname(os.path.abspath(__file__))

# "confirmed": 6318,
#             "deaths": 122,
#             "recovered": 0,
#             "active": 0,
#             "incident_rate": "72.31008873379518",
#             "people_tested": "",
#             "people_hospitalized": "",
#             "report_date": "2020-04-19",
#             "delta_confirmed": "324",
#             "delta_recovered": "",
#             "country": "Serbia"


def createWorldData():

    countryIsoCodes = json.load(open(CURRENT_DIR + '/../storage/country_iso2.json'))
    world = []

    # download files
    for country in countryIsoCodes:
        try:
            #getJsonData(country['name'], 'https://mahabub81.github.io/covid-19-api/api/v1/countries/' + country['alpha-2'] + '.json')
            
            with open(CURRENT_DIR + '/../storage/' + country['name'] + '.json') as file:
                json_file = json.load(file)
                for element in json_file:
                    element["country"] = country['name']
                    del element["last_updated_at"]
                    world.append(element)


        except:
            print(country)

    with open(CURRENT_DIR + '/../api_files/world.json', 'w') as outfile:
        json.dump(world, outfile, indent=4)

    





if __name__ == "__main__":
    createWorldData()