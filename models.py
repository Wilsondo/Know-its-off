from main import db
from sqlalchemy import inspect
from sqlalchemy.orm import relationship

class Appliance(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(64), nullable=False)
    type = db.Column(db.String(64))
    status = db.Column(db.Boolean, default=False, nullable=False)
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


class User(db.Model):
    __name__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(64), nullable=False)
    last_name = db.Column(db.String(64), nullable=False)
    phone_number = db.Column(db.Integer, nullable=True)
    email = db.Column(db.String(64), nullable=True)

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

'''
class Permission_User_Scout(db.Model):
    __name__= "permissions_users_scouts"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    scout_id = db.Column(db.Integer, db.ForeignKey('scouts.id'))
    permission_id = db.Column(db.Integer, db.ForeignKey('permissions.id'))
    
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
'''
