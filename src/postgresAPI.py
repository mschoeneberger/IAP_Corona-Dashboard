import psycopg2
import os
import json
from config import config
import retrieveData
from readCountryData import *


def insertIntoTable(data, table):

    sql = "INSERT INTO {} VALUES{}"

    conn = None
    try:
        params = config() # read database configuration
        conn = psycopg2.connect(**params) # connect to the PostgreSQL database
        cur = conn.cursor() # create a new cursor

        # execute the INSERT statements
        for row in data:
            sql_final = sql.format(table, str(row))
            cur.execute(sql_final)

        conn.commit() # commit the changes to the database
        cur.close()  # close communication with the database
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


def clearTable(table):

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


def updateTables():

    # Germany
    label = 'germany'
    rd.getJsonData(label, 'https://opendata.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0.geojson')
    clearTable(label)
    insertIntoTable(data_germany(), label)

    # Denmark

    # Netherlands

    # Belgium

    # Luxembourg

    # France

    # Switzerland

    # Austria

    # Czech Republic

    # Poland

if __name__ == '__main__':
    updateTables()
    
    print("You are doing great! :)")