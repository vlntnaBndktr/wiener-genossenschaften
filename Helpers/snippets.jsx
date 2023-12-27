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
