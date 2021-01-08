from api import app, db
from api.models import User, Device

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Device': Device}