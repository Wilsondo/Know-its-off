from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from database_config import Config

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)


from models import *

db.drop_all()
db.create_all()
db.session.add_all([Permission(name="admin"), Permission(name="member")])
db.session.commit()
