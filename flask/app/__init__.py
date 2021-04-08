from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

app = Flask(__name__, static_folder='../build', static_url_path='/')
app.config.from_object(Config)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db, compare_type=True)

from app import models
from app.api import bp as api_bp
from app.models import User

app.register_blueprint(api_bp, url_prefix='/api')

#Activate login functionality and turn redirects to login page
login_manager = LoginManager(app)
#Is this supposed to be api.user, its supposed to define the route for login
login_manager.login_view = 'api.login'
login_manager.init_app(app)
login_manager.session_protection = "strong"

@app.route('/')
def index():
    return app.send_static_file('index.html')

#Returns 401 errors if you access pages while not logged in
@login_manager.unauthorized_handler
def unauthorized():
    return 'not authorized', 401

#Gets the current user from cookie data stored in browser
@login_manager.user_loader
def load_user(user_id):

    user_id = User.query.get(int(user_id))
    db.session.commit()
    return user_id

#Used to shutdown the session
@app.teardown_appcontext
def shutdown_session(exception=None):
    db.session.remove()
