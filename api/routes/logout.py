from flask import request, abort, jsonify, redirect
from sqlalchemy import text
import sys
sys.path.append('../..')
from api import db, models
from api.routes import routes
from cerberus import Validator
from flask_login import login_required, current_user, logout_user

@routes.route('/logout')
@login_required
def logout():
    logout_user()
    db.session.close()
    return redirect('/')