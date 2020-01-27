import smtplib, imaplib

def send_email(recipient, subject, body):
    SMTP_SERVER = 'smtp.gmail.com'
    SMTP_PORT = 587

    send_from = 'know.its.off@gmail.com'
    password = 'thisisapassword1!'


    print("Sending: " + body)
    print("Send to: " + recipient)
    headers = ["From: " + send_from,
       "Subject: " + subject,
       "To: " + recipient,
       "MIME-Version: 1.0",
       "Content-Type: text/plain"]
       #"Content-Type: text/html"]
        #to send html
    headers = "\r\n".join(headers)

    session = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
    session.ehlo()
    session.starttls()
    session.ehlo
    session.login(send_from, password)

    session.sendmail(send_from, recipient, headers + "\r\n\r\n" + body)
    session.quit()
