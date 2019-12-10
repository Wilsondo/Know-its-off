import sqlalchemy
import constants

class Config(object):
    
    SQLALCHEMY_DATABASE_URI = sqlalchemy.engine.url.URL(
        drivername="mysql+pymysql",
        username=constants.username,
        password=constants.password,
        database=constants.database,
        query={"unix_socket": "/cloudsql/{}".format("know-its-off:us-west2:know-its-off-my-db")},
    )
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_size": 3,
        "max_overflow": 2,
        "pool_timeout": 30,
        "pool_recycle": 1800
    }
    SQLALCHEMY_TRACK_MODIFICATIONS = False
