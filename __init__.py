from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
from .database_config import Config
import os
from sqlalchemy.orm import scoped_session, sessionmaker
from flask_login import LoginManager
from flask_cors import CORS, cross_origin

app = Flask(__name__)

app.config.from_object(Config)
app.config['SECRET_KEY'] = '9OLWxND4o83j4K4iuopO'
##cors = CORS(app, resources={r"*":{"origins": "*"}})
#cors = CORS(app)
#logging.getLogger('flask_cors').level = logging.DEBUG
app.config['LOGIN_DISABLED'] = True
db = SQLAlchemy(app)
#SQLAlchemy is supposed to have a preconfigured scoped session, so dont need this
#db_session = scoped_session(sessionmaker(autocommit=False,autoflush=False,bind=db.engine))

from .routes import *
from .models import *
# Uncomment the below line if you need to create the tables.
#db.drop_all()
#db.create_all()
#db.session.add_all([Permission(name="admin"), Permission(name="member")])
#db.session.commit()

# from message_checker import BackgroundThread 

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

if __name__ == '__main__':
    if WEBHOOK_VERIFY_TOKEN is None:
        token = temp_token()
        os.environ["WEBHOOK_VERIFY_TOKEN"] = token
    app.run(host='127.0.0.1', port=5000, debug=True, use_reloader=True)
