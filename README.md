# Wiener Genossenschaften

## Working hours

- 21.12. 17:00-19:30
- 22.12. 11:00-12:30 + 16:20-17:40 + 18.00-19:00
- 27.12. 11:00-13:30 + 17:00-19:00
- 28.12. 09:00-14:00
- 29.12. 09:00-11:30
- 30.12. 16:30-19:00
- 31.12. 10:00-13:30
- 02.01. 10:30-13:30
- 03.01. 09:00-11:30 + 12:30-

## Milestones

1. until 12.01.2024:

- MongoDb Setup + Models
- Create React-Project (with Vite, MUI etc)
- Backend: set up Routes for Users

## Questions

- zentrale Fehlerbehandlung???
- muss ich zusätzlich zu email = unique in der Datenbank noch prüfen ob die email schon existiert??

## Description

Web-App für Desktop und Mobile Geräte, die Wohnungsangebote von diversen Genossenschaften sammelt, anzeigt und regelmäßig aktualisiert. Kernstück sind der Scraper um die Daten zu sammeln und eine Liste im Mitgliederbereich mit Sortier- und Filterfunktionen und Alarm/Deadlines. Die Liste soll von den Usern angepasst/individualisiert werden können.
Durch die Web-App sollen User

- den Überblick während der Wohnungssuche behalten
- wichtige Fristen nicht versäumen
- neue Angebote nicht übersehen
- eine zentrale Informationsstelle bieten

## Funktionen

_Startseite_

- Login mit Passwort (Passwort vergessen = Luxus)
- Signup, User Ändern, Passwort ändern
- kleine Beschreibung zu WG

_Userbereich:_

1. ALLGEMEINE SUCHE

- Listenanzeige aller Projekte/Wohnungen (nur 1-2 Genossenschaften als Beginn)
- Kartenanzeige mit Standorten

- Suchfunktion/Filtern nach
  - Planungsprojekte/Sofort verfügbare Wohnungen
  - Miete/Kaufen
  - Region/Bezirk
  - m² Nutzfläche
  - Freifläche
  - Kosten
- Suchagent/Suchprofil anlegen (e-mail Benachrichtigung bei neuen Wohnungsangeboten)

2. MERKLISTE(Watchlist) der Favorites

- markierte Projekte werden angezeigt + zusätzliche Infos können ergänzt werden

- Filter- & Sortierfunktionen
  - Datum der Anmeldung
  - Genossenschaft
  - Bezugsfertig ab
  - Vormerkung gültig bis
  - Alarm
  - Notiz

## Visuals

- React
- MUI

## Roadmap

- Backend Server aufsetzen
- DB vorbereiten

  - Welche Models? + evtl flatsModel
  - wie sind Collections untereinander verknüpft?

- UI

  - React + MUI
  - Start, Login, Suche, 1. Ergebnis : statisches HTML
  - responsive (mobile first), technischer Teil ist wichtiger

- vor den scrapen zuerst mal Login; user.json, Basic

- SCRAPER:

  - Vor-scrapen + cache für 1h (nicht bei jedem re-load)
  - es gibt Schnittstellen zb openImmo damit sich andere Portale die Daten holen können. Evtl verwenden das manche Genossenschaften. http://www.openimmo.de/
  - geschützte Route am Server, die man auch von außen aufrufen kann
  - Speicher der Daten
  - Projekt muss irgendwie 100% identifizierbar sein damit es nicht öfters angelegt wird: eventuell lässt sich etwas wie ObjektNummer finden beim scrapen
  - Häufigkeit der Aktualisierung

  - scrap bei einer Plattform, evtl dann 2.
  - scraper einzeln ablegen zb. migra-scraper etc.
  - bei Änderungen auf den Plattformen muss umprogrammiert werden

- FRONTEND:
  - Suchfilter reduzieren auf 2 (dann evtl. mehr)

## Contributing
