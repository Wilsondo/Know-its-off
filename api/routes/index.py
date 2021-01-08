from api.routes import routes

@routes.route('/')
def index():
    return 'This is the API.'
