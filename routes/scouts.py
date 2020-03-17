from flask import request, abort, jsonify
from . import routes
import sys
sys.path.append('../..')
from main import db
from models import *
from cerberus import Validator
from flask_login import login_required, current_user

scout_schema = {
                    "name": {"type": "string", "maxlength": 64, "nullable": True}, 
                    "battery_power": {"type": "float", "min": 0, "max": 1, "nullable": True},
                    "appliance_id": {"type": "integer", "min": 0, "nullable": True}
                   }

v = Validator(scout_schema)

@routes.route('/scouts', methods=['POST','GET'])
@login_required
def scouts_get_post():
    if request.method == 'POST':
        if not v.validate(request.get_json()):
            abort(400, description=v.errors)
        #verify that the appliance exists and belongs to user
        myApp = Appliance.query.filter(Appliance.id==request.get_json()["appliance_id"])
        myApp = myApp.outerjoin(Permission_User_Appliance, Appliance.id == Permission_User_Appliance.appliance_id)
        myApp = myApp.filter_by(user_id=current_user.get_id()).scalar()
        if myApp is None:
            return 'Provided appliance does not exist', 422
        new_scout = Scout(**request.get_json())
        db.session.add(new_scout)
        db.session.commit()
        add_permission_user_scout(new_scout.id)
        returnValue = jsonify(new_scout.to_dict())
        db.session.close()
        return returnValue, 201
    elif request.method == 'GET':
        results = Scout.query.outerjoin(Permission_User_Scout, Scout.id == Permission_User_Scout.scout_id).filter_by(user_id=current_user.get_id()).all()
        myList = []
        for row in results:
            myList.append(row.to_dict())
        db.session.close()
        return jsonify(myList), 200

@routes.route('/scouts/<id>', methods=['GET', 'PATCH', 'DELETE'])
@login_required
def scouts_get_patch_delete_by_id(id):
    #need to verify that the scout belongs to the user
    myScout = Scout.query.outerjoin(Permission_User_Scout, Scout.id==Permission_User_Scout.scout_id).filter_by(scout_id=id, user_id=current_user.get_id()).first()
    if myScout is None:
        db.session.close()
        abort(404, description="This scout does not exist")
    if request.method == 'GET':
        returnValue = jsonify(myScout.to_dict())
        db.session.close()
        return returnValue, 200
    elif request.method == 'PATCH':
        if not v.validate(request.get_json()):
            abort(400, description=v.errors)
        app_id_in_req = "appliance_id" in request.get_json()
        if app_id_in_req:
            #verify appliance exists and belongs to user.
            app_id = int(request.get_json()["appliance_id"])
            if Permission_User_Appliance.query.filter_by(appliance_id=app_id,user_id=current_user.get_id()).scalar() is None:
                return 'Provided appliance does not exist', 422
        # Note that this update function is specified in models.py
        myScout.update(request.get_json()) 
        db.session.commit()
        returnValue = jsonify(myScout.to_dict())
        db.session.close()
        return returnValue, 200
    elif request.method == 'DELETE':
        #delete the permissions first
        perm = Permission_User_Scout.query.filter_by(scout_id=id).first()
        db.session.delete(perm)
        db.session.flush()
        db.session.delete(myScout)
        db.session.commit()
        db.session.close()
        return '', 204

#creates a new permission_user_scout row when posting a scout
def add_permission_user_scout(scout_id):
    user_id = current_user.get_id()
    new_user_scout = Permission_User_Scout()
    new_user_scout.user_id = user_id
    new_user_scout.scout_id = scout_id
    new_user_scout.permission_id = 2
    db.session.add(new_user_scout)
    db.session.commit()
    return jsonify(new_user_scout.to_dict())
