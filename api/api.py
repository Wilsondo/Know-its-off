import time
import os
from flask import Flask, Blueprint
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
import sys

app = Flask(__name__)
app.config.from_object(Config)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

import models
sys.path.insert(1, './routes')
from __init__ import routes


import errors
import index
import login
import logout
import devices
import users
import webhook

app.register_blueprint(routes, url_prefix = '/api')

login_manager = LoginManager(app)
login_manager.login_view = 'routes.login'
@login_manager.unauthorized_handler
def unauthorized():
    return 'not authorized', 401

@login_manager.user_loader
def load_user(user_id):
    user_id = User.query.get(int(user_id))
    #an attempt to fix the annoying "rollback" error when sqlalchemy session timesout
    db.session.commit()
    return user_id

@app.teardown_appcontext
def shutdown_session(exception=None):
    db.session.remove()
    #db_session.remove()


def temp_token():
    import binascii
    temp_token = binascii.hexlify(os.urandom(24))
    return temp_token.decode('utf-8')

WEBHOOK_VERIFY_TOKEN = os.getenv('WEBHOOK_VERIFY_TOKEN')

if WEBHOOK_VERIFY_TOKEN is None:
    token = temp_token()
    os.environ["WEBHOOK_VERIFY_TOKEN"] = token

@app.route('/')
def hello(): 
        return "Hello World!"

@app.route('/time')
def get_current_time():
        return {'time': time.time()}

