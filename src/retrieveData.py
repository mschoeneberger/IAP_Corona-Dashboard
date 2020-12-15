import requests
import json
import os
import pandas as pd
from io import BytesIO
from urllib.request import urlopen
from zipfile import ZipFile


CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))


def connect_to_endpoint(url):
    response = requests.request("GET", url)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(
            "Request returned an error: {} {}".format(
                response.status_code, response.text
            )
        )
    return response


def getJsonData(label, url):
    print("downloading data...")
    path = CURRENT_DIR + '/../storage/' + label + '.json'
    data = connect_to_endpoint(url).json()

    with open(path, 'w') as output:
        output.write(json.dumps(data, indent=4))
    
    print("data successfully saved in storage!")


def getCsvData(label, url):
    print("downloading data...")
    path = CURRENT_DIR + '/../storage/' + label + '.csv'
    data = pd.read_csv(url)

    data.to_csv(path)

    print("data successfully saved in storage!")


def getZippedCsvData(label, url):
    print("downloading data...")
    path = CURRENT_DIR + '/../storage/' + label

    with urlopen(url) as zipresp:
        with ZipFile(BytesIO(zipresp.read())) as zipfile:
            zipfile.extractall(path)

    print("data successfully saved in storage!")


if __name__ == "__main__":

    getZippedCsvData('denmark', 'https://files.ssi.dk/covid19/overvagning/data/data-epidemiologiske-rapport-08122020-asma')
    print("You are doing great! :)")
