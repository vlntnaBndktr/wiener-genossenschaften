- (wienerGenossenschaften:
  benediktervalentina
  yOdcoPnZeKepbxvn

  Connectionstring: mongodb+srv://benediktervalentina:<password>@wienergenossenschaften.tprp5yt.mongodb.net/?retryWrites=true&w=majority)

# DB STRUKTUR:

1.  Users:

    Enthält Informationen über die Benutzer, die sich auf der Plattform registriert haben.

    ```jsx
    {
      firstName: String,
      lastName: String,
      email: String,
      mobile: Number,
      password: String

    }
    ```

2.  Projects(gescrapte Neubauprojekte):

    Speichert Informationen zu den Neubauprojekten, die durch Web-Scraping gesammelt werden.

    ```jsx
    {
    name: String,
    description: String,
    constructionAssociation: String,
    location: {
        street: String,
        zip: String, // z.B. "Point" für GeoJSON
        city: String,
        coordinates: {
            lat: Number,
            lon: Number,
            }, // Längen- und Breitengrade für die OpenStreetMap
        },
    image: { // Bild vom jeweiligen Projekt
        cloudinaryPublicId: { type: String, required: true },
        url: { type: String, required: true },
    },
      website: String, // Link zur Homepage der Genossenschaft
      // Weitere relevante Felder
    }
    ```

3.  Favorites(für Merkliste):

        Hält Informationen darüber, welche Projekte ein Benutzer in seiner Merkliste hat.
        Beispiel-Schema:

    ```jsx
    {
    userId: ObjectId, // ID des Benutzers, der das Projekt favorisiert hat
    projectId: ObjectId // ID des favorisierten Projekts
    }
    ```

# lock/unlock nach BEZAHLUNG

1. User Model anpassen:

Füge ein neues Feld unlockKey und ein Feld isActivated hinzu:

```javascript
const usersSchema = new Schema(
  {
    // ...
    unlockKey: { type: String, required: true, unique: true }, // Eindeutiger Schlüssel für Freischaltung
    isActivated: { type: Boolean, default: false }, // Gibt an, ob der Benutzer freigeschaltet ist
    // ...
  },
  { timestamps: true }
);
```

2. Freischaltung und Zahlung überprüfen:

Nachdem ein Benutzer registriert ist, generiere einen eindeutigen unlockKey (z. B. mit einem Paket wie nanoid oder uuid) und speichere ihn im Benutzerdokument. Dann sende dem Benutzer den unlockKey und die Anweisungen für die Zahlung von 10 Euro. 3. Zahlung bestätigen:

Sobald die Zahlung bestätigt wurde (zum Beispiel über einen Zahlungsdienst), aktualisiere das Benutzerdokument und setze isActivated auf true:

```javascript
// Beispiel: Annahme, dass der unlockKey vom Benutzer eingereicht wurde
const submittedUnlockKey = req.body.unlockKey;

const user = await User.findOne({
  email: userEmail,
  unlockKey: submittedUnlockKey,
});

if (user) {
  // Benutzer gefunden, Zahlung bestätigt
  user.isActivated = true;
  await user.save();

  res
    .status(200)
    .json({ message: 'Zahlung bestätigt, Benutzer freigeschaltet.' });
} else {
  // Benutzer nicht gefunden oder unlockKey falsch
  res
    .status(400)
    .json({ message: 'Ungültiger unlockKey oder Benutzer nicht gefunden.' });
}
```

4. Anmeldevorgang anpassen:

Beim Anmeldevorgang solltest du überprüfen, ob der Benutzer freigeschaltet ist, bevor du ihm den Zugriff auf die Anwendung gewährst:

```javascript
const user = await User.findOne({ email: userEmail });

if (user && user.isActivated) {
  // Benutzer ist freigeschaltet, ermögliche Anmeldung
  // ...
} else {
  // Benutzer ist nicht freigeschaltet oder nicht gefunden
  // ...
}
```
