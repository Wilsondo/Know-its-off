from flask import request, abort, jsonify
from sqlalchemy import text
from . import routes
import sys
sys.path.append('../..')
from main import db
from models import *
from cerberus import Validator
from flask_login import login_required, current_user

user_schema = {
                    "first_name": {"type": "string", "maxlength": 64, "nullable": True}, 
                    "last_name": {"type": "string", "maxlength": 64, "nullable": True}, 
                    "phone_number": {"type": "integer", "min": 0, "max": 10000000000, "nullable": True},
                    "email": {"type": "string", "maxlength": 64, "nullable": True}
                   }


v = Validator(user_schema, allow_unknown=True)

@routes.route('/users', methods=['POST'])
def users_post():
    if request.method == 'POST':
        obj = request.get_json()
        if not v.validate(obj):
            abort(400, description=v.errors)
        myPassword = obj.pop('password', None)
        new_user = User(**obj)
        new_user.set_password(myPassword)
        db.session.add(new_user)
        db.session.commit()
        print("New user added")
        return jsonify(new_user.to_dict()), 201

@routes.route('/users/<id>', methods=['GET', 'PATCH', 'DELETE'])
@login_required
def users_get_patch_delete_by_id(id):
    if current_user is None:
        abort(404, description="This user does not exist")
    if request.method == 'GET':
        return jsonify(current_user.to_dict()), 200
    elif request.method == 'PATCH':
        obj = request.get_json()
        if not v.validate(obj):
            abort(400, description=v.errors)
        # Note that this update function is specified in models.py
        if "password" in obj:
            current_user.set_password(obj['password'])
        current_user.update(obj) 
        db.session.commit()
        return jsonify(current_user.to_dict()), 200
    elif request.method == 'DELETE':
        db.session.delete(current_user)
        db.session.commit()
        return '', 204
