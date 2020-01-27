from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from database_config import Config
import os
import automated_email

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
# Uncomment the below line if you need to create the tables.
# db.create_all()

from routes import *
from models import *
app.register_blueprint(routes, url_prefix = '/api')


def temp_token():
    import binascii
    temp_token = binascii.hexlify(os.urandom(24))
    return temp_token.decode('utf-8')

WEBHOOK_VERIFY_TOKEN = os.getenv('WEBHOOK_VERIFY_TOKEN')
CLIENT_AUTH_TIMEOUT = 24 # in Hours

authorised_clients = {}


@app.route('/webhook', methods=['GET', 'POST'])
def webhook():
    if request.method == 'GET':
        verify_token = request.args.get('verify_token')
        if verify_token == WEBHOOK_VERIFY_TOKEN:
            authorised_clients[request.remote_addr] = datetime.now()
            return jsonify({'status':'success'}), 200
        else:
            return jsonify({'status':'bad token'}), 401

    elif request.method == 'POST':
        client = request.remote_addr
        if client in authorised_clients:
            if datetime.now() - authorised_clients.get(client) > timedelta(hours=CLIENT_AUTH_TIMEOUT):
                authorised_clients.pop(client)
                return jsonify({'status':'authorisation timeout'}), 401
            else:
                print(request.json)
                return jsonify({'status':'success'}), 200
        else:
            return jsonify({'status':'not authorised'}), 401

    else:
        abort(400)

if __name__ == '__main__':
    if WEBHOOK_VERIFY_TOKEN is None:
        print('WEBHOOK_VERIFY_TOKEN has not been set in the environment.\nGenerating random token...')
        token = temp_token()
        print('Token: %s' % token)
        WEBHOOK_VERIFY_TOKEN = token
    app.run(host='127.0.0.1', port=8080, debug=True, use_reloader=False)
