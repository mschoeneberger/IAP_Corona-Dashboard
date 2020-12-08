import requests
import json
import os


def connect_to_endpoint(url):
    response = requests.request("GET", url)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(
            "Request returned an error: {} {}".format(
                response.status_code, response.text
            )
        )
    return response.json()


def getJsonData(label, url):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    path = current_dir + '/../storage/' + label + '.json'
    data = connect_to_endpoint(url)

    with open(path, 'w') as output:
        output.write(json.dumps(data, indent=4))


if __name__ == "__main__":
    print("You are doing great! :)")