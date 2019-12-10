from flask import request, abort, jsonify
from . import routes
import sys
sys.path.append('../..')
from main import db
from models import *


@routes.route('/appliances', methods=['POST','GET'])
def appliances_get_post():
    if request.method == 'POST':
        # TODO: input validation on request body
        #       probably use the package Cerberus
        new_appliance = Appliance(**request.get_json())
        db.session.add(new_appliance)
        db.session.commit()
        return jsonify(new_appliance.to_dict()), 201
    elif request.method == 'GET':
        results = Appliance.query.all()
        myList = []
        for row in results:
            myList.append(row.to_dict())
        return jsonify(myList), 200

@routes.route('/appliances/<id>', methods=['GET', 'PATCH', 'DELETE'])
def appliances_get_patch_delete_by_id(id):
    myAppliance = Appliance.query.get(id)
    if myAppliance is None:
        abort(404, description="This appliance does not exist")
    if request.method == 'GET':
        return jsonify(myAppliance.to_dict()), 200
    elif request.method == 'PATCH':
        # Note that this update function is specified in models.py
        myAppliance.update(request.get_json()) 
        db.session.commit()
        return jsonify(myAppliance.to_dict()), 200
    elif request.method == 'DELETE':
        db.session.delete(myAppliance)
        db.session.commit()
        return '', 204
