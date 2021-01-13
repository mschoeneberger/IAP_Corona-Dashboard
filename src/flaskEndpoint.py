from flask import Flask, request, send_from_directory
from flask_cors import CORS
from postgresAPI import executeSelect
import json

app = Flask(__name__)
CORS(app)

# /fetchData?table=germany&startdate=10.02.2020&enddate=15.02.2020&values=cases
@app.route('/fetchData')
def fetchData():
    #if key doesn't exist, returns None
    table = request.args.get('table')
    values = request.args.get('values')
    group_by = request.args.get('group_by')

    data = executeSelect(table, values, group_by)

    # try to return json, return pure data if not json-able (error in SQL)
    # TODO: convert date to string
    try:
        return json.dumps(data)
    except:
        return "ERROR:" + str(data)

@app.route('/dataWorld')
def dataWorld():
    ...


@app.route('/')
def default():
    return '''<h1>IAP_Corona_Dashboard - Flask-Endpoint</h1>'''

if __name__ == "__main__":
    ...