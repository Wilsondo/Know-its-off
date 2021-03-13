from flask import Flask
from flask_assistant import Assistant, ask, tell
from app import assist, db
from app.models import User, Device
from flask_login import login_required, current_user, login_user
from fuzzywuzzy import process


@assist.action('Status')
def initial():
    speech = "What is your Appliance Name?"
    return ask(speech)

@assist.action('Status - next')
def initial(appliance):

    devices = Device.query.all()
    appliance_names = []
    for row in devices: 
        appliance_names.append(row.appliance_name)

    myDevice = process.extract(appliance, appliance_names, limit=1)
    myDevice = Device.query.filter_by(appliance_name=myDevice[0][0]).first()
    if myDevice == None: 
        return tell("Device not found")
    elif myDevice.device_state == 0:
        status = "OFF"
    elif myDevice.device_state == 1:
        status = "ON"
    speech = f"Your {myDevice.appliance_name} is {status}"
    return ask(speech)

### Tutorial

@assist.action('greeting')
def greet_and_start():
    speech = "Hey! Are you male or female?"
    return ask(speech)

@assist.action("give-gender")
def ask_for_color(gender):
    if gender == 'male':
        gender_msg = 'Sup bro!'
    else:
        gender_msg = 'Haay gurl!'

    speech = gender_msg + ' What is your favorite color?'
    return ask(speech)

@assist.action('give-color', mapping={'color': 'sys.color'})
def ask_for_season(color):
    speech = 'Ok, {} is an okay color I guess'.format(color)
    return ask(speech)
