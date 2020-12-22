from flask import request, abort, jsonify, redirect
from sqlalchemy import text
from . import routes
import sys
sys.path.append('../..')
from ..__init__ import db
from ..models import *
from cerberus import Validator
from flask_login import login_required, current_user, logout_user

@routes.route('/logout')
@login_required
def logout():
    logout_user()
    db.session.close()
    return redirect('/')
