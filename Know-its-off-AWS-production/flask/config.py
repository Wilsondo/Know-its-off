import os
import constants
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    DEBUG = True
    TESTING = True
    CSRF_ENABLED = True
    SECRET_KEY = 'i(VsY2C.KiM9T}{BAO1wzpj16ja[*cA-]}~B5N5g:aE#9Hy}o[(q|rg#y^Zs!,/'
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://" + constants.username + ":" + constants.password + "@" + constants.host + "/" + constants.database


class gConfig(object):
    DEBUG = True
    TESTING = True
    CSRF_ENABLED = True
    CLIENT_ID = ('1039398438265-0orosoo5l17c57g0cf9tl5415fso53de.apps.googleusercontent.com')
    CLIENT_SECRET = 'SH_dSLP2g5ikL3usQ6_cx7m5'
    REDIRECT_URI = 'https://localhost:5000/api/gCallback'
    AUTH_URI = 'https://accounts.google.com/o/oauth2/auth'
    TOKEN_URI = 'https://accounts.google.com/o/oauth2/token'
    USER_INFO = 'https://www.googleapis.com/userinfo/v2/me'
    SCOPE = ['profile', 'email']
                                                                        
    SECRET_KEY = 'i(VsY2C.KiM9T}{BAO1wzpj16ja[*cA-]}~B5N5g:aE#9Hy}o[(q|rg#y^Zs!,/'
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
