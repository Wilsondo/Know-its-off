from flask import Blueprint
routes = Blueprint('routes', __name__)

from api.routes import index
from api.routes import device
from api.routes import user
from api.routes import webhook
from api.routes import errors
from api.routes import login
from api.routes import logout
# Add more routes here as we need them.
