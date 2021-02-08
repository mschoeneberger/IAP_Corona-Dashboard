import retrieveData as rd
import json
import os
import copy
import pandas as pd


CURRENT_DIR = current_dir = os.path.dirname(os.path.abspath(__file__))


def createWorldData():

    countryIsoCodes = json.load(open(CURRENT_DIR + '/../storage/country_iso2.json'))
    world = {}

    # download files
    for country in countryIsoCodes:
        try:
            rd.getJsonData(country['name'], 'https://mahabub81.github.io/covid-19-api/api/v1/countries/' + country['alpha-2'] + '.json')
            
            world[country["name"]] = []
            with open(CURRENT_DIR + '/../storage/world/' + country['name'] + '.json') as file:
                json_file = json.load(file)
                for element in json_file:
                    del element["last_updated_at"]
                    world[country["name"]].append(element)

        except:
            print(country)

    with open(CURRENT_DIR + '/../api_files/world.json', 'w') as outfile:
        json.dump(world, outfile, indent=4)


def createDenmarkData():
    # download data
    rd.getZippedCsvData('denmark', 'https://files.ssi.dk/covid19/overvagning/data/data-epidemiologiske-rapport-18122020-py43')

    path = CURRENT_DIR + '/../storage/denmark/'

    with open(path + "Test_pos_over_time.csv", 'r+') as file:
        result = file.read().replace('.', '')
        file.seek(0, os.SEEK_SET)
        file.write(result)

    # format data
    output = []

    cases = pd.read_csv(path + "Municipality_cases_time_series.csv", sep=';')
    tested = pd.read_csv(path + "Test_pos_over_time.csv", sep=';')
    deaths = pd.read_csv(path + "Deaths_over_time.csv", sep=';')

    for index, df_row in cases.iterrows():
        row = {}
        row['date'] = df_row["date_sample"]  # Date
        for column in cases.columns:
            if column == "date_sample":
                continue
            if column == "NA":
                row['tested'] = int(tested.loc[tested["Date"] == row['date']]["Tested"].iloc[0])
                try: 
                    row['deaths'] = int(deaths.loc[deaths["Dato"] == row['date']]["Antal_døde"]) # deaths
                except:
                    row['deaths'] = 0
            else:
                row['tested'] = "na"
                row['deaths'] = "na"
            row['region'] = column # region
            row['cases'] = df_row[column] # cases
            output.append(copy.deepcopy(row))
    
    with open(CURRENT_DIR + '/../api_files/denmark.json', 'w') as outfile:
        json.dump(output, outfile, indent=4)



if __name__ == "__main__":
    createDenmarkData()

    with open(CURRENT_DIR + '/../api_files/denmark.json', 'r') as outfile:
        a = json.load(outfile)
        summ = 0
        for b in a:
            summ += b["cases"]
        print(summ)