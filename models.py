from main import db
from sqlalchemy import inspect
from sqlalchemy.orm import relationship
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Appliance(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(64), nullable=False)
    type = db.Column(db.String(64))
    status = db.Column(db.Boolean, default=False, nullable=False)
    alert_message = db.Column(db.String(256), default="Your appliance was left on!")
    alert_time = db.Column(db.Integer, default=120)
    alert_email = db.Column(db.Boolean, default=False)
    alert_text = db.Column(db.Boolean, default=False)
    myScouts = db.relationship("Scout", lazy="dynamic")

    # Convert the object to dictionary
    def to_dict(self):
        return {c.key: getattr(self, c.key)
            for c in inspect(self).mapper.column_attrs}

    # Updating this model.
    def update(self, myDict):
        for key, value in myDict.items():
            setattr(self, key, value)
    
    # This is how the object looks when printed out.
    def __repr__(self):
        return '<Appliance {}>'.format(self.name)


class User(UserMixin, db.Model):
    __name__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    password_hash = db.Column(db.String(512), nullable=True)
    first_name = db.Column(db.String(64), nullable=True)
    last_name = db.Column(db.String(64), nullable=True)
    phone_number = db.Column(db.Integer, nullable=True)
    email = db.Column(db.String(64), nullable=False)
    myPermission = db.relationship("Permission_User_Scout", lazy="dynamic")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


    # Convert the object to dictionary
    def to_dict(self):
        return {c.key: getattr(self, c.key)
            for c in inspect(self).mapper.column_attrs}

    # Updating this model.
    def update(self, myDict):
        for key, value in myDict.items():
            setattr(self, key, value)
    
    # This is how the object looks when printed out.
    def __repr__(self):
        return '<User {}>'.format(self.first_name)
   

class Scout(db.Model):
    __name__ = "scouts"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    appliance_id = db.Column(db.Integer, db.ForeignKey('appliance.id'))
    name = db.Column(db.String(64), nullable=False)
    battery_power = db.Column(db.Float, nullable=True)
    myPermission = db.relationship("Permission_User_Scout", lazy="dynamic")

    # Convert the object to dictionary
    def to_dict(self):
        return {c.key: getattr(self, c.key)
            for c in inspect(self).mapper.column_attrs}

    # Updating this model.
    def update(self, myDict):
        for key, value in myDict.items():
            setattr(self, key, value)
    
    # This is how the object looks when printed out.
    def __repr__(self):
        return '<Scout {}>'.format(self.name)


class Permission(db.Model):
    __name__ = "permissions"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(64), nullable=False)


    myPermission = db.relationship("Permission_User_Scout", lazy="dynamic")
    # Convert the object to dictionary
    def to_dict(self):
        return {c.key: getattr(self, c.key)
            for c in inspect(self).mapper.column_attrs}

    # Updating this model.
    def update(self, myDict):
        for key, value in myDict.items():
            setattr(self, key, value)
    
    # This is how the object looks when printed out.
    def __repr__(self):
        return '<Permission {}>'.format(self.name)

class MessageQueue(db.Model):
    __name__ = "messagequeue"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    appliance_id = db.Column(db.Integer, db.ForeignKey('appliance.id'))
    time = db.Column(db.DateTime)

    # Convert the object to dictionary
    def to_dict(self):
        return {c.key: getattr(self, c.key)
            for c in inspect(self).mapper.column_attrs}

    # Updating this model.
    def update(self, myDict):
        for key, value in myDict.items():
            setattr(self, key, value)
    
    # This is how the object looks when printed out.
    def __repr__(self):
        return '<MessageQueue {}>'.format(self.id)

class Permission_User_Scout(db.Model):
    __name__= "permissions_users_scouts"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    scout_id = db.Column(db.Integer, db.ForeignKey('scout.id'))
    permission_id = db.Column(db.Integer, db.ForeignKey('permission.id'))
    
    # Convert the object to dictionary
    def to_dict(self):
        return {c.key: getattr(self, c.key)
            for c in inspect(self).mapper.column_attrs}

    # Updating this model.
    def update(self, myDict):
        for key, value in myDict.items():
            setattr(self, key, value)
    
    # This is how the object looks when printed out.
    def __repr__(self):
        return '<Permission User/Scout bundle {}>'.format(self.id)


@db.event.listens_for(Appliance, "after_update")
def check_for_on(mapper, connection, target):
    if target.status is True and (target.alert_email is True or target.alert_text is True):
        time_to_message = datetime.utcnow() + timedelta(seconds=target.alert_time)
        message_table = MessageQueue.__table__
        connection.execute(
            message_table.insert().values(appliance_id=target.id, time=time_to_message)
        )
    
    elif target.status is False:
        pass
