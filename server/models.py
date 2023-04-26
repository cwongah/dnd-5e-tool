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
    characters = db.relationship('Character', backref='user')
    encounters = db.relationship('Encounter', backref='user')

    #Serialization
    serialize_only= ('id', 'username', 'password', 'email', 'characters', 'encounters')

class Encounter(db.Model, SerializerMixin):
    __tablename__ = 'encounters'

    #Attributes
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    #Relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    encounter_characters = db.relationship('EncounterCharacter', backref='encounter')
    characters = association_proxy('encounter_characters', 'character')

    #Serialization
    serialize_only = ('id', 'name', 'user_id', 'characters')

class Character(db.Model, SerializerMixin):
    __tablename__ = 'characters'

    #Attributes
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    # Character info
    name = db.Column(db.String)
    bio = db.Column(db.String)

    # Character stats
    level = db.Column(db.Integer)
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

    #Relationships
    character_skills = db.relationship('CharacterSkill', backref='character')
    skills = association_proxy('character_skills', 'skill')
    character_features = db.relationship('CharacterFeature', backref='character')
    features = association_proxy('character_features', 'feature')
    character_equipments = db.relationship('CharacterEquipment', backref='character')
    equipments = association_proxy('character_equipments', 'equipment')
    character_spells = db.relationship('CharacterSpell', backref='character')
    spells = association_proxy('character_spells', 'spell')
    character_races = db.relationship('CharacterRace', backref='character')
    races = association_proxy('character_races', 'race')
    # subrace (many to one) maybe?
    character_character_classes = db.relationship('CharacterCharacterClass', backref='character')
    character_classes = association_proxy('character_character_classes', 'character_class')
    character_subclasses = db.relationship('CharacterSubclass', backref='character')
    subclasses = association_proxy('character_subclasses', 'subclass')
    character_proficiencies = db.relationship('CharacterProficiency', backref='character')
    proficiencies = association_proxy('character_proficiencies', 'proficiency')
    character_traits = db.relationship('CharacterTrait', backref='character')
    traits = association_proxy('character_traits', 'trait')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    encounter_characters = db.relationship('EncounterCharacter', backref='character')
    encounters = association_proxy('encounter_characters', 'encounter')
    
    #Serialization
    serialize_rules = ('-created_at', '-updated_at', '-character_skills', '-character_features', '-character_equipments', '-character_spells', '-character_races', '-character_character_classes', '-character_subclasses', '-character_proficiencies', '-encounter_characters', '-character_traits')

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
    character_skills = db.relationship('CharacterSkill', backref='skill')
    characters = association_proxy('character_skills', 'character')

    #Serialization
    serialize_only = ('id', 'name', 'url', 'ability')


class Feature(db.Model, SerializerMixin):
    __tablename__ = 'features'

    #Attributes
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    url = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    #Relationships
    character_features = db.relationship('CharacterFeature', backref='feature')
    characters = association_proxy('character_features', 'character')

    #Serialization
    serialize_only = ('id', 'name', 'url')


class Equipment(db.Model, SerializerMixin):
    __tablename__ = 'equipments'

    #Attributes
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    url = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    #Relationships
    character_equipments = db.relationship('CharacterEquipment', backref='equipment')
    characters = association_proxy('character_equipments', 'character')

    #Serialization
    serialize_only = ('id', 'name', 'url')

class Spell(db.Model, SerializerMixin):
    __tablename__ = 'spells'

    #Attributes
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    url = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    #Relationships
    character_spells = db.relationship('CharacterSpell', backref='spell')
    characters = association_proxy('character_spells', 'character')

    #Serialization
    serialize_only = ('id', 'name', 'url')

class Race(db.Model, SerializerMixin):
    __tablename__ = 'races'

    #Attributes
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    url = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    #Relationships
    character_races = db.relationship('CharacterRace', backref='race')
    characters = association_proxy('character_races', 'character')

    #Serialization
    serialize_only = ('id', 'name', 'url')

class CharacterClass(db.Model, SerializerMixin):
    __tablename__ = 'character_classes'

    #Attributes
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    url = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    #Relationships
    character_character_classes = db.relationship('CharacterCharacterClass', backref='character_class')
    characters = association_proxy('character_character_classes', 'character')

    #Serialization
    serialize_only = ('id', 'name', 'url')

class Subclass(db.Model, SerializerMixin):
    __tablename__ = 'subclasses'

    #Attributes
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    url = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    #Relationships
    # characters (many to many)
    character_subclasses = db.relationship('CharacterSubclass', backref='subclass')
    characters = association_proxy('character_subclasses', 'character')

    #Serialization
    serialize_only = ('id', 'name', 'url')

class Proficiency(db.Model, SerializerMixin):
    __tablename__ = 'proficiencies'

    #Attributes
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    url = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    #Relationships
    character_proficiencies = db.relationship('CharacterProficiency', backref='character')
    characters = association_proxy('character_proficiencies', 'character')

    #Serialization
    serialize_only = ('id', 'name', 'url')

class Trait(db.Model, SerializerMixin):
    __tablename__ = 'traits'

    # Attributes
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    url = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # Relationships
    character_traits = db.relationship('CharacterTrait', backref='trait')
    characters = association_proxy('character_traits', 'character')
    
    # Serialization





# Joining tables
class EncounterCharacter(db.Model, SerializerMixin):
    __tablename__ = 'encounter_characters'

    # Attributes
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    # Relationships
    encounter_id = db.Column(db.Integer, db.ForeignKey('encounters.id'))
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))

    # Serialization
    serialize_only = ('id', 'character_id', 'encounter_id')

class CharacterSkill(db.Model, SerializerMixin):
    __tablename__ = 'character_skills'

    # Attributes
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # Relationships
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    skill_id = db.Column(db.Integer, db.ForeignKey('skills.id'))
    
    # Serialization
    serialize_only = ('id', 'character_id', 'skill_id')

class CharacterFeature(db.Model, SerializerMixin):
    __tablename__ = 'character_features'

    #Attributes
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    #Relationships
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    feature_id = db.Column(db.Integer, db.ForeignKey('features.id'))

    #Serialization
    serialize_only = ('id', 'character_id', 'feature_id')

class CharacterEquipment(db.Model, SerializerMixin):
    __tablename__ = 'character_equipments'

    #Attributes
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    #Relationships
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    equipment_id = db.Column(db.Integer, db.ForeignKey('equipments.id'))

    #Serialization
    serialize_only = ('id', 'character_id', 'equipment_id')

class CharacterSpell(db.Model, SerializerMixin):
    __tablename__ = 'character_spells'

    #Attributes
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    #Relationships
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    spell_id = db.Column(db.Integer, db.ForeignKey('spells.id'))

    #Serialization
    serialize_only = ('id', 'character_id', 'spell_id')

class CharacterRace(db.Model, SerializerMixin):
    __tablename__ = 'character_races'

    #Attributes
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    #Relationships
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    race_id = db.Column(db.Integer, db.ForeignKey('races.id'))

    #Serialization
    serialize_only = ('id', 'character_id', 'race_id')

class CharacterCharacterClass(db.Model, SerializerMixin):
    __tablename__ = 'character_character_classes'

    #Attributes
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    #Relationships
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    character_class_id = db.Column(db.Integer, db.ForeignKey('character_classes.id'))

    #Serialization
    serialize_only = ('id', 'character_id', 'character_class_id')

class CharacterSubclass(db.Model, SerializerMixin):
    __tablename__ = 'character_subclasses'

    #Attributes
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    #Relationships
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    subclass_id = db.Column(db.Integer, db.ForeignKey('subclasses.id'))

    #Serialization
    serialize_only = ('id', 'character_id', 'subclass_id')

class CharacterProficiency(db.Model, SerializerMixin):
    __tablename__ = 'character_proficiencies'

    #Attributes
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    #Relationships
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    proficiency_id = db.Column(db.Integer, db.ForeignKey('proficiencies.id'))

    #Serialization
    serialize_only = ('id', 'character_id', 'proficiency_id')

class CharacterTrait(db.Model, SerializerMixin):
    __tablename__ = 'character_traits'

    # Attributes
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column (db.DateTime, onupdate=db.func.now())

    #Relationships
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    trait_id = db.Column(db.Integer, db.ForeignKey('traits.id'))

    #Serialization
    serialize_only = ('id', 'character_id', 'trait_id')

# Models Template
# class (db.Model, SerializerMixin):
#     __tablename__ = ''

#     #Attributes
#     id = db.Column(db.Integer, primary_key=True)
#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column (db.DateTime, onupdate=db.func.now())

#     #Relationships

#     #Serialization

# class (db.Model, SerializerMixin):
#     __tablename__ = ''

#     #Attributes
#     id = db.Column(db.Integer, primary_key=True)
#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column (db.DateTime, onupdate=db.func.now())

#     #Relationships
#     character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
#     _id = db.Column(db.Integer, db.ForeignKey('.id'))

#     #Serialization