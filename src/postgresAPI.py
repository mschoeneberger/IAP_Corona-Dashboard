import psycopg2
import os
import json
import re
from config import config
import retrieveData as rd
from readCountryData import *


def create_tables():

    # table vendors just for testing purposes
    commands = (
        """
        CREATE TABLE switzerland (
            date DATE,
            canton_abbr VARCHAR(255),
            tested INT,
            cases INT,
            new_hosp INT,
            current_hosp INT,
            current_icu INT,
            recovered INT,
            deceased INT
        )
        """,
        """
        CREATE TABLE vendors (
            vendor_id SERIAL PRIMARY KEY,
            vendor_name VARCHAR(255) NOT NULL
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
# url for france dataset: 'https://raw.githubusercontent.com/opencovid19-fr/data/master/dist/chiffres-cles.json'


def updateTables():

    # Germany
    print("\n[GERMANY]")
    label = 'germany'
    rd.getJsonData(label, 'https://opendata.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0.geojson')
    clearTable(label)
    insertIntoTable(data_germany(), label)

    # Denmark

    # Netherlands

    # Belgium

    # Luxembourg

    # France
    # print("\n[FRANCE]")
    # label = 'france'
    # rd.getJsonData(label, 'https://raw.githubusercontent.com/opencovid19-fr/data/master/dist/chiffres-cles.json')

    # Switzerland
    print("\n[SWITZERLAND]")
    label = 'switzerland'
    rd.getCsvData(label, 'https://raw.github.com/openZH/covid_19/master/COVID19_Fallzahlen_CH_total_v2.csv')
    clearTable(label)
    insertIntoTable(data_switzerland(), label)

    # Austria

    # Czech Republic

    # Poland

if __name__ == '__main__':
    # create_tables()
    updateTables()


    
    print("You are doing great! :)") # motivational message