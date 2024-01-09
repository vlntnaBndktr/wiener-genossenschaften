// DUMMY DATA:

const newUser = new User({
  firstName: 'Karolina',
  lastName: 'Dabrowski',
  email: 'karo.dabrowski@test.at',
  mobile: '06765465000',
  password: 'testPasswort',
});

await newUser.save();
console.log(newUser);

const newProject = new Project({
  name: 'Quartier Bienvenue: Alle Generationen herzlich willkommen',
  description:
    'Auf dem ehemaligen Areal der Ankerbrotfabrik entstehen 243 geförderte Mietwohnungen und ein Wohnheim mit 187 Micro-Appartements. Für Senior:innen werden barrierefreie Wohnungen mit Betreuungsoption geschaffen. Im neuen Quartier Bienvenue sind alle Generationen herzlich willkommen.',
  constructionAssociation: 'WBV-GPA',
  moveIn: 'Oktober 2025',
  location: {
    street: 'Puchsbaumgasse 1',
    zip: '1100', // z.B. "Point" für GeoJSON
    city: 'Wien',
    coordinates: {
      lat: 48.1719467,
      lon: 16.39045,
    }, // Längen- und Breitengrade für die OpenStreetMap
  },
  image: {
    // Bild vom jeweiligen Projekt
    cloudinaryPublicId: 'dummyString',
    url: 'dummyString',
  },
  website: 'https://www.wbv-gpa.at/projekt/puchsbaumgasse-1/', // Link zur Homepage der Genossenschaft
  // Weitere relevante Felder
});

await newProject.save();
console.log(newProject);

// Projekte:
```json 
{
  "name": "Quartier Bienvenue: Alle Generationen herzlich willkommen",
  "description": "  Auf dem ehemaligen Areal der Ankerbrotfabrik entstehen 243 geförderte Mietwohnungen und ein Wohnheim mit 187 Micro-Appartements. Für Senior:innen werden barrierefreie Wohnungen mit Betreuungsoption geschaffen. Im neuen Quartier Bienvenue sind alle Generationen herzlich willkommen.",
  "constructionAssociation": "WBV-GPA",
  "moveIn": "Fertigstellung im 4. Quartal 2024",
  "location": {
      "street": "Puchsbaumgasse 1",
      "zip": "1100",
      "city": "Wien",
      "coordinates": {
          "lat": 48.17197139829297,
          "lon": 16.391219398084964
      }
  },
  "image": "https://www.wbv-gpa.at/app/uploads/2021/05/imager.php_-126.jpg",
  "website": "https://www.wbv-gpa.at/projekt/puchsbaumgasse-1/"
}


{
  "name": "sophie 7: Eine Stadtoase mitten in 1070 Wien",
  "description": "Am Areal des ehemaligen Sophienspitals entsteht bis 2025 ein neues urbanes Quartier mit einem attraktiven Mix aus Wohnen, Arbeiten, Bildung, Kultur und Freizeit. Ein öffentlicher Park und eine Stadtterrasse werden allen Wiener:innen offen stehen.",
  "constructionAssociation": "WBV-GPA",
  "moveIn": "Fertigstellung 2025",
  "location": {
      "street": "Apollogasse 19",
      "zip": "1070",
      "city": "Wien",
      "coordinates": {
          "lat": 48.19804912517317, 
          "lon": 16.340948463745637
      }
  },
  "image": "https://www.wbv-gpa.at/app/uploads/2022/10/A4680_01_crop_RGB_WWW.jpg",
  "website": "https://www.wbv-gpa.at/projekt/apollogasse-19/"
}


{
  "name": "Multifunktionales Wohnprojekt in Wien-Döbling",
  "description": "In der Muthgasse 50 in Wien-Döbling, wo früher ein Parkplatz war, entsteht ein „Mixed-Use-Project“. Ein Wohnprojekt mit verschiedenen Nutzungsmöglichkeiten für Jung und Alt – überwiegend in geförderter Miete. Eine Premiere für die WBV-GPA und ein weiterer Meilenstein in der Geschichte des sozialen Wohnbaus.",
  "constructionAssociation": "WBV-GPA",
  "moveIn": "Fertigstellung 2025/26",
  "location": {
      "street": "Muthgasse 50 ",
      "zip": "1190",
      "city": "Wien",
      "coordinates": {
          "lat": 48.25045, 
          "lon": 16.36935
      }
  },
  "image": "https://www.wbv-gpa.at/app/uploads/2021/05/image001.jpg",
  "website": "https://www.wbv-gpa.at/projekt/muthgasse-50/"
}

```;

// Beispiel für Admin Middleware in checkToken integriert

const checkAdminAccess = (req, res, next) => {
  const user = req.foundUser; // Annahme: Du speicherst den Benutzerdatensatz in req.foundUser in der checkToken-Middleware.

  if (!user || user.role !== 'admin') {
    return next(new HttpError('Unauthorized', 403));
  }

  // Der Benutzer ist ein Administrator, setze ihn in req.isAdmin, falls du später darauf zugreifen möchtest.
  req.isAdmin = true;
  next();
};
