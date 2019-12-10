from flask import render_template
from . import routes
import sys
sys.path.append('../..')
from main import db 

@routes.route('/')
def index():
    return 'This is the API.'
