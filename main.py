from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
from database_config import Config
import os
from sqlalchemy.orm import scoped_session, sessionmaker
from flask_login import LoginManager
from werkzeug.middleware.proxy_fix import ProxyFix

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

app.config.from_object(Config)
app.config['SECRET_KEY'] = '9OLWxND4o83j4K4iuopO'
db = SQLAlchemy(app)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=db.engine))

from routes import *
from models import *


# Uncomment the below line if you need to create the tables.
#db.drop_all()
#db.create_all()

# from message_checker import BackgroundThread 

app.register_blueprint(routes, url_prefix = '/api')

login_manager = LoginManager(app)
login_manager.login_view = 'routes.login'

@login_manager.request_loader
def load_user_from_request(request):
     # first, try to login using the api_key url arg
    api_key = request.args.get('api_key')
    if api_key:
        user = User.query.filter_by(api_key=api_key).first()
        if user:
            return user

    # next, try to login using Basic Auth
    api_key = request.headers.get('Authorization')
    if api_key:
        api_key = api_key.replace('Basic ', '', 1)
        try:
            api_key = base64.b64decode(api_key)
        except TypeError:
            pass
        user = User.query.filter_by(api_key=api_key).first()
        if user:
            return user

    # finally, return None if both methods did not login the user
    return None

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


def temp_token():
    import binascii
    temp_token = binascii.hexlify(os.urandom(24))
    return temp_token.decode('utf-8')

WEBHOOK_VERIFY_TOKEN = os.getenv('WEBHOOK_VERIFY_TOKEN')

if __name__ == '__main__':
    if WEBHOOK_VERIFY_TOKEN is None:
        token = temp_token()
        os.environ["WEBHOOK_VERIFY_TOKEN"] = token
    app.run(host='127.0.0.1', port=9580, debug=True, use_reloader=False)
