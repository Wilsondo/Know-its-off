from flask import request, abort, jsonify, Response, redirect
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

@routes.route('/login', methods=['GET','POST'])
def login():
    if not v.validate(request.get_json()):
        abort(400, description=v.errors)
    if request.method == 'POST':
        login_user = request.get_json()
        user_email = login_user['email']
        check_user = User.query.filter_by(email=user_email).first()
        if not check_user or not check_user.check_password(login_user['password']):
            #error handler, if login is not successful
            abort(403, description="The credentials you entered were incorrect")
        login_user(check_user)
        next = flask.request.args.get('next')
        db.session.close()
        return flask.redirect(next or flask.url_for('index'))
    else:
        next = flask.request.args.get('next')
        print("this is and error", file=sys.stdout)
        return flask.redirect(next or flask.url_for('routes.index'))
