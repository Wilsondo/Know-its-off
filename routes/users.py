from flask import request, abort, jsonify
from . import routes
import sys
sys.path.append('../..')
from main import db
from models import *


@routes.route('/users', methods=['POST'])
def users_post():
    if request.method == 'POST':
        # TODO: input validation on request body
        #       probably use the package Cerberus
        new_user = User(**request.get_json())
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
        # Note that this update function is specified in models.py
        myUser.update(request.get_json()) 
        db.session.commit()
        return jsonify(myUser.to_dict()), 200
    elif request.method == 'DELETE':
        db.session.delete(myUser)
        db.session.commit()
        return '', 204
