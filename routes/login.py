from flask import request, abort, jsonify
from sqlalchemy import text
from . import routes
import sys
sys.path.append('../..')
from main import db
from models import *
from cerberus import Validator

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
        login_user = request.get_json()
        thing = login_user['email']
        check_user = User.query.filter_by(email=thing).first()
        if not check_user or not check_user.check_password(login_user['password']):
            #error handler, if login is not successful
            abort(403, description="The credentials you entered were incorrect")
        db.session.close()
        return '', 204
