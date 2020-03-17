from flask import request, abort, jsonify
from . import routes
import sys
sys.path.append('../..')
from main import db
from models import *
from cerberus import Validator
from flask_login import login_required, current_user

appliance_schema = {
                    "name": {"type": "string", "maxlength": 64, "nullable": True}, 
                    "type": {"type": "string", "maxlength": 64, "nullable": True},
                    "status": {"type": "boolean", "nullable": True},
                    "alert_email": {"type": "boolean", "nullable": True},
                    "alert_text": {"type": "boolean", "nullable": True},
                    "alert_message": {"type": "string", "maxlength": 256, "nullable": True},
                    "alert_text": {"type": "integer", "min": 0, "nullable": True}
                   }


v = Validator(appliance_schema, allow_unknown=True)

@routes.route('/appliances', methods=['POST','GET'])
@login_required
def appliances_get_post():
    if request.method == 'POST':
        if not v.validate(request.get_json()):
            abort(400, description=v.errors)
        request.get_json().pop("id", None)
        new_appliance = Appliance(**request.get_json())
        db.session.add(new_appliance)
        db.session.commit()
        add_permission_user_appliance(new_appliance.id)
        myobj = new_appliance.to_dict()
        db.session.close()
        return jsonify(myobj), 201
    elif request.method == 'GET':
        results = Appliance.query
        results = results.outerjoin(Permission_User_Appliance, Appliance.id == Permission_User_Appliance.appliance_id)
        results = results.filter(Permission_User_Appliance.user_id==current_user.get_id()).all()
        myList = []
        for row in results:
            myList.append(row.to_dict())
        db.session.close()
        return jsonify(myList), 200

@routes.route('/appliances/<id>', methods=['GET', 'PATCH', 'DELETE'])
@login_required
def appliances_get_patch_delete_by_id(id):
    #verify user has authorization
    myAppliance = Appliance.query.filter_by(id=id).outerjoin(Permission_User_Appliance, Appliance.id==Permission_User_Appliance.appliance_id).filter_by(user_id=current_user.get_id()).first()
    if myAppliance is None:
        db.session.close()
        abort(404, description="This appliance does not exist")
    if request.method == 'GET':
        myobj = myAppliance.to_dict()
        db.session.close()
        return jsonify(myobj), 200
    elif request.method == 'PATCH':
        if not v.validate(request.get_json()):
            db.session.close()
            abort(400, description=v.errors)
        # Note that this update function is specified in models.py
        myAppliance.update(request.get_json()) 
        db.session.commit()
        myobj = myAppliance.to_dict()
        db.session.close()
        return jsonify(myobj), 200
    elif request.method == 'DELETE':
        #need to delete the permissions first
        perm = Permission_User_Appliance.query.filter_by(appliance_id=id).first()
        db.session.delete(perm)
        db.session.flush()
        #then delete any messages in the queue as they have a foriegn key constraint
        mess = MessageQueue.query.filter_by(appliance_id=id).all()
        for o in mess:
            db.session.delete(o)
            db.session.flush()
        db.session.delete(myAppliance)
        db.session.commit()
        db.session.close()
        return '', 204

#creates a new permission_user_scout row when posting a scout
def add_permission_user_appliance(appliance_id):
    user_id = current_user.get_id()
    new_user_appliance = Permission_User_Appliance()
    new_user_appliance.user_id = user_id
    new_user_appliance.appliance_id = appliance_id
    new_user_appliance.permission_id = 2
    db.session.add(new_user_appliance)
    db.session.commit()
    return jsonify(new_user_appliance.to_dict())
