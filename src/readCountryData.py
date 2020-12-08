import json
import os


def data_germany():
    print("formatting data...")
    output = []
    current_dir = os.path.dirname(os.path.abspath(__file__))
    path = current_dir + '/../storage/germany.json'
    data = open(path, 'r')
    json_iter = json.loads(data.read())["features"]
    
    for element in json_iter:
        element_dict = element["properties"]
        row = [None] * 15
        row[0] = element_dict["IdBundesland"]
        row[1] = element_dict["Bundesland"]
        row[2] = element_dict["IdLandkreis"]
        row[3] = element_dict["Landkreis"]
        row[4] = element_dict["Geschlecht"]
        row[5] = element_dict["Altersgruppe"]
        row[6] = element_dict["AnzahlFall"]
        row[7] = element_dict["AnzahlTodesfall"]
        row[8] = element_dict["Meldedatum"]
        row[9] = element_dict["NeuerFall"]
        row[10] = element_dict["Refdatum"]
        row[11] = element_dict["AnzahlGenesen"]
        row[12] = element_dict["NeuGenesen"]
        row[13] = bool(element_dict["IstErkrankungsbeginn"])
        row[14] = element_dict["ObjectId"]
        output.append(tuple(row))

    return output