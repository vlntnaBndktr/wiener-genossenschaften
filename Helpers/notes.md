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
