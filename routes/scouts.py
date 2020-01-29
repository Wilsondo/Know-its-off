from flask import request, abort, jsonify
from . import routes
import sys
sys.path.append('../..')
from main import db
from models import *


@routes.route('/scouts', methods=['POST','GET'])
def scouts_get_post():
    if request.method == 'POST':
        # TODO: input validation on request body
        #       probably use the package Cerberus
        new_scout = Scout(**request.get_json())
        db.session.add(new_scout)
        db.session.commit()
        return jsonify(new_scout.to_dict()), 201
    elif request.method == 'GET':
        results = Scout.query.all()
        myList = []
        for row in results:
            myList.append(row.to_dict())
        return jsonify(myList), 200

@routes.route('/scouts/<id>', methods=['GET', 'PATCH', 'DELETE'])
def scouts_get_patch_delete_by_id(id):
    myScout = Scout.query.get(id)
    if myScout is None:
        abort(404, description="This scout does not exist")
    if request.method == 'GET':
        return jsonify(myScout.to_dict()), 200
    elif request.method == 'PATCH':
        # Note that this update function is specified in models.py
        myScout.update(request.get_json()) 
        db.session.commit()
        return jsonify(myScout.to_dict()), 200
    elif request.method == 'DELETE':
        db.session.delete(myScout)
        db.session.commit()
        return '', 204
