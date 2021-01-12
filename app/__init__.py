import os
from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

app = Flask(__name__)
app.config.from_object(Config)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import models
from app.api import bp as api_bp

app.register_blueprint(api_bp, url_prefix='/api')

#TODO Fix logins, they aren't triggering properly, giving us 401's
#As we can't log in, we can't get user ID either
login_manager = LoginManager(app)
#Is this supposed to be api.user, its supposed to define the route for login
login_manager.login_view = 'api.user'
login_manager.init_app(app)


@login_manager.unauthorized_handler
def unauthorized():
    return 'not authorized', 401

#Supposed to return the user object from flask login manager
#Look through later https://docs.sqlalchemy.org/en/14/orm/query.html
# method sqlalchemy.orm.Query.get(ident)
@login_manager.user_loader
def load_user(user_id):
    #This seems to get the unicode user ID and does an SQL query to get the object
    #But I'm pretty sure we never stored the object in the database
    #What is the point of the query specifically?
   user_id = User.session.get(int(user_id))
   db.session.commit()
#    Why are we running get twice?
   return User.get(user_id)
   #return user_id

@app.teardown_appcontext
def shutdown_session(exception=None):
    db.session.remove()


def temp_token():
    import binascii
    temp_token = binascii.hexlify(os.urandom(24))
    return temp_token.decode('utf-8')

WEBHOOK_VERIFY_TOKEN = os.getenv('WEBHOOK_VERIFY_TOKEN')

if WEBHOOK_VERIFY_TOKEN is None:
        token = temp_token()
        os.environ["WEBHOOK_VERIFY_TOKEN"] = token
