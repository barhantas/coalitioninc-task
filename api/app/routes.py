from flask import render_template, request, redirect, jsonify
from app import app, db
from app.models import Broker
from app.exceptions import InvalidUsage
import re


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if email is None or password is None or email is None:
        raise InvalidUsage(
            'Please fill your required fields.', status_code=500)

    if not re.search('^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$', email):
        raise InvalidUsage(
            'Please enter an valid email.', status_code=500)
        # for custom mails use: '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$'

    if Broker.query.filter_by(email=email).first() is not None:
        raise InvalidUsage(
            'Please use a different email address.', status_code=500)

    broker = Broker(email=email,
                    firstname=data.get('firstname'),
                    lastname=data.get('lastname'),
                    address=data.get('address'))
    broker.hash_password(password)

    db.session.add(broker)
    db.session.commit()

    return jsonify({'email': broker.email})


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    broker = Broker.query.filter_by(email=email).first()

    if not broker or not broker.verify_password(password):
        raise InvalidUsage(
            'Invalid login credentials.', status_code=500)

    token = broker.generate_auth_token()
    return jsonify({'token': token.decode('ascii')})


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
