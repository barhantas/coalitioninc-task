from flask import render_template, request, redirect, jsonify, json
from app.exceptions import InvalidUsage
from flask_httpauth import HTTPBasicAuth
import re

from app import app, db
from app.models import Broker, Agency, AgencyDomainWhiteList

auth = HTTPBasicAuth()


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    firstname = data.get('firstname')
    lastname = data.get('lastname')
    address = data.get('address')

    if email is None or password is None or address is None or firstname is None or lastname is None:
        raise InvalidUsage(
            'Please fill your required fields.', status_code=500)

    if not re.search('^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$', email):
        raise InvalidUsage(
            'Please enter an valid email.', status_code=500)
        # for custom mails use: '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$'

    emailDomain = email.split("@")[1]
    if AgencyDomainWhiteList.query.filter_by(domain=emailDomain).first() is None:
        raise InvalidUsage(
            'Your insurance domain is not registered to system yet.', status_code=500)

    if Broker.query.filter_by(email=email).first() is not None:
        raise InvalidUsage(
            'Please use a different email address.', status_code=500)

    oldestAgency = Agency.query.filter_by(
        domain=emailDomain).order_by(Agency.id.desc()).first()

    if oldestAgency is None:
        newAgency = Agency(title=emailDomain,
                           domain=emailDomain, address=address)

        db.session.add(newAgency)
        db.session.commit()

        agencyId = newAgency.id
    else:
        agencyId = oldestAgency.id

    broker = Broker(email=email,
                    firstname=firstname,
                    lastname=lastname,
                    address=address,
                    agencyId=agencyId)
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


@app.route('/broker-list', methods=['GET'])
@auth.login_required
def get_brokers():
    brokers = Broker.query.all()
    return jsonify([i.serialize for i in brokers])


@app.route('/agency-list', methods=['GET'])
@auth.login_required
def get_agencies():
    agencies = Agency.query.all()
    return jsonify([i.serialize for i in agencies])


@auth.verify_password
def verify_password(token, password):
    authToken = request.headers.get('Authorization')
    broker = Broker.verify_auth_token(authToken)

    if not broker:
        return False

    return True


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
