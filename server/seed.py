#!/usr/bin/env python3

# Standard library imports
# from random import randint, choice as rc
import random

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Encounter, Character, Skill, Feature, Equipment, Spell, Race, CharacterClass, Subclass, Proficiency, Trait, EncounterCharacter, CharacterSkill, CharacterFeature, CharacterEquipment, CharacterSpell, CharacterRace, CharacterCharacterClass, CharacterSubclass, CharacterProficiency, CharacterTrait, Reference

fake = Faker()

def make_users():
    User.query.delete()
    users = []
    for i in range(20):
        user = User(
            username = fake.name(),
            password = str(random.randint(0, 10000)),
            email = fake.email(),
            url = 'http://127.0.0.1:5555/users/' + str(i + 1)
        )
        users.append(user)
    db.session.add_all(users)
    db.session.commit()

def make_encounters():
    Encounter.query.delete()
    encounters = []
    for i in range(20):
        encounter = Encounter(
            name = "encounter " + str(i + 1),
            user_id = i + 1,
            url = 'http://127.0.0.1:5555/encounters/' + str(i + 1)
        )
        encounters.append(encounter)
    db.session.add_all(encounters)
    db.session.commit()

def make_characters():
    Character.query.delete()
    characters = []
    for j in range(4):
        for i in range(20):
            character = Character(
                name = fake.name(),
                bio = 'Character Bio ' + str((i + 1) + (j * 20)),
                url = 'http://127.0.0.1:5555/characters/' + str((i + 1) + (j * 20)),
                level = random.randint(1, 20),
                proficiency_bonus = random.randint(1, 10),
                passive_perception = random.randint(1, 20),
                speed = random.randint(20, 45),
                armor_class = random.randint(1, 20),
                hit_die = random.choice([6, 8, 10, 12]),
                hit_die_total = random.randint(0, 6),
                hit_points = random.randint(1, 100),
                spellcasting_ability = random.randint(0, 10),
                spellcasting_save = random.randint(0, 10),
                spellcasting_attack = random.randint(0, 10),
                strength = random.randint(0, 20),
                dexterity = random.randint(0, 20),
                constitution = random.randint(0, 20),
                intelligence = random.randint(0, 20),
                wisdom = random.randint(0, 20),
                charisma = random.randint(0, 20),
                strength_proficiency = random.randint(0, 1),
                dexterity_proficiency = random.randint(0, 1),
                constitution_proficiency = random.randint(0, 1),
                intelligence_proficiency = random.randint(0, 1),
                wisdom_proficiency = random.randint(0, 1),
                charisma_proficiency = random.randint(0, 1),
                strength_saving_throw = random.randint(0, 20),
                dexterity_saving_throw = random.randint(0, 20),
                constitution_saving_throw = random.randint(0, 20),
                intelligence_saving_throw = random.randint(0, 20),
                wisdom_saving_throw = random.randint(0, 20),
                charisma_saving_throw = random.randint(0, 20),
                user_id = i + 1
            )
            characters.append(character)
    db.session.add_all(characters)
    db.session.commit()

def make_skills():
    Skill.query.delete()
    skills = []
    dex = ['Acrobatics', 'Sleight of Hand', 'Stealth']
    wis = ['Animal Handling', 'Insight', 'Medicine', 'Perception', 'Survival']
    int = ['Arcana', 'History', 'Investigation', 'Nature', 'Religion']
    str = ['Athletics']
    cha = ['Deception', 'Intimidation', 'Performance', 'Persuasion']
    skills_list = [
        {
            "index": "acrobatics",
            "name": "Acrobatics",
            "url": "/api/skills/acrobatics"
        },
        {
            "index": "animal-handling",
            "name": "Animal Handling",
            "url": "/api/skills/animal-handling"
        },
        {
            "index": "arcana",
            "name": "Arcana",
            "url": "/api/skills/arcana"
        },
        {
            "index": "athletics",
            "name": "Athletics",
            "url": "/api/skills/athletics"
        },
        {
            "index": "deception",
            "name": "Deception",
            "url": "/api/skills/deception"
        },
        {
            "index": "history",
            "name": "History",
            "url": "/api/skills/history"
        },
        {
            "index": "insight",
            "name": "Insight",
            "url": "/api/skills/insight"
        },
        {
            "index": "intimidation",
            "name": "Intimidation",
            "url": "/api/skills/intimidation"
        },
        {
            "index": "investigation",
            "name": "Investigation",
            "url": "/api/skills/investigation"
        },
        {
            "index": "medicine",
            "name": "Medicine",
            "url": "/api/skills/medicine"
        },
        {
            "index": "nature",
            "name": "Nature",
            "url": "/api/skills/nature"
        },
        {
            "index": "perception",
            "name": "Perception",
            "url": "/api/skills/perception"
        },
        {
            "index": "performance",
            "name": "Performance",
            "url": "/api/skills/performance"
        },
        {
            "index": "persuasion",
            "name": "Persuasion",
            "url": "/api/skills/persuasion"
        },
        {
            "index": "religion",
            "name": "Religion",
            "url": "/api/skills/religion"
        },
        {
            "index": "sleight-of-hand",
            "name": "Sleight of Hand",
            "url": "/api/skills/sleight-of-hand"
        },
        {
            "index": "stealth",
            "name": "Stealth",
            "url": "/api/skills/stealth"
        },
        {
            "index": "survival",
            "name": "Survival",
            "url": "/api/skills/survival"
        }
    ]
    for skill_list_item in skills_list:
        ability = ''
        if skill_list_item['name'] in dex:
            ability = 'Dexterity'
        elif skill_list_item['name'] in wis:
            ability = 'Wisdom'
        elif skill_list_item['name'] in int:
            ability = 'Intelligence'
        elif skill_list_item['name'] in str:
            ability = 'Strength'
        elif skill_list_item['name'] in cha:
            ability = 'Charisma'
        skill = Skill(
            name = skill_list_item['name'],
            url = skill_list_item['url'],
            ability = ability
        )
        skills.append(skill)
    db.session.add_all(skills)
    db.session.commit()

def make_features():
    Feature.query.delete()
    features = []
    features_list = [
        {
            "index": "action-surge-1-use",
            "name": "Action Surge (1 use)",
            "url": "/api/features/action-surge-1-use"
        },
        {
            "index": "action-surge-2-uses",
            "name": "Action Surge (2 uses)",
            "url": "/api/features/action-surge-2-uses"
        },
        {
            "index": "additional-fighting-style",
            "name": "Additional Fighting Style",
            "url": "/api/features/additional-fighting-style"
        },
        {
            "index": "additional-magical-secrets",
            "name": "Additional Magical Secrets",
            "url": "/api/features/additional-magical-secrets"
        },
        {
            "index": "arcane-recovery",
            "name": "Arcane Recovery",
            "url": "/api/features/arcane-recovery"
        },
        {
            "index": "arcane-tradition",
            "name": "Arcane Tradition",
            "url": "/api/features/arcane-tradition"
        },
        {
            "index": "archdruid",
            "name": "Archdruid",
            "url": "/api/features/archdruid"
        },
        {
            "index": "aura-improvements",
            "name": "Aura improvements",
            "url": "/api/features/aura-improvements"
        },
        {
            "index": "aura-of-courage",
            "name": "Aura of Courage",
            "url": "/api/features/aura-of-courage"
        },
        {
            "index": "aura-of-devotion",
            "name": "Aura of Devotion",
            "url": "/api/features/aura-of-devotion"
        },
        {
            "index": "aura-of-protection",
            "name": "Aura of Protection",
            "url": "/api/features/aura-of-protection"
        },
        {
            "index": "barbarian-ability-score-improvement-1",
            "name": "Ability Score Improvement",
            "url": "/api/features/barbarian-ability-score-improvement-1"
        },
        {
            "index": "barbarian-ability-score-improvement-2",
            "name": "Ability Score Improvement",
            "url": "/api/features/barbarian-ability-score-improvement-2"
        },
        {
            "index": "barbarian-ability-score-improvement-3",
            "name": "Ability Score Improvement",
            "url": "/api/features/barbarian-ability-score-improvement-3"
        },
        {
            "index": "barbarian-ability-score-improvement-4",
            "name": "Ability Score Improvement",
            "url": "/api/features/barbarian-ability-score-improvement-4"
        },
        {
            "index": "barbarian-ability-score-improvement-5",
            "name": "Ability Score Improvement",
            "url": "/api/features/barbarian-ability-score-improvement-5"
        },
        {
            "index": "barbarian-extra-attack",
            "name": "Extra Attack",
            "url": "/api/features/barbarian-extra-attack"
        },
        {
            "index": "barbarian-unarmored-defense",
            "name": "Unarmored Defense",
            "url": "/api/features/barbarian-unarmored-defense"
        },
        {
            "index": "bard-ability-score-improvement-1",
            "name": "Ability Score Improvement",
            "url": "/api/features/bard-ability-score-improvement-1"
        },
        {
            "index": "bard-ability-score-improvement-2",
            "name": "Ability Score Improvement",
            "url": "/api/features/bard-ability-score-improvement-2"
        },
        {
            "index": "bard-ability-score-improvement-3",
            "name": "Ability Score Improvement",
            "url": "/api/features/bard-ability-score-improvement-3"
        },
        {
            "index": "bard-ability-score-improvement-4",
            "name": "Ability Score Improvement",
            "url": "/api/features/bard-ability-score-improvement-4"
        },
        {
            "index": "bard-ability-score-improvement-5",
            "name": "Ability Score Improvement",
            "url": "/api/features/bard-ability-score-improvement-5"
        },
        {
            "index": "bard-college",
            "name": "Bard College",
            "url": "/api/features/bard-college"
        },
        {
            "index": "bard-expertise-1",
            "name": "Expertise",
            "url": "/api/features/bard-expertise-1"
        },
        {
            "index": "bard-expertise-2",
            "name": "Expertise",
            "url": "/api/features/bard-expertise-2"
        },
        {
            "index": "bardic-inspiration-d10",
            "name": "Bardic Inspiration (d10)",
            "url": "/api/features/bardic-inspiration-d10"
        },
        {
            "index": "bardic-inspiration-d12",
            "name": "Bardic Inspiration (d12)",
            "url": "/api/features/bardic-inspiration-d12"
        },
        {
            "index": "bardic-inspiration-d6",
            "name": "Bardic Inspiration (d6)",
            "url": "/api/features/bardic-inspiration-d6"
        },
        {
            "index": "bardic-inspiration-d8",
            "name": "Bardic Inspiration (d8)",
            "url": "/api/features/bardic-inspiration-d8"
        },
        {
            "index": "beast-spells",
            "name": "Beast Spells",
            "url": "/api/features/beast-spells"
        },
        {
            "index": "blessed-healer",
            "name": "Blessed Healer",
            "url": "/api/features/blessed-healer"
        },
        {
            "index": "blindsense",
            "name": "Blindsense",
            "url": "/api/features/blindsense"
        },
        {
            "index": "bonus-cantrip",
            "name": "Bonus Cantrip",
            "url": "/api/features/bonus-cantrip"
        },
        {
            "index": "bonus-proficiencies",
            "name": "Bonus Proficiencies",
            "url": "/api/features/bonus-proficiencies"
        },
        {
            "index": "bonus-proficiency",
            "name": "Bonus Proficiency",
            "url": "/api/features/bonus-proficiency"
        },
        {
            "index": "brutal-critical-1-die",
            "name": "Brutal Critical (1 die)",
            "url": "/api/features/brutal-critical-1-die"
        },
        {
            "index": "brutal-critical-2-dice",
            "name": "Brutal Critical (2 dice)",
            "url": "/api/features/brutal-critical-2-dice"
        },
        {
            "index": "brutal-critical-3-dice",
            "name": "Brutal Critical (3 dice)",
            "url": "/api/features/brutal-critical-3-dice"
        },
        {
            "index": "channel-divinity",
            "name": "Channel Divinity",
            "url": "/api/features/channel-divinity"
        },
        {
            "index": "channel-divinity-1-rest",
            "name": "Channel Divinity (1/rest)",
            "url": "/api/features/channel-divinity-1-rest"
        },
        {
            "index": "channel-divinity-2-rest",
            "name": "Channel Divinity (2/rest)",
            "url": "/api/features/channel-divinity-2-rest"
        },
        {
            "index": "channel-divinity-3-rest",
            "name": "Channel Divinity (3/rest)",
            "url": "/api/features/channel-divinity-3-rest"
        },
        {
            "index": "channel-divinity-preserve-life",
            "name": "Channel Divinity: Preserve Life",
            "url": "/api/features/channel-divinity-preserve-life"
        },
        {
            "index": "channel-divinity-sacred-weapon",
            "name": "Channel Divinity: Sacred Weapon",
            "url": "/api/features/channel-divinity-sacred-weapon"
        },
        {
            "index": "channel-divinity-turn-the-unholy",
            "name": "Channel Divinity: Turn the Unholy",
            "url": "/api/features/channel-divinity-turn-the-unholy"
        },
        {
            "index": "channel-divinity-turn-undead",
            "name": "Channel Divinity: Turn Undead",
            "url": "/api/features/channel-divinity-turn-undead"
        },
        {
            "index": "circle-of-the-land",
            "name": "Circle of the Land",
            "url": "/api/features/circle-of-the-land"
        },
        {
            "index": "circle-of-the-land-arctic",
            "name": "Circle of the Land: Arctic",
            "url": "/api/features/circle-of-the-land-arctic"
        },
        {
            "index": "circle-of-the-land-coast",
            "name": "Circle of the Land: Coast",
            "url": "/api/features/circle-of-the-land-coast"
        },
        {
            "index": "circle-of-the-land-desert",
            "name": "Circle of the Land: Desert",
            "url": "/api/features/circle-of-the-land-desert"
        },
        {
            "index": "circle-of-the-land-forest",
            "name": "Circle of the Land: Forest",
            "url": "/api/features/circle-of-the-land-forest"
        },
        {
            "index": "circle-of-the-land-grassland",
            "name": "Circle of the Land: Grassland",
            "url": "/api/features/circle-of-the-land-grassland"
        },
        {
            "index": "circle-of-the-land-mountain",
            "name": "Circle of the Land: Mountain",
            "url": "/api/features/circle-of-the-land-mountain"
        },
        {
            "index": "circle-of-the-land-swamp",
            "name": "Circle of the Land: Swamp",
            "url": "/api/features/circle-of-the-land-swamp"
        },
        {
            "index": "circle-spells-1",
            "name": "Circle Spells",
            "url": "/api/features/circle-spells-1"
        },
        {
            "index": "circle-spells-2",
            "name": "Circle Spells",
            "url": "/api/features/circle-spells-2"
        },
        {
            "index": "circle-spells-3",
            "name": "Circle Spells",
            "url": "/api/features/circle-spells-3"
        },
        {
            "index": "circle-spells-4",
            "name": "Circle Spells",
            "url": "/api/features/circle-spells-4"
        },
        {
            "index": "cleansing-touch",
            "name": "Cleansing Touch",
            "url": "/api/features/cleansing-touch"
        },
        {
            "index": "cleric-ability-score-improvement-1",
            "name": "Ability Score Improvement",
            "url": "/api/features/cleric-ability-score-improvement-1"
        },
        {
            "index": "cleric-ability-score-improvement-2",
            "name": "Ability Score Improvement",
            "url": "/api/features/cleric-ability-score-improvement-2"
        },
        {
            "index": "cleric-ability-score-improvement-3",
            "name": "Ability Score Improvement",
            "url": "/api/features/cleric-ability-score-improvement-3"
        },
        {
            "index": "cleric-ability-score-improvement-4",
            "name": "Ability Score Improvement",
            "url": "/api/features/cleric-ability-score-improvement-4"
        },
        {
            "index": "cleric-ability-score-improvement-5",
            "name": "Ability Score Improvement",
            "url": "/api/features/cleric-ability-score-improvement-5"
        },
        {
            "index": "countercharm",
            "name": "Countercharm",
            "url": "/api/features/countercharm"
        },
        {
            "index": "cunning-action",
            "name": "Cunning Action",
            "url": "/api/features/cunning-action"
        },
        {
            "index": "cutting-words",
            "name": "Cutting Words",
            "url": "/api/features/cutting-words"
        },
        {
            "index": "danger-sense",
            "name": "Danger Sense",
            "url": "/api/features/danger-sense"
        },
        {
            "index": "dark-ones-blessing",
            "name": "Dark One's Blessing",
            "url": "/api/features/dark-ones-blessing"
        },
        {
            "index": "dark-ones-own-luck",
            "name": "Dark One's Own Luck",
            "url": "/api/features/dark-ones-own-luck"
        },
        {
            "index": "defensive-tactics",
            "name": "Defensive Tactics",
            "url": "/api/features/defensive-tactics"
        },
        {
            "index": "defensive-tactics-escape-the-horde",
            "name": "Defensive Tactics: Escape the Horde",
            "url": "/api/features/defensive-tactics-escape-the-horde"
        },
        {
            "index": "defensive-tactics-multiattack-defense",
            "name": "Defensive Tactics: Multiattack Defense",
            "url": "/api/features/defensive-tactics-multiattack-defense"
        },
        {
            "index": "defensive-tactics-steel-will",
            "name": "Defensive Tactics: Steel Will",
            "url": "/api/features/defensive-tactics-steel-will"
        },
        {
            "index": "deflect-missiles",
            "name": "Deflect Missiles",
            "url": "/api/features/deflect-missiles"
        },
        {
            "index": "destroy-undead-cr-1-2-or-below",
            "name": "Destroy Undead (CR 1/2 or below)",
            "url": "/api/features/destroy-undead-cr-1-2-or-below"
        },
        {
            "index": "destroy-undead-cr-1-or-below",
            "name": "Destroy Undead (CR 1 or below)",
            "url": "/api/features/destroy-undead-cr-1-or-below"
        },
        {
            "index": "destroy-undead-cr-2-or-below",
            "name": "Destroy Undead (CR 2 or below)",
            "url": "/api/features/destroy-undead-cr-2-or-below"
        },
        {
            "index": "destroy-undead-cr-3-or-below",
            "name": "Destroy Undead (CR 3 or below)",
            "url": "/api/features/destroy-undead-cr-3-or-below"
        },
        {
            "index": "destroy-undead-cr-4-or-below",
            "name": "Destroy Undead (CR 4 or below)",
            "url": "/api/features/destroy-undead-cr-4-or-below"
        },
        {
            "index": "diamond-soul",
            "name": "Diamond Soul",
            "url": "/api/features/diamond-soul"
        },
        {
            "index": "disciple-of-life",
            "name": "Disciple of Life",
            "url": "/api/features/disciple-of-life"
        },
        {
            "index": "divine-domain",
            "name": "Divine Domain",
            "url": "/api/features/divine-domain"
        },
        {
            "index": "divine-health",
            "name": "Divine Health",
            "url": "/api/features/divine-health"
        },
        {
            "index": "divine-intervention",
            "name": "Divine Intervention",
            "url": "/api/features/divine-intervention"
        },
        {
            "index": "divine-intervention-improvement",
            "name": "Divine Intervention Improvement",
            "url": "/api/features/divine-intervention-improvement"
        },
        {
            "index": "divine-sense",
            "name": "Divine Sense",
            "url": "/api/features/divine-sense"
        },
        {
            "index": "divine-smite",
            "name": "Divine Smite",
            "url": "/api/features/divine-smite"
        },
        {
            "index": "divine-strike",
            "name": "Divine Strike",
            "url": "/api/features/divine-strike"
        },
        {
            "index": "domain-spells-1",
            "name": "Domain Spells",
            "url": "/api/features/domain-spells-1"
        },
        {
            "index": "domain-spells-2",
            "name": "Domain Spells",
            "url": "/api/features/domain-spells-2"
        },
        {
            "index": "domain-spells-3",
            "name": "Domain Spells",
            "url": "/api/features/domain-spells-3"
        },
        {
            "index": "domain-spells-4",
            "name": "Domain Spells",
            "url": "/api/features/domain-spells-4"
        },
        {
            "index": "domain-spells-5",
            "name": "Domain Spells",
            "url": "/api/features/domain-spells-5"
        },
        {
            "index": "draconic-presence",
            "name": "Draconic Presence",
            "url": "/api/features/draconic-presence"
        },
        {
            "index": "draconic-resilience",
            "name": "Draconic Resilience",
            "url": "/api/features/draconic-resilience"
        },
        {
            "index": "dragon-ancestor",
            "name": "Dragon Ancestor",
            "url": "/api/features/dragon-ancestor"
        },
        {
            "index": "dragon-ancestor-black---acid-damage",
            "name": "Dragon Ancestor: Black - Acid Damage",
            "url": "/api/features/dragon-ancestor-black---acid-damage"
        },
        {
            "index": "dragon-ancestor-blue---lightning-damage",
            "name": "Dragon Ancestor: Blue - Lightning Damage",
            "url": "/api/features/dragon-ancestor-blue---lightning-damage"
        },
        {
            "index": "dragon-ancestor-brass---fire-damage",
            "name": "Dragon Ancestor: Brass - Fire Damage",
            "url": "/api/features/dragon-ancestor-brass---fire-damage"
        },
        {
            "index": "dragon-ancestor-bronze---lightning-damage",
            "name": "Dragon Ancestor: Bronze - Lightning Damage",
            "url": "/api/features/dragon-ancestor-bronze---lightning-damage"
        },
        {
            "index": "dragon-ancestor-copper---acid-damage",
            "name": "Dragon Ancestor: Copper - Acid Damage",
            "url": "/api/features/dragon-ancestor-copper---acid-damage"
        },
        {
            "index": "dragon-ancestor-gold---fire-damage",
            "name": "Dragon Ancestor: Gold - Fire Damage",
            "url": "/api/features/dragon-ancestor-gold---fire-damage"
        },
        {
            "index": "dragon-ancestor-green---poison-damage",
            "name": "Dragon Ancestor: Green - Poison Damage",
            "url": "/api/features/dragon-ancestor-green---poison-damage"
        },
        {
            "index": "dragon-ancestor-red---fire-damage",
            "name": "Dragon Ancestor: Red - Fire Damage",
            "url": "/api/features/dragon-ancestor-red---fire-damage"
        },
        {
            "index": "dragon-ancestor-silver---cold-damage",
            "name": "Dragon Ancestor: Silver - Cold Damage",
            "url": "/api/features/dragon-ancestor-silver---cold-damage"
        },
        {
            "index": "dragon-ancestor-white---cold-damage",
            "name": "Dragon Ancestor: White - Cold Damage",
            "url": "/api/features/dragon-ancestor-white---cold-damage"
        },
        {
            "index": "dragon-wings",
            "name": "Dragon Wings",
            "url": "/api/features/dragon-wings"
        },
        {
            "index": "druid-ability-score-improvement-1",
            "name": "Ability Score Improvement",
            "url": "/api/features/druid-ability-score-improvement-1"
        },
        {
            "index": "druid-ability-score-improvement-2",
            "name": "Ability Score Improvement",
            "url": "/api/features/druid-ability-score-improvement-2"
        },
        {
            "index": "druid-ability-score-improvement-3",
            "name": "Ability Score Improvement",
            "url": "/api/features/druid-ability-score-improvement-3"
        },
        {
            "index": "druid-ability-score-improvement-4",
            "name": "Ability Score Improvement",
            "url": "/api/features/druid-ability-score-improvement-4"
        },
        {
            "index": "druid-ability-score-improvement-5",
            "name": "Ability Score Improvement",
            "url": "/api/features/druid-ability-score-improvement-5"
        },
        {
            "index": "druid-circle",
            "name": "Druid Circle",
            "url": "/api/features/druid-circle"
        },
        {
            "index": "druid-lands-stride",
            "name": "Land's Stride",
            "url": "/api/features/druid-lands-stride"
        },
        {
            "index": "druid-timeless-body",
            "name": "Timeless Body",
            "url": "/api/features/druid-timeless-body"
        },
        {
            "index": "druidic",
            "name": "Druidic",
            "url": "/api/features/druidic"
        },
        {
            "index": "eldritch-invocation-agonizing-blast",
            "name": "Eldritch Invocation: Agonizing Blast",
            "url": "/api/features/eldritch-invocation-agonizing-blast"
        },
        {
            "index": "eldritch-invocation-armor-of-shadows",
            "name": "Eldritch Invocation: Armor of Shadows",
            "url": "/api/features/eldritch-invocation-armor-of-shadows"
        },
        {
            "index": "eldritch-invocation-ascendant-step",
            "name": "Eldritch Invocation: Ascendant Step",
            "url": "/api/features/eldritch-invocation-ascendant-step"
        },
        {
            "index": "eldritch-invocation-beast-speech",
            "name": "Eldritch Invocation: Beast Speech",
            "url": "/api/features/eldritch-invocation-beast-speech"
        },
        {
            "index": "eldritch-invocation-beguiling-influence",
            "name": "Eldritch Invocation: Beguiling Influence",
            "url": "/api/features/eldritch-invocation-beguiling-influence"
        },
        {
            "index": "eldritch-invocation-bewitching-whispers",
            "name": "Eldritch Invocation: Bewitching Whispers",
            "url": "/api/features/eldritch-invocation-bewitching-whispers"
        },
        {
            "index": "eldritch-invocation-book-of-ancient-secrets",
            "name": "Eldritch Invocation: Book of Ancient Secrets",
            "url": "/api/features/eldritch-invocation-book-of-ancient-secrets"
        },
        {
            "index": "eldritch-invocation-chains-of-carceri",
            "name": "Eldritch Invocation: Chains of Carceri",
            "url": "/api/features/eldritch-invocation-chains-of-carceri"
        },
        {
            "index": "eldritch-invocation-devils-sight",
            "name": "Eldritch Invocation: Devil's Sight",
            "url": "/api/features/eldritch-invocation-devils-sight"
        },
        {
            "index": "eldritch-invocation-dreadful-word",
            "name": "Eldritch Invocation: Dreadful Word",
            "url": "/api/features/eldritch-invocation-dreadful-word"
        },
        {
            "index": "eldritch-invocation-eldritch-sight",
            "name": "Eldritch Invocation: Eldritch Sight",
            "url": "/api/features/eldritch-invocation-eldritch-sight"
        },
        {
            "index": "eldritch-invocation-eldritch-spear",
            "name": "Eldritch Invocation: Eldritch Spear",
            "url": "/api/features/eldritch-invocation-eldritch-spear"
        },
        {
            "index": "eldritch-invocation-eyes-of-the-rune-keeper",
            "name": "Eldritch Invocation: Eyes of the Rune Keeper",
            "url": "/api/features/eldritch-invocation-eyes-of-the-rune-keeper"
        },
        {
            "index": "eldritch-invocation-fiendish-vigor",
            "name": "Eldritch Invocation: Fiendish Vigor",
            "url": "/api/features/eldritch-invocation-fiendish-vigor"
        },
        {
            "index": "eldritch-invocation-gaze-of-two-minds",
            "name": "Eldritch Invocation: Gaze of Two Minds",
            "url": "/api/features/eldritch-invocation-gaze-of-two-minds"
        },
        {
            "index": "eldritch-invocation-lifedrinker",
            "name": "Eldritch Invocation: Lifedrinker",
            "url": "/api/features/eldritch-invocation-lifedrinker"
        },
        {
            "index": "eldritch-invocation-mask-of-many-faces",
            "name": "Eldritch Invocation: Mask of Many Faces",
            "url": "/api/features/eldritch-invocation-mask-of-many-faces"
        },
        {
            "index": "eldritch-invocation-master-of-myriad-forms",
            "name": "Eldritch Invocation: Master of Myriad Forms",
            "url": "/api/features/eldritch-invocation-master-of-myriad-forms"
        },
        {
            "index": "eldritch-invocation-minions-of-chaos",
            "name": "Eldritch Invocation: Minions of Chaos",
            "url": "/api/features/eldritch-invocation-minions-of-chaos"
        },
        {
            "index": "eldritch-invocation-mire-the-mind",
            "name": "Eldritch Invocation: Mire the Mind",
            "url": "/api/features/eldritch-invocation-mire-the-mind"
        },
        {
            "index": "eldritch-invocation-misty-visions",
            "name": "Eldritch Invocation: Misty Visions",
            "url": "/api/features/eldritch-invocation-misty-visions"
        },
        {
            "index": "eldritch-invocation-one-with-shadows",
            "name": "Eldritch Invocation: One with Shadows",
            "url": "/api/features/eldritch-invocation-one-with-shadows"
        },
        {
            "index": "eldritch-invocation-otherworldly-leap",
            "name": "Eldritch Invocation: Otherworldly Leap",
            "url": "/api/features/eldritch-invocation-otherworldly-leap"
        },
        {
            "index": "eldritch-invocation-repelling-blast",
            "name": "Eldritch Invocation: Repelling Blast",
            "url": "/api/features/eldritch-invocation-repelling-blast"
        },
        {
            "index": "eldritch-invocation-sculptor-of-flesh",
            "name": "Eldritch Invocation: Sculptor of Flesh",
            "url": "/api/features/eldritch-invocation-sculptor-of-flesh"
        },
        {
            "index": "eldritch-invocation-sign-of-ill-omen",
            "name": "Eldritch Invocation: Sign of Ill Omen",
            "url": "/api/features/eldritch-invocation-sign-of-ill-omen"
        },
        {
            "index": "eldritch-invocation-thief-of-five-fates",
            "name": "Eldritch Invocation: Thief of Five Fates",
            "url": "/api/features/eldritch-invocation-thief-of-five-fates"
        },
        {
            "index": "eldritch-invocation-thirsting-blade",
            "name": "Eldritch Invocation: Thirsting Blade",
            "url": "/api/features/eldritch-invocation-thirsting-blade"
        },
        {
            "index": "eldritch-invocation-visions-of-distant-realms",
            "name": "Eldritch Invocation: Visions of Distant Realms",
            "url": "/api/features/eldritch-invocation-visions-of-distant-realms"
        },
        {
            "index": "eldritch-invocation-voice-of-the-chain-master",
            "name": "Eldritch Invocation: Voice of the Chain Master",
            "url": "/api/features/eldritch-invocation-voice-of-the-chain-master"
        },
        {
            "index": "eldritch-invocation-whispers-of-the-grave",
            "name": "Eldritch Invocation: Whispers of the Grave",
            "url": "/api/features/eldritch-invocation-whispers-of-the-grave"
        },
        {
            "index": "eldritch-invocation-witch-sight",
            "name": "Eldritch Invocation: Witch Sight",
            "url": "/api/features/eldritch-invocation-witch-sight"
        },
        {
            "index": "eldritch-invocations",
            "name": "Eldritch Invocations",
            "url": "/api/features/eldritch-invocations"
        },
        {
            "index": "eldritch-master",
            "name": "Eldritch Master",
            "url": "/api/features/eldritch-master"
        },
        {
            "index": "elemental-affinity",
            "name": "Elemental Affinity",
            "url": "/api/features/elemental-affinity"
        },
        {
            "index": "elusive",
            "name": "Elusive",
            "url": "/api/features/elusive"
        },
        {
            "index": "empowered-evocation",
            "name": "Empowered Evocation",
            "url": "/api/features/empowered-evocation"
        },
        {
            "index": "empty-body",
            "name": "Empty Body",
            "url": "/api/features/empty-body"
        },
        {
            "index": "evocation-savant",
            "name": "Evocation Savant",
            "url": "/api/features/evocation-savant"
        },
        {
            "index": "extra-attack-1",
            "name": "Extra Attack",
            "url": "/api/features/extra-attack-1"
        },
        {
            "index": "extra-attack-2",
            "name": "Extra Attack (2)",
            "url": "/api/features/extra-attack-2"
        },
        {
            "index": "extra-attack-3",
            "name": "Extra Attack (3)",
            "url": "/api/features/extra-attack-3"
        },
        {
            "index": "fast-hands",
            "name": "Fast Hands",
            "url": "/api/features/fast-hands"
        },
        {
            "index": "fast-movement",
            "name": "Fast Movement",
            "url": "/api/features/fast-movement"
        },
        {
            "index": "favored-enemy-1-type",
            "name": "Favored Enemy (1 type)",
            "url": "/api/features/favored-enemy-1-type"
        },
        {
            "index": "favored-enemy-2-types",
            "name": "Favored Enemy (2 types)",
            "url": "/api/features/favored-enemy-2-types"
        },
        {
            "index": "favored-enemy-3-enemies",
            "name": "Favored Enemy (3 enemies)",
            "url": "/api/features/favored-enemy-3-enemies"
        },
        {
            "index": "feral-instinct",
            "name": "Feral Instinct",
            "url": "/api/features/feral-instinct"
        },
        {
            "index": "feral-senses",
            "name": "Feral Senses",
            "url": "/api/features/feral-senses"
        },
        {
            "index": "fiendish-resilience",
            "name": "Fiendish Resilience",
            "url": "/api/features/fiendish-resilience"
        },
        {
            "index": "fighter-ability-score-improvement-1",
            "name": "Ability Score Improvement",
            "url": "/api/features/fighter-ability-score-improvement-1"
        },
        {
            "index": "fighter-ability-score-improvement-2",
            "name": "Ability Score Improvement",
            "url": "/api/features/fighter-ability-score-improvement-2"
        },
        {
            "index": "fighter-ability-score-improvement-3",
            "name": "Ability Score Improvement",
            "url": "/api/features/fighter-ability-score-improvement-3"
        },
        {
            "index": "fighter-ability-score-improvement-4",
            "name": "Ability Score Improvement",
            "url": "/api/features/fighter-ability-score-improvement-4"
        },
        {
            "index": "fighter-ability-score-improvement-5",
            "name": "Ability Score Improvement",
            "url": "/api/features/fighter-ability-score-improvement-5"
        },
        {
            "index": "fighter-ability-score-improvement-6",
            "name": "Ability Score Improvement",
            "url": "/api/features/fighter-ability-score-improvement-6"
        },
        {
            "index": "fighter-ability-score-improvement-7",
            "name": "Ability Score Improvement",
            "url": "/api/features/fighter-ability-score-improvement-7"
        },
        {
            "index": "fighter-fighting-style",
            "name": "Fighting Style",
            "url": "/api/features/fighter-fighting-style"
        },
        {
            "index": "fighter-fighting-style-archery",
            "name": "Fighting Style: Archery",
            "url": "/api/features/fighter-fighting-style-archery"
        },
        {
            "index": "fighter-fighting-style-defense",
            "name": "Fighting Style: Defense",
            "url": "/api/features/fighter-fighting-style-defense"
        },
        {
            "index": "fighter-fighting-style-dueling",
            "name": "Fighting Style: Dueling",
            "url": "/api/features/fighter-fighting-style-dueling"
        },
        {
            "index": "fighter-fighting-style-great-weapon-fighting",
            "name": "Fighting Style: Great Weapon Fighting",
            "url": "/api/features/fighter-fighting-style-great-weapon-fighting"
        },
        {
            "index": "fighter-fighting-style-protection",
            "name": "Fighting Style: Protection",
            "url": "/api/features/fighter-fighting-style-protection"
        },
        {
            "index": "fighter-fighting-style-two-weapon-fighting",
            "name": "Fighting Style: Two-Weapon Fighting",
            "url": "/api/features/fighter-fighting-style-two-weapon-fighting"
        },
        {
            "index": "fighting-style-defense",
            "name": "Fighting Style: Defense",
            "url": "/api/features/fighting-style-defense"
        },
        {
            "index": "fighting-style-dueling",
            "name": "Fighting Style: Dueling",
            "url": "/api/features/fighting-style-dueling"
        },
        {
            "index": "fighting-style-great-weapon-fighting",
            "name": "Fighting Style: Great Weapon Fighting",
            "url": "/api/features/fighting-style-great-weapon-fighting"
        },
        {
            "index": "fighting-style-protection",
            "name": "Fighting Style: Protection",
            "url": "/api/features/fighting-style-protection"
        },
        {
            "index": "flexible-casting-converting-spell-slot",
            "name": "Flexible Casting: Converting Spell Slot",
            "url": "/api/features/flexible-casting-converting-spell-slot"
        },
        {
            "index": "flexible-casting-creating-spell-slots",
            "name": "Flexible Casting: Creating Spell Slots",
            "url": "/api/features/flexible-casting-creating-spell-slots"
        },
        {
            "index": "flurry-of-blows",
            "name": "Flurry of Blows",
            "url": "/api/features/flurry-of-blows"
        },
        {
            "index": "foe-slayer",
            "name": "Foe Slayer",
            "url": "/api/features/foe-slayer"
        },
        {
            "index": "font-of-inspiration",
            "name": "Font of Inspiration",
            "url": "/api/features/font-of-inspiration"
        },
        {
            "index": "font-of-magic",
            "name": "Font of Magic",
            "url": "/api/features/font-of-magic"
        },
        {
            "index": "frenzy",
            "name": "Frenzy",
            "url": "/api/features/frenzy"
        },
        {
            "index": "hide-in-plain-sight",
            "name": "Hide in Plain Sight",
            "url": "/api/features/hide-in-plain-sight"
        },
        {
            "index": "holy-nimbus",
            "name": "Holy Nimbus",
            "url": "/api/features/holy-nimbus"
        },
        {
            "index": "hunters-prey",
            "name": "Hunter's Prey",
            "url": "/api/features/hunters-prey"
        },
        {
            "index": "hunters-prey-colossus-slayer",
            "name": "Hunter's Prey: Colossus Slayer",
            "url": "/api/features/hunters-prey-colossus-slayer"
        },
        {
            "index": "hunters-prey-giant-killer",
            "name": "Hunter's Prey: Giant Killer",
            "url": "/api/features/hunters-prey-giant-killer"
        },
        {
            "index": "hunters-prey-horde-breaker",
            "name": "Hunter's Prey: Horde Breaker",
            "url": "/api/features/hunters-prey-horde-breaker"
        },
        {
            "index": "hurl-through-hell",
            "name": "Hurl Through Hell",
            "url": "/api/features/hurl-through-hell"
        },
        {
            "index": "improved-critical",
            "name": "Improved Critical",
            "url": "/api/features/improved-critical"
        },
        {
            "index": "improved-divine-smite",
            "name": "Improved Divine Smite",
            "url": "/api/features/improved-divine-smite"
        },
        {
            "index": "indomitable-1-use",
            "name": "Indomitable (1 use)",
            "url": "/api/features/indomitable-1-use"
        },
        {
            "index": "indomitable-2-uses",
            "name": "Indomitable (2 uses)",
            "url": "/api/features/indomitable-2-uses"
        },
        {
            "index": "indomitable-3-uses",
            "name": "Indomitable (3 uses)",
            "url": "/api/features/indomitable-3-uses"
        },
        {
            "index": "indomitable-might",
            "name": "Indomitable Might",
            "url": "/api/features/indomitable-might"
        },
        {
            "index": "intimidating-presence",
            "name": "Intimidating Presence",
            "url": "/api/features/intimidating-presence"
        },
        {
            "index": "jack-of-all-trades",
            "name": "Jack of All Trades",
            "url": "/api/features/jack-of-all-trades"
        },
        {
            "index": "ki",
            "name": "Ki",
            "url": "/api/features/ki"
        },
        {
            "index": "ki-empowered-strikes",
            "name": "Ki Empowered Strikes",
            "url": "/api/features/ki-empowered-strikes"
        },
        {
            "index": "lay-on-hands",
            "name": "Lay on Hands",
            "url": "/api/features/lay-on-hands"
        },
        {
            "index": "magical-secrets-1",
            "name": "Magical Secrets",
            "url": "/api/features/magical-secrets-1"
        },
        {
            "index": "magical-secrets-2",
            "name": "Magical Secrets",
            "url": "/api/features/magical-secrets-2"
        },
        {
            "index": "magical-secrets-3",
            "name": "Magical Secrets",
            "url": "/api/features/magical-secrets-3"
        },
        {
            "index": "martial-archetype",
            "name": "Martial Archetype",
            "url": "/api/features/martial-archetype"
        },
        {
            "index": "martial-arts",
            "name": "Martial Arts",
            "url": "/api/features/martial-arts"
        },
        {
            "index": "metamagic-1",
            "name": "Metamagic",
            "url": "/api/features/metamagic-1"
        },
        {
            "index": "metamagic-2",
            "name": "Metamagic",
            "url": "/api/features/metamagic-2"
        },
        {
            "index": "metamagic-3",
            "name": "Metamagic",
            "url": "/api/features/metamagic-3"
        },
        {
            "index": "metamagic-careful-spell",
            "name": "Metamagic: Careful Spell",
            "url": "/api/features/metamagic-careful-spell"
        },
        {
            "index": "metamagic-distant-spell",
            "name": "Metamagic: Distant Spell",
            "url": "/api/features/metamagic-distant-spell"
        },
        {
            "index": "metamagic-empowered-spell",
            "name": "Metamagic: Empowered Spell",
            "url": "/api/features/metamagic-empowered-spell"
        },
        {
            "index": "metamagic-extended-spell",
            "name": "Metamagic: Extended Spell",
            "url": "/api/features/metamagic-extended-spell"
        },
        {
            "index": "metamagic-heightened-spell",
            "name": "Metamagic: Heightened Spell",
            "url": "/api/features/metamagic-heightened-spell"
        },
        {
            "index": "metamagic-quickened-spell",
            "name": "Metamagic: Quickened Spell",
            "url": "/api/features/metamagic-quickened-spell"
        },
        {
            "index": "metamagic-subtle-spell",
            "name": "Metamagic: Subtle Spell",
            "url": "/api/features/metamagic-subtle-spell"
        },
        {
            "index": "metamagic-twinned-spell",
            "name": "Metamagic: Twinned Spell",
            "url": "/api/features/metamagic-twinned-spell"
        },
        {
            "index": "mindless-rage",
            "name": "Mindless Rage",
            "url": "/api/features/mindless-rage"
        },
        {
            "index": "monastic-tradition",
            "name": "Monastic Tradition",
            "url": "/api/features/monastic-tradition"
        },
        {
            "index": "monk-ability-score-improvement-1",
            "name": "Ability Score Improvement",
            "url": "/api/features/monk-ability-score-improvement-1"
        },
        {
            "index": "monk-ability-score-improvement-2",
            "name": "Ability Score Improvement",
            "url": "/api/features/monk-ability-score-improvement-2"
        },
        {
            "index": "monk-ability-score-improvement-3",
            "name": "Ability Score Improvement",
            "url": "/api/features/monk-ability-score-improvement-3"
        },
        {
            "index": "monk-ability-score-improvement-4",
            "name": "Ability Score Improvement",
            "url": "/api/features/monk-ability-score-improvement-4"
        },
        {
            "index": "monk-ability-score-improvement-5",
            "name": "Ability Score Improvement",
            "url": "/api/features/monk-ability-score-improvement-5"
        },
        {
            "index": "monk-evasion",
            "name": "Evasion",
            "url": "/api/features/monk-evasion"
        },
        {
            "index": "monk-extra-attack",
            "name": "Extra Attack",
            "url": "/api/features/monk-extra-attack"
        },
        {
            "index": "monk-timeless-body",
            "name": "Timeless Body",
            "url": "/api/features/monk-timeless-body"
        },
        {
            "index": "monk-unarmored-defense",
            "name": "Unarmored Defense",
            "url": "/api/features/monk-unarmored-defense"
        },
        {
            "index": "multiattack",
            "name": "Multiattack",
            "url": "/api/features/multiattack"
        },
        {
            "index": "multiattack-volley",
            "name": "Multiattack: Volley",
            "url": "/api/features/multiattack-volley"
        },
        {
            "index": "multiattack-whirlwind-attack",
            "name": "Multiattack: Whirlwind Attack",
            "url": "/api/features/multiattack-whirlwind-attack"
        },
        {
            "index": "mystic-arcanum-6th-level",
            "name": "Mystic Arcanum (6th level)",
            "url": "/api/features/mystic-arcanum-6th-level"
        },
        {
            "index": "mystic-arcanum-7th-level",
            "name": "Mystic Arcanum (7th level)",
            "url": "/api/features/mystic-arcanum-7th-level"
        },
        {
            "index": "mystic-arcanum-8th-level",
            "name": "Mystic Arcanum (8th level)",
            "url": "/api/features/mystic-arcanum-8th-level"
        },
        {
            "index": "mystic-arcanum-9th-level",
            "name": "Mystic Arcanum (9th level)",
            "url": "/api/features/mystic-arcanum-9th-level"
        },
        {
            "index": "natural-explorer-1-terrain-type",
            "name": "Natural Explorer (1 terrain type)",
            "url": "/api/features/natural-explorer-1-terrain-type"
        },
        {
            "index": "natural-explorer-2-terrain-types",
            "name": "Natural Explorer (2 terrain types)",
            "url": "/api/features/natural-explorer-2-terrain-types"
        },
        {
            "index": "natural-explorer-3-terrain-types",
            "name": "Natural Explorer (3 terrain types)",
            "url": "/api/features/natural-explorer-3-terrain-types"
        },
        {
            "index": "natural-recovery",
            "name": "Natural Recovery",
            "url": "/api/features/natural-recovery"
        },
        {
            "index": "natures-sanctuary",
            "name": "Nature's Sanctuary",
            "url": "/api/features/natures-sanctuary"
        },
        {
            "index": "natures-ward",
            "name": "Nature's Ward",
            "url": "/api/features/natures-ward"
        },
        {
            "index": "oath-spells",
            "name": "Oath Spells",
            "url": "/api/features/oath-spells"
        },
        {
            "index": "open-hand-technique",
            "name": "Open Hand Technique",
            "url": "/api/features/open-hand-technique"
        },
        {
            "index": "otherworldly-patron",
            "name": "Otherworldly Patron",
            "url": "/api/features/otherworldly-patron"
        },
        {
            "index": "overchannel",
            "name": "Overchannel",
            "url": "/api/features/overchannel"
        },
        {
            "index": "pact-boon",
            "name": "Pact Boon",
            "url": "/api/features/pact-boon"
        },
        {
            "index": "pact-magic",
            "name": "Pact Magic",
            "url": "/api/features/pact-magic"
        },
        {
            "index": "pact-of-the-blade",
            "name": "Pact of the Blade",
            "url": "/api/features/pact-of-the-blade"
        },
        {
            "index": "pact-of-the-chain",
            "name": "Pact of the Chain",
            "url": "/api/features/pact-of-the-chain"
        },
        {
            "index": "pact-of-the-tome",
            "name": "Pact of the Tome",
            "url": "/api/features/pact-of-the-tome"
        },
        {
            "index": "paladin-ability-score-improvement-1",
            "name": "Ability Score Improvement",
            "url": "/api/features/paladin-ability-score-improvement-1"
        },
        {
            "index": "paladin-ability-score-improvement-2",
            "name": "Ability Score Improvement",
            "url": "/api/features/paladin-ability-score-improvement-2"
        },
        {
            "index": "paladin-ability-score-improvement-3",
            "name": "Ability Score Improvement",
            "url": "/api/features/paladin-ability-score-improvement-3"
        },
        {
            "index": "paladin-ability-score-improvement-4",
            "name": "Ability Score Improvement",
            "url": "/api/features/paladin-ability-score-improvement-4"
        },
        {
            "index": "paladin-ability-score-improvement-5",
            "name": "Ability Score Improvement",
            "url": "/api/features/paladin-ability-score-improvement-5"
        },
        {
            "index": "paladin-extra-attack",
            "name": "Extra Attack",
            "url": "/api/features/paladin-extra-attack"
        },
        {
            "index": "paladin-fighting-style",
            "name": "Fighting Style",
            "url": "/api/features/paladin-fighting-style"
        },
        {
            "index": "patient-defense",
            "name": "Patient Defense",
            "url": "/api/features/patient-defense"
        },
        {
            "index": "peerless-skill",
            "name": "Peerless Skill",
            "url": "/api/features/peerless-skill"
        },
        {
            "index": "perfect-self",
            "name": "Perfect Self",
            "url": "/api/features/perfect-self"
        },
        {
            "index": "persistent-rage",
            "name": "Persistent Rage",
            "url": "/api/features/persistent-rage"
        },
        {
            "index": "potent-cantrip",
            "name": "Potent Cantrip",
            "url": "/api/features/potent-cantrip"
        },
        {
            "index": "primal-champion",
            "name": "Primal Champion",
            "url": "/api/features/primal-champion"
        },
        {
            "index": "primal-path",
            "name": "Primal Path",
            "url": "/api/features/primal-path"
        },
        {
            "index": "primeval-awareness",
            "name": "Primeval Awareness",
            "url": "/api/features/primeval-awareness"
        },
        {
            "index": "purity-of-body",
            "name": "Purity of Body",
            "url": "/api/features/purity-of-body"
        },
        {
            "index": "purity-of-spirit",
            "name": "Purity of Spirit",
            "url": "/api/features/purity-of-spirit"
        },
        {
            "index": "quivering-palm",
            "name": "Quivering Palm",
            "url": "/api/features/quivering-palm"
        },
        {
            "index": "rage",
            "name": "Rage",
            "url": "/api/features/rage"
        },
        {
            "index": "ranger-ability-score-improvement-1",
            "name": "Ability Score Improvement",
            "url": "/api/features/ranger-ability-score-improvement-1"
        },
        {
            "index": "ranger-ability-score-improvement-2",
            "name": "Ability Score Improvement",
            "url": "/api/features/ranger-ability-score-improvement-2"
        },
        {
            "index": "ranger-ability-score-improvement-3",
            "name": "Ability Score Improvement",
            "url": "/api/features/ranger-ability-score-improvement-3"
        },
        {
            "index": "ranger-ability-score-improvement-4",
            "name": "Ability Score Improvement",
            "url": "/api/features/ranger-ability-score-improvement-4"
        },
        {
            "index": "ranger-ability-score-improvement-5",
            "name": "Ability Score Improvement",
            "url": "/api/features/ranger-ability-score-improvement-5"
        },
        {
            "index": "ranger-archetype",
            "name": "Ranger Archetype",
            "url": "/api/features/ranger-archetype"
        },
        {
            "index": "ranger-extra-attack",
            "name": "Extra Attack",
            "url": "/api/features/ranger-extra-attack"
        },
        {
            "index": "ranger-fighting-style",
            "name": "Fighting Style",
            "url": "/api/features/ranger-fighting-style"
        },
        {
            "index": "ranger-fighting-style-archery",
            "name": "Fighting Style: Archery",
            "url": "/api/features/ranger-fighting-style-archery"
        },
        {
            "index": "ranger-fighting-style-defense",
            "name": "Fighting Style: Defense",
            "url": "/api/features/ranger-fighting-style-defense"
        },
        {
            "index": "ranger-fighting-style-dueling",
            "name": "Fighting Style: Dueling",
            "url": "/api/features/ranger-fighting-style-dueling"
        },
        {
            "index": "ranger-fighting-style-two-weapon-fighting",
            "name": "Fighting Style: Two-Weapon Fighting",
            "url": "/api/features/ranger-fighting-style-two-weapon-fighting"
        },
        {
            "index": "ranger-lands-stride",
            "name": "Land's Stride",
            "url": "/api/features/ranger-lands-stride"
        },
        {
            "index": "reckless-attack",
            "name": "Reckless Attack",
            "url": "/api/features/reckless-attack"
        },
        {
            "index": "relentless-rage",
            "name": "Relentless Rage",
            "url": "/api/features/relentless-rage"
        },
        {
            "index": "reliable-talent",
            "name": "Reliable Talent",
            "url": "/api/features/reliable-talent"
        },
        {
            "index": "remarkable-athlete",
            "name": "Remarkable Athlete",
            "url": "/api/features/remarkable-athlete"
        },
        {
            "index": "retaliation",
            "name": "Retaliation",
            "url": "/api/features/retaliation"
        },
        {
            "index": "rogue-ability-score-improvement-1",
            "name": "Ability Score Improvement",
            "url": "/api/features/rogue-ability-score-improvement-1"
        },
        {
            "index": "rogue-ability-score-improvement-2",
            "name": "Ability Score Improvement",
            "url": "/api/features/rogue-ability-score-improvement-2"
        },
        {
            "index": "rogue-ability-score-improvement-3",
            "name": "Ability Score Improvement",
            "url": "/api/features/rogue-ability-score-improvement-3"
        },
        {
            "index": "rogue-ability-score-improvement-4",
            "name": "Ability Score Improvement",
            "url": "/api/features/rogue-ability-score-improvement-4"
        },
        {
            "index": "rogue-ability-score-improvement-5",
            "name": "Ability Score Improvement",
            "url": "/api/features/rogue-ability-score-improvement-5"
        },
        {
            "index": "rogue-ability-score-improvement-6",
            "name": "Ability Score Improvement",
            "url": "/api/features/rogue-ability-score-improvement-6"
        },
        {
            "index": "rogue-evasion",
            "name": "Evasion",
            "url": "/api/features/rogue-evasion"
        },
        {
            "index": "rogue-expertise-1",
            "name": "Expertise",
            "url": "/api/features/rogue-expertise-1"
        },
        {
            "index": "rogue-expertise-2",
            "name": "Expertise",
            "url": "/api/features/rogue-expertise-2"
        },
        {
            "index": "roguish-archetype",
            "name": "Roguish Archetype",
            "url": "/api/features/roguish-archetype"
        },
        {
            "index": "sacred-oath",
            "name": "Sacred Oath",
            "url": "/api/features/sacred-oath"
        },
        {
            "index": "sculpt-spells",
            "name": "Sculpt Spells",
            "url": "/api/features/sculpt-spells"
        },
        {
            "index": "second-story-work",
            "name": "Second-Story Work",
            "url": "/api/features/second-story-work"
        },
        {
            "index": "second-wind",
            "name": "Second Wind",
            "url": "/api/features/second-wind"
        },
        {
            "index": "signature-spell",
            "name": "Signature Spell",
            "url": "/api/features/signature-spell"
        },
        {
            "index": "slippery-mind",
            "name": "Slippery Mind",
            "url": "/api/features/slippery-mind"
        },
        {
            "index": "slow-fall",
            "name": "Slow Fall",
            "url": "/api/features/slow-fall"
        },
        {
            "index": "sneak-attack",
            "name": "Sneak Attack",
            "url": "/api/features/sneak-attack"
        },
        {
            "index": "song-of-rest-d10",
            "name": "Song of Rest (d10)",
            "url": "/api/features/song-of-rest-d10"
        },
        {
            "index": "song-of-rest-d12",
            "name": "Song of Rest (d12)",
            "url": "/api/features/song-of-rest-d12"
        },
        {
            "index": "song-of-rest-d6",
            "name": "Song of Rest (d6)",
            "url": "/api/features/song-of-rest-d6"
        },
        {
            "index": "song-of-rest-d8",
            "name": "Song of Rest (d8)",
            "url": "/api/features/song-of-rest-d8"
        },
        {
            "index": "sorcerer-ability-score-improvement-1",
            "name": "Ability Score Improvement",
            "url": "/api/features/sorcerer-ability-score-improvement-1"
        },
        {
            "index": "sorcerer-ability-score-improvement-2",
            "name": "Ability Score Improvement",
            "url": "/api/features/sorcerer-ability-score-improvement-2"
        },
        {
            "index": "sorcerer-ability-score-improvement-3",
            "name": "Ability Score Improvement",
            "url": "/api/features/sorcerer-ability-score-improvement-3"
        },
        {
            "index": "sorcerer-ability-score-improvement-4",
            "name": "Ability Score Improvement",
            "url": "/api/features/sorcerer-ability-score-improvement-4"
        },
        {
            "index": "sorcerer-ability-score-improvement-5",
            "name": "Ability Score Improvement",
            "url": "/api/features/sorcerer-ability-score-improvement-5"
        },
        {
            "index": "sorcerous-origin",
            "name": "Sorcerous Origin",
            "url": "/api/features/sorcerous-origin"
        },
        {
            "index": "sorcerous-restoration",
            "name": "Sorcerous Restoration",
            "url": "/api/features/sorcerous-restoration"
        },
        {
            "index": "spell-mastery",
            "name": "Spell Mastery",
            "url": "/api/features/spell-mastery"
        },
        {
            "index": "spellcasting-bard",
            "name": "Spellcasting: Bard",
            "url": "/api/features/spellcasting-bard"
        },
        {
            "index": "spellcasting-cleric",
            "name": "Spellcasting: Cleric",
            "url": "/api/features/spellcasting-cleric"
        },
        {
            "index": "spellcasting-druid",
            "name": "Spellcasting: Druid",
            "url": "/api/features/spellcasting-druid"
        },
        {
            "index": "spellcasting-paladin",
            "name": "Spellcasting: Paladin",
            "url": "/api/features/spellcasting-paladin"
        },
        {
            "index": "spellcasting-ranger",
            "name": "Spellcasting: Ranger",
            "url": "/api/features/spellcasting-ranger"
        },
        {
            "index": "spellcasting-sorcerer",
            "name": "Spellcasting: Sorcerer",
            "url": "/api/features/spellcasting-sorcerer"
        },
        {
            "index": "spellcasting-wizard",
            "name": "Spellcasting: Wizard",
            "url": "/api/features/spellcasting-wizard"
        },
        {
            "index": "step-of-the-wind",
            "name": "Step of the Wind",
            "url": "/api/features/step-of-the-wind"
        },
        {
            "index": "stillness-of-mind",
            "name": "Stillness of Mind",
            "url": "/api/features/stillness-of-mind"
        },
        {
            "index": "stroke-of-luck",
            "name": "Stroke of Luck",
            "url": "/api/features/stroke-of-luck"
        },
        {
            "index": "stunning-strike",
            "name": "Stunning Strike",
            "url": "/api/features/stunning-strike"
        },
        {
            "index": "superior-critical",
            "name": "Superior Critical",
            "url": "/api/features/superior-critical"
        },
        {
            "index": "superior-hunters-defense",
            "name": "Superior Hunter's Defense",
            "url": "/api/features/superior-hunters-defense"
        },
        {
            "index": "superior-hunters-defense-evasion",
            "name": "Superior Hunter's Defense: Evasion",
            "url": "/api/features/superior-hunters-defense-evasion"
        },
        {
            "index": "superior-hunters-defense-stand-against-the-tide",
            "name": "Superior Hunter's Defense: Stand Against the Tide",
            "url": "/api/features/superior-hunters-defense-stand-against-the-tide"
        },
        {
            "index": "superior-hunters-defense-uncanny-dodge",
            "name": "Superior Hunter's Defense: Uncanny Dodge",
            "url": "/api/features/superior-hunters-defense-uncanny-dodge"
        },
        {
            "index": "superior-inspiration",
            "name": "Superior Inspiration",
            "url": "/api/features/superior-inspiration"
        },
        {
            "index": "supreme-healing",
            "name": "Supreme Healing",
            "url": "/api/features/supreme-healing"
        },
        {
            "index": "supreme-sneak",
            "name": "Supreme Sneak",
            "url": "/api/features/supreme-sneak"
        },
        {
            "index": "survivor",
            "name": "Survivor",
            "url": "/api/features/survivor"
        },
        {
            "index": "thiefs-reflexes",
            "name": "Thief's Reflexes",
            "url": "/api/features/thiefs-reflexes"
        },
        {
            "index": "thieves-cant",
            "name": "Thieves' Cant",
            "url": "/api/features/thieves-cant"
        },
        {
            "index": "tongue-of-the-sun-and-moon",
            "name": "Tongue of the Sun and Moon",
            "url": "/api/features/tongue-of-the-sun-and-moon"
        },
        {
            "index": "tranquility",
            "name": "Tranquility",
            "url": "/api/features/tranquility"
        },
        {
            "index": "unarmored-movement-1",
            "name": "Unarmored Movement",
            "url": "/api/features/unarmored-movement-1"
        },
        {
            "index": "unarmored-movement-2",
            "name": "Unarmored Movement",
            "url": "/api/features/unarmored-movement-2"
        },
        {
            "index": "uncanny-dodge",
            "name": "Uncanny Dodge",
            "url": "/api/features/uncanny-dodge"
        },
        {
            "index": "use-magic-device",
            "name": "Use Magic Device",
            "url": "/api/features/use-magic-device"
        },
        {
            "index": "vanish",
            "name": "Vanish",
            "url": "/api/features/vanish"
        },
        {
            "index": "warlock-ability-score-improvement-1",
            "name": "Ability Score Improvement",
            "url": "/api/features/warlock-ability-score-improvement-1"
        },
        {
            "index": "warlock-ability-score-improvement-2",
            "name": "Ability Score Improvement",
            "url": "/api/features/warlock-ability-score-improvement-2"
        },
        {
            "index": "warlock-ability-score-improvement-3",
            "name": "Ability Score Improvement",
            "url": "/api/features/warlock-ability-score-improvement-3"
        },
        {
            "index": "warlock-ability-score-improvement-4",
            "name": "Ability Score Improvement",
            "url": "/api/features/warlock-ability-score-improvement-4"
        },
        {
            "index": "warlock-ability-score-improvement-5",
            "name": "Ability Score Improvement",
            "url": "/api/features/warlock-ability-score-improvement-5"
        },
        {
            "index": "wholeness-of-body",
            "name": "Wholeness of Body",
            "url": "/api/features/wholeness-of-body"
        },
        {
            "index": "wild-shape-cr-1-2-or-below-no-flying-speed",
            "name": "Wild Shape (CR 1/2 or below, no flying speed)",
            "url": "/api/features/wild-shape-cr-1-2-or-below-no-flying-speed"
        },
        {
            "index": "wild-shape-cr-1-4-or-below-no-flying-or-swim-speed",
            "name": "Wild Shape (CR 1/4 or below, no flying or swim speed)",
            "url": "/api/features/wild-shape-cr-1-4-or-below-no-flying-or-swim-speed"
        },
        {
            "index": "wild-shape-cr-1-or-below",
            "name": "Wild Shape (CR 1 or below)",
            "url": "/api/features/wild-shape-cr-1-or-below"
        },
        {
            "index": "wizard-ability-score-improvement-1",
            "name": "Ability Score Improvement",
            "url": "/api/features/wizard-ability-score-improvement-1"
        },
        {
            "index": "wizard-ability-score-improvement-2",
            "name": "Ability Score Improvement",
            "url": "/api/features/wizard-ability-score-improvement-2"
        },
        {
            "index": "wizard-ability-score-improvement-3",
            "name": "Ability Score Improvement",
            "url": "/api/features/wizard-ability-score-improvement-3"
        },
        {
            "index": "wizard-ability-score-improvement-4",
            "name": "Ability Score Improvement",
            "url": "/api/features/wizard-ability-score-improvement-4"
        },
        {
            "index": "wizard-ability-score-improvement-5",
            "name": "Ability Score Improvement",
            "url": "/api/features/wizard-ability-score-improvement-5"
        }
    ]
    for features_list_item in features_list:
        feature = Feature(
            name = features_list_item['name'],
            url = features_list_item['url'],
        )
        features.append(feature)
    db.session.add_all(features)
    db.session.commit()

def make_equipment():
    Equipment.query.delete()
    equipments = []
    equipments_list = [
        {
            "index": "abacus",
            "name": "Abacus",
            "url": "/api/equipment/abacus"
        },
        {
            "index": "acid-vial",
            "name": "Acid (vial)",
            "url": "/api/equipment/acid-vial"
        },
        {
            "index": "alchemists-fire-flask",
            "name": "Alchemist's fire (flask)",
            "url": "/api/equipment/alchemists-fire-flask"
        },
        {
            "index": "alchemists-supplies",
            "name": "Alchemist's Supplies",
            "url": "/api/equipment/alchemists-supplies"
        },
        {
            "index": "alms-box",
            "name": "Alms box",
            "url": "/api/equipment/alms-box"
        },
        {
            "index": "amulet",
            "name": "Amulet",
            "url": "/api/equipment/amulet"
        },
        {
            "index": "animal-feed-1-day",
            "name": "Animal Feed (1 day)",
            "url": "/api/equipment/animal-feed-1-day"
        },
        {
            "index": "antitoxin-vial",
            "name": "Antitoxin (vial)",
            "url": "/api/equipment/antitoxin-vial"
        },
        {
            "index": "arrow",
            "name": "Arrow",
            "url": "/api/equipment/arrow"
        },
        {
            "index": "backpack",
            "name": "Backpack",
            "url": "/api/equipment/backpack"
        },
        {
            "index": "bagpipes",
            "name": "Bagpipes",
            "url": "/api/equipment/bagpipes"
        },
        {
            "index": "ball-bearings-bag-of-1000",
            "name": "Ball bearings (bag of 1,000)",
            "url": "/api/equipment/ball-bearings-bag-of-1000"
        },
        {
            "index": "barding-breastplate",
            "name": "Barding: Breastplate",
            "url": "/api/equipment/barding-breastplate"
        },
        {
            "index": "barding-chain-mail",
            "name": "Barding: Chain mail",
            "url": "/api/equipment/barding-chain-mail"
        },
        {
            "index": "barding-chain-shirt",
            "name": "Barding: Chain shirt",
            "url": "/api/equipment/barding-chain-shirt"
        },
        {
            "index": "barding-half-plate",
            "name": "Barding: Half plate",
            "url": "/api/equipment/barding-half-plate"
        },
        {
            "index": "barding-hide",
            "name": "Barding: Hide",
            "url": "/api/equipment/barding-hide"
        },
        {
            "index": "barding-leather",
            "name": "Barding: Leather",
            "url": "/api/equipment/barding-leather"
        },
        {
            "index": "barding-padded",
            "name": "Barding: Padded",
            "url": "/api/equipment/barding-padded"
        },
        {
            "index": "barding-plate",
            "name": "Barding: Plate",
            "url": "/api/equipment/barding-plate"
        },
        {
            "index": "barding-ring-mail",
            "name": "Barding: Ring mail",
            "url": "/api/equipment/barding-ring-mail"
        },
        {
            "index": "barding-scale-mail",
            "name": "Barding: Scale mail",
            "url": "/api/equipment/barding-scale-mail"
        },
        {
            "index": "barding-splint",
            "name": "Barding: Splint",
            "url": "/api/equipment/barding-splint"
        },
        {
            "index": "barding-studded-leather",
            "name": "Barding: Studded Leather",
            "url": "/api/equipment/barding-studded-leather"
        },
        {
            "index": "barrel",
            "name": "Barrel",
            "url": "/api/equipment/barrel"
        },
        {
            "index": "basket",
            "name": "Basket",
            "url": "/api/equipment/basket"
        },
        {
            "index": "battleaxe",
            "name": "Battleaxe",
            "url": "/api/equipment/battleaxe"
        },
        {
            "index": "bedroll",
            "name": "Bedroll",
            "url": "/api/equipment/bedroll"
        },
        {
            "index": "bell",
            "name": "Bell",
            "url": "/api/equipment/bell"
        },
        {
            "index": "bit-and-bridle",
            "name": "Bit and bridle",
            "url": "/api/equipment/bit-and-bridle"
        },
        {
            "index": "blanket",
            "name": "Blanket",
            "url": "/api/equipment/blanket"
        },
        {
            "index": "block-and-tackle",
            "name": "Block and tackle",
            "url": "/api/equipment/block-and-tackle"
        },
        {
            "index": "block-of-incense",
            "name": "Block of incense",
            "url": "/api/equipment/block-of-incense"
        },
        {
            "index": "blowgun",
            "name": "Blowgun",
            "url": "/api/equipment/blowgun"
        },
        {
            "index": "blowgun-needle",
            "name": "Blowgun needle",
            "url": "/api/equipment/blowgun-needle"
        },
        {
            "index": "book",
            "name": "Book",
            "url": "/api/equipment/book"
        },
        {
            "index": "bottle-glass",
            "name": "Bottle, glass",
            "url": "/api/equipment/bottle-glass"
        },
        {
            "index": "breastplate",
            "name": "Breastplate",
            "url": "/api/equipment/breastplate"
        },
        {
            "index": "brewers-supplies",
            "name": "Brewer's Supplies",
            "url": "/api/equipment/brewers-supplies"
        },
        {
            "index": "bucket",
            "name": "Bucket",
            "url": "/api/equipment/bucket"
        },
        {
            "index": "burglars-pack",
            "name": "Burglar's Pack",
            "url": "/api/equipment/burglars-pack"
        },
        {
            "index": "calligraphers-supplies",
            "name": "Calligrapher's Supplies",
            "url": "/api/equipment/calligraphers-supplies"
        },
        {
            "index": "caltrops",
            "name": "Caltrops",
            "url": "/api/equipment/caltrops"
        },
        {
            "index": "camel",
            "name": "Camel",
            "url": "/api/equipment/camel"
        },
        {
            "index": "candle",
            "name": "Candle",
            "url": "/api/equipment/candle"
        },
        {
            "index": "carpenters-tools",
            "name": "Carpenter's Tools",
            "url": "/api/equipment/carpenters-tools"
        },
        {
            "index": "carriage",
            "name": "Carriage",
            "url": "/api/equipment/carriage"
        },
        {
            "index": "cart",
            "name": "Cart",
            "url": "/api/equipment/cart"
        },
        {
            "index": "cartographers-tools",
            "name": "Cartographer's Tools",
            "url": "/api/equipment/cartographers-tools"
        },
        {
            "index": "case-crossbow-bolt",
            "name": "Case, crossbow bolt",
            "url": "/api/equipment/case-crossbow-bolt"
        },
        {
            "index": "case-map-or-scroll",
            "name": "Case, map or scroll",
            "url": "/api/equipment/case-map-or-scroll"
        },
        {
            "index": "censer",
            "name": "Censer",
            "url": "/api/equipment/censer"
        },
        {
            "index": "chain-10-feet",
            "name": "Chain (10 feet)",
            "url": "/api/equipment/chain-10-feet"
        },
        {
            "index": "chain-mail",
            "name": "Chain Mail",
            "url": "/api/equipment/chain-mail"
        },
        {
            "index": "chain-shirt",
            "name": "Chain Shirt",
            "url": "/api/equipment/chain-shirt"
        },
        {
            "index": "chalk-1-piece",
            "name": "Chalk (1 piece)",
            "url": "/api/equipment/chalk-1-piece"
        },
        {
            "index": "chariot",
            "name": "Chariot",
            "url": "/api/equipment/chariot"
        },
        {
            "index": "chest",
            "name": "Chest",
            "url": "/api/equipment/chest"
        },
        {
            "index": "climbers-kit",
            "name": "Climber's Kit",
            "url": "/api/equipment/climbers-kit"
        },
        {
            "index": "clothes-common",
            "name": "Clothes, common",
            "url": "/api/equipment/clothes-common"
        },
        {
            "index": "clothes-costume",
            "name": "Clothes, costume",
            "url": "/api/equipment/clothes-costume"
        },
        {
            "index": "clothes-fine",
            "name": "Clothes, fine",
            "url": "/api/equipment/clothes-fine"
        },
        {
            "index": "clothes-travelers",
            "name": "Clothes, traveler's",
            "url": "/api/equipment/clothes-travelers"
        },
        {
            "index": "club",
            "name": "Club",
            "url": "/api/equipment/club"
        },
        {
            "index": "cobblers-tools",
            "name": "Cobbler's Tools",
            "url": "/api/equipment/cobblers-tools"
        },
        {
            "index": "component-pouch",
            "name": "Component pouch",
            "url": "/api/equipment/component-pouch"
        },
        {
            "index": "cooks-utensils",
            "name": "Cook's utensils",
            "url": "/api/equipment/cooks-utensils"
        },
        {
            "index": "crossbow-bolt",
            "name": "Crossbow bolt",
            "url": "/api/equipment/crossbow-bolt"
        },
        {
            "index": "crossbow-hand",
            "name": "Crossbow, hand",
            "url": "/api/equipment/crossbow-hand"
        },
        {
            "index": "crossbow-heavy",
            "name": "Crossbow, heavy",
            "url": "/api/equipment/crossbow-heavy"
        },
        {
            "index": "crossbow-light",
            "name": "Crossbow, light",
            "url": "/api/equipment/crossbow-light"
        },
        {
            "index": "crowbar",
            "name": "Crowbar",
            "url": "/api/equipment/crowbar"
        },
        {
            "index": "crystal",
            "name": "Crystal",
            "url": "/api/equipment/crystal"
        },
        {
            "index": "dagger",
            "name": "Dagger",
            "url": "/api/equipment/dagger"
        },
        {
            "index": "dart",
            "name": "Dart",
            "url": "/api/equipment/dart"
        },
        {
            "index": "dice-set",
            "name": "Dice Set",
            "url": "/api/equipment/dice-set"
        },
        {
            "index": "diplomats-pack",
            "name": "Diplomat's Pack",
            "url": "/api/equipment/diplomats-pack"
        },
        {
            "index": "disguise-kit",
            "name": "Disguise Kit",
            "url": "/api/equipment/disguise-kit"
        },
        {
            "index": "donkey",
            "name": "Donkey",
            "url": "/api/equipment/donkey"
        },
        {
            "index": "drum",
            "name": "Drum",
            "url": "/api/equipment/drum"
        },
        {
            "index": "dulcimer",
            "name": "Dulcimer",
            "url": "/api/equipment/dulcimer"
        },
        {
            "index": "dungeoneers-pack",
            "name": "Dungeoneer's Pack",
            "url": "/api/equipment/dungeoneers-pack"
        },
        {
            "index": "elephant",
            "name": "Elephant",
            "url": "/api/equipment/elephant"
        },
        {
            "index": "emblem",
            "name": "Emblem",
            "url": "/api/equipment/emblem"
        },
        {
            "index": "entertainers-pack",
            "name": "Entertainer's Pack",
            "url": "/api/equipment/entertainers-pack"
        },
        {
            "index": "explorers-pack",
            "name": "Explorer's Pack",
            "url": "/api/equipment/explorers-pack"
        },
        {
            "index": "fishing-tackle",
            "name": "Fishing tackle",
            "url": "/api/equipment/fishing-tackle"
        },
        {
            "index": "flail",
            "name": "Flail",
            "url": "/api/equipment/flail"
        },
        {
            "index": "flask-or-tankard",
            "name": "Flask or tankard",
            "url": "/api/equipment/flask-or-tankard"
        },
        {
            "index": "flute",
            "name": "Flute",
            "url": "/api/equipment/flute"
        },
        {
            "index": "forgery-kit",
            "name": "Forgery Kit",
            "url": "/api/equipment/forgery-kit"
        },
        {
            "index": "galley",
            "name": "Galley",
            "url": "/api/equipment/galley"
        },
        {
            "index": "glaive",
            "name": "Glaive",
            "url": "/api/equipment/glaive"
        },
        {
            "index": "glassblowers-tools",
            "name": "Glassblower's Tools",
            "url": "/api/equipment/glassblowers-tools"
        },
        {
            "index": "grappling-hook",
            "name": "Grappling hook",
            "url": "/api/equipment/grappling-hook"
        },
        {
            "index": "greataxe",
            "name": "Greataxe",
            "url": "/api/equipment/greataxe"
        },
        {
            "index": "greatclub",
            "name": "Greatclub",
            "url": "/api/equipment/greatclub"
        },
        {
            "index": "greatsword",
            "name": "Greatsword",
            "url": "/api/equipment/greatsword"
        },
        {
            "index": "halberd",
            "name": "Halberd",
            "url": "/api/equipment/halberd"
        },
        {
            "index": "half-plate-armor",
            "name": "Half Plate Armor",
            "url": "/api/equipment/half-plate-armor"
        },
        {
            "index": "hammer",
            "name": "Hammer",
            "url": "/api/equipment/hammer"
        },
        {
            "index": "hammer-sledge",
            "name": "Hammer, sledge",
            "url": "/api/equipment/hammer-sledge"
        },
        {
            "index": "handaxe",
            "name": "Handaxe",
            "url": "/api/equipment/handaxe"
        },
        {
            "index": "healers-kit",
            "name": "Healer's Kit",
            "url": "/api/equipment/healers-kit"
        },
        {
            "index": "herbalism-kit",
            "name": "Herbalism Kit",
            "url": "/api/equipment/herbalism-kit"
        },
        {
            "index": "hide-armor",
            "name": "Hide Armor",
            "url": "/api/equipment/hide-armor"
        },
        {
            "index": "holy-water-flask",
            "name": "Holy water (flask)",
            "url": "/api/equipment/holy-water-flask"
        },
        {
            "index": "horn",
            "name": "Horn",
            "url": "/api/equipment/horn"
        },
        {
            "index": "horse-draft",
            "name": "Horse, draft",
            "url": "/api/equipment/horse-draft"
        },
        {
            "index": "horse-riding",
            "name": "Horse, riding",
            "url": "/api/equipment/horse-riding"
        },
        {
            "index": "hourglass",
            "name": "Hourglass",
            "url": "/api/equipment/hourglass"
        },
        {
            "index": "hunting-trap",
            "name": "Hunting trap",
            "url": "/api/equipment/hunting-trap"
        },
        {
            "index": "ink-1-ounce-bottle",
            "name": "Ink (1 ounce bottle)",
            "url": "/api/equipment/ink-1-ounce-bottle"
        },
        {
            "index": "ink-pen",
            "name": "Ink pen",
            "url": "/api/equipment/ink-pen"
        },
        {
            "index": "javelin",
            "name": "Javelin",
            "url": "/api/equipment/javelin"
        },
        {
            "index": "jewelers-tools",
            "name": "Jeweler's Tools",
            "url": "/api/equipment/jewelers-tools"
        },
        {
            "index": "jug-or-pitcher",
            "name": "Jug or pitcher",
            "url": "/api/equipment/jug-or-pitcher"
        },
        {
            "index": "keelboat",
            "name": "Keelboat",
            "url": "/api/equipment/keelboat"
        },
        {
            "index": "ladder-10-foot",
            "name": "Ladder (10-foot)",
            "url": "/api/equipment/ladder-10-foot"
        },
        {
            "index": "lamp",
            "name": "Lamp",
            "url": "/api/equipment/lamp"
        },
        {
            "index": "lance",
            "name": "Lance",
            "url": "/api/equipment/lance"
        },
        {
            "index": "lantern-bullseye",
            "name": "Lantern, bullseye",
            "url": "/api/equipment/lantern-bullseye"
        },
        {
            "index": "lantern-hooded",
            "name": "Lantern, hooded",
            "url": "/api/equipment/lantern-hooded"
        },
        {
            "index": "leather-armor",
            "name": "Leather Armor",
            "url": "/api/equipment/leather-armor"
        },
        {
            "index": "leatherworkers-tools",
            "name": "Leatherworker's Tools",
            "url": "/api/equipment/leatherworkers-tools"
        },
        {
            "index": "light-hammer",
            "name": "Light hammer",
            "url": "/api/equipment/light-hammer"
        },
        {
            "index": "little-bag-of-sand",
            "name": "Little bag of sand",
            "url": "/api/equipment/little-bag-of-sand"
        },
        {
            "index": "lock",
            "name": "Lock",
            "url": "/api/equipment/lock"
        },
        {
            "index": "longbow",
            "name": "Longbow",
            "url": "/api/equipment/longbow"
        },
        {
            "index": "longship",
            "name": "Longship",
            "url": "/api/equipment/longship"
        },
        {
            "index": "longsword",
            "name": "Longsword",
            "url": "/api/equipment/longsword"
        },
        {
            "index": "lute",
            "name": "Lute",
            "url": "/api/equipment/lute"
        },
        {
            "index": "lyre",
            "name": "Lyre",
            "url": "/api/equipment/lyre"
        },
        {
            "index": "mace",
            "name": "Mace",
            "url": "/api/equipment/mace"
        },
        {
            "index": "magnifying-glass",
            "name": "Magnifying glass",
            "url": "/api/equipment/magnifying-glass"
        },
        {
            "index": "manacles",
            "name": "Manacles",
            "url": "/api/equipment/manacles"
        },
        {
            "index": "masons-tools",
            "name": "Mason's Tools",
            "url": "/api/equipment/masons-tools"
        },
        {
            "index": "mastiff",
            "name": "Mastiff",
            "url": "/api/equipment/mastiff"
        },
        {
            "index": "maul",
            "name": "Maul",
            "url": "/api/equipment/maul"
        },
        {
            "index": "mess-kit",
            "name": "Mess Kit",
            "url": "/api/equipment/mess-kit"
        },
        {
            "index": "mirror-steel",
            "name": "Mirror, steel",
            "url": "/api/equipment/mirror-steel"
        },
        {
            "index": "morningstar",
            "name": "Morningstar",
            "url": "/api/equipment/morningstar"
        },
        {
            "index": "mule",
            "name": "Mule",
            "url": "/api/equipment/mule"
        },
        {
            "index": "navigators-tools",
            "name": "Navigator's Tools",
            "url": "/api/equipment/navigators-tools"
        },
        {
            "index": "net",
            "name": "Net",
            "url": "/api/equipment/net"
        },
        {
            "index": "oil-flask",
            "name": "Oil (flask)",
            "url": "/api/equipment/oil-flask"
        },
        {
            "index": "orb",
            "name": "Orb",
            "url": "/api/equipment/orb"
        },
        {
            "index": "padded-armor",
            "name": "Padded Armor",
            "url": "/api/equipment/padded-armor"
        },
        {
            "index": "painters-supplies",
            "name": "Painter's Supplies",
            "url": "/api/equipment/painters-supplies"
        },
        {
            "index": "pan-flute",
            "name": "Pan flute",
            "url": "/api/equipment/pan-flute"
        },
        {
            "index": "paper-one-sheet",
            "name": "Paper (one sheet)",
            "url": "/api/equipment/paper-one-sheet"
        },
        {
            "index": "parchment-one-sheet",
            "name": "Parchment (one sheet)",
            "url": "/api/equipment/parchment-one-sheet"
        },
        {
            "index": "perfume-vial",
            "name": "Perfume (vial)",
            "url": "/api/equipment/perfume-vial"
        },
        {
            "index": "pick-miners",
            "name": "Pick, miner's",
            "url": "/api/equipment/pick-miners"
        },
        {
            "index": "pike",
            "name": "Pike",
            "url": "/api/equipment/pike"
        },
        {
            "index": "piton",
            "name": "Piton",
            "url": "/api/equipment/piton"
        },
        {
            "index": "plate-armor",
            "name": "Plate Armor",
            "url": "/api/equipment/plate-armor"
        },
        {
            "index": "playing-card-set",
            "name": "Playing Card Set",
            "url": "/api/equipment/playing-card-set"
        },
        {
            "index": "poison-basic-vial",
            "name": "Poison, basic (vial)",
            "url": "/api/equipment/poison-basic-vial"
        },
        {
            "index": "poisoners-kit",
            "name": "Poisoner's Kit",
            "url": "/api/equipment/poisoners-kit"
        },
        {
            "index": "pole-10-foot",
            "name": "Pole (10-foot)",
            "url": "/api/equipment/pole-10-foot"
        },
        {
            "index": "pony",
            "name": "Pony",
            "url": "/api/equipment/pony"
        },
        {
            "index": "pot-iron",
            "name": "Pot, iron",
            "url": "/api/equipment/pot-iron"
        },
        {
            "index": "potters-tools",
            "name": "Potter's Tools",
            "url": "/api/equipment/potters-tools"
        },
        {
            "index": "pouch",
            "name": "Pouch",
            "url": "/api/equipment/pouch"
        },
        {
            "index": "priests-pack",
            "name": "Priest's Pack",
            "url": "/api/equipment/priests-pack"
        },
        {
            "index": "quarterstaff",
            "name": "Quarterstaff",
            "url": "/api/equipment/quarterstaff"
        },
        {
            "index": "quiver",
            "name": "Quiver",
            "url": "/api/equipment/quiver"
        },
        {
            "index": "ram-portable",
            "name": "Ram, portable",
            "url": "/api/equipment/ram-portable"
        },
        {
            "index": "rapier",
            "name": "Rapier",
            "url": "/api/equipment/rapier"
        },
        {
            "index": "rations-1-day",
            "name": "Rations (1 day)",
            "url": "/api/equipment/rations-1-day"
        },
        {
            "index": "reliquary",
            "name": "Reliquary",
            "url": "/api/equipment/reliquary"
        },
        {
            "index": "ring-mail",
            "name": "Ring Mail",
            "url": "/api/equipment/ring-mail"
        },
        {
            "index": "robes",
            "name": "Robes",
            "url": "/api/equipment/robes"
        },
        {
            "index": "rod",
            "name": "Rod",
            "url": "/api/equipment/rod"
        },
        {
            "index": "rope-hempen-50-feet",
            "name": "Rope, hempen (50 feet)",
            "url": "/api/equipment/rope-hempen-50-feet"
        },
        {
            "index": "rope-silk-50-feet",
            "name": "Rope, silk (50 feet)",
            "url": "/api/equipment/rope-silk-50-feet"
        },
        {
            "index": "rowboat",
            "name": "Rowboat",
            "url": "/api/equipment/rowboat"
        },
        {
            "index": "sack",
            "name": "Sack",
            "url": "/api/equipment/sack"
        },
        {
            "index": "saddle-exotic",
            "name": "Saddle, Exotic",
            "url": "/api/equipment/saddle-exotic"
        },
        {
            "index": "saddle-military",
            "name": "Saddle, Military",
            "url": "/api/equipment/saddle-military"
        },
        {
            "index": "saddle-pack",
            "name": "Saddle, Pack",
            "url": "/api/equipment/saddle-pack"
        },
        {
            "index": "saddle-riding",
            "name": "Saddle, Riding",
            "url": "/api/equipment/saddle-riding"
        },
        {
            "index": "saddlebags",
            "name": "Saddlebags",
            "url": "/api/equipment/saddlebags"
        },
        {
            "index": "sailing-ship",
            "name": "Sailing ship",
            "url": "/api/equipment/sailing-ship"
        },
        {
            "index": "scale-mail",
            "name": "Scale Mail",
            "url": "/api/equipment/scale-mail"
        },
        {
            "index": "scale-merchants",
            "name": "Scale, merchant's",
            "url": "/api/equipment/scale-merchants"
        },
        {
            "index": "scholars-pack",
            "name": "Scholar's Pack",
            "url": "/api/equipment/scholars-pack"
        },
        {
            "index": "scimitar",
            "name": "Scimitar",
            "url": "/api/equipment/scimitar"
        },
        {
            "index": "sealing-wax",
            "name": "Sealing wax",
            "url": "/api/equipment/sealing-wax"
        },
        {
            "index": "shawm",
            "name": "Shawm",
            "url": "/api/equipment/shawm"
        },
        {
            "index": "shield",
            "name": "Shield",
            "url": "/api/equipment/shield"
        },
        {
            "index": "shortbow",
            "name": "Shortbow",
            "url": "/api/equipment/shortbow"
        },
        {
            "index": "shortsword",
            "name": "Shortsword",
            "url": "/api/equipment/shortsword"
        },
        {
            "index": "shovel",
            "name": "Shovel",
            "url": "/api/equipment/shovel"
        },
        {
            "index": "sickle",
            "name": "Sickle",
            "url": "/api/equipment/sickle"
        },
        {
            "index": "signal-whistle",
            "name": "Signal whistle",
            "url": "/api/equipment/signal-whistle"
        },
        {
            "index": "signet-ring",
            "name": "Signet ring",
            "url": "/api/equipment/signet-ring"
        },
        {
            "index": "sled",
            "name": "Sled",
            "url": "/api/equipment/sled"
        },
        {
            "index": "sling",
            "name": "Sling",
            "url": "/api/equipment/sling"
        },
        {
            "index": "sling-bullet",
            "name": "Sling bullet",
            "url": "/api/equipment/sling-bullet"
        },
        {
            "index": "small-knife",
            "name": "Small knife",
            "url": "/api/equipment/small-knife"
        },
        {
            "index": "smiths-tools",
            "name": "Smith's Tools",
            "url": "/api/equipment/smiths-tools"
        },
        {
            "index": "soap",
            "name": "Soap",
            "url": "/api/equipment/soap"
        },
        {
            "index": "spear",
            "name": "Spear",
            "url": "/api/equipment/spear"
        },
        {
            "index": "spellbook",
            "name": "Spellbook",
            "url": "/api/equipment/spellbook"
        },
        {
            "index": "spike-iron",
            "name": "Spike, iron",
            "url": "/api/equipment/spike-iron"
        },
        {
            "index": "splint-armor",
            "name": "Splint Armor",
            "url": "/api/equipment/splint-armor"
        },
        {
            "index": "sprig-of-mistletoe",
            "name": "Sprig of mistletoe",
            "url": "/api/equipment/sprig-of-mistletoe"
        },
        {
            "index": "spyglass",
            "name": "Spyglass",
            "url": "/api/equipment/spyglass"
        },
        {
            "index": "stabling-1-day",
            "name": "Stabling (1 day)",
            "url": "/api/equipment/stabling-1-day"
        },
        {
            "index": "staff",
            "name": "Staff",
            "url": "/api/equipment/staff"
        },
        {
            "index": "string-10-feet",
            "name": "String (10 feet)",
            "url": "/api/equipment/string-10-feet"
        },
        {
            "index": "studded-leather-armor",
            "name": "Studded Leather Armor",
            "url": "/api/equipment/studded-leather-armor"
        },
        {
            "index": "tent-two-person",
            "name": "Tent, two-person",
            "url": "/api/equipment/tent-two-person"
        },
        {
            "index": "thieves-tools",
            "name": "Thieves' Tools",
            "url": "/api/equipment/thieves-tools"
        },
        {
            "index": "tinderbox",
            "name": "Tinderbox",
            "url": "/api/equipment/tinderbox"
        },
        {
            "index": "tinkers-tools",
            "name": "Tinker's Tools",
            "url": "/api/equipment/tinkers-tools"
        },
        {
            "index": "torch",
            "name": "Torch",
            "url": "/api/equipment/torch"
        },
        {
            "index": "totem",
            "name": "Totem",
            "url": "/api/equipment/totem"
        },
        {
            "index": "trident",
            "name": "Trident",
            "url": "/api/equipment/trident"
        },
        {
            "index": "vestments",
            "name": "Vestments",
            "url": "/api/equipment/vestments"
        },
        {
            "index": "vial",
            "name": "Vial",
            "url": "/api/equipment/vial"
        },
        {
            "index": "viol",
            "name": "Viol",
            "url": "/api/equipment/viol"
        },
        {
            "index": "wagon",
            "name": "Wagon",
            "url": "/api/equipment/wagon"
        },
        {
            "index": "wand",
            "name": "Wand",
            "url": "/api/equipment/wand"
        },
        {
            "index": "war-pick",
            "name": "War pick",
            "url": "/api/equipment/war-pick"
        },
        {
            "index": "warhammer",
            "name": "Warhammer",
            "url": "/api/equipment/warhammer"
        },
        {
            "index": "warhorse",
            "name": "Warhorse",
            "url": "/api/equipment/warhorse"
        },
        {
            "index": "warship",
            "name": "Warship",
            "url": "/api/equipment/warship"
        },
        {
            "index": "waterskin",
            "name": "Waterskin",
            "url": "/api/equipment/waterskin"
        },
        {
            "index": "weavers-tools",
            "name": "Weaver's Tools",
            "url": "/api/equipment/weavers-tools"
        },
        {
            "index": "whetstone",
            "name": "Whetstone",
            "url": "/api/equipment/whetstone"
        },
        {
            "index": "whip",
            "name": "Whip",
            "url": "/api/equipment/whip"
        },
        {
            "index": "woodcarvers-tools",
            "name": "Woodcarver's Tools",
            "url": "/api/equipment/woodcarvers-tools"
        },
        {
            "index": "wooden-staff",
            "name": "Wooden staff",
            "url": "/api/equipment/wooden-staff"
        },
        {
            "index": "yew-wand",
            "name": "Yew wand",
            "url": "/api/equipment/yew-wand"
        }]
    for equipments_list_item in equipments_list:
        equipment = Equipment(
            name = equipments_list_item['name'],
            url = equipments_list_item['url'],
        )
        equipments.append(equipment)
    db.session.add_all(equipments)
    db.session.commit()

def make_spell():
    Spell.query.delete()
    spells = []
    spells_list = [
        {
            "index": "acid-arrow",
            "name": "Acid Arrow",
            "url": "/api/spells/acid-arrow"
        },
        {
            "index": "acid-splash",
            "name": "Acid Splash",
            "url": "/api/spells/acid-splash"
        },
        {
            "index": "aid",
            "name": "Aid",
            "url": "/api/spells/aid"
        },
        {
            "index": "alarm",
            "name": "Alarm",
            "url": "/api/spells/alarm"
        },
        {
            "index": "alter-self",
            "name": "Alter Self",
            "url": "/api/spells/alter-self"
        },
        {
            "index": "animal-friendship",
            "name": "Animal Friendship",
            "url": "/api/spells/animal-friendship"
        },
        {
            "index": "animal-messenger",
            "name": "Animal Messenger",
            "url": "/api/spells/animal-messenger"
        },
        {
            "index": "animal-shapes",
            "name": "Animal Shapes",
            "url": "/api/spells/animal-shapes"
        },
        {
            "index": "animate-dead",
            "name": "Animate Dead",
            "url": "/api/spells/animate-dead"
        },
        {
            "index": "animate-objects",
            "name": "Animate Objects",
            "url": "/api/spells/animate-objects"
        },
        {
            "index": "antilife-shell",
            "name": "Antilife Shell",
            "url": "/api/spells/antilife-shell"
        },
        {
            "index": "antimagic-field",
            "name": "Antimagic Field",
            "url": "/api/spells/antimagic-field"
        },
        {
            "index": "antipathy-sympathy",
            "name": "Antipathy/Sympathy",
            "url": "/api/spells/antipathy-sympathy"
        },
        {
            "index": "arcane-eye",
            "name": "Arcane Eye",
            "url": "/api/spells/arcane-eye"
        },
        {
            "index": "arcane-hand",
            "name": "Arcane Hand",
            "url": "/api/spells/arcane-hand"
        },
        {
            "index": "arcane-lock",
            "name": "Arcane Lock",
            "url": "/api/spells/arcane-lock"
        },
        {
            "index": "arcane-sword",
            "name": "Arcane Sword",
            "url": "/api/spells/arcane-sword"
        },
        {
            "index": "arcanists-magic-aura",
            "name": "Arcanist's Magic Aura",
            "url": "/api/spells/arcanists-magic-aura"
        },
        {
            "index": "astral-projection",
            "name": "Astral Projection",
            "url": "/api/spells/astral-projection"
        },
        {
            "index": "augury",
            "name": "Augury",
            "url": "/api/spells/augury"
        },
        {
            "index": "awaken",
            "name": "Awaken",
            "url": "/api/spells/awaken"
        },
        {
            "index": "bane",
            "name": "Bane",
            "url": "/api/spells/bane"
        },
        {
            "index": "banishment",
            "name": "Banishment",
            "url": "/api/spells/banishment"
        },
        {
            "index": "barkskin",
            "name": "Barkskin",
            "url": "/api/spells/barkskin"
        },
        {
            "index": "beacon-of-hope",
            "name": "Beacon of Hope",
            "url": "/api/spells/beacon-of-hope"
        },
        {
            "index": "bestow-curse",
            "name": "Bestow Curse",
            "url": "/api/spells/bestow-curse"
        },
        {
            "index": "black-tentacles",
            "name": "Black Tentacles",
            "url": "/api/spells/black-tentacles"
        },
        {
            "index": "blade-barrier",
            "name": "Blade Barrier",
            "url": "/api/spells/blade-barrier"
        },
        {
            "index": "bless",
            "name": "Bless",
            "url": "/api/spells/bless"
        },
        {
            "index": "blight",
            "name": "Blight",
            "url": "/api/spells/blight"
        },
        {
            "index": "blindness-deafness",
            "name": "Blindness/Deafness",
            "url": "/api/spells/blindness-deafness"
        },
        {
            "index": "blink",
            "name": "Blink",
            "url": "/api/spells/blink"
        },
        {
            "index": "blur",
            "name": "Blur",
            "url": "/api/spells/blur"
        },
        {
            "index": "branding-smite",
            "name": "Branding Smite",
            "url": "/api/spells/branding-smite"
        },
        {
            "index": "burning-hands",
            "name": "Burning Hands",
            "url": "/api/spells/burning-hands"
        },
        {
            "index": "call-lightning",
            "name": "Call Lightning",
            "url": "/api/spells/call-lightning"
        },
        {
            "index": "calm-emotions",
            "name": "Calm Emotions",
            "url": "/api/spells/calm-emotions"
        },
        {
            "index": "chain-lightning",
            "name": "Chain Lightning",
            "url": "/api/spells/chain-lightning"
        },
        {
            "index": "charm-person",
            "name": "Charm Person",
            "url": "/api/spells/charm-person"
        },
        {
            "index": "chill-touch",
            "name": "Chill Touch",
            "url": "/api/spells/chill-touch"
        },
        {
            "index": "circle-of-death",
            "name": "Circle of Death",
            "url": "/api/spells/circle-of-death"
        },
        {
            "index": "clairvoyance",
            "name": "Clairvoyance",
            "url": "/api/spells/clairvoyance"
        },
        {
            "index": "clone",
            "name": "Clone",
            "url": "/api/spells/clone"
        },
        {
            "index": "cloudkill",
            "name": "Cloudkill",
            "url": "/api/spells/cloudkill"
        },
        {
            "index": "color-spray",
            "name": "Color Spray",
            "url": "/api/spells/color-spray"
        },
        {
            "index": "command",
            "name": "Command",
            "url": "/api/spells/command"
        },
        {
            "index": "commune",
            "name": "Commune",
            "url": "/api/spells/commune"
        },
        {
            "index": "commune-with-nature",
            "name": "Commune With Nature",
            "url": "/api/spells/commune-with-nature"
        },
        {
            "index": "comprehend-languages",
            "name": "Comprehend Languages",
            "url": "/api/spells/comprehend-languages"
        },
        {
            "index": "compulsion",
            "name": "Compulsion",
            "url": "/api/spells/compulsion"
        },
        {
            "index": "cone-of-cold",
            "name": "Cone of Cold",
            "url": "/api/spells/cone-of-cold"
        },
        {
            "index": "confusion",
            "name": "Confusion",
            "url": "/api/spells/confusion"
        },
        {
            "index": "conjure-animals",
            "name": "Conjure Animals",
            "url": "/api/spells/conjure-animals"
        },
        {
            "index": "conjure-celestial",
            "name": "Conjure Celestial",
            "url": "/api/spells/conjure-celestial"
        },
        {
            "index": "conjure-elemental",
            "name": "Conjure Elemental",
            "url": "/api/spells/conjure-elemental"
        },
        {
            "index": "conjure-fey",
            "name": "Conjure Fey",
            "url": "/api/spells/conjure-fey"
        },
        {
            "index": "conjure-minor-elementals",
            "name": "Conjure Minor Elementals",
            "url": "/api/spells/conjure-minor-elementals"
        },
        {
            "index": "conjure-woodland-beings",
            "name": "Conjure Woodland Beings",
            "url": "/api/spells/conjure-woodland-beings"
        },
        {
            "index": "contact-other-plane",
            "name": "Contact Other Plane",
            "url": "/api/spells/contact-other-plane"
        },
        {
            "index": "contagion",
            "name": "Contagion",
            "url": "/api/spells/contagion"
        },
        {
            "index": "contingency",
            "name": "Contingency",
            "url": "/api/spells/contingency"
        },
        {
            "index": "continual-flame",
            "name": "Continual Flame",
            "url": "/api/spells/continual-flame"
        },
        {
            "index": "control-water",
            "name": "Control Water",
            "url": "/api/spells/control-water"
        },
        {
            "index": "control-weather",
            "name": "Control Weather",
            "url": "/api/spells/control-weather"
        },
        {
            "index": "counterspell",
            "name": "Counterspell",
            "url": "/api/spells/counterspell"
        },
        {
            "index": "create-food-and-water",
            "name": "Create Food and Water",
            "url": "/api/spells/create-food-and-water"
        },
        {
            "index": "create-or-destroy-water",
            "name": "Create or Destroy Water",
            "url": "/api/spells/create-or-destroy-water"
        },
        {
            "index": "create-undead",
            "name": "Create Undead",
            "url": "/api/spells/create-undead"
        },
        {
            "index": "creation",
            "name": "Creation",
            "url": "/api/spells/creation"
        },
        {
            "index": "cure-wounds",
            "name": "Cure Wounds",
            "url": "/api/spells/cure-wounds"
        },
        {
            "index": "dancing-lights",
            "name": "Dancing Lights",
            "url": "/api/spells/dancing-lights"
        },
        {
            "index": "darkness",
            "name": "Darkness",
            "url": "/api/spells/darkness"
        },
        {
            "index": "darkvision",
            "name": "Darkvision",
            "url": "/api/spells/darkvision"
        },
        {
            "index": "daylight",
            "name": "Daylight",
            "url": "/api/spells/daylight"
        },
        {
            "index": "death-ward",
            "name": "Death Ward",
            "url": "/api/spells/death-ward"
        },
        {
            "index": "delayed-blast-fireball",
            "name": "Delayed Blast Fireball",
            "url": "/api/spells/delayed-blast-fireball"
        },
        {
            "index": "demiplane",
            "name": "Demiplane",
            "url": "/api/spells/demiplane"
        },
        {
            "index": "detect-evil-and-good",
            "name": "Detect Evil and Good",
            "url": "/api/spells/detect-evil-and-good"
        },
        {
            "index": "detect-magic",
            "name": "Detect Magic",
            "url": "/api/spells/detect-magic"
        },
        {
            "index": "detect-poison-and-disease",
            "name": "Detect Poison and Disease",
            "url": "/api/spells/detect-poison-and-disease"
        },
        {
            "index": "detect-thoughts",
            "name": "Detect Thoughts",
            "url": "/api/spells/detect-thoughts"
        },
        {
            "index": "dimension-door",
            "name": "Dimension Door",
            "url": "/api/spells/dimension-door"
        },
        {
            "index": "disguise-self",
            "name": "Disguise Self",
            "url": "/api/spells/disguise-self"
        },
        {
            "index": "disintegrate",
            "name": "Disintegrate",
            "url": "/api/spells/disintegrate"
        },
        {
            "index": "dispel-evil-and-good",
            "name": "Dispel Evil and Good",
            "url": "/api/spells/dispel-evil-and-good"
        },
        {
            "index": "dispel-magic",
            "name": "Dispel Magic",
            "url": "/api/spells/dispel-magic"
        },
        {
            "index": "divination",
            "name": "Divination",
            "url": "/api/spells/divination"
        },
        {
            "index": "divine-favor",
            "name": "Divine Favor",
            "url": "/api/spells/divine-favor"
        },
        {
            "index": "divine-word",
            "name": "Divine Word",
            "url": "/api/spells/divine-word"
        },
        {
            "index": "dominate-beast",
            "name": "Dominate Beast",
            "url": "/api/spells/dominate-beast"
        },
        {
            "index": "dominate-monster",
            "name": "Dominate Monster",
            "url": "/api/spells/dominate-monster"
        },
        {
            "index": "dominate-person",
            "name": "Dominate Person",
            "url": "/api/spells/dominate-person"
        },
        {
            "index": "dream",
            "name": "Dream",
            "url": "/api/spells/dream"
        },
        {
            "index": "druidcraft",
            "name": "Druidcraft",
            "url": "/api/spells/druidcraft"
        },
        {
            "index": "earthquake",
            "name": "Earthquake",
            "url": "/api/spells/earthquake"
        },
        {
            "index": "eldritch-blast",
            "name": "Eldritch Blast",
            "url": "/api/spells/eldritch-blast"
        },
        {
            "index": "enhance-ability",
            "name": "Enhance Ability",
            "url": "/api/spells/enhance-ability"
        },
        {
            "index": "enlarge-reduce",
            "name": "Enlarge/Reduce",
            "url": "/api/spells/enlarge-reduce"
        },
        {
            "index": "entangle",
            "name": "Entangle",
            "url": "/api/spells/entangle"
        },
        {
            "index": "enthrall",
            "name": "Enthrall",
            "url": "/api/spells/enthrall"
        },
        {
            "index": "etherealness",
            "name": "Etherealness",
            "url": "/api/spells/etherealness"
        },
        {
            "index": "expeditious-retreat",
            "name": "Expeditious Retreat",
            "url": "/api/spells/expeditious-retreat"
        },
        {
            "index": "eyebite",
            "name": "Eyebite",
            "url": "/api/spells/eyebite"
        },
        {
            "index": "fabricate",
            "name": "Fabricate",
            "url": "/api/spells/fabricate"
        },
        {
            "index": "faerie-fire",
            "name": "Faerie Fire",
            "url": "/api/spells/faerie-fire"
        },
        {
            "index": "faithful-hound",
            "name": "Faithful Hound",
            "url": "/api/spells/faithful-hound"
        },
        {
            "index": "false-life",
            "name": "False Life",
            "url": "/api/spells/false-life"
        },
        {
            "index": "fear",
            "name": "Fear",
            "url": "/api/spells/fear"
        },
        {
            "index": "feather-fall",
            "name": "Feather Fall",
            "url": "/api/spells/feather-fall"
        },
        {
            "index": "feeblemind",
            "name": "Feeblemind",
            "url": "/api/spells/feeblemind"
        },
        {
            "index": "find-familiar",
            "name": "Find Familiar",
            "url": "/api/spells/find-familiar"
        },
        {
            "index": "find-steed",
            "name": "Find Steed",
            "url": "/api/spells/find-steed"
        },
        {
            "index": "find-the-path",
            "name": "Find the Path",
            "url": "/api/spells/find-the-path"
        },
        {
            "index": "find-traps",
            "name": "Find Traps",
            "url": "/api/spells/find-traps"
        },
        {
            "index": "finger-of-death",
            "name": "Finger of Death",
            "url": "/api/spells/finger-of-death"
        },
        {
            "index": "fire-bolt",
            "name": "Fire Bolt",
            "url": "/api/spells/fire-bolt"
        },
        {
            "index": "fire-shield",
            "name": "Fire Shield",
            "url": "/api/spells/fire-shield"
        },
        {
            "index": "fire-storm",
            "name": "Fire Storm",
            "url": "/api/spells/fire-storm"
        },
        {
            "index": "fireball",
            "name": "Fireball",
            "url": "/api/spells/fireball"
        },
        {
            "index": "flame-blade",
            "name": "Flame Blade",
            "url": "/api/spells/flame-blade"
        },
        {
            "index": "flame-strike",
            "name": "Flame Strike",
            "url": "/api/spells/flame-strike"
        },
        {
            "index": "flaming-sphere",
            "name": "Flaming Sphere",
            "url": "/api/spells/flaming-sphere"
        },
        {
            "index": "flesh-to-stone",
            "name": "Flesh to Stone",
            "url": "/api/spells/flesh-to-stone"
        },
        {
            "index": "floating-disk",
            "name": "Floating Disk",
            "url": "/api/spells/floating-disk"
        },
        {
            "index": "fly",
            "name": "Fly",
            "url": "/api/spells/fly"
        },
        {
            "index": "fog-cloud",
            "name": "Fog Cloud",
            "url": "/api/spells/fog-cloud"
        },
        {
            "index": "forbiddance",
            "name": "Forbiddance",
            "url": "/api/spells/forbiddance"
        },
        {
            "index": "forcecage",
            "name": "Forcecage",
            "url": "/api/spells/forcecage"
        },
        {
            "index": "foresight",
            "name": "Foresight",
            "url": "/api/spells/foresight"
        },
        {
            "index": "freedom-of-movement",
            "name": "Freedom of Movement",
            "url": "/api/spells/freedom-of-movement"
        },
        {
            "index": "freezing-sphere",
            "name": "Freezing Sphere",
            "url": "/api/spells/freezing-sphere"
        },
        {
            "index": "gaseous-form",
            "name": "Gaseous Form",
            "url": "/api/spells/gaseous-form"
        },
        {
            "index": "gate",
            "name": "Gate",
            "url": "/api/spells/gate"
        },
        {
            "index": "geas",
            "name": "Geas",
            "url": "/api/spells/geas"
        },
        {
            "index": "gentle-repose",
            "name": "Gentle Repose",
            "url": "/api/spells/gentle-repose"
        },
        {
            "index": "giant-insect",
            "name": "Giant Insect",
            "url": "/api/spells/giant-insect"
        },
        {
            "index": "glibness",
            "name": "Glibness",
            "url": "/api/spells/glibness"
        },
        {
            "index": "globe-of-invulnerability",
            "name": "Globe of Invulnerability",
            "url": "/api/spells/globe-of-invulnerability"
        },
        {
            "index": "glyph-of-warding",
            "name": "Glyph of Warding",
            "url": "/api/spells/glyph-of-warding"
        },
        {
            "index": "goodberry",
            "name": "Goodberry",
            "url": "/api/spells/goodberry"
        },
        {
            "index": "grease",
            "name": "Grease",
            "url": "/api/spells/grease"
        },
        {
            "index": "greater-invisibility",
            "name": "Greater Invisibility",
            "url": "/api/spells/greater-invisibility"
        },
        {
            "index": "greater-restoration",
            "name": "Greater Restoration",
            "url": "/api/spells/greater-restoration"
        },
        {
            "index": "guardian-of-faith",
            "name": "Guardian of Faith",
            "url": "/api/spells/guardian-of-faith"
        },
        {
            "index": "guards-and-wards",
            "name": "Guards and Wards",
            "url": "/api/spells/guards-and-wards"
        },
        {
            "index": "guidance",
            "name": "Guidance",
            "url": "/api/spells/guidance"
        },
        {
            "index": "guiding-bolt",
            "name": "Guiding Bolt",
            "url": "/api/spells/guiding-bolt"
        },
        {
            "index": "gust-of-wind",
            "name": "Gust of Wind",
            "url": "/api/spells/gust-of-wind"
        },
        {
            "index": "hallow",
            "name": "Hallow",
            "url": "/api/spells/hallow"
        },
        {
            "index": "hallucinatory-terrain",
            "name": "Hallucinatory Terrain",
            "url": "/api/spells/hallucinatory-terrain"
        },
        {
            "index": "harm",
            "name": "Harm",
            "url": "/api/spells/harm"
        },
        {
            "index": "haste",
            "name": "Haste",
            "url": "/api/spells/haste"
        },
        {
            "index": "heal",
            "name": "Heal",
            "url": "/api/spells/heal"
        },
        {
            "index": "healing-word",
            "name": "Healing Word",
            "url": "/api/spells/healing-word"
        },
        {
            "index": "heat-metal",
            "name": "Heat Metal",
            "url": "/api/spells/heat-metal"
        },
        {
            "index": "hellish-rebuke",
            "name": "Hellish Rebuke",
            "url": "/api/spells/hellish-rebuke"
        },
        {
            "index": "heroes-feast",
            "name": "Heroes' Feast",
            "url": "/api/spells/heroes-feast"
        },
        {
            "index": "heroism",
            "name": "Heroism",
            "url": "/api/spells/heroism"
        },
        {
            "index": "hideous-laughter",
            "name": "Hideous Laughter",
            "url": "/api/spells/hideous-laughter"
        },
        {
            "index": "hold-monster",
            "name": "Hold Monster",
            "url": "/api/spells/hold-monster"
        },
        {
            "index": "hold-person",
            "name": "Hold Person",
            "url": "/api/spells/hold-person"
        },
        {
            "index": "holy-aura",
            "name": "Holy Aura",
            "url": "/api/spells/holy-aura"
        },
        {
            "index": "hunters-mark",
            "name": "Hunter's Mark",
            "url": "/api/spells/hunters-mark"
        },
        {
            "index": "hypnotic-pattern",
            "name": "Hypnotic Pattern",
            "url": "/api/spells/hypnotic-pattern"
        },
        {
            "index": "ice-storm",
            "name": "Ice Storm",
            "url": "/api/spells/ice-storm"
        },
        {
            "index": "identify",
            "name": "Identify",
            "url": "/api/spells/identify"
        },
        {
            "index": "illusory-script",
            "name": "Illusory Script",
            "url": "/api/spells/illusory-script"
        },
        {
            "index": "imprisonment",
            "name": "Imprisonment",
            "url": "/api/spells/imprisonment"
        },
        {
            "index": "incendiary-cloud",
            "name": "Incendiary Cloud",
            "url": "/api/spells/incendiary-cloud"
        },
        {
            "index": "inflict-wounds",
            "name": "Inflict Wounds",
            "url": "/api/spells/inflict-wounds"
        },
        {
            "index": "insect-plague",
            "name": "Insect Plague",
            "url": "/api/spells/insect-plague"
        },
        {
            "index": "instant-summons",
            "name": "Instant Summons",
            "url": "/api/spells/instant-summons"
        },
        {
            "index": "invisibility",
            "name": "Invisibility",
            "url": "/api/spells/invisibility"
        },
        {
            "index": "irresistible-dance",
            "name": "Irresistible Dance",
            "url": "/api/spells/irresistible-dance"
        },
        {
            "index": "jump",
            "name": "Jump",
            "url": "/api/spells/jump"
        },
        {
            "index": "knock",
            "name": "Knock",
            "url": "/api/spells/knock"
        },
        {
            "index": "legend-lore",
            "name": "Legend Lore",
            "url": "/api/spells/legend-lore"
        },
        {
            "index": "lesser-restoration",
            "name": "Lesser Restoration",
            "url": "/api/spells/lesser-restoration"
        },
        {
            "index": "levitate",
            "name": "Levitate",
            "url": "/api/spells/levitate"
        },
        {
            "index": "light",
            "name": "Light",
            "url": "/api/spells/light"
        },
        {
            "index": "lightning-bolt",
            "name": "Lightning Bolt",
            "url": "/api/spells/lightning-bolt"
        },
        {
            "index": "locate-animals-or-plants",
            "name": "Locate Animals or Plants",
            "url": "/api/spells/locate-animals-or-plants"
        },
        {
            "index": "locate-creature",
            "name": "Locate Creature",
            "url": "/api/spells/locate-creature"
        },
        {
            "index": "locate-object",
            "name": "Locate Object",
            "url": "/api/spells/locate-object"
        },
        {
            "index": "longstrider",
            "name": "Longstrider",
            "url": "/api/spells/longstrider"
        },
        {
            "index": "mage-armor",
            "name": "Mage Armor",
            "url": "/api/spells/mage-armor"
        },
        {
            "index": "mage-hand",
            "name": "Mage Hand",
            "url": "/api/spells/mage-hand"
        },
        {
            "index": "magic-circle",
            "name": "Magic Circle",
            "url": "/api/spells/magic-circle"
        },
        {
            "index": "magic-jar",
            "name": "Magic Jar",
            "url": "/api/spells/magic-jar"
        },
        {
            "index": "magic-missile",
            "name": "Magic Missile",
            "url": "/api/spells/magic-missile"
        },
        {
            "index": "magic-mouth",
            "name": "Magic Mouth",
            "url": "/api/spells/magic-mouth"
        },
        {
            "index": "magic-weapon",
            "name": "Magic Weapon",
            "url": "/api/spells/magic-weapon"
        },
        {
            "index": "magnificent-mansion",
            "name": "Magnificent Mansion",
            "url": "/api/spells/magnificent-mansion"
        },
        {
            "index": "major-image",
            "name": "Major Image",
            "url": "/api/spells/major-image"
        },
        {
            "index": "mass-cure-wounds",
            "name": "Mass Cure Wounds",
            "url": "/api/spells/mass-cure-wounds"
        },
        {
            "index": "mass-heal",
            "name": "Mass Heal",
            "url": "/api/spells/mass-heal"
        },
        {
            "index": "mass-healing-word",
            "name": "Mass Healing Word",
            "url": "/api/spells/mass-healing-word"
        },
        {
            "index": "mass-suggestion",
            "name": "Mass Suggestion",
            "url": "/api/spells/mass-suggestion"
        },
        {
            "index": "maze",
            "name": "Maze",
            "url": "/api/spells/maze"
        },
        {
            "index": "meld-into-stone",
            "name": "Meld Into Stone",
            "url": "/api/spells/meld-into-stone"
        },
        {
            "index": "mending",
            "name": "Mending",
            "url": "/api/spells/mending"
        },
        {
            "index": "message",
            "name": "Message",
            "url": "/api/spells/message"
        },
        {
            "index": "meteor-swarm",
            "name": "Meteor Swarm",
            "url": "/api/spells/meteor-swarm"
        },
        {
            "index": "mind-blank",
            "name": "Mind Blank",
            "url": "/api/spells/mind-blank"
        },
        {
            "index": "minor-illusion",
            "name": "Minor Illusion",
            "url": "/api/spells/minor-illusion"
        },
        {
            "index": "mirage-arcane",
            "name": "Mirage Arcane",
            "url": "/api/spells/mirage-arcane"
        },
        {
            "index": "mirror-image",
            "name": "Mirror Image",
            "url": "/api/spells/mirror-image"
        },
        {
            "index": "mislead",
            "name": "Mislead",
            "url": "/api/spells/mislead"
        },
        {
            "index": "misty-step",
            "name": "Misty Step",
            "url": "/api/spells/misty-step"
        },
        {
            "index": "modify-memory",
            "name": "Modify Memory",
            "url": "/api/spells/modify-memory"
        },
        {
            "index": "moonbeam",
            "name": "Moonbeam",
            "url": "/api/spells/moonbeam"
        },
        {
            "index": "move-earth",
            "name": "Move Earth",
            "url": "/api/spells/move-earth"
        },
        {
            "index": "nondetection",
            "name": "Nondetection",
            "url": "/api/spells/nondetection"
        },
        {
            "index": "pass-without-trace",
            "name": "Pass Without Trace",
            "url": "/api/spells/pass-without-trace"
        },
        {
            "index": "passwall",
            "name": "Passwall",
            "url": "/api/spells/passwall"
        },
        {
            "index": "phantasmal-killer",
            "name": "Phantasmal Killer",
            "url": "/api/spells/phantasmal-killer"
        },
        {
            "index": "phantom-steed",
            "name": "Phantom Steed",
            "url": "/api/spells/phantom-steed"
        },
        {
            "index": "planar-ally",
            "name": "Planar Ally",
            "url": "/api/spells/planar-ally"
        },
        {
            "index": "planar-binding",
            "name": "Planar Binding",
            "url": "/api/spells/planar-binding"
        },
        {
            "index": "plane-shift",
            "name": "Plane Shift",
            "url": "/api/spells/plane-shift"
        },
        {
            "index": "plant-growth",
            "name": "Plant Growth",
            "url": "/api/spells/plant-growth"
        },
        {
            "index": "poison-spray",
            "name": "Poison Spray",
            "url": "/api/spells/poison-spray"
        },
        {
            "index": "polymorph",
            "name": "Polymorph",
            "url": "/api/spells/polymorph"
        },
        {
            "index": "power-word-kill",
            "name": "Power Word Kill",
            "url": "/api/spells/power-word-kill"
        },
        {
            "index": "power-word-stun",
            "name": "Power Word Stun",
            "url": "/api/spells/power-word-stun"
        },
        {
            "index": "prayer-of-healing",
            "name": "Prayer of Healing",
            "url": "/api/spells/prayer-of-healing"
        },
        {
            "index": "prestidigitation",
            "name": "Prestidigitation",
            "url": "/api/spells/prestidigitation"
        },
        {
            "index": "prismatic-spray",
            "name": "Prismatic Spray",
            "url": "/api/spells/prismatic-spray"
        },
        {
            "index": "prismatic-wall",
            "name": "Prismatic Wall",
            "url": "/api/spells/prismatic-wall"
        },
        {
            "index": "private-sanctum",
            "name": "Private Sanctum",
            "url": "/api/spells/private-sanctum"
        },
        {
            "index": "produce-flame",
            "name": "Produce Flame",
            "url": "/api/spells/produce-flame"
        },
        {
            "index": "programmed-illusion",
            "name": "Programmed Illusion",
            "url": "/api/spells/programmed-illusion"
        },
        {
            "index": "project-image",
            "name": "Project Image",
            "url": "/api/spells/project-image"
        },
        {
            "index": "protection-from-energy",
            "name": "Protection From Energy",
            "url": "/api/spells/protection-from-energy"
        },
        {
            "index": "protection-from-evil-and-good",
            "name": "Protection from Evil and Good",
            "url": "/api/spells/protection-from-evil-and-good"
        },
        {
            "index": "protection-from-poison",
            "name": "Protection from Poison",
            "url": "/api/spells/protection-from-poison"
        },
        {
            "index": "purify-food-and-drink",
            "name": "Purify Food and Drink",
            "url": "/api/spells/purify-food-and-drink"
        },
        {
            "index": "raise-dead",
            "name": "Raise Dead",
            "url": "/api/spells/raise-dead"
        },
        {
            "index": "ray-of-enfeeblement",
            "name": "Ray of Enfeeblement",
            "url": "/api/spells/ray-of-enfeeblement"
        },
        {
            "index": "ray-of-frost",
            "name": "Ray of Frost",
            "url": "/api/spells/ray-of-frost"
        },
        {
            "index": "regenerate",
            "name": "Regenerate",
            "url": "/api/spells/regenerate"
        },
        {
            "index": "reincarnate",
            "name": "Reincarnate",
            "url": "/api/spells/reincarnate"
        },
        {
            "index": "remove-curse",
            "name": "Remove Curse",
            "url": "/api/spells/remove-curse"
        },
        {
            "index": "resilient-sphere",
            "name": "Resilient Sphere",
            "url": "/api/spells/resilient-sphere"
        },
        {
            "index": "resistance",
            "name": "Resistance",
            "url": "/api/spells/resistance"
        },
        {
            "index": "resurrection",
            "name": "Resurrection",
            "url": "/api/spells/resurrection"
        },
        {
            "index": "reverse-gravity",
            "name": "Reverse Gravity",
            "url": "/api/spells/reverse-gravity"
        },
        {
            "index": "revivify",
            "name": "Revivify",
            "url": "/api/spells/revivify"
        },
        {
            "index": "rope-trick",
            "name": "Rope Trick",
            "url": "/api/spells/rope-trick"
        },
        {
            "index": "sacred-flame",
            "name": "Sacred Flame",
            "url": "/api/spells/sacred-flame"
        },
        {
            "index": "sanctuary",
            "name": "Sanctuary",
            "url": "/api/spells/sanctuary"
        },
        {
            "index": "scorching-ray",
            "name": "Scorching Ray",
            "url": "/api/spells/scorching-ray"
        },
        {
            "index": "scrying",
            "name": "Scrying",
            "url": "/api/spells/scrying"
        },
        {
            "index": "secret-chest",
            "name": "Secret Chest",
            "url": "/api/spells/secret-chest"
        },
        {
            "index": "see-invisibility",
            "name": "See Invisibility",
            "url": "/api/spells/see-invisibility"
        },
        {
            "index": "seeming",
            "name": "Seeming",
            "url": "/api/spells/seeming"
        },
        {
            "index": "sending",
            "name": "Sending",
            "url": "/api/spells/sending"
        },
        {
            "index": "sequester",
            "name": "Sequester",
            "url": "/api/spells/sequester"
        },
        {
            "index": "shapechange",
            "name": "Shapechange",
            "url": "/api/spells/shapechange"
        },
        {
            "index": "shatter",
            "name": "Shatter",
            "url": "/api/spells/shatter"
        },
        {
            "index": "shield",
            "name": "Shield",
            "url": "/api/spells/shield"
        },
        {
            "index": "shield-of-faith",
            "name": "Shield of Faith",
            "url": "/api/spells/shield-of-faith"
        },
        {
            "index": "shillelagh",
            "name": "Shillelagh",
            "url": "/api/spells/shillelagh"
        },
        {
            "index": "shocking-grasp",
            "name": "Shocking Grasp",
            "url": "/api/spells/shocking-grasp"
        },
        {
            "index": "silence",
            "name": "Silence",
            "url": "/api/spells/silence"
        },
        {
            "index": "silent-image",
            "name": "Silent Image",
            "url": "/api/spells/silent-image"
        },
        {
            "index": "simulacrum",
            "name": "Simulacrum",
            "url": "/api/spells/simulacrum"
        },
        {
            "index": "sleep",
            "name": "Sleep",
            "url": "/api/spells/sleep"
        },
        {
            "index": "sleet-storm",
            "name": "Sleet Storm",
            "url": "/api/spells/sleet-storm"
        },
        {
            "index": "slow",
            "name": "Slow",
            "url": "/api/spells/slow"
        },
        {
            "index": "spare-the-dying",
            "name": "Spare the Dying",
            "url": "/api/spells/spare-the-dying"
        },
        {
            "index": "speak-with-animals",
            "name": "Speak with Animals",
            "url": "/api/spells/speak-with-animals"
        },
        {
            "index": "speak-with-dead",
            "name": "Speak with Dead",
            "url": "/api/spells/speak-with-dead"
        },
        {
            "index": "speak-with-plants",
            "name": "Speak with Plants",
            "url": "/api/spells/speak-with-plants"
        },
        {
            "index": "spider-climb",
            "name": "Spider Climb",
            "url": "/api/spells/spider-climb"
        },
        {
            "index": "spike-growth",
            "name": "Spike Growth",
            "url": "/api/spells/spike-growth"
        },
        {
            "index": "spirit-guardians",
            "name": "Spirit Guardians",
            "url": "/api/spells/spirit-guardians"
        },
        {
            "index": "spiritual-weapon",
            "name": "Spiritual Weapon",
            "url": "/api/spells/spiritual-weapon"
        },
        {
            "index": "stinking-cloud",
            "name": "Stinking Cloud",
            "url": "/api/spells/stinking-cloud"
        },
        {
            "index": "stone-shape",
            "name": "Stone Shape",
            "url": "/api/spells/stone-shape"
        },
        {
            "index": "stoneskin",
            "name": "Stoneskin",
            "url": "/api/spells/stoneskin"
        },
        {
            "index": "storm-of-vengeance",
            "name": "Storm of Vengeance",
            "url": "/api/spells/storm-of-vengeance"
        },
        {
            "index": "suggestion",
            "name": "Suggestion",
            "url": "/api/spells/suggestion"
        },
        {
            "index": "sunbeam",
            "name": "Sunbeam",
            "url": "/api/spells/sunbeam"
        },
        {
            "index": "sunburst",
            "name": "Sunburst",
            "url": "/api/spells/sunburst"
        },
        {
            "index": "symbol",
            "name": "Symbol",
            "url": "/api/spells/symbol"
        },
        {
            "index": "telekinesis",
            "name": "Telekinesis",
            "url": "/api/spells/telekinesis"
        },
        {
            "index": "telepathic-bond",
            "name": "Telepathic Bond",
            "url": "/api/spells/telepathic-bond"
        },
        {
            "index": "teleport",
            "name": "Teleport",
            "url": "/api/spells/teleport"
        },
        {
            "index": "teleportation-circle",
            "name": "Teleportation Circle",
            "url": "/api/spells/teleportation-circle"
        },
        {
            "index": "thaumaturgy",
            "name": "Thaumaturgy",
            "url": "/api/spells/thaumaturgy"
        },
        {
            "index": "thunderwave",
            "name": "Thunderwave",
            "url": "/api/spells/thunderwave"
        },
        {
            "index": "time-stop",
            "name": "Time Stop",
            "url": "/api/spells/time-stop"
        },
        {
            "index": "tiny-hut",
            "name": "Tiny Hut",
            "url": "/api/spells/tiny-hut"
        },
        {
            "index": "tongues",
            "name": "Tongues",
            "url": "/api/spells/tongues"
        },
        {
            "index": "transport-via-plants",
            "name": "Transport via Plants",
            "url": "/api/spells/transport-via-plants"
        },
        {
            "index": "tree-stride",
            "name": "Tree Stride",
            "url": "/api/spells/tree-stride"
        },
        {
            "index": "true-polymorph",
            "name": "True Polymorph",
            "url": "/api/spells/true-polymorph"
        },
        {
            "index": "true-resurrection",
            "name": "True Resurrection",
            "url": "/api/spells/true-resurrection"
        },
        {
            "index": "true-seeing",
            "name": "True Seeing",
            "url": "/api/spells/true-seeing"
        },
        {
            "index": "true-strike",
            "name": "True Strike",
            "url": "/api/spells/true-strike"
        },
        {
            "index": "unseen-servant",
            "name": "Unseen Servant",
            "url": "/api/spells/unseen-servant"
        },
        {
            "index": "vampiric-touch",
            "name": "Vampiric Touch",
            "url": "/api/spells/vampiric-touch"
        },
        {
            "index": "vicious-mockery",
            "name": "Vicious Mockery",
            "url": "/api/spells/vicious-mockery"
        },
        {
            "index": "wall-of-fire",
            "name": "Wall of Fire",
            "url": "/api/spells/wall-of-fire"
        },
        {
            "index": "wall-of-force",
            "name": "Wall of Force",
            "url": "/api/spells/wall-of-force"
        },
        {
            "index": "wall-of-ice",
            "name": "Wall of Ice",
            "url": "/api/spells/wall-of-ice"
        },
        {
            "index": "wall-of-stone",
            "name": "Wall of Stone",
            "url": "/api/spells/wall-of-stone"
        },
        {
            "index": "wall-of-thorns",
            "name": "Wall of Thorns",
            "url": "/api/spells/wall-of-thorns"
        },
        {
            "index": "warding-bond",
            "name": "Warding Bond",
            "url": "/api/spells/warding-bond"
        },
        {
            "index": "water-breathing",
            "name": "Water Breathing",
            "url": "/api/spells/water-breathing"
        },
        {
            "index": "water-walk",
            "name": "Water Walk",
            "url": "/api/spells/water-walk"
        },
        {
            "index": "web",
            "name": "Web",
            "url": "/api/spells/web"
        },
        {
            "index": "weird",
            "name": "Weird",
            "url": "/api/spells/weird"
        },
        {
            "index": "wind-walk",
            "name": "Wind Walk",
            "url": "/api/spells/wind-walk"
        },
        {
            "index": "wind-wall",
            "name": "Wind Wall",
            "url": "/api/spells/wind-wall"
        },
        {
            "index": "wish",
            "name": "Wish",
            "url": "/api/spells/wish"
        },
        {
            "index": "word-of-recall",
            "name": "Word of Recall",
            "url": "/api/spells/word-of-recall"
        },
        {
            "index": "zone-of-truth",
            "name": "Zone of Truth",
            "url": "/api/spells/zone-of-truth"
        }
    ]
    for spells_list_item in spells_list:
        spell = Spell(
            name = spells_list_item['name'],
            url = spells_list_item['url'],
        )
        spells.append(spell)
    db.session.add_all(spells)
    db.session.commit()

def make_races():
    Race.query.delete()
    races = []
    races_list = [
         {
            "index": "dragonborn",
            "name": "Dragonborn",
            "url": "/api/races/dragonborn"
        },
        {
            "index": "dwarf",
            "name": "Dwarf",
            "url": "/api/races/dwarf"
        },
        {
            "index": "elf",
            "name": "Elf",
            "url": "/api/races/elf"
        },
        {
            "index": "gnome",
            "name": "Gnome",
            "url": "/api/races/gnome"
        },
        {
            "index": "half-elf",
            "name": "Half-Elf",
            "url": "/api/races/half-elf"
        },
        {
            "index": "half-orc",
            "name": "Half-Orc",
            "url": "/api/races/half-orc"
        },
        {
            "index": "halfling",
            "name": "Halfling",
            "url": "/api/races/halfling"
        },
        {
            "index": "human",
            "name": "Human",
            "url": "/api/races/human"
        },
        {
            "index": "tiefling",
            "name": "Tiefling",
            "url": "/api/races/tiefling"
        }
    ]
    for races_list_item in races_list:
        race = Race(
            name = races_list_item['name'],
            url = races_list_item['url'],
        )
        races.append(race)
    db.session.add_all(races)
    db.session.commit()

def make_character_classes():
    CharacterClass.query.delete()
    character_classes = []
    character_classes_list = [
        {
            "index": "barbarian",
            "name": "Barbarian",
            "url": "/api/classes/barbarian"
        },
        {
            "index": "bard",
            "name": "Bard",
            "url": "/api/classes/bard"
        },
        {
            "index": "cleric",
            "name": "Cleric",
            "url": "/api/classes/cleric"
        },
        {
            "index": "druid",
            "name": "Druid",
            "url": "/api/classes/druid"
        },
        {
            "index": "fighter",
            "name": "Fighter",
            "url": "/api/classes/fighter"
        },
        {
            "index": "monk",
            "name": "Monk",
            "url": "/api/classes/monk"
        },
        {
            "index": "paladin",
            "name": "Paladin",
            "url": "/api/classes/paladin"
        },
        {
            "index": "ranger",
            "name": "Ranger",
            "url": "/api/classes/ranger"
        },
        {
            "index": "rogue",
            "name": "Rogue",
            "url": "/api/classes/rogue"
        },
        {
            "index": "sorcerer",
            "name": "Sorcerer",
            "url": "/api/classes/sorcerer"
        },
        {
            "index": "warlock",
            "name": "Warlock",
            "url": "/api/classes/warlock"
        },
        {
            "index": "wizard",
            "name": "Wizard",
            "url": "/api/classes/wizard"
        }
    ]
    for character_classes_list_item in character_classes_list:
        character_class = CharacterClass(
            name = character_classes_list_item['name'],
            url = character_classes_list_item['url'],
        )
        character_classes.append(character_class)
    db.session.add_all(character_classes)
    db.session.commit()

def make_subclasses():
    Subclass.query.delete()
    subclasses = []
    subclasses_list = [
        {
            "index": "berserker",
            "name": "Berserker",
            "url": "/api/subclasses/berserker"
        },
        {
            "index": "champion",
            "name": "Champion",
            "url": "/api/subclasses/champion"
        },
        {
            "index": "devotion",
            "name": "Devotion",
            "url": "/api/subclasses/devotion"
        },
        {
            "index": "draconic",
            "name": "Draconic",
            "url": "/api/subclasses/draconic"
        },
        {
            "index": "evocation",
            "name": "Evocation",
            "url": "/api/subclasses/evocation"
        },
        {
            "index": "fiend",
            "name": "Fiend",
            "url": "/api/subclasses/fiend"
        },
        {
            "index": "hunter",
            "name": "Hunter",
            "url": "/api/subclasses/hunter"
        },
        {
            "index": "land",
            "name": "Land",
            "url": "/api/subclasses/land"
        },
        {
            "index": "life",
            "name": "Life",
            "url": "/api/subclasses/life"
        },
        {
            "index": "lore",
            "name": "Lore",
            "url": "/api/subclasses/lore"
        },
        {
            "index": "open-hand",
            "name": "Open Hand",
            "url": "/api/subclasses/open-hand"
        },
        {
            "index": "thief",
            "name": "Thief",
            "url": "/api/subclasses/thief"
        }
    ]
    for subclasses_list_item in subclasses_list:
        subclass = Subclass(
            name = subclasses_list_item['name'],
            url = subclasses_list_item['url'],
        )
        subclasses.append(subclass)
    db.session.add_all(subclasses)
    db.session.commit()

def make_proficiencies():
    Proficiency.query.delete()
    proficiencies = []
    proficiencies_list = [
         {
            "index": "alchemists-supplies",
            "name": "Alchemist's Supplies",
            "url": "/api/proficiencies/alchemists-supplies"
        },
        {
            "index": "all-armor",
            "name": "All armor",
            "url": "/api/proficiencies/all-armor"
        },
        {
            "index": "bagpipes",
            "name": "Bagpipes",
            "url": "/api/proficiencies/bagpipes"
        },
        {
            "index": "battleaxes",
            "name": "Battleaxes",
            "url": "/api/proficiencies/battleaxes"
        },
        {
            "index": "blowguns",
            "name": "Blowguns",
            "url": "/api/proficiencies/blowguns"
        },
        {
            "index": "breastplate",
            "name": "Breastplate",
            "url": "/api/proficiencies/breastplate"
        },
        {
            "index": "brewers-supplies",
            "name": "Brewer's Supplies",
            "url": "/api/proficiencies/brewers-supplies"
        },
        {
            "index": "calligraphers-supplies",
            "name": "Calligrapher's Supplies",
            "url": "/api/proficiencies/calligraphers-supplies"
        },
        {
            "index": "carpenters-tools",
            "name": "Carpenter's Tools",
            "url": "/api/proficiencies/carpenters-tools"
        },
        {
            "index": "cartographers-tools",
            "name": "Cartographer's Tools",
            "url": "/api/proficiencies/cartographers-tools"
        },
        {
            "index": "chain-mail",
            "name": "Chain Mail",
            "url": "/api/proficiencies/chain-mail"
        },
        {
            "index": "chain-shirt",
            "name": "Chain Shirt",
            "url": "/api/proficiencies/chain-shirt"
        },
        {
            "index": "clubs",
            "name": "Clubs",
            "url": "/api/proficiencies/clubs"
        },
        {
            "index": "cobblers-tools",
            "name": "Cobbler's Tools",
            "url": "/api/proficiencies/cobblers-tools"
        },
        {
            "index": "cooks-utensils",
            "name": "Cook's utensils",
            "url": "/api/proficiencies/cooks-utensils"
        },
        {
            "index": "crossbows-heavy",
            "name": "Crossbows, heavy",
            "url": "/api/proficiencies/crossbows-heavy"
        },
        {
            "index": "crossbows-light",
            "name": "Crossbows, light",
            "url": "/api/proficiencies/crossbows-light"
        },
        {
            "index": "daggers",
            "name": "Daggers",
            "url": "/api/proficiencies/daggers"
        },
        {
            "index": "darts",
            "name": "Darts",
            "url": "/api/proficiencies/darts"
        },
        {
            "index": "dice-set",
            "name": "Dice Set",
            "url": "/api/proficiencies/dice-set"
        },
        {
            "index": "disguise-kit",
            "name": "Disguise Kit",
            "url": "/api/proficiencies/disguise-kit"
        },
        {
            "index": "drum",
            "name": "Drum",
            "url": "/api/proficiencies/drum"
        },
        {
            "index": "dulcimer",
            "name": "Dulcimer",
            "url": "/api/proficiencies/dulcimer"
        },
        {
            "index": "flails",
            "name": "Flails",
            "url": "/api/proficiencies/flails"
        },
        {
            "index": "flute",
            "name": "Flute",
            "url": "/api/proficiencies/flute"
        },
        {
            "index": "forgery-kit",
            "name": "Forgery Kit",
            "url": "/api/proficiencies/forgery-kit"
        },
        {
            "index": "glaives",
            "name": "Glaives",
            "url": "/api/proficiencies/glaives"
        },
        {
            "index": "glassblowers-tools",
            "name": "Glassblower's Tools",
            "url": "/api/proficiencies/glassblowers-tools"
        },
        {
            "index": "greataxes",
            "name": "Greataxes",
            "url": "/api/proficiencies/greataxes"
        },
        {
            "index": "greatclubs",
            "name": "Greatclubs",
            "url": "/api/proficiencies/greatclubs"
        },
        {
            "index": "greatswords",
            "name": "Greatswords",
            "url": "/api/proficiencies/greatswords"
        },
        {
            "index": "halberds",
            "name": "Halberds",
            "url": "/api/proficiencies/halberds"
        },
        {
            "index": "half-plate-armor",
            "name": "Half Plate Armor",
            "url": "/api/proficiencies/half-plate-armor"
        },
        {
            "index": "hand-crossbows",
            "name": "Hand crossbows",
            "url": "/api/proficiencies/hand-crossbows"
        },
        {
            "index": "handaxes",
            "name": "Handaxes",
            "url": "/api/proficiencies/handaxes"
        },
        {
            "index": "heavy-armor",
            "name": "Heavy Armor",
            "url": "/api/proficiencies/heavy-armor"
        },
        {
            "index": "herbalism-kit",
            "name": "Herbalism Kit",
            "url": "/api/proficiencies/herbalism-kit"
        },
        {
            "index": "hide-armor",
            "name": "Hide Armor",
            "url": "/api/proficiencies/hide-armor"
        },
        {
            "index": "horn",
            "name": "Horn",
            "url": "/api/proficiencies/horn"
        },
        {
            "index": "javelins",
            "name": "Javelins",
            "url": "/api/proficiencies/javelins"
        },
        {
            "index": "jewelers-tools",
            "name": "Jeweler's Tools",
            "url": "/api/proficiencies/jewelers-tools"
        },
        {
            "index": "lances",
            "name": "Lances",
            "url": "/api/proficiencies/lances"
        },
        {
            "index": "land-vehicles",
            "name": "Land Vehicles",
            "url": "/api/proficiencies/land-vehicles"
        },
        {
            "index": "leather-armor",
            "name": "Leather Armor",
            "url": "/api/proficiencies/leather-armor"
        },
        {
            "index": "leatherworkers-tools",
            "name": "Leatherworker's Tools",
            "url": "/api/proficiencies/leatherworkers-tools"
        },
        {
            "index": "light-armor",
            "name": "Light Armor",
            "url": "/api/proficiencies/light-armor"
        },
        {
            "index": "light-hammers",
            "name": "Light hammers",
            "url": "/api/proficiencies/light-hammers"
        },
        {
            "index": "longbows",
            "name": "Longbows",
            "url": "/api/proficiencies/longbows"
        },
        {
            "index": "longswords",
            "name": "Longswords",
            "url": "/api/proficiencies/longswords"
        },
        {
            "index": "lute",
            "name": "Lute",
            "url": "/api/proficiencies/lute"
        },
        {
            "index": "lyre",
            "name": "Lyre",
            "url": "/api/proficiencies/lyre"
        },
        {
            "index": "maces",
            "name": "Maces",
            "url": "/api/proficiencies/maces"
        },
        {
            "index": "martial-weapons",
            "name": "Martial Weapons",
            "url": "/api/proficiencies/martial-weapons"
        },
        {
            "index": "masons-tools",
            "name": "Mason's Tools",
            "url": "/api/proficiencies/masons-tools"
        },
        {
            "index": "mauls",
            "name": "Mauls",
            "url": "/api/proficiencies/mauls"
        },
        {
            "index": "medium-armor",
            "name": "Medium Armor",
            "url": "/api/proficiencies/medium-armor"
        },
        {
            "index": "morningstars",
            "name": "Morningstars",
            "url": "/api/proficiencies/morningstars"
        },
        {
            "index": "navigators-tools",
            "name": "Navigator's Tools",
            "url": "/api/proficiencies/navigators-tools"
        },
        {
            "index": "nets",
            "name": "Nets",
            "url": "/api/proficiencies/nets"
        },
        {
            "index": "padded-armor",
            "name": "Padded Armor",
            "url": "/api/proficiencies/padded-armor"
        },
        {
            "index": "painters-supplies",
            "name": "Painter's Supplies",
            "url": "/api/proficiencies/painters-supplies"
        },
        {
            "index": "pan-flute",
            "name": "Pan flute",
            "url": "/api/proficiencies/pan-flute"
        },
        {
            "index": "pikes",
            "name": "Pikes",
            "url": "/api/proficiencies/pikes"
        },
        {
            "index": "plate-armor",
            "name": "Plate Armor",
            "url": "/api/proficiencies/plate-armor"
        },
        {
            "index": "playing-card-set",
            "name": "Playing Card Set",
            "url": "/api/proficiencies/playing-card-set"
        },
        {
            "index": "poisoners-kit",
            "name": "Poisoner's Kit",
            "url": "/api/proficiencies/poisoners-kit"
        },
        {
            "index": "potters-tools",
            "name": "Potter's Tools",
            "url": "/api/proficiencies/potters-tools"
        },
        {
            "index": "quarterstaffs",
            "name": "Quarterstaffs",
            "url": "/api/proficiencies/quarterstaffs"
        },
        {
            "index": "rapiers",
            "name": "Rapiers",
            "url": "/api/proficiencies/rapiers"
        },
        {
            "index": "ring-mail",
            "name": "Ring Mail",
            "url": "/api/proficiencies/ring-mail"
        },
        {
            "index": "saving-throw-cha",
            "name": "Saving Throw: CHA",
            "url": "/api/proficiencies/saving-throw-cha"
        },
        {
            "index": "saving-throw-con",
            "name": "Saving Throw: CON",
            "url": "/api/proficiencies/saving-throw-con"
        },
        {
            "index": "saving-throw-dex",
            "name": "Saving Throw: DEX",
            "url": "/api/proficiencies/saving-throw-dex"
        },
        {
            "index": "saving-throw-int",
            "name": "Saving Throw: INT",
            "url": "/api/proficiencies/saving-throw-int"
        },
        {
            "index": "saving-throw-str",
            "name": "Saving Throw: STR",
            "url": "/api/proficiencies/saving-throw-str"
        },
        {
            "index": "saving-throw-wis",
            "name": "Saving Throw: WIS",
            "url": "/api/proficiencies/saving-throw-wis"
        },
        {
            "index": "scale-mail",
            "name": "Scale Mail",
            "url": "/api/proficiencies/scale-mail"
        },
        {
            "index": "scimitars",
            "name": "Scimitars",
            "url": "/api/proficiencies/scimitars"
        },
        {
            "index": "shawm",
            "name": "Shawm",
            "url": "/api/proficiencies/shawm"
        },
        {
            "index": "shields",
            "name": "Shields",
            "url": "/api/proficiencies/shields"
        },
        {
            "index": "shortbows",
            "name": "Shortbows",
            "url": "/api/proficiencies/shortbows"
        },
        {
            "index": "shortswords",
            "name": "Shortswords",
            "url": "/api/proficiencies/shortswords"
        },
        {
            "index": "sickles",
            "name": "Sickles",
            "url": "/api/proficiencies/sickles"
        },
        {
            "index": "simple-weapons",
            "name": "Simple Weapons",
            "url": "/api/proficiencies/simple-weapons"
        },
        {
            "index": "skill-acrobatics",
            "name": "Skill: Acrobatics",
            "url": "/api/proficiencies/skill-acrobatics"
        },
        {
            "index": "skill-animal-handling",
            "name": "Skill: Animal Handling",
            "url": "/api/proficiencies/skill-animal-handling"
        },
        {
            "index": "skill-arcana",
            "name": "Skill: Arcana",
            "url": "/api/proficiencies/skill-arcana"
        },
        {
            "index": "skill-athletics",
            "name": "Skill: Athletics",
            "url": "/api/proficiencies/skill-athletics"
        },
        {
            "index": "skill-deception",
            "name": "Skill: Deception",
            "url": "/api/proficiencies/skill-deception"
        },
        {
            "index": "skill-history",
            "name": "Skill: History",
            "url": "/api/proficiencies/skill-history"
        },
        {
            "index": "skill-insight",
            "name": "Skill: Insight",
            "url": "/api/proficiencies/skill-insight"
        },
        {
            "index": "skill-intimidation",
            "name": "Skill: Intimidation",
            "url": "/api/proficiencies/skill-intimidation"
        },
        {
            "index": "skill-investigation",
            "name": "Skill: Investigation",
            "url": "/api/proficiencies/skill-investigation"
        },
        {
            "index": "skill-medicine",
            "name": "Skill: Medicine",
            "url": "/api/proficiencies/skill-medicine"
        },
        {
            "index": "skill-nature",
            "name": "Skill: Nature",
            "url": "/api/proficiencies/skill-nature"
        },
        {
            "index": "skill-perception",
            "name": "Skill: Perception",
            "url": "/api/proficiencies/skill-perception"
        },
        {
            "index": "skill-performance",
            "name": "Skill: Performance",
            "url": "/api/proficiencies/skill-performance"
        },
        {
            "index": "skill-persuasion",
            "name": "Skill: Persuasion",
            "url": "/api/proficiencies/skill-persuasion"
        },
        {
            "index": "skill-religion",
            "name": "Skill: Religion",
            "url": "/api/proficiencies/skill-religion"
        },
        {
            "index": "skill-sleight-of-hand",
            "name": "Skill: Sleight of Hand",
            "url": "/api/proficiencies/skill-sleight-of-hand"
        },
        {
            "index": "skill-stealth",
            "name": "Skill: Stealth",
            "url": "/api/proficiencies/skill-stealth"
        },
        {
            "index": "skill-survival",
            "name": "Skill: Survival",
            "url": "/api/proficiencies/skill-survival"
        },
        {
            "index": "slings",
            "name": "Slings",
            "url": "/api/proficiencies/slings"
        },
        {
            "index": "smiths-tools",
            "name": "Smith's Tools",
            "url": "/api/proficiencies/smiths-tools"
        },
        {
            "index": "spears",
            "name": "Spears",
            "url": "/api/proficiencies/spears"
        },
        {
            "index": "splint-armor",
            "name": "Splint Armor",
            "url": "/api/proficiencies/splint-armor"
        },
        {
            "index": "studded-leather-armor",
            "name": "Studded Leather Armor",
            "url": "/api/proficiencies/studded-leather-armor"
        },
        {
            "index": "thieves-tools",
            "name": "Thieves' Tools",
            "url": "/api/proficiencies/thieves-tools"
        },
        {
            "index": "tinkers-tools",
            "name": "Tinker's Tools",
            "url": "/api/proficiencies/tinkers-tools"
        },
        {
            "index": "tridents",
            "name": "Tridents",
            "url": "/api/proficiencies/tridents"
        },
        {
            "index": "viol",
            "name": "Viol",
            "url": "/api/proficiencies/viol"
        },
        {
            "index": "war-picks",
            "name": "War picks",
            "url": "/api/proficiencies/war-picks"
        },
        {
            "index": "warhammers",
            "name": "Warhammers",
            "url": "/api/proficiencies/warhammers"
        },
        {
            "index": "water-vehicles",
            "name": "Water Vehicles",
            "url": "/api/proficiencies/water-vehicles"
        },
        {
            "index": "weavers-tools",
            "name": "Weaver's Tools",
            "url": "/api/proficiencies/weavers-tools"
        },
        {
            "index": "whips",
            "name": "Whips",
            "url": "/api/proficiencies/whips"
        },
        {
            "index": "woodcarvers-tools",
            "name": "Woodcarver's Tools",
            "url": "/api/proficiencies/woodcarvers-tools"
        }
    ]
    for proficiencies_list_item in proficiencies_list:
        proficiency = Proficiency(
            name = proficiencies_list_item['name'],
            url = proficiencies_list_item['url'],
        )
        proficiencies.append(proficiency)
    db.session.add_all(proficiencies)
    db.session.commit()

def make_traits():
    Trait.query.delete()
    traits = []
    traits_list = [
        {
            "index": "artificers-lore",
            "name": "Artificer's Lore",
            "url": "/api/traits/artificers-lore"
        },
        {
            "index": "brave",
            "name": "Brave",
            "url": "/api/traits/brave"
        },
        {
            "index": "breath-weapon",
            "name": "Breath Weapon",
            "url": "/api/traits/breath-weapon"
        },
        {
            "index": "damage-resistance",
            "name": "Damage Resistance",
            "url": "/api/traits/damage-resistance"
        },
        {
            "index": "darkvision",
            "name": "Darkvision",
            "url": "/api/traits/darkvision"
        },
        {
            "index": "draconic-ancestry",
            "name": "Draconic Ancestry",
            "url": "/api/traits/draconic-ancestry"
        },
        {
            "index": "draconic-ancestry-black",
            "name": "Draconic Ancestry (Black)",
            "url": "/api/traits/draconic-ancestry-black"
        },
        {
            "index": "draconic-ancestry-blue",
            "name": "Draconic Ancestry (Blue)",
            "url": "/api/traits/draconic-ancestry-blue"
        },
        {
            "index": "draconic-ancestry-brass",
            "name": "Draconic Ancestry (Brass)",
            "url": "/api/traits/draconic-ancestry-brass"
        },
        {
            "index": "draconic-ancestry-bronze",
            "name": "Draconic Ancestry (Bronze)",
            "url": "/api/traits/draconic-ancestry-bronze"
        },
        {
            "index": "draconic-ancestry-copper",
            "name": "Draconic Ancestry (Copper)",
            "url": "/api/traits/draconic-ancestry-copper"
        },
        {
            "index": "draconic-ancestry-gold",
            "name": "Draconic Ancestry (Gold)",
            "url": "/api/traits/draconic-ancestry-gold"
        },
        {
            "index": "draconic-ancestry-green",
            "name": "Draconic Ancestry (Green)",
            "url": "/api/traits/draconic-ancestry-green"
        },
        {
            "index": "draconic-ancestry-red",
            "name": "Draconic Ancestry (Red)",
            "url": "/api/traits/draconic-ancestry-red"
        },
        {
            "index": "draconic-ancestry-silver",
            "name": "Draconic Ancestry (Silver)",
            "url": "/api/traits/draconic-ancestry-silver"
        },
        {
            "index": "draconic-ancestry-white",
            "name": "Draconic Ancestry (White)",
            "url": "/api/traits/draconic-ancestry-white"
        },
        {
            "index": "dwarven-combat-training",
            "name": "Dwarven Combat Training",
            "url": "/api/traits/dwarven-combat-training"
        },
        {
            "index": "dwarven-resilience",
            "name": "Dwarven Resilience",
            "url": "/api/traits/dwarven-resilience"
        },
        {
            "index": "dwarven-toughness",
            "name": "Dwarven Toughness",
            "url": "/api/traits/dwarven-toughness"
        },
        {
            "index": "elf-weapon-training",
            "name": "Elf Weapon Training",
            "url": "/api/traits/elf-weapon-training"
        },
        {
            "index": "extra-language",
            "name": "Extra Language",
            "url": "/api/traits/extra-language"
        },
        {
            "index": "fey-ancestry",
            "name": "Fey Ancestry",
            "url": "/api/traits/fey-ancestry"
        },
        {
            "index": "gnome-cunning",
            "name": "Gnome Cunning",
            "url": "/api/traits/gnome-cunning"
        },
        {
            "index": "halfling-nimbleness",
            "name": "Halfling Nimbleness",
            "url": "/api/traits/halfling-nimbleness"
        },
        {
            "index": "hellish-resistance",
            "name": "Hellish Resistance",
            "url": "/api/traits/hellish-resistance"
        },
        {
            "index": "high-elf-cantrip",
            "name": "High Elf Cantrip",
            "url": "/api/traits/high-elf-cantrip"
        },
        {
            "index": "infernal-legacy",
            "name": "Infernal Legacy",
            "url": "/api/traits/infernal-legacy"
        },
        {
            "index": "keen-senses",
            "name": "Keen Senses",
            "url": "/api/traits/keen-senses"
        },
        {
            "index": "lucky",
            "name": "Lucky",
            "url": "/api/traits/lucky"
        },
        {
            "index": "menacing",
            "name": "Menacing",
            "url": "/api/traits/menacing"
        },
        {
            "index": "naturally-stealthy",
            "name": "Naturally Stealthy",
            "url": "/api/traits/naturally-stealthy"
        },
        {
            "index": "relentless-endurance",
            "name": "Relentless Endurance",
            "url": "/api/traits/relentless-endurance"
        },
        {
            "index": "savage-attacks",
            "name": "Savage Attacks",
            "url": "/api/traits/savage-attacks"
        },
        {
            "index": "skill-versatility",
            "name": "Skill Versatility",
            "url": "/api/traits/skill-versatility"
        },
        {
            "index": "stonecunning",
            "name": "Stonecunning",
            "url": "/api/traits/stonecunning"
        },
        {
            "index": "tinker",
            "name": "Tinker",
            "url": "/api/traits/tinker"
        },
        {
            "index": "tool-proficiency",
            "name": "Tool Proficiency",
            "url": "/api/traits/tool-proficiency"
        },
        {
            "index": "trance",
            "name": "Trance",
            "url": "/api/traits/trance"
        }
    ]
    for traits_list_item in traits_list:
        trait = Trait(
            name = traits_list_item['name'],
            url = traits_list_item['url'],
        )
        traits.append(trait)
    db.session.add_all(traits)
    db.session.commit()

def make_encounter_characters():
    EncounterCharacter.query.delete()
    encounter_characters = []
    for i in range(4):
        for j in range(20):
            encounter_character = EncounterCharacter(
                encounter_id = j + 1,
                character_id = ((j + 1) + (i * 20))
            )
            encounter_characters.append(encounter_character)
    db.session.add_all(encounter_characters)
    db.session.commit()

def make_character_skills():
    CharacterSkill.query.delete()
    character_skills = []
    for j in range(5):
        for i in range(80):
            character_skill = CharacterSkill(
                character_id = i + 1,
                skill_id = random.randint(1, 18)
            )
            character_skills.append(character_skill)
    db.session.add_all(character_skills)
    db.session.commit()

def make_character_features():
    CharacterFeature.query.delete()
    character_features = []
    for j in range(5):
        for i in range(80):
            character_feature = CharacterFeature(
                character_id = i + 1,
                feature_id = random.randint(1, 370)
            )
            character_features.append(character_feature)
    db.session.add_all(character_features)
    db.session.commit()

def make_character_equipments():
    CharacterEquipment.query.delete()
    character_equipments = []
    for j in range(3):
        for i in range(80):
            character_equipment = CharacterEquipment(
                character_id = i + 1,
                equipment_id = random.randint(1, 237)
            )
            character_equipments.append(character_equipment)
    db.session.add_all(character_equipments)
    db.session.commit()

def make_character_spells():
    CharacterSpell.query.delete()
    character_spells = []
    for j in range(5):
        for i in range(80):
            character_spell = CharacterSpell(
                character_id = i + 1,
                spell_id = random.randint(1, 319)
            )
            character_spells.append(character_spell)
    db.session.add_all(character_spells)
    db.session.commit()

def make_character_race():
    CharacterRace.query.delete()
    character_races = []
    for i in range(80):
        character_race = CharacterRace(
            character_id = i + 1,
            race_id = random.randint(1, 9)
        )
        character_races.append(character_race)
    db.session.add_all(character_races)
    db.session.commit()

def make_character_character_classes():
    CharacterCharacterClass.query.delete()
    character_character_classes = []
    for i in range(80):
        character_character_class = CharacterCharacterClass(
            character_id = i + 1,
            character_class_id = random.randint(1, 12)
        )
        character_character_classes.append(character_character_class)
    db.session.add_all(character_character_classes)
    db.session.commit()

def make_character_subclasses():
    CharacterSubclass.query.delete()
    character_subclasses = []
    for i in range(80):
        character_subclass = CharacterSubclass(
            character_id = i + 1,
            subclass_id = random.randint(1, 12)
        )
        character_subclasses.append(character_subclass)
    db.session.add_all(character_subclasses)
    db.session.commit()

def make_character_proficiencies():
    CharacterProficiency.query.delete()
    character_proficiencies = []
    for j in range(3):
        for i in range(80):
            character_proficiency = CharacterProficiency(
                character_id = i + 1,
                proficiency_id = random.randint(1, 117)
            )
            character_proficiencies.append(character_proficiency)
    db.session.add_all(character_proficiencies)
    db.session.commit()

def make_character_traits():
    CharacterTrait.query.delete()
    character_traits = []   
    for j in range(3):
        for i in range(80):
            character_trait = CharacterTrait(
                character_id = i + 1,
                trait_id = random.randint(1, 38)
            )
            character_traits.append(character_trait)
    db.session.add_all(character_traits)
    db.session.commit()

def make_references():
    Reference.query.delete()

    users_list = User.query.all()
    reference_users = []
    for user in users_list:
        reference_user = Reference(
            name = user.username,
            url = 'http://127.0.0.1:5555/users/' + str(user.id),
            class_type = 'user',
            object_id = user.id
        )
        reference_users.append(reference_user)
    db.session.add_all(reference_users)

    encounters_list = Encounter.query.all()
    reference_encounters = []
    for encounter in encounters_list:
        reference_encounter = Reference(
            name = encounter.name,
            url = 'http://127.0.0.1:5555/encounters/' + str(encounter.id),
            class_type = 'encounter',
            object_id = encounter.id
        )
        reference_encounters.append(reference_encounter)
    db.session.add_all(reference_encounters)

    characters_list = Character.query.all()
    reference_characters = []
    for character in characters_list:
        reference_character = Reference(
            name = character.name,
            url = 'http://127.0.0.1:5555/characters/' + str(character.id),
            class_type = 'character',
            object_id = character.id
        )
        reference_characters.append(reference_character)
    db.session.add_all(reference_characters)

    skills_list = Skill.query.all()
    reference_skills = []
    for skill in skills_list:
        reference_skill = Reference(
            name = skill.name,
            url = 'https://www.dnd5eapi.co' + skill.url,
            class_type = 'skill',
            object_id = skill.id
        )
        reference_skills.append(reference_skill)
    db.session.add_all(reference_skills)

    features_list = Feature.query.all()
    reference_features = []
    for feature in features_list:
        reference_feature = Reference(
            name = feature.name,
            url = 'https://www.dnd5eapi.co' + feature.url,
            class_type = 'feature',
            object_id = feature.id
        )
        reference_features.append(reference_feature)
    db.session.add_all(reference_features)

    equipments_list = Equipment.query.all()
    reference_equipments = []
    for equipment in equipments_list:
        reference_equipment = Reference(
            name = equipment.name,
            url = 'https://www.dnd5eapi.co' + equipment.url,
            class_type = 'equipment',
            object_id = equipment.id
        )
        reference_equipments.append(reference_equipment)
    db.session.add_all(reference_equipments)

    spells_list = Spell.query.all()
    reference_spells = []
    for spell in spells_list:
        reference_spell = Reference(
            name = spell.name,
            url = 'https://www.dnd5eapi.co' + spell.url,
            class_type = 'spell',
            object_id = spell.id
        )
        reference_spells.append(reference_spell)
    db.session.add_all(reference_spells)

    races_list = Race.query.all()
    reference_races = []
    for race in races_list:
        reference_race = Reference(
            name = race.name,
            url = 'https://www.dnd5eapi.co' + race.url,
            class_type = 'race',
            object_id = race.id
        )
        reference_races.append(reference_race)
    db.session.add_all(reference_races)

    classes_list = CharacterClass.query.all()
    reference_classes = []
    for character_class in classes_list:
        reference_class = Reference(
            name = character_class.name,
            url = 'https://www.dnd5eapi.co' + character_class.url,
            class_type = 'class',
            object_id = character_class.id
        )
        reference_classes.append(reference_class)
    db.session.add_all(reference_classes)

    subclasses_list = Subclass.query.all()
    reference_subclasses = []
    for subclass in subclasses_list:
        reference_subclass = Reference(
            name = subclass.name,
            url = 'https://www.dnd5eapi.co' + subclass.url,
            class_type = 'subclass',
            object_id = subclass.id
        )
        reference_subclasses.append(reference_subclass)
    db.session.add_all(reference_subclasses)

    proficiencies_list = Proficiency.query.all()
    reference_proficiencies = []
    for proficiency in proficiencies_list:
        reference_proficiency = Reference(
            name = proficiency.name,
            url = 'https://www.dnd5eapi.co' + proficiency.url,
            class_type = 'proficiency',
            object_id = proficiency.id
        )
        reference_proficiencies.append(reference_proficiency)
    db.session.add_all(reference_proficiencies)

    traits_list = Trait.query.all()
    reference_traits = []
    for trait in traits_list:
        reference_trait = Reference(
            name = trait.name,
            url = 'https://www.dnd5eapi.co' + trait.url,
            class_type = 'trait',
            object_id = trait.id
        )
        reference_traits.append(reference_trait)
    db.session.add_all(reference_traits)

    db.session.commit()

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        make_users()
        make_encounters()
        make_characters()
        make_skills()
        make_features()
        make_equipment()
        make_spell()
        make_races()
        make_character_classes()
        make_subclasses()
        make_proficiencies()
        make_traits()
        make_encounter_characters()
        make_character_skills()
        make_character_features()
        make_character_equipments()
        make_character_spells()
        make_character_race()
        make_character_character_classes()
        make_character_subclasses()
        make_character_proficiencies()
        make_character_traits()
        make_references()
        print("Seed completed")

# def make_character_():
#     Character.query.delete()
#     character_ = []
#     for i in range(80):
#         character_ = (
#             character_id = i + 1,
#             _id = random.randint(1, )
#         )
#         character_.append(character_)
#     db.session.add_all(character_)
#     db.session.commit()

# def make_():
#     .query.delete()
#      = []
#     _list = []
#     for _list_item in _list:
#          = (
#             name = _list_item['name'],
#             url = _list_item['url'],
#         )
#         .append()
#     db.session.add_all()
#     db.session.commit()


