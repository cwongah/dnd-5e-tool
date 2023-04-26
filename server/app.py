#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, Flask, make_response, jsonify, session
from flask_restful import Resource, Api
from flask_migrate import Migrate
from flask_cors import CORS

# Local imports
# from config import app, db, api
from config import *
from models import User, Encounter, Character, Skill, Feature, Equipment, Spell, Race, CharacterClass, Subclass, Proficiency, Trait

# Views go here!
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app,origins="http://localhost:4000", supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

class Users(Resource):
    def get(self):
        users = User.querl.all()
        users_dict_list = [users.to_dict() for user in users]
        return make_response(users_dict_list, 200)
    
    def post(self):
        data = request.get_json()
        user = User(
            username = data['username'],
            password = data['password'],
            email = data['email']
        )
        return make_response(user.to_dict(), 201)
api.add_resource(Users, '/users')

class UsersById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            make_response({'error': 'User not found'}, 404)
        return make_response(user.to_dict(), 200)
    
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({'error': 'User not found'}, 404)
        data = request.get_json
        for key in data.keys():
            setattr(user, key, data[key])
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(), 200)
    
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({'error': 'User not found'}, 404)
        db.session.delete(user)
        db.session.commit()
        return make_response({'message': 'User deleted'}, 204)
api.add_resource(UsersById, '/users/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
