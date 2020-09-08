from app import db, app
from passlib.apps import custom_app_context as pwd_context
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)
from sqlalchemy.orm import relationship, backref


class Broker(db.Model):
    __tablename__ = 'broker'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    firstname = db.Column(db.String(140))
    lastname = db.Column(db.String(140))
    address = db.Column(db.String(140))
    agencyId = db.Column(db.Integer, db.ForeignKey(
        'agency.id'), nullable=False)
    agency = relationship("Agency", backref=backref("agency", uselist=False))

    def __repr__(self):
        return '<Broker {}>'.format(self.email)

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

    def generate_auth_token(self, expiration=600):
        s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
        return s.dumps({'id': self.id})

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None  # valid token, but expired
        except BadSignature:
            return None  # invalid token
        broker = Broker.query.get(data['id'])
        return broker

    @property
    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'address': self.address,
            'agency': self.serialize_agency
        }

    @property
    def serialize_agency(self):
        return {
            'id': self.agency.id,
            'title': self.agency.title,
            'domain': self.agency.domain,
            'address': self.agency.address,
        }


class Agency(db.Model):
    __tablename__ = 'agency'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(140))
    domain = db.Column(db.String(140))
    address = db.Column(db.String(140))

    @property
    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'domain': self.domain,
            'address': self.address,
        }


class AgencyDomainWhiteList(db.Model):
    __tablename__ = 'agency_domain_white_list'
    id = db.Column(db.Integer, primary_key=True)
    domain = db.Column(db.String(140))
