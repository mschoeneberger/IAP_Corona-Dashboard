import psycopg2
import os
import json
import re
from config import config
import retrieveData as rd
from readCountryData import *


def create_tables():

    commands = (
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


def update_denmark():
    print("\n[DENMARK]")
    label = 'denmark'


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
    rd.getCsvData(label + "/cases", 'https://epistat.sciensano.be/Data/COVID19BE_CASES_MUNI.csv')
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
    ...


def update_switzerland():
    print("\n[SWITZERLAND]")
    label = 'switzerland'
    rd.getCsvData(label, 'https://raw.github.com/openZH/covid_19/master/COVID19_Fallzahlen_CH_total_v2.csv')
    clearTable(label)
    insertIntoTable(data_switzerland(), label)


def update_austria():
    ...


def update_czech_rep():
    ...


def update_poland():
    ...


def updateTables():
    
    update_germany() # needs review
    update_denmark() # TODO
    update_netherlands() # needs review
    update_belgium()  # storage/belgium/ must exist! # TODO
    update_luxembourg()  # needs review, link changes maybe
    update_france()  # TODO
    update_switzerland()  # needs review
    update_austria()  # TODO
    update_czech_rep()  # TODO
    update_poland()  # TODO

if __name__ == '__main__':
    create_tables()
    # updateTables()
    update_luxembourg()

    
    print("You are doing great! :)") # motivational message