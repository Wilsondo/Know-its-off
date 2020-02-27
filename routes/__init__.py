from flask import Blueprint
routes = Blueprint('routes', __name__)

from .index import *
from .appliances import *
from .scouts import *
from .users import *
from .webhook import *
from .errors import *
from .login import *
# Add more routes here as we need them.
