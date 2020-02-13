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
        login_user = User(**request.get_json())
        check_user = User.query.filter_by(email=login_user.email).first()
        hashsql = text("SELECT SHA2('" + str(login_user.password) + "', 256)")
        login_user.password = db.session.execute(hashsql)
	#if the user does not exist or the password does not match
        if not check_user or not (login_user.password is check_user.password):
            #error handler, for now we do a 404 butshould replace later
            abort(404, description="The credentials you entered were incorrect")
        return '', 204
