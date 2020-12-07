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


def getJSONData(label, url):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    path = current_dir + '/../storage/' + label + '.json'
    data = connect_to_endpoint(url)

    with open(path, 'w') as output:
        output.write(json.dumps(data, indent=4, sort_keys=True))


# url for full german dataset https://opendata.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0.geojson
# dont know if this link stays the same over time


def main():
    getJSONData("germany", 'https://opendata.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0.geojson')

if __name__ == "__main__":
    main()
    print("You are doing great! :)")