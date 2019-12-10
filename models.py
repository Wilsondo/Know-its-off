from main import db
from sqlalchemy import inspect


class Appliance(db.Model):
    __name__ = "appliances"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(64), nullable=False)
    type = db.Column(db.String(64))
    status = db.Column(db.Boolean, default=False, nullable=False)

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
