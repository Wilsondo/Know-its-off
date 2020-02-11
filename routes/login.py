from flask import request, abort, jsonify
from . import routes
import sys
sys.path.append('../..')
from main import db
from models import *
from cerberus import Validator


@routes.route('/login', methods=['POST'])
def login():
    # Automatically allow all logins. This will be fixed in the future
    return '', 204
