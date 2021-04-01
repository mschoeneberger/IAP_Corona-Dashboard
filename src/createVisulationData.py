import retrieveData as rd
import json
import requests
import os
import math
import copy
import pandas as pd
from datetime import datetime


CURRENT_DIR = current_dir = os.path.dirname(os.path.abspath(__file__))


def createWorldData():

    countryIsoCodes = json.load(open(CURRENT_DIR + '/../storage/country_iso2.json'))
    world = {}

    # download files
    for country in countryIsoCodes:
        try:
            rd.getJsonData("world/" + country['name'], 'https://mahabub81.github.io/covid-19-api/api/v1/countries/' + country['alpha-2'] + '.json')
            
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
    rd.getZippedCsvData('denmark', 'https://files.ssi.dk/covid19/overvagning/data/data-epidemiologisk-rapport-02032021-2bak')

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
        row['date'] = df_row["SampleDate"]  # Date
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
                row['tested'] = 0
                row['deaths'] = 0
            row['region'] = column # region
            row['cases'] = df_row[column] # cases

            if isinstance(row["cases"], int):
                output.append(copy.deepcopy(row))

        
    
    with open(CURRENT_DIR + '/../api_files/denmark.json', 'w') as outfile:
        json.dump(output, outfile, indent=4)


def reformatDenmarkData():
    # date
    # tested
    # deaths
    # region
    # cases

    with open(CURRENT_DIR + '/../api_files/denmark.json', 'r') as infile:
        denmark = json.load(infile)

        output = []
        country = "denmark"

        totalDeaths = {}
        totalCases = {}
        cases21Days = {}
        new_feature = {}

        for feature in denmark:

            if feature["region"] not in totalDeaths:
                totalDeaths[feature["region"]] = 0
            if feature["region"] not in totalCases:
                totalCases[feature["region"]] = 0

            totalDeaths[feature["region"]] += feature["deaths"]
            totalCases[feature["region"]] += feature["cases"]

            if feature["region"] not in cases21Days:
                cases21Days[feature["region"]] = []

            cases21Days[feature["region"]].append(feature["cases"])
            if len(cases21Days[feature["region"]]) == 22:
                cases21Days[feature["region"]].pop(0)

            new_feature["region"] = feature["region"]
            new_feature["country"] = country
            new_feature["date"] = feature["date"]
            new_feature["totalCases"] = totalCases[feature["region"]]
            new_feature["newCases7Days"] = sum(cases21Days[feature["region"]][-7:])
            new_feature["newCases21Days"] = sum(cases21Days[feature["region"]])
            new_feature["totalDeaths"] = totalDeaths[feature["region"]]

            output.append(copy.deepcopy(new_feature))

        with open(CURRENT_DIR + '/../api_files/denmark_new.json', 'w') as outfile:
            json.dump(output, outfile, indent=4)

            
def createNetherlandsData():
    # download data
    rd.getJsonData("netherlands/data", 'https://raw.github.com/J535D165/CoronaWatchNL/master/data-json/data-provincial/RIVM_NL_provincial.json')
    rd.getCsvData("netherlands/tests", 'https://raw.github.com/J535D165/CoronaWatchNL/master/data-misc/data-test/RIVM_NL_test_latest.csv')

    output = []
    path = CURRENT_DIR + '/../storage/netherlands/'
    data = open(path + "/data.json", 'r')
    # tests = open(path + "/tests.csv", 'r') # TODO: TBD

    json_iter = json.loads(data.read())["data"]

    for element in json_iter:
        row = {}
        row["date"] = element["Datum"]
        row["region"] = element["Provincienaam"]  # region
        if element["totaalAantal"] is None:
            row["cases"] = 0
        else: 
            row["cases"] = element["totaalAantal"]  # cases
        if element["ziekenhuisopnameAantal"] is None:
            row["hospital"] = 0
        else: 
            row["hospital"] = element["ziekenhuisopnameAantal"]  # hospital
        if element["overledenAantal"] is None:
            row["deaths"] = 0
        else:
            row["deaths"] = element["overledenAantal"]  # deaths
        # row = [0 if e == None else e for e in row]
        output.append(row)

    with open(CURRENT_DIR + '/../api_files/netherlands.json', 'w') as outfile:
        json.dump(output, outfile, indent=4)


def createBelgiumData():
    label = "belgium"

    # download data
    rd.getCsvData(label + "/cases", 'https://epistat.sciensano.be/Data/COVID19BE_CASES_AGESEX.csv')
    rd.getCsvData(label + "/deaths", 'https://epistat.sciensano.be/Data/COVID19BE_MORT.csv')
    rd.getCsvData(label + "/hospital", 'https://epistat.sciensano.be/Data/COVID19BE_HOSP.csv')
    rd.getCsvData(label + "/tests", 'https://epistat.sciensano.be/Data/COVID19BE_tests.csv')

    
    # formating data
    output = []
    path = CURRENT_DIR + '/../storage/belgium/'

    cases = pd.read_csv(path + "cases.csv")
    deaths = pd.read_csv(path + "deaths.csv")
    hospital = pd.read_csv(path + "hospital.csv")
    tested = pd.read_csv(path + "tests.csv")

    cases.fillna(0, inplace=True)
    deaths.fillna(0, inplace=True)
    hospital.fillna(0, inplace=True)
    tested.fillna(0, inplace=True)

    row = {}
    olddate = '1970-01-01'


    for index, df_row in cases.iterrows():
        if index != 0:
            if (df_row["DATE"] == row["date"]) and (df_row["PROVINCE"] == row["region"]):
                row["cases"] += df_row["CASES"]
                continue
            else:
                output.append(row)
        
        row = {}
        row["date"] = df_row["DATE"]
        row["region"] = df_row["PROVINCE"]
        if row["date"] == 0:
            row["date"] = None
        if row["region"] == 0:
            row["region"] == None
        row["cases"] = df_row["CASES"]
        try:
            row["tested"] = int(tested.loc[(tested["DATE"] == row["date"]) & (tested["PROVINCE"] == row["region"])]["TESTS_ALL"])
        except:
            row["tested"] = 0
        try:
            row["new_hosp"] = int(hospital.loc[(hospital["DATE"] == row["date"]) & (hospital["PROVINCE"] == row["region"])]["NEW_IN"])
            row["current_hosp"] = int(hospital.loc[(hospital["DATE"] == row["date"]) & (hospital["PROVINCE"] == row["region"])]["TOTAL_IN"])
            row["current_icu"] = int(hospital.loc[(hospital["DATE"] == row["date"]) & (hospital["PROVINCE"] == row["region"])]["TOTAL_IN_ICU"])
        except:
            row["new_hosp"] = 0
            row["current_hosp"] = 0
            row["current_icu"] = 0
        if row["date"] != olddate:
            row["deaths"] = int(deaths.loc[deaths["DATE"] == row["date"]]["DEATHS"].sum())
            olddate = row["date"]
        else:
            row["deaths"] = 0

    output.append(row)
    
    with open(CURRENT_DIR + '/../api_files/belgium.json', 'w') as outfile:
        json.dump(output, outfile, indent=4)


def createLuxembourgData():
    # download data
    rd.indirectLinkCsv("luxembourg", 'https://data.public.lu/fr/datasets/r/767f8091-0591-4b04-9a6f-a9d60cd57159')

    # format data
    output = []
    path = CURRENT_DIR + '/../storage/luxembourg.csv'

    data = pd.read_csv(path, encoding='latin-1', sep=";")

    for index, dataframe_row in data.iterrows():
        row = {}
        row["date"] = datetime.strptime(dataframe_row["Date"], '%d/%m/%Y').strftime('%Y-%m-%d')
        row["tested"] = dataframe_row["Nb de tests effectués"]
        row["cases"] = dataframe_row["Nb de positifs"]
        row["current_hosp"] = dataframe_row["Soins normaux"]
        row["current_icu"] = dataframe_row["Soins intensifs"]
        row["deaths"] = dataframe_row["[1.NbMorts]"]

        for key in row:# TODO: look at read_csv(france), dtype ?!?!
            if row[key] == "-":
                row[key] = None
            else:
                try:
                    row[key] = int(row[key])
                except:
                    pass

        output.append(row)

    with open(CURRENT_DIR + '/../api_files/luxembourg.json', 'w') as outfile:
        json.dump(output, outfile, indent=4)


def createFranceData():
    #download data
    rd.indirectLinkCsv("france", 'https://www.data.gouv.fr/fr/datasets/r/406c6a23-e283-4300-9484-54e78c8ae675')

    #format data
    output = []
    path = CURRENT_DIR + '/../storage/france.csv'

    data = pd.read_csv(path, dtype={'dep': str}, sep=";")

    dateold = '1970-01-01'

    row = {}

    for index, df_row in data.iterrows():
        if df_row["jour"] != dateold and index > 0:
            output.append(row)
        row = {}
        row["date"] = df_row["jour"]
        dateold = row["date"]
        row["region"] = df_row["dep"]
        row["tested"] = df_row["T"]
        row["cases"] = df_row["P"]

    output.append(row)

    with open(CURRENT_DIR + '/../api_files/france.json', 'w') as outfile:
        json.dump(output, outfile, indent=4)

# TODO: ask Larry if cases cumulative are ok too
def createSwitzerlandData():
    #download data
    rd.getCsvData("switzerland", 'https://raw.github.com/openZH/covid_19/master/COVID19_Fallzahlen_CH_total_v2.csv')

    output = []
    path = CURRENT_DIR + '/../storage/switzerland.csv'
    data = pd.read_csv(path)

    data.fillna("-", inplace=True)

    for index, dataframe_row in data.iterrows():
        row = {}
        row["date"] = dataframe_row["date"]
        row["region"] = dataframe_row["abbreviation_canton_and_fl"]
        row["tested"] = dataframe_row["ncumul_tested"]
        row["cases"] = dataframe_row["ncumul_conf"]
        row["current_hosp"] = dataframe_row["current_hosp"]
        row["current_icu"] = dataframe_row["current_icu"]
        row["recovered"] = dataframe_row["ncumul_released"]
        row["deaths"] = dataframe_row["ncumul_deceased"]

        for key in row:# TODO: look at read_csv(france), dtype ?!?!
            if row[key] == "-":
                row[key] = 0
            else:
                try:
                    row[key] = int(row[key])
                except:
                    pass

        output.append(row)

    with open(CURRENT_DIR + '/../api_files/switzerland.json', 'w') as outfile:
        json.dump(output, outfile, indent=4)


def createAustriaData():
    #download data
    rd.indirectLinkCsv("austria" + "_fz", 'https://covid19-dashboard.ages.at/data/CovidFaelle_Timeline.csv')
    rd.indirectLinkCsv("austria" + "_hosp", "https://covid19-dashboard.ages.at/data/CovidFallzahlen.csv")

    #format data
    output = []
    path = CURRENT_DIR + '/../storage/austria'
    data = pd.read_csv(path + "_fz.csv", sep=';')
    data_hosp = pd.read_csv(path + "_hosp.csv", sep=';')
    olddate = "1970-01-01"
    olddate_value = 0

    
    for index, df_row in data.iterrows():
        if df_row["BundeslandID"] == 10:
            continue
        row = {}
        row["date"] = datetime.strptime(df_row["Time"], '%d.%m.%Y %X').strftime('%Y-%m-%d')
        row["region"] = df_row["Bundesland"]
        if row["date"] != olddate:
            try:
                new_value = int(data_hosp.loc[(data_hosp["Meldedat"] == df_row["Time"][:10]) & (data_hosp["Bundesland"] == "Alle")]["TestGesamt"])
                row["tested"] = new_value - olddate_value
                olddate_value = new_value
            except:
                row["tested"] = None
        row["cases"] = df_row["AnzahlFaelle"]
        try:
            row["current_hosp"] = int(data_hosp.loc[(data_hosp["Meldedat"] == df_row["Time"][:10]) & (data_hosp["Bundesland"] == df_row["Bundesland"])]["FZHosp"])
            row["current_icu"] = int(data_hosp.loc[(data_hosp["Meldedat"] == df_row["Time"][:10]) & (data_hosp["Bundesland"] == df_row["Bundesland"])]["FZICU"])
        except:
            row["current_hosp"] = None
            row["current_icu"] = None
        row["recovered"] = df_row["AnzahlGeheiltTaeglich"]
        row["deaths"] = df_row["AnzahlTotTaeglich"]

        output.append(row)
    
    with open(CURRENT_DIR + '/../api_files/austria.json', 'w') as outfile:
        json.dump(output, outfile, indent=4)


def download_file(label, url):
    chunk_size = int(os.environ.get("CHUNK_SIZE"))
    # NOTE the stream=True parameter below
    print("downloading", label, "in chunks of size", chunk_size, "...")
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(CURRENT_DIR + '/../storage/' + label, 'wb') as f:
            for chunk in r.iter_content(chunk_size=chunk_size): 
                # If you have chunk encoded response uncomment if
                # and set chunk_size parameter to None.
                #if chunk: 
                f.write(chunk)


def createGermanyData():
    # download_file("germany.json", 'https://opendata.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0.geojson')
    rd.getJsonData("germany", 'https://opendata.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0.geojson')

    output = []
    path = CURRENT_DIR + '/../storage/germany.json'
    data = open(path, 'r')
    json_iter = json.loads(data.read())["features"]

    counter = 0
    for element in json_iter:
        if (counter % 20 == 0):
            print(counter)
        element_dict = element["properties"]
        row = {}
        row["date"] = element_dict["Meldedatum"][:10]
        row["bundesland"] = element_dict["Bundesland"]
        row["landkreis"] = element_dict["Landkreis"]
        row["geschlecht"] = element_dict["Geschlecht"]
        row["altergruppe"] = element_dict["Altersgruppe"]
        row["cases"] = element_dict["AnzahlFall"]
        row["deaths"] = element_dict["AnzahlTodesfall"]
        row["recovered"] = element_dict["AnzahlGenesen"]
        output.append(row)
        counter += 1

    with open(CURRENT_DIR + '/../api_files/germany.json', 'w') as outfile:
        json.dump(output, outfile, indent=4)


def createGermanyITSData():
    rd.getCsvData("germany_its", "https://diviexchange.blob.core.windows.net/%24web/bundesland-zeitreihe.csv")

    output = []
    path = CURRENT_DIR + '/../storage/germany_its.csv'
    data = pd.read_csv(path)

    for index, df_row in data.iterrows():
        row = {}

        row["date"] = df_row["Datum"][:10]
        row["bundesland"] = df_row["Bundesland"]
        row["cases"] = df_row["Aktuelle_COVID_Faelle_Erwachsene_ITS"]
        row["belegte_betten"] = df_row["Belegte_Intensivbetten_Erwachsene"]
        row["freie_betten"] = df_row["Freie_Intensivbetten_Erwachsene"]
        row["freie_iv"] = df_row["Freie_IV_Kapazitaeten_Gesamt"]
        row["freie_iv_covid"] = df_row["Freie_IV_Kapazitaeten_Davon_COVID"]

        output.append(row)
    
    with open(CURRENT_DIR + '/../api_files/germany_its.json', 'w') as outfile:
        json.dump(output, outfile, indent=4)


def createGermanyVaccData():

    rd.indirectLinkXlsx("germany_vacc", "https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Daten/Impfquotenmonitoring.xlsx?__blob=publicationFile")

    output = []
    path = CURRENT_DIR + '/../storage/germany_vacc.xlsx'

    xlsx = pd.ExcelFile(path , engine='openpyxl')
    data_region = pd.read_excel(xlsx, 1)
    data_daily = pd.read_excel(xlsx, 3)

    data_region.dropna(inplace=True)
    #data_region.drop(data_daily.tail(1).index,inplace=True)

    for index, df_row in data_region.iterrows():
        row = {}

        row["bundesland"] = df_row["Bundesland"]
        row["total vacc"] = df_row["Gesamtzahl bisher verabreichter Impfstoffdosen"]
        # row["diff zum vortag"] = df_row["Differenz zum Vortag"]

        output.append(row)

    data_daily.dropna(inplace=True)
    data_daily.drop(data_daily.tail(1).index,inplace=True)

    for index, df_row in data_daily.iterrows():
        row = {}
        row["date"] = str(df_row["Datum"])[:10]
        row["first vacc"] = df_row["Erstimpfung"]
        row["second vacc"] = df_row["Zweitimpfung"]
        row["total"] = df_row["Gesamtzahl verabreichter Impfstoffdosen"]
        output.append(row)

    with open(CURRENT_DIR + '/../api_files/germany_vacc.json', 'w') as outfile:
        json.dump(output, outfile, indent=4)


def reformatGermanyData():

    country = "germany"

    with open(CURRENT_DIR + '/../api_files/' + country + '.json', 'r') as infile:
        c_dict = json.load(infile)

        output = []

        totalDeaths = {}
        totalCases = {}
        cases21Days = {}
        new_feature = {}

        for feature in c_dict:

            if feature["landkreis"] not in totalDeaths:
                totalDeaths[feature["landkreis"]] = 0
            if feature["landkreis"] not in totalCases:
                totalCases[feature["landkreis"]] = 0

            totalDeaths[feature["landkreis"]] += feature["deaths"]
            totalCases[feature["landkreis"]] += feature["cases"]

            if feature["landkreis"] not in cases21Days:
                cases21Days[feature["landkreis"]] = []

            cases21Days[feature["landkreis"]].append(feature["cases"])
            if len(cases21Days[feature["landkreis"]]) == 22:
                cases21Days[feature["landkreis"]].pop(0)

            new_feature["bundesland"] = feature["bundesland"]
            new_feature["landkreis"] = feature["landkreis"]
            new_feature["country"] = country
            new_feature["date"] = feature["date"]
            new_feature["totalCases"] = totalCases[feature["landkreis"]]
            new_feature["newCases7Days"] = sum(cases21Days[feature["landkreis"]][-7:])
            new_feature["newCases21Days"] = sum(cases21Days[feature["landkreis"]])
            new_feature["totalDeaths"] = totalDeaths[feature["landkreis"]]

            output.append(copy.deepcopy(new_feature))

        with open(CURRENT_DIR + '/../api_files/' + country + '_new.json', 'w') as outfile:
            json.dump(output, outfile, indent=4)




def reformatData(country):

    with open(CURRENT_DIR + '/../api_files/' + country + '.json', 'r') as infile:
        c_dict = json.load(infile)

        output = []

        totalDeaths = {}
        totalCases = {}
        cases21Days = {}
        new_feature = {}

        for feature in c_dict:

            if feature["region"] not in totalDeaths:
                totalDeaths[feature["region"]] = 0
            if feature["region"] not in totalCases:
                totalCases[feature["region"]] = 0

            if country != "france":
                totalDeaths[feature["region"]] += feature["deaths"]
            totalCases[feature["region"]] += feature["cases"]

            if feature["region"] not in cases21Days:
                cases21Days[feature["region"]] = []

            cases21Days[feature["region"]].append(feature["cases"])
            if len(cases21Days[feature["region"]]) == 22:
                cases21Days[feature["region"]].pop(0)

            new_feature["region"] = feature["region"]
            new_feature["country"] = country
            new_feature["date"] = feature["date"]
            new_feature["totalCases"] = totalCases[feature["region"]]
            new_feature["newCases7Days"] = sum(cases21Days[feature["region"]][-7:])
            new_feature["newCases21Days"] = sum(cases21Days[feature["region"]])
            new_feature["totalDeaths"] = totalDeaths[feature["region"]]

            output.append(copy.deepcopy(new_feature))

        with open(CURRENT_DIR + '/../api_files/' + country + '_new.json', 'w') as outfile:
            json.dump(output, outfile, indent=4)


# TODO:
# denmark data not up to date ?!?
if __name__ == "__main__":
    #createAustriaData()
    #createBelgiumData()
    #createDenmarkData()
    #createFranceData()
    #createLuxembourgData() TODO link geändert
    #createNetherlandsData()
    #createSwitzerlandData()
    #createWorldData() TODO keine ahnung !?!?
    #createGermanyData()
    #reformatGermanyData()
    createGermanyVaccData()
    createGermanyITSData()
    #reformatDenmarkData()
    #countries = ["france", "austria", "belgium", "netherlands", "switzerland"]
    #for country in countries:
    #    reformatData(country)