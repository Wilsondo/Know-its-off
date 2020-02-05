import threading
from main import db
from models import *
import time
from datetime import datetime
from automated_email import send_email
from automated_text import send_message

def check_message_queue():
    print("Checking messages...")
    rows = db.session.query(Appliance, MessageQueue).join(MessageQueue, Appliance.id == MessageQueue.appliance_id).all()
    print("There are " + str(len(rows)) + " messages queued.")
    for row in rows:
        if row[1].time > datetime.utcnow():
            myMessage = MessageQueue.query.get(row[1].id)
            if row[0].alert_email:
                print("Sending email")
                send_email(body=row[0].alert_message)
            if row[0].alert_text:
                print("Sending text message")
                send_message(message=row[0].alert_message)
            db.session.delete(myMessage)
    db.session.commit()
    db.session.close()

class BackgroundThread(object):
    """ Threading example class
    The run() method will be started and it will run in the background
    until the application exits.
    """

    def __init__(self, interval=1):
        """ Constructor
        :type interval: int
        :param interval: Check interval, in seconds
        """
        self.interval = interval

        thread = threading.Thread(target=self.run, args=())
        thread.daemon = True                            # Daemonize thread
        thread.start()                                  # Start the execution

    def run(self):
        db.engine.dispose()
        """ Method that runs forever """
        while True:
            # Do something
            check_message_queue()
            time.sleep(self.interval)
