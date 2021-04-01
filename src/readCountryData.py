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
        row = [None] * 8
        row[0] = element_dict["Meldedatum"]
        row[1] = element_dict["Bundesland"]
        row[2] = element_dict["Landkreis"]
        row[3] = element_dict["Geschlecht"]
        row[4] = element_dict["Altersgruppe"]
        row[5] = element_dict["AnzahlFall"]
        row[6] = element_dict["AnzahlTodesfall"]
        row[7] = element_dict["AnzahlGenesen"]
        output.append(tuple(row))

    return output


def data_germany_its():
    print("formating ITS-data...")

    output = []
    path = CURRENT_DIR + '/../storage/ger_its/'
    
    columns = ["daten_stand", "bundesland", "gemeindeschluessel", "faelle_covid_aktuell",
        "faelle_covid_aktuell_beatmet", "betten_frei", "betten_belegt"]

    for filename in os.listdir(path):
        try:
            data = pd.read_csv(path + filename)
        except:
            print(filename)
            continue
        for index, df_row in data.iterrows():
            row = []
            for column in columns:
                row.append(df_row[column])
            output.append(tuple(row))
    
    return output


def format_denmark_csv(): # could be done with load_csv(path, sep=',')
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
    tested = pd.read_csv(path + "tests.csv")

    row = [None] * 8
    olddate = '1970-01-01'


    for index, df_row in cases.iterrows():
        if index != 0:
            if (df_row["DATE"] == row[0]) and (df_row["PROVINCE"] == row[1]):
                row[3] += df_row["CASES"]
                continue
            else:
                #row = [float("nan") if e is None for e in row]
                output.append(tuple(row))
        
        row = [None] * 8
        row[0] = df_row["DATE"]
        row[1] = df_row["PROVINCE"]
        row[3] = df_row["CASES"]
        try:
            row[2] = int(tested.loc[(tested["DATE"] == row[0]) & (tested["PROVINCE"] == row[1])]["TESTS_ALL"])
        except:
            row[2] = float("nan")
        try:
            row[4] = int(hospital.loc[(hospital["DATE"] == row[0]) & (hospital["PROVINCE"] == row[1])]["NEW_IN"])
            row[5] = int(hospital.loc[(hospital["DATE"] == row[0]) & (hospital["PROVINCE"] == row[1])]["TOTAL_IN"])
            row[6] = int(hospital.loc[(hospital["DATE"] == row[0]) & (hospital["PROVINCE"] == row[1])]["TOTAL_IN_ICU"])
        except:
            row[4] = float("nan")
            row[5] = float("nan")
            row[6] = float("nan")
        if row[0] != olddate:
            row[7] = deaths.loc[deaths["DATE"] == row[0]]["DEATHS"].sum()
            olddate = row[0]
        else:
            row[7] = float("nan")

    #row = [float("nan") if e is None for e in row]
    output.append(tuple(row))
    
    return output


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


def format_france_csv():# could be done with load_csv(path, sep=',')
    path = CURRENT_DIR + '/../storage/france.csv'

    with open(path, 'r+') as file:
        result = file.read().replace(';', ',')
        file.seek(0, os.SEEK_SET)
        file.write(result)


def data_france():
    print("formatting data...")

    output = []
    path = CURRENT_DIR + '/../storage/france.csv'
    format_france_csv()

    data = pd.read_csv(path, dtype={'dep': str})

    dateold = '1970-01-01'

    row = [None] * 3

    for index, df_row in data.iterrows():
        if df_row["jour"] != dateold and index > 0:
            output.append(tuple(row))
        row = [None] * 4
        row[0] = df_row["jour"]
        dateold = row[0]
        row[1] = df_row["dep"]
        row[2] = df_row["T"]
        row[3] = df_row["P"]

    output.append(tuple(row))

    return output


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
    

def data_austria():
    print("formatting data...")
    output = []
    path = CURRENT_DIR + '/../storage/austria'
    data = pd.read_csv(path + "_fz.csv", sep=';')
    data_hosp = pd.read_csv(path + "_hosp.csv", sep=';')
    olddate = "1970-01-01"
    olddate_value = 0

    
    for index, df_row in data.iterrows():
        if df_row["BundeslandID"] == 10:
            continue 
        row = [None] * 8
        row[0] = datetime.strptime(df_row["Time"], '%d.%m.%Y %X').strftime('%Y-%m-%d')
        row[1] = df_row["Bundesland"]
        if row[0] != olddate:
            try:
                new_value = int(data_hosp.loc[(data_hosp["Meldedat"] == df_row["Time"][:10]) & (data_hosp["Bundesland"] == "Alle")]["TestGesamt"])
                row[2] = new_value - olddate_value
                olddate_value = new_value
            except:
                row[2] = float("nan")
        row[3] = df_row["AnzahlFaelle"]
        try:
            row[4] = int(data_hosp.loc[(data_hosp["Meldedat"] == df_row["Time"][:10]) & (data_hosp["Bundesland"] == df_row["Bundesland"])]["FZHosp"])
            row[5] = int(data_hosp.loc[(data_hosp["Meldedat"] == df_row["Time"][:10]) & (data_hosp["Bundesland"] == df_row["Bundesland"])]["FZICU"])
        except:
            row[4] = float("nan")
            row[5] = float("nan")
        row[6] = df_row["AnzahlGeheiltTaeglich"]
        row[7] = df_row["AnzahlTotTaeglich"]



        output.append(tuple(row))

    return output


def data_czech_rep():
    ...
    


def data_poland():
    ...
    

def data_world():
    print("formatting data...")
    output = []
    path = CURRENT_DIR + '/../storage/world.csv'
    data = pd.read_csv(path)


    columns = ["Name", "Cases - cumulative total", "Cases - cumulative total per 1 million population", "Cases - newly reported in last 7 days",
     "Cases - newly reported in last 24 hours", "Deaths - cumulative total", "Deaths - cumulative total per 1 million population", "Deaths - newly reported in last 7 days", "Deaths - newly reported in last 24 hours"]

    for index, df_row in data.iterrows():
        row = []
        for column in columns:
            if column == "Name":
                df_row[column] = df_row[column].replace("'", "")
            row.append(df_row[column])

        output.append(tuple(row))

    return output

def data_vaccination():
    print("formatting data...")
    output = []
    path = CURRENT_DIR + '/../storage/vaccination.xlsx'

    xlsx = pd.ExcelFile(path , engine='openpyxl')
    data_region = pd.read_excel(xlsx, 1)
    data_daily = pd.read_excel(xlsx, 2)

    columns = ["Bundesland", "Impfungen kumulativ", "Differenz zum Vortag", "", ""]

    for index, df_row in data_region.iterrows():
        row = []
        for column in columns:
            if column == "":
                row.append(float("nan"))
            else:
                row.append(df_row[column])

        output.append(tuple(row))

    columns = ["", "", "", "Datum", "Gesamtzahl Impfungen"]

    data_daily.dropna(inplace=True)
    data_daily.drop(data_daily.tail(1).index,inplace=True)

    for index, df_row in data_daily.iterrows():
        row = []
        for column in columns:
            if column == "":
                row.append(float("nan"))
            elif column == "Datum":
                row.append(str(df_row[column]))
            else:
                row.append(df_row[column])
        output.append(tuple(row))

    return output

if __name__ == "__main__":

    data_vaccination()
