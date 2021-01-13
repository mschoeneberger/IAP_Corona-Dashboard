import retrieveData as rd
import pandas as pd
import os


CURRENT_DIR = current_dir = os.path.dirname(os.path.abspath(__file__))

# 24-04 bis 20-12
# bundesland,gemeindeschluessel,anzahl_meldebereiche,faelle_covid_aktuell,faelle_covid_aktuell_beatmet,anzahl_standorte,betten_frei,betten_belegt,daten_stand
# bundesland,gemeindeschluessel,anzahl_meldebereiche,faelle_covid_aktuell,faelle_covid_aktuell_beatmet,anzahl_standorte,betten_frei,betten_belegt,daten_stand


def download_its_data():
    numbers =  []
    for n in range(202):
        numbers.append(7260 + n)
    numbers += [7463, 7467, 7469, 7471, 7473, 7475, 7477]
    for n in range(53):
        numbers.append(7482 + (n * 2))

    for number in numbers:
        url = 'https://edoc.rki.de/bitstream/handle/176904/' + str(number) + '/its_data.csv?sequence=1&isAllowed=y'
        rd.indirectLinkCsv('ger_its/' + str(number), url)

7265


if __name__ == "__main__":

    ...