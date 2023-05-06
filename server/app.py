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
from models import User, Encounter, Character, Skill, Feature, Equipment, Spell, Race, CharacterClass, Subclass, Proficiency, Trait, EncounterCharacter, CharacterSkill, CharacterFeature, CharacterEquipment, CharacterSpell, CharacterRace, CharacterCharacterClass, CharacterSubclass, CharacterProficiency, CharacterTrait, Reference

# Views go here!
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app,origins="http://localhost:4000", supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

class References(Resource):
    def get(self):
        references = Reference.query.all()
        references_dict_list = [reference.to_dict() for reference in references]
        return make_response(references_dict_list, 200)
    
    def post(self):
        data=request.get_json()
        reference = Reference(
            name = data['name'],
            url = data['url'],
            class_type = data['class_type'],
            object_id = data['object_id']
        )
        db.session.add(reference)
        db.session.commit()
        return make_response(reference.to_dict(), 201)
api.add_resource(References, '/references')

class Users(Resource):
    def get(self):
        users = User.query.all()
        users_dict_list = [user.to_dict() for user in users]
        return make_response(users_dict_list, 200)
    
    def post(self):
        data = request.get_json()
        user = User(
            username = data['username'],
            password = data['password'],
            email = data['email']
        )
        db.session.add(user)
        db.session.commit()
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
        data = request.get_json()
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

class Encounters(Resource):
    def get(self):
        encounters = Encounter.query.all()
        encounters_dict_list = [e.to_dict(rules=('characters',)) for e in encounters]
        return make_response(encounters_dict_list, 200)
    
    def post(self):
        data = request.get_json()
        encounter = Encounter(
            name = data['name'],
            user_id = data['user_id']
        )
        db.session.add(encounter)
        db.session.commit()
        return make_response(encounter.to_dict(), 201)
api.add_resource(Encounters, '/encounters')

class EncountersById(Resource):
    def get(self, id):
        encounter = Encounter.query.filter_by(id=id).first()
        if not encounter:
            make_response({'error': 'Encounter not found'}, 404)
        return make_response(encounter.to_dict(rules=('characters', )), 200)
    
    def patch(self, id):
        encounter = Encounter.query.filter_by(id=id).first()
        if not encounter:
            return make_response({'error': 'Encounter not found'}, 404)
        data = request.get_json()
        for key in data.keys():
            setattr(encounter, key, data[key])
        db.session.add(encounter)
        db.session.commit()
        return make_response(encounter.to_dict(), 200)
    
    def delete(self, id):
        encounter = Encounter.query.filter_by(id=id).first()
        if not encounter:
            return make_response({'error': 'Encounter not found'}, 404)
        db.session.delete(encounter)
        db.session.commit()
        return make_response({'message': 'Encounter deleted'}, 204)
api.add_resource(EncountersById, '/encounters/<int:id>')
        
class Characters(Resource):
    def get(self):
        characters = Character.query.all()
        characters_dict_list = [c.to_dict() for c in characters]
        return make_response(characters_dict_list, 200)
    
    def post(self):
        data = request.get_json()
        print(data)
        character = Character(
            name = data['name'],
            bio = data['bio'],
            level = data['level'],
            proficiency_bonus = data['proficiency_bonus'],
            passive_perception = data['passive_perception'],
            speed = data['speed'],
            armor_class = data['armor_class'],
            hit_die = data['hit_die'],
            hit_die_total = data['hit_die_total'],
            hit_points = data['hit_points'],
            spellcasting_ability = data['spellcasting_ability'],
            spellcasting_save = data['spellcasting_save'],
            spellcasting_attack = data['spellcasting_attack'],
            strength = data['strength'],
            dexterity = data['dexterity'],
            constitution = data['constitution'],
            intelligence = data['intelligence'],
            wisdom = data['wisdom'],
            charisma = data['charisma'],
            strength_proficiency = data['strength_proficiency'],
            dexterity_proficiency = data['dexterity_proficiency'],
            constitution_proficiency = data['constitution_proficiency'],
            intelligence_proficiency = data['intelligence_proficiency'],
            wisdom_proficiency = data['wisdom_proficiency'],
            charisma_proficiency = data['charisma_proficiency'],
            strength_saving_throw = data['strength_saving_throw'],
            dexterity_saving_throw = data['dexterity_saving_throw'],
            constitution_saving_throw = data['constitution_saving_throw'],
            intelligence_saving_throw = data['intelligence_saving_throw'],
            wisdom_saving_throw = data['wisdom_saving_throw'],
            charisma_saving_throw = data['charisma_saving_throw'],
            user_id = data['user_id']
        )
        db.session.add(character)
        db.session.commit()
        return make_response(character.to_dict(), 201)
api.add_resource(Characters, '/characters')

class CharactersById(Resource):
    def get(self, id):
        character = Character.query.filter_by(id=id).first()
        if not character:
            make_response({'error': 'Character not found'}, 404)
        return make_response(character.to_dict(rules=('bio', 'level', 'proficiency_bonus', 'passive_perception', 'speed', 'armor_class', 'hit_die', 'hit_die_total', 'hit_points', 'spellcasting_ability', 'spellcasting_save', 'spellcasting_attack', 'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma', 'strength_proficiency', 'dexterity_proficiency', 'constitution_proficiency', 'intelligence_proficiency', 'wisdom_proficiency', 'charisma_proficiency', 'strength_saving_throw', 'dexterity_saving_throw', 'constitution_saving_throw', 'intelligence_saving_throw', 'wisdom_saving_throw', 'charisma_saving_throw', 'skills', 'features', 'equipments', 'spells', 'races', 'character_classes', 'subclasses', 'proficiencies', 'traits', 'user_id', 'encounters')), 200)
    
    def patch(self, id):
        character = Character.query.filter_by(id=id).first()
        if not character:
            return make_response({'error': 'Character not found'}, 404)
        data = request.get_json()
        for key in data.keys():
            setattr(character, key, data[key])
        db.session.add(character)
        db.session.commit()
        return make_response(character.to_dict(), 200)
    
    def delete(self, id):
        character = Character.query.filter_by(id=id).first()
        if not character:
            return make_response({'error': 'Character not found'}, 404)
        db.session.delete(character)
        db.session.commit()
        return make_response({'message': 'Character deleted'}, 204)
api.add_resource(CharactersById, '/characters/<int:id>')

class EncounterCharacters(Resource):
    def get(self):
        encounter_characters = EncounterCharacter.query.all()
        encounter_characters_dict_list = [ec.to_dict() for ec in encounter_characters]
        return make_response(encounter_characters_dict_list, 200)
    
    def post(self):
        data = request.get_json()
        ec = EncounterCharacter(
            encounter_id = data['encounter_id'],
            character_id = data['character_id']
        )
        db.session.add(ec)
        db.session.commit()
api.add_resource(EncounterCharacters, '/encounter_characters')

class CharacterSkills(Resource):
    def get(self):
        cs_list = CharacterSkill.query.all()
        cs_dict_list = [cs.to_dict() for cs in cs_list]
        return make_response(cs_dict_list, 200)
    
    def post(self):
        data = request.get_json()
        cs = CharacterSkill(
            character_id = data['character_id'],
            skill_id = data['skill_id']
        )
        db.session.add(cs)
        db.session.commit()
api.add_resource(CharacterSkills, '/character_skills')

class CharacterFeatures(Resource):
    def get(self):
        cf_list = CharacterFeature.query.all()
        cf_dict_list = [cf.to_dict() for cf in cf_list]
        return make_response(cf_dict_list, 200)
    
    def post(self):
        data = request.get_json()
        cf = CharacterFeature(
            character_id = data['character_id'],
            feature_id = data['feature_id']
        )
        db.session.add(cf)
        db.session.commit()
api.add_resource(CharacterFeatures, '/character_features')

class CharacterEquipments(Resource):
    def get(self):
        ce_list = CharacterEquipment.query.all()
        ce_dict_list = [ce.to_dict() for ce in ce_list]
        return make_response(ce_dict_list, 200)
    
    def post(self):
        data = request.get_json()
        ce = CharacterEquipment(
            character_id = data['character_id'],
            equipment_id = data['equipment_id']
        )
        db.session.add(ce)
        db.session.commit()
api.add_resource(CharacterEquipments, '/character_equipments')

class CharacterSpells(Resource):
    def get(self):
        csp_list = CharacterSpell.query.all()
        csp_dict_list = [csp.to_dict() for csp in csp_list]
        return make_response(csp_dict_list, 200)
    
    def post(self):
        data = request.get_json()
        csp = CharacterSpell(
            character_id = data['character_id'],
            spell_id = data['spell_id']
        )
        db.session.add(csp)
        db.session.commit()
api.add_resource(CharacterSpells, '/character_spells')

class CharacterRaces(Resource):
    def get(self):
        cr_list = CharacterRace.query.all()
        cr_dict_list = [cr.to_dict() for cr in cr_list]
        return make_response(cr_dict_list, 200)
    
    def post(self):
        data = request.get_json()
        cr = CharacterRace(
            character_id = data['character_id'],
            race_id = data['race_id']
        )
        db.session.add(cr)
        db.session.commit()
api.add_resource(CharacterRaces, '/character_races')

class CharacterCharacterClasses(Resource):
    def get(self):
        ccc_list = CharacterCharacterClass.query.all()
        ccc_dict_list = [ccc.to_dict() for ccc in ccc_list]
        return make_response(ccc_dict_list, 200)
    
    def post(self):
        data = request.get_json()
        ccc = CharacterCharacterClass(
            character_id = data['character_id'],
            character_class_id = data['character_class_id']
        )
        db.session.add(ccc)
        db.session.commit()
api.add_resource(CharacterCharacterClasses, '/character_character_classes')

class CharacterSubclasses(Resource):
    def get(self):
        csc_list = CharacterSubclass.query.all()
        csc_dict_list = [csc.to_dict() for csc in csc_list]
        return make_response(csc_dict_list, 200)
    
    def post(self):
        data = request.get_json()
        csc = CharacterSubclass(
            character_id = data['character_id'],
            subclass_id = data['subclass_id']
        )
        db.session.add(csc)
        db.session.commit()
api.add_resource(CharacterSubclasses, '/character_subclasses')

class CharacterProficiencies(Resource):
    def get(self):
        cp_list = CharacterProficiency.query.all()
        cp_dict_list = [cp.to_dict() for cp in cp_list]
        return make_response(cp_dict_list, 200)
    
    def post(self):
        data = request.get_json()
        cp = CharacterProficiency(
            character_id = data['character_id'],
            proficiency_id = data['proficiency_id']
        )
        db.session.add(cp)
        db.session.commit()
api.add_resource(CharacterProficiencies, '/character_proficiencies')

class CharacterTraits(Resource):
    def get(self):
        ct_list = CharacterTrait.query.all()
        ct_dict_list = [ct.to_dict() for ct in ct_list]
        return make_response(ct_dict_list, 200)
    
    def post(self):
        data = request.get_json()
        ct = CharacterTrait(
            character_id = data['character_id'],
            trait_id = data['trait_id']
        )
        db.session.add(ct)
        db.session.commit()
api.add_resource(CharacterTraits, '/character_traits')

if __name__ == '__main__':
    app.run(port=5555, debug=True)