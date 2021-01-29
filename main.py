from app import app, db
from app.models import User, Device

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Device': Device}

if __name__ == '__main__':
    app.run(host='totalsundae.com/know-its-off', port=12323, use_reloader=True, debug=False)
