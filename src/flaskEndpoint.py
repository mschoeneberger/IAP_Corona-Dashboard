from flask import Flask, request, send_from_directory
from flask_cors import CORS
import psycopg2
import json

app = Flask(__name__)
CORS(app)


@app.route('/fetchData')
def fetchData():
    #if key doesn't exist, returns None
    country = request.args.get('country')
    startdate = request.args.get('startdate')
    enddate = request.args.get('enddate')
    values = request.args.get('values')

    # /fetchData?country=Germany&startdate=10.02.2020&enddate=15.02.2020&values=cases

    # send args to a buildSQL() func to get a SQL statement string, send that to executeSQL, receive SQL data,
    # throw it into a json


    return '''<h1>Sending Data from {} to {} for {}</h1>'''.format(startdate, enddate, country)

@app.route('/')
def send_static(path):
    return send_from_directory('../storage/results', path)

if __name__ == "__main__":
    ...