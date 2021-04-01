from flask import Flask, request, send_from_directory
from flask_cors import CORS
import json
import os

from createVisulationData import createWorldData, createGermanyData

CURRENT_DIR = current_dir = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)
CORS(app)


@app.route('/downloadWorldData')
def downloadWorldData():

    createWorldData()

    return "<h1>success <3</h1>"

@app.route('/downloadGermanyData')
def downloadGermanyData():

    createGermanyData()

    return "<h1>success <3</h1>"


@app.route('/dataWorld')
def dataWorld():
    
    file = open(CURRENT_DIR + '/../api_files/world.json')

    return json.dumps(json.load(file))

# makes files in /api_files available via their name
@app.route('/<path:path>')
def send_static(path):
    return send_from_directory('../api_files', path)


@app.route('/')
def default():
    return '''<h1>IAP_Corona_Dashboard - Flask-Endpoint</h1>'''