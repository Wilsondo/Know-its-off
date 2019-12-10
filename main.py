from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)

from routes import *
from models import *
app.register_blueprint(routes, url_prefix = '/api')



if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
