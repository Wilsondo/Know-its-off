from flask import request, abort, jsonify
from sqlalchemy import text
from . import routes
import sys
sys.path.append('../..')
from main import db
from models import *
from cerberus import Validator
from flask_login import login_required, current_user

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('routes.login', _scheme='https'))
