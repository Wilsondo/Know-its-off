from flask import Blueprint
routes = Blueprint('routes', __name__)

import index
import devices
import users
import webhook
import errors
import login
import logout
# Add more routes here as we need them.