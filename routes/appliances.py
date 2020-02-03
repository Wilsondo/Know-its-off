from flask import request, abort, jsonify
from . import routes
import sys
sys.path.append('../..')
from main import db
from models import *
from cerberus import Validator

appliance_schema = {
                    "name": {"type": "string", "maxlength": 64, "nullable": True}, 
                    "type": {"type": "string", "maxlength": 64, "nullable": True},
                    "status": {"type": "boolean", "nullable": True}
                   }


v = Validator(appliance_schema)

@routes.route('/appliances', methods=['POST','GET'])
def appliances_get_post():
    if request.method == 'POST':
        if not v.validate(request.get_json()):
            abort(400, description=v.errors)
        new_appliance = Appliance(**request.get_json())
        db.session.add(new_appliance)
        db.session.commit()
        return jsonify(new_appliance.to_dict()), 201
    elif request.method == 'GET':
        results = db.session.query(Appliance, Scout).outerjoin(Scout, Appliance.id == Scout.appliance_id).all()
        myList = []
        print(results)
        for row in results:
            my_dict = row[0].to_dict()
            if row[1]:
                my_dict["scout"] = row[1].to_dict()
            else:
                my_dict["scout"] = None
            myList.append(my_dict)
        return jsonify(myList), 200

@routes.route('/appliances/<id>', methods=['GET', 'PATCH', 'DELETE'])
def appliances_get_patch_delete_by_id(id):
    myAppliance = Appliance.query.get(id)
    if myAppliance is None:
        abort(404, description="This appliance does not exist")
    if request.method == 'GET':
        return jsonify(myAppliance.to_dict()), 200
    elif request.method == 'PATCH':
        if not v.validate(request.get_json()):
            abort(400, description=v.errors)
        # Note that this update function is specified in models.py
        myAppliance.update(request.get_json()) 
        db.session.commit()
        return jsonify(myAppliance.to_dict()), 200
    elif request.method == 'DELETE':
        db.session.delete(myAppliance)
        db.session.commit()
        return '', 204
