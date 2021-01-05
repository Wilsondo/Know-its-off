import time
from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(Config)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

import models

@app.route('/')
def hello(): 
        return "Hello World!"

@app.route('/api/time')
def get_current_time():
        return {'time': time.time()}

