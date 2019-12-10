from flask import Blueprint
routes = Blueprint('routes', __name__)

from .index import *
from .appliances import *
from .errors import *
# Add more routes here as we need them.
