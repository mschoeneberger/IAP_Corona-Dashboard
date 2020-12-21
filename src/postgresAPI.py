import psycopg2
import os
import json
import re
from config import config
import retrieveData as rd
from readCountryData import *



"""
CREATE TABLE germany_its (
    date DATE,
    bundesland INT,
    gemeinde INT,
    faelle INT,
    faelle_beatmet INT,
    betten_frei INT,
    betten_belegt INT
)
"""



def create_tables():

    commands = (
        """DROP TABLE denmark""",
        """DROP TABLE luxembourg""",
        """DROP TABLE netherlands""",
        """DROP TABLE switzerland""",
        """DROP TABLE belgium""",
        """DROP TABLE france""",
        """
        CREATE TABLE denmark (
            date DATE,
            region VARCHAR(255),
            tested INT,
            cases INT,
            deceased INT
        )
        """,
        """
        CREATE TABLE switzerland (
            date DATE,
            region VARCHAR(255),
            tested INT,
            cases INT,
            current_hosp INT,
            current_icu INT,
            recovered INT,
            deceased INT
        )
        """,
        """
        CREATE TABLE netherlands (
            date DATE,
            region VARCHAR(255),
            cases INT,
            new_hosp INT,
            deceased INT
        )
        """,
        """
        CREATE TABLE luxembourg (
            date DATE,
            tested INT,
            cases INT,
            current_hosp INT,
            current_icu INT,
            deceased INT
        )
        """,
        """
        CREATE TABLE belgium (
            date DATE,
            region VARCHAR(255),
            tested INT,
            cases INT,
            new_hosp INT,
            current_hosp INT,
            current_icu INT,
            deceased INT
        )
        """,
        """
        CREATE TABLE france (
            date DATE,
            region VARCHAR(255),
            tested INT,
            cases INT
        )
        """

    )

    conn = None
    try:
        params = config() # read database configuration
        conn = psycopg2.connect(**params) # connect to the PostgreSQL database
        cur = conn.cursor() # create a new cursor

        # execute the CREATE TABLE statements
        for command in commands:
            cur.execute(command)

        conn.commit() # commit the changes to the database
        cur.close()  # close communication with the database
    
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

def insertIntoTable(data, table):

    print("postgreSQL: inserting data into table...")

    sql = "INSERT INTO {} VALUES {}"

    conn = None
    try:
        params = config() # read database configuration
        conn = psycopg2.connect(**params) # connect to the PostgreSQL database
        cur = conn.cursor() # create a new cursor

        # execute the INSERT statements
        for row in data:
            sql_final = sql.format(table, row)
            sql_final = re.sub('(nan)', 'NULL', sql_final) # replace nan with NULL for postgres
            cur.execute(sql_final)

        conn.commit() # commit the changes to the database
        cur.close()  # close communication with the database
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


def clearTable(table):

    print("postgreSQL: clearing existing data from table...")

    sql = "DELETE FROM {}"

    conn = None
    try:
        params = config() # read database configuration
        conn = psycopg2.connect(**params) # connect to the PostgreSQL database
        cur = conn.cursor() # create a new cursor

        cur.execute(sql.format(table)) # execute the DELETE statement

        conn.commit() # commit the changes to the database
        cur.close()  # close communication with the database
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


# url for german dataset: 'https://opendata.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0.geojson'


def update_germany():
    print("\n[GERMANY]")
    label = 'germany'
    rd.getJsonData(label, 'https://opendata.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0.geojson')
    clearTable(label)
    insertIntoTable(data_germany(), label)


def update_germany_its():
    print("\n[GERMANY ITS]")
    label = 'germany_its'
    rd.getCsvData('ger_its/current', 'https://diviexchange.blob.core.windows.net/%24web/DIVI_Intensivregister_Auszug_pro_Landkreis.csv')
    clearTable(label)
    insertIntoTable(data_germany_its(), label)


def update_denmark():
    print("\n[DENMARK]")
    label = 'denmark'
    rd.getZippedCsvData(label, 'https://files.ssi.dk/covid19/overvagning/data/data-epidemiologiske-rapport-18122020-py43')
    format_denmark_csv()
    clearTable(label)
    insertIntoTable(data_denmark(), label)


def update_netherlands():
    print("\n[NETHERLANDS]")
    label = 'netherlands'
    rd.getJsonData(label + "/data", 'https://raw.github.com/J535D165/CoronaWatchNL/master/data-json/data-provincial/RIVM_NL_provincial.json')
    rd.getCsvData(label + "/tests", 'https://raw.github.com/J535D165/CoronaWatchNL/master/data-misc/data-test/RIVM_NL_test_latest.csv')
    clearTable(label)
    insertIntoTable(data_netherlands(), label)


def update_belgium():
    print("\n[BELGIUM]")
    label = 'belgium'
    rd.getCsvData(label + "/cases", 'https://epistat.sciensano.be/Data/COVID19BE_CASES_AGESEX.csv')
    rd.getCsvData(label + "/deaths", 'https://epistat.sciensano.be/Data/COVID19BE_MORT.csv')
    rd.getCsvData(label + "/hospital", 'https://epistat.sciensano.be/Data/COVID19BE_HOSP.csv')
    rd.getCsvData(label + "/tests", 'https://epistat.sciensano.be/Data/COVID19BE_tests.csv')
    clearTable(label)
    insertIntoTable(data_belgium(), label)


def update_luxembourg():
    print("\n[LUXEMBOURG]")
    label = 'luxembourg'
    rd.indirectLinkCsv(label, 'https://data.public.lu/fr/datasets/r/767f8091-0591-4b04-9a6f-a9d60cd57159')
    clearTable(label)
    insertIntoTable(data_luxembourg(), label)


def update_france():
    print("\n[FRANCE]")
    label = 'france'
    rd.indirectLinkCsv(label, 'https://www.data.gouv.fr/fr/datasets/r/406c6a23-e283-4300-9484-54e78c8ae675')
    format_france_csv()
    clearTable(label)
    insertIntoTable(data_france(), label)


def update_switzerland():
    print("\n[SWITZERLAND]")
    label = 'switzerland'
    rd.getCsvData(label, 'https://raw.github.com/openZH/covid_19/master/COVID19_Fallzahlen_CH_total_v2.csv')
    clearTable(label)
    insertIntoTable(data_switzerland(), label)


def update_austria():
    print("\n[AUSTRIA]")
    label = 'austria'
    rd.getCsvData(label, 'https://covid19-dashboard.ages.at/data/CovidFaelle_Timeline.csv')
    #clearTable(label)
    #insertIntoTable(data_austria(), label)


def update_czech_rep():
    ...


def update_poland():
    ...


def updateTables():
    
    update_germany() # needs review
    update_denmark() # needs review
    update_netherlands() # needs review
    update_belgium()  # needs review, storage/belgium/ must exist! 
    update_luxembourg()  # needs review, link changes maybe
    update_france()  # needs review
    update_switzerland()  # needs review
    #update_austria()  # TODO
    #update_czech_rep()  # TODO
    #update_poland()  # TODO

if __name__ == '__main__':
    create_tables()
    #updateTables()
    update_austria()

    
    print("You are doing great! :)") # motivational message