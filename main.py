from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from database_config import Config
import os
import automated_email

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)

from routes import *
from models import *
# Uncomment the below line if you need to create the tables.
db.create_all()
app.register_blueprint(routes, url_prefix = '/api')


def temp_token():
    import binascii
    temp_token = binascii.hexlify(os.urandom(24))
    return temp_token.decode('utf-8')

WEBHOOK_VERIFY_TOKEN = os.getenv('WEBHOOK_VERIFY_TOKEN')

if __name__ == '__main__':
    if WEBHOOK_VERIFY_TOKEN is None:
        token = temp_token()
        os.environ["WEBHOOK_VERIFY_TOKEN"] = token
    app.run(host='127.0.0.1', port=8080, debug=True, use_reloader=False)
