import json
import os
import pandas as pd

CURRENT_DIR = current_dir = os.path.dirname(os.path.abspath(__file__))


def data_germany():
    print("formatting data...")
    output = []
    path = CURRENT_DIR + '/../storage/germany.json'
    data = open(path, 'r')
    json_iter = json.loads(data.read())["features"]
    
    for element in json_iter:
        element_dict = element["properties"]
        row = [None] * 15
        row[0] = element_dict["IdBundesland"]
        row[1] = element_dict["Bundesland"]
        row[2] = element_dict["IdLandkreis"]
        row[3] = element_dict["Landkreis"]
        row[4] = element_dict["Geschlecht"]
        row[5] = element_dict["Altersgruppe"]
        row[6] = element_dict["AnzahlFall"]
        row[7] = element_dict["AnzahlTodesfall"]
        row[8] = element_dict["Meldedatum"]
        row[9] = element_dict["NeuerFall"]
        row[10] = element_dict["Refdatum"]
        row[11] = element_dict["AnzahlGenesen"]
        row[12] = element_dict["NeuGenesen"]
        row[13] = bool(element_dict["IstErkrankungsbeginn"])
        row[14] = element_dict["ObjectId"]
        output.append(tuple(row))

    return output


def format_denmark_csv():
    with open(path + "Municipality_cases_time_series.csv", 'r+') as file:
        result = file.read().replace(';', ',')
        file.seek(0, os.SEEK_SET)
        file.write(result)

    with open(path + "Municipality_tested_persons_time_series.csv", 'r+') as file:
        result = file.read().replace(';', ',')
        file.seek(0, os.SEEK_SET)
        file.write(result)


def data_denmark():
    print("formatting data...")
    
    output = []
    path = CURRENT_DIR + '/../storage/denmark/'

    # replace ';' in file with ',' for correct reading with pandas
    format_denmark_csv()

    cases_over_time = pd.read_csv(path + "Municipality_cases_time_series.csv")
    tested_over_time = pd.read_csv(path + "Municipality_tested_persons_time_series.csv")

    print(cases_over_time)
    print(tested_over_time)


def data_netherlands():
    ...


def data_belgium():
    print("formatting data...")

    output = []
    path = CURRENT_DIR + '/../storage/belgium/'

    cases = pd.read_csv(path + "cases.csv")
    deaths = pd.read_csv(path + "deaths.csv")
    hospital = pd.read_csv(path + "hospital.csv")
    tests = pd.read_csv(path + "tests.csv")


def data_luxembourg():
    ...


def data_france():
    ...


def data_switzerland():
    print("formatting data...")
    output = []
    path = CURRENT_DIR + '/../storage/switzerland.csv'
    data = pd.read_csv(path)

    columns = ["date", "abbreviation_canton_and_fl", "ncumul_tested", "ncumul_conf", "new_hosp",
     "current_hosp", "current_icu","ncumul_released", "ncumul_deceased"]

    for index, dataframe_row in data.iterrows():
        output_row = []
        for column in columns:
                output_row.append(dataframe_row[column])
        output.append(tuple(output_row))

    return output
    

if __name__ == "__main__":

    data_belgium()