import os
import constants
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    DEBUG = True
    TESTING = True
    CSRF_ENABLED = True
    SECRET_KEY = '<INSERT A SECRET KEY>'
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://" + constants.username + ":" + constants.password + "@" + constants.host + "/" + constants.database


class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True

class TestingConfig(Config):
    TESTING = True
