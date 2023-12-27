# MongoDB Atlas + Mongoose

https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/

1. MongoDB Atlas Login
2. create new Project
3. Name vergeben
4. create a Deployment(= neuen Cluster erstellen)
5. free + aws auswählen
6. generierten usernam+Passwort kopieren:
   username: benediktervalentina
   password: IVpntUGU5fMcUQug

7. My local Environment
8. Add my current IP Address

9. - network Access (links) -> +ADD IP ADDRESS -> Allow access from anywhere (nur weil wir keinen fixen Rechner für die DB haben)

10. in overview bei Database Deployment auf connect klicken -> Drivers -> connection String rauskopieren

## SERVER.JS

1. npm init
2. npm i nodemon --save-dev

3. server.js einrichten:

   - dotenv, express, helmet, cors, installieren+importieren

4. npm i mongodb

5. npm i mongoose

- mongoose.connect() mit CONNECTION_STRING, um eine Verbindung zur MongoDB-Datenbank herzustellen
- username + Passwort für die DB in die .env Datei
- Namen für die database hier einfügen im String: mongodb.net/.......?retryWrites

- Cluster-Host (mern-wifi.rklcmfl.mongodb.net)
- Datenbanknamen (?retryWrites=true&w=majority)

5. "type": "module"

## router.js im routes-Ordner erstellen

1.  import { Router } from 'express';

const router = new Router();

// Root Aufruf
router.get('/', (req, res) => {
res.send('API root was called');
});

export default router;

2. server.js: import router from './routes/router.js';

## Datenbank Struktur

- 3 collections:

  1.  transactions
      {
      "\_id": ObjectId("unique_id"),
      "amount": 100.0,
      "category": "Wohnung",
      "description": "Miete",
      "type": "expense", // oder "income"
      "date": ISODate("2023-01-01T00:00:00Z")
      }

  2.  category
      {
      "\_id": ObjectId("unique_category_id"),
      "name": "Wohnung"
      }

## SCHEMA/MODEL in eigenem File:

```js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const animalsSchema = new Schema({
  name: { type: String, required: true, minLength: 2 },
  colour: {
    type: mongoose.Types.ObjectId,
    lowercase: true,
    ref: 'Colour',
  }, //convert it to lowercase before saving the document
  extinct: { type: Boolean, default: false },
  food: [String],
  address: {
    continent: String,
    country: String,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true, //We want this date to be impossible to change later
  },
});
export const Animal = mongoose.model('Animal', animalsSchema);
```

**SCHEMA** = definiert die Struktur des Collection Dokuments
**MODEL** = nimmt das Schema und wendet es auf jedes einzelne Dokument in der Collection an

--> n important note: the first argument passed to the model should be the singular form of your collection name. Mongoose automatically changes this to the plural form, transforms it to lowercase, and uses that for the database collection name.

- mongoose importieren
- const Schema = mongoose.Schema;
- Model exportieren

## MongoDB Compass + MONGOSH(Kommandozeilen-Tool/Shell in der man kommandos eingeben kann)

- es gibt ein Client Tool mit dem man die Datenbank verwalten kann: https://www.mongodb.com/try/download/compass
- neue Collection -> CONNECTION_STRING einfügen inkl echtem Username+Passwort

- Shell, ganz unten in der Maske: https://www.mongodb.com/docs/mongodb-shell/

## Mongoose Basics:

1. NEUEN EINTRAG IN DB:
   // a) neuen Testeintrag kreieren
   const newColour = new Colour({
   name: 'Black',
   });

// + Insert the article in our MongoDB database
await newColour.save();

// Find a single blog post
const firstColour = await Colour.findOne({});
console.log(firstColour);

// b) Eintrag mit create() in die DB speichern:

const newAnimal = await Animal.create({
name: 'Indian Elefant',
colour: newColour.\_id,
extinct: false,
food: ['Grass', 'Leaves', 'Nuts'],
address: {
continent: 'Asia',
country: 'India',
},
});

console.log(newAnimal);
console.log(newAnimal);

2. FIND DATA

const myAnimal = await Animal.findById('65784b1a9ee2c8cf35c98b13').exec();

3. DATEN UPDATE

myAnimal.name = 'Update Elefant';
await myAnimal.save();

4. REDUZIEREN auf bestimmte Felder
   // The second parameter can be of type Object|String|Array<String> to specify which fields we would like to project. In this case, we used a String.

const reducedAnimal = await Animal.findById(
'657846dd0a41790f28cf1931',
'name colour'
).exec();

5. LÖSCHEN

const geloescht = await Animal.deleteOne({ name: 'Mouse' });

const vieleGeloescht = await Animal.deleteMany({ name: 'Elefant' });

// OTHER METHODS:

// exists() method returns either null or the ObjectId of a document that matches the provided query

const mouse = await Animal.exists({ name: 'Mouse' });
console.log(mouse);

// The where() method allows us to chain and build queries.
