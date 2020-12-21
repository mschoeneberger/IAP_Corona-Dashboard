import json
import os
import pandas as pd
from datetime import datetime

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


def data_germany_its():
    print("formating ITS-data...")

    output = []
    path = CURRENT_DIR + '/../storage/germany_its.csv'
    
    data = pd.read_csv(path)
    columns = ["daten_stand", "bundesland", "gemeindeschluessel", "faelle_covid_aktuell",
        "faelle_covid_aktuell_beatmet", "betten_frei", "betten_belegt"]

    for index, df_row in data.iterrows():
        row = []
        for column in columns:
            row.append(df_row[column])
        output.append(tuple(row))
    
    return output


def format_denmark_csv():
    path = CURRENT_DIR + '/../storage/denmark/'

    with open(path + "Municipality_cases_time_series.csv", 'r+') as file:
        result = file.read().replace(';', ',')
        file.seek(0, os.SEEK_SET)
        file.write(result)

    with open(path + "Test_pos_over_time.csv", 'r+') as file:
        result = file.read().replace(',', '.').replace(';', ',').replace('.', '')
        file.seek(0, os.SEEK_SET)
        file.write(result)

    with open(path + "Deaths_over_time.csv", 'r+') as file:
        result = file.read().replace(';', ',')
        file.seek(0, os.SEEK_SET)
        file.write(result)


def data_denmark():
    print("formatting data...")
    
    output = []
    path = CURRENT_DIR + '/../storage/denmark/'

    cases = pd.read_csv(path + "Municipality_cases_time_series.csv")
    tested = pd.read_csv(path + "Test_pos_over_time.csv")
    deaths = pd.read_csv(path + "Deaths_over_time.csv")

    for index, df_row in cases.iterrows():
        row = [None] * 5
        row[0] = df_row["date_sample"]  # Date
        for column in cases.columns:
            if column == "date_sample":
                continue
            if column == "NA":
                row[2] = int(tested.loc[tested["Date"] == row[0]]["Tested"])
                try: 
                    row[4] = int(deaths.loc[deaths["Dato"] == row[0]]["Antal_døde"]) # deaths
                except:
                    row[4] = 0
            else:
                row[2] = float("nan")
                row[4] = float("nan")
            row[1] = column # region
            row[3] = df_row[column] # cases
            output.append(tuple(row))
    
    return output


def data_netherlands():
    print("formatting data...")

    output = []
    path = CURRENT_DIR + '/../storage/netherlands/'
    data = open(path + "/data.json", 'r')
    # tests = open(path + "/tests.csv", 'r') # TODO: TBD

    json_iter = json.loads(data.read())["data"]

    for element in json_iter:
        row = []
        row.append(element["Datum"])
        row.append(element["Provincienaam"])  # region
        row.append(element["totaalAantal"])  # cases
        row.append(element["ziekenhuisopnameAantal"])  # hospital
        row.append(element["overledenAantal"])  # deaths
        row = [float("nan") if e == None else e for e in row]
        output.append(tuple(row))

    return output


def data_belgium():
    print("formatting data...")

    output = []
    path = CURRENT_DIR + '/../storage/belgium/'

    cases = pd.read_csv(path + "cases.csv")
    deaths = pd.read_csv(path + "deaths.csv")
    hospital = pd.read_csv(path + "hospital.csv")
    tests = pd.read_csv(path + "tests.csv")

    cases = cases.drop(columns=["NIS5", "TX_DESCR_NL", "TX_ADM_DSTR_DESCR_NL", "TX_ADM_DSTR_DESCR_FR", "Unnamed: 0"])
    tests = tests.drop(columns=["Unnamed: 0"])
    merged = pd.merge(cases, tests, on=["DATE", "PROVINCE", "REGION"])

    merged.to_csv(path + "output.csv")

    print(cases)
    print(tests)
    print(merged)


def data_luxembourg():
    print("formatting data...")

    output = []
    path = CURRENT_DIR + '/../storage/luxembourg.csv'

    data = pd.read_csv(path, encoding='latin-1')

    columns = ["Date", "Nb de tests effectués", "Nb de positifs", "Soins normaux",
     "Soins intensifs", "[1.NbMorts]"]

    for index, dataframe_row in data.iterrows():
        row = []
        for column in columns:
            if column == "Date":
                row.append(datetime.strptime(dataframe_row[column], '%d/%m/%Y').strftime('%Y-%m-%d'))
            else:
                row.append(dataframe_row[column])

        row = [float("nan") if e == "-" else e for e in row]
        output.append(tuple(row))

    return output


def data_france():
    ...


def data_switzerland():
    print("formatting data...")
    output = []
    path = CURRENT_DIR + '/../storage/switzerland.csv'
    data = pd.read_csv(path)

    columns = ["date", "abbreviation_canton_and_fl", "ncumul_tested", "ncumul_conf",
     "current_hosp", "current_icu","ncumul_released", "ncumul_deceased"]

    for index, dataframe_row in data.iterrows():
        output_row = []
        for column in columns:
                output_row.append(dataframe_row[column])
        output.append(tuple(output_row))

    return output
    

if __name__ == "__main__":

    data_denmark()