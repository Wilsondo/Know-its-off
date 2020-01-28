import sqlalchemy
import constants


class Config(object):
   
# The below code does not work as expected: host is set to localhost instead of desired host.
#    SQLALCHEMY_DATABASE_URI = sqlalchemy.engine.url.URL(
#        drivername="mysql+pymysql",
#        username=constants.username,
#        password=constants.password,
#        database=constants.database,
#        hostname=constants.host
#    )

    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://"+constants.username+":"+constants.password+"@"+constants.host+"/"+constants.database

    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_size": 2,
        "max_overflow": 1,
        "pool_timeout": 10,
        "pool_recycle": 1
    }
    SQLALCHEMY_TRACK_MODIFICATIONS = False
