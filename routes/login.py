from flask import request, abort, jsonify, Response, redirect
from sqlalchemy import text
from . import routes
import sys
sys.path.append('../..')
from ..__init__ import db
from ..models import *
from cerberus import Validator
from flask_login import login_user

user_schema = {
                    "email": {"type": "string", "maxlength": 64, "nullable": True},
		    "password": {"type": "string", "maxlength": 64, "nullable": False}
                   }


v = Validator(user_schema, allow_unknown=True)

@routes.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        if not v.validate(request.get_json()):
            abort(400, description=v.errors)
        user_data = request.get_json()
        user_email = user_data['email']
        check_user = User.query.filter_by(email=user_email).first()
        if not check_user or not check_user.check_password(user_data['password']):
            #error handler, if login is not successful
            abort(403, description="The credentials you entered were incorrect")
        result = login_user(check_user)
        db.session.close()
        if result:
            return '', 204
        else:
            return 'Unauthorized', 401