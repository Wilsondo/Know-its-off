import time
from flask import Flask

app = Flask(__name__)
<<<<<<< HEAD
=======
app.config.from_object(Config)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

import models
>>>>>>> 7d9f05b... first commit

@app.route('/')
def hello(): 
        return "Hello World!"

@app.route('/api/time')
def get_current_time():
        return {'time': time.time()}

