from __init__ import routes

@routes.route('/')
def index():
    return 'This is the API.'