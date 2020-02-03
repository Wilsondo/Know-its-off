from flask import request, abort, jsonify
from . import routes
import sys
sys.path.append('../..')
from main import db
from models import *
from cerberus import Validator

scout_schema = {
                    "name": {"type": "string", "maxlength": 64, "nullable": True}, 
                    "battery_power": {"type": "float", "min": 0, "max": 1, "nullable": True},
                    "appliance_id": {"type": "integer", "min": 0, "nullable": True}
                   }


v = Validator(scout_schema)

@routes.route('/scouts', methods=['POST','GET'])
def scouts_get_post():
    if request.method == 'POST':
        if not v.validate(request.get_json()):
            abort(400, description=v.errors)
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
        if not v.validate(request.get_json()):
            abort(400, description=v.errors)
        # Note that this update function is specified in models.py
        myScout.update(request.get_json()) 
        db.session.commit()
        return jsonify(myScout.to_dict()), 200
    elif request.method == 'DELETE':
        db.session.delete(myScout)
        db.session.commit()
        return '', 204
