from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
from database_config import Config
import os
from sqlalchemy.orm import scoped_session, sessionmaker

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=db.engine))

from routes import *
from models import *
# Uncomment the below line if you need to create the tables.
#db.drop_all()
db.create_all()

# from message_checker import BackgroundThread 

app.register_blueprint(routes, url_prefix = '/api')

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
