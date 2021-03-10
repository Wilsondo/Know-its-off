from app import app, db
from app.models import User, Device
import os
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Device': Device}
