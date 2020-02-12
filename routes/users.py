from flask import request, abort, jsonify
from sqlalchemy import text
from . import routes
import sys
sys.path.append('../..')
from main import db
from models import *
from cerberus import Validator

user_schema = {
                    "first_name": {"type": "string", "maxlength": 64, "nullable": False}, 
                    "last_name": {"type": "string", "maxlength": 64, "nullable": False}, 
                    "phone_number": {"type": "integer", "min": 0, "max": 10000000000, "nullable": True},
                    "email": {"type": "string", "maxlength": 64, "nullable": True},
					"password": {"type": "string", "maxlength": 64, "nullable": False}
                   }


v = Validator(user_schema)

@routes.route('/users', methods=['POST'])
def users_post():
    if request.method == 'POST':
        if not v.validate(request.get_json()):
            abort(400, description=v.errors)
        new_user = User(**request.get_json())
		hashsql = text("SELECT SHA2('" + str(new_user.password) + "', 256)")
		new_user.password = db.session.execute(hashsql)
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict()), 201

@routes.route('/users/<id>', methods=['GET', 'PATCH', 'DELETE'])
def users_get_patch_delete_by_id(id):
    myUser = User.query.get(id)
    if myUser is None:
        abort(404, description="This user does not exist")
    if request.method == 'GET':
        return jsonify(myUser.to_dict()), 200
    elif request.method == 'PATCH':
        if not v.validate(request.get_json()):
            abort(400, description=v.errors)
        # Note that this update function is specified in models.py
        myUser.update(request.get_json()) 
        db.session.commit()
        return jsonify(myUser.to_dict()), 200
    elif request.method == 'DELETE':
        db.session.delete(myUser)
        db.session.commit()
        return '', 204
