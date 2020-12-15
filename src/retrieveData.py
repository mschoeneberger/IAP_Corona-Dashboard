import requests
import json
import os
import pandas as pd


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
    current_dir = os.path.dirname(os.path.abspath(__file__))
    path = current_dir + '/../storage/' + label + '.json'
    data = connect_to_endpoint(url).json()

    with open(path, 'w') as output:
        output.write(json.dumps(data, indent=4))
    
    print("data successfully saved in storage!")


def getCsvData(label, url):
    print("downloading data...")
    current_dir = os.path.dirname(os.path.abspath(__file__))
    path = current_dir + '/../storage/' + label + '.csv'
    data = pd.read_csv(url)

    data.to_csv(path)

    print("data successfully saved in storage!")

if __name__ == "__main__":

    getCsvData('switzerland', 'https://raw.github.com/openZH/covid_19/master/COVID19_Fallzahlen_CH_total_v2.csv')
    print("You are doing great! :)")
