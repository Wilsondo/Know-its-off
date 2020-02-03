from flask import jsonify
from . import routes



@routes.app_errorhandler(400)
def resource_not_found(e):
    return jsonify(error=str(e)), 400

@routes.app_errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404

@routes.app_errorhandler(405)
def method_not_supported(e):
    return jsonify(error=str(e)), 405

@routes.app_errorhandler(500)
def server_error(e):
    return jsonify(error=str(e)), 500

@routes.app_errorhandler(502)
def gateway_error(e):
    return jsonify(error=str(e)), 502
