from sqlalchemy_serializer import SerializerMixin
from flask_restful import Api, Resource
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from config import *

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    #Attributes
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.Text)
    email = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    #Relationships
    # characters (many to many)
    # encounters (one to many)

    #Serialization

class Character(db.Model, SerializerMixin):
    __tablename__ = 'characters'

    #Attributes
    id = db.Column(db.Integer, primary_key=True)

    # Character info
    name = db.Column(db.String)
    bio = db.Column(db.String)

    # Character stats
    proficiency_bonus = db.Column(db.Integer)
    passive_perception = db.Column(db.Integer)
    speed = db.Column(db.Integer)
    armor_class = db.Column(db.Integer)
    hit_die = db.Column(db.Integer)
    # hit_die_quantity = db.Column(db.Integer) maybe
    hit_die_total = db.Column
    hit_points = db.Column(db.Integer)
    # death_saves? (do as pos and neg)
    # temp hp?
    # current hp?
    spellcasting_ability = db.Column(db.Integer)
    spellcasting_save = db.Column(db.Integer)
    spellcasting_attack = db.Column(db.Integer)

    # Abilities
    strength = db.Column(db.Integer)
    dexterity = db.Column(db.Integer)
    constitution = db.Column(db.Integer)
    intelligence = db.Column(db.Integer)
    wisdom = db.Column(db.Integer)
    charisma = db.Column(db.Integer)

    # Proficiencies
    strength_proficiency = db.Column(db.Boolean)
    dexterity_proficiency = db.Column(db.Boolean)
    constitution_proficiency = db.Column(db.Boolean)
    intelligence_proficiency = db.Column(db.Boolean)
    wisdom_proficiency = db.Column(db.Boolean)
    charisma_proficiency = db.Column(db.Boolean)

    # Saving throws
    strength_saving_throw = db.Column(db.Integer)
    dexterity_saving_throw = db.Column(db.Integer)
    constitution_saving_throw = db.Column(db.Integer)
    intelligence_saving_throw = db.Column(db.Integer)
    wisdom_saving_throw = db.Column(db.Integer)
    charisma_saving_throw = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    #Relationships
    # skills (many to many)
    # Features (many to many)
    # Equipment (many to many)
    # Spells (many to many)
    # race = db.Column(db.String)
    # subrace = db.Column(db.String)
    # character_class = db.Column(db.String)
    # subclass = db.Column(db.String)
    # background?
    # users (many to one)

    #Serialization

class Skill(db.Model, SerializerMixin):
    __tablename__ = 'skills'

    #Attributes
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    url = db.Column(db.String)
    ability = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    #Relationships
    # characters (many to many)

    #Serialization

class Feature(db.Model, SerializerMixin):
    __tablename__ = 'features'

    #Attributes
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    url = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    #Relationships
    # characters (many to many)


    #Serialization






# Joining tables

# Models Template
# class (db.Model, SerializerMixin):
#     __tablename__ = ''

#     #Attributes
#     id = db.Column(db.Integer, primary_key=True)
#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column (db.DateTime, onupdate=db.func.now())

#     #Relationships

#     #Serialization