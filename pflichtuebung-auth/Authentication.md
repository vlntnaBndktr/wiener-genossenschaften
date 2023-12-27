# Authentication Wiener Genossenschaften

## Description

Die Authentifizierung soll - ohne Benutzernamen - mit Email/Passwort erfolgen, um die Verwendung so reduziert und simpel zu halten wie möglich. Es soll aber nur möglich sein sich zu Registrieren, wenn man einen Code zum Freischalten eines neuen Accounts hat. Die Authentication erfolgt mittels JWT. Passwörter werden mittels bcrypt verschlüsselt und in der MongoDB gespeichert und mittels bcrypt.compare dann bei der Loginanfrage verglichen.
Wenn das Passwort vergessen wurde soll es die Möglichkeit geben, sich einen Link zum Neu-Anlegen des Passworts per E-mail zusenden zu lassen.

## Technische Umsetzung

1. **Node.js-Projekt einrichten:**

   - express für den Webserver
   - bcrypt für das Hashen von Passwörtern
   - jsonwebtoken für JWTs
   - mongodb für die Datenbank
   - nanoid für eindeutige User-ID

2. **Erstellen einer Benutzerdatenbank mit MongoDB:**

   - Erstellen einer Kollektion, um Benutzerinformationen zu speichern.

3. **User Model:**

   - E-mail Adresse
   - gehashtes Passwort
   - einmaliger Freischaltungscode
   - Rolle (User, Admin)

4. **Registrierung:**

   - Route '/register' erstellen
     - Der Benutzer sendet seine E-Mail, Passwort und Freischaltungscode an den Server.
     - Überprüfe ob der Freischaltungscode in DB vorhanden und noch nicht verwendet ist.
     - Überprüfung: Passwort sollte laut PCI mindestens 8 Zeichen haben und 3 der folgenden Punkte erfüllen:
       i. Upper-case letters
       ii. Lower-case letters
       iii. Numbers
       iv. Special characters
     - Überprüfe, ob die E-Mail-Adresse bereits in der Datenbank existiert.
     - Wenn alles OK, hashe das Passwort und speichere die Benutzerdaten in der Datenbank.
     - User-ID mit nanoid erzeugen und speichern.

5. **Login:**

   - Route '/login' erstellen:
     - Der User sendet seine E-Mail und Passwort an den Server.
     - Überprüfe, ob die E-Mail-Adresse in der Datenbank existiert.
     - Wenn ja, vergleiche das gehashte Passwort mit dem eingegebenen Passwort.
     - Wenn übereinstimmend, erstelle einen JWT und sende ihn als Antwort zurück an den Client.

6. **JWT:**

   - jsonwebtoken-library, um einen JWT zu erstellen.
     - payload: sub: User-ID, email: email-adresse, role: user, exp: Ablaufzeit

7. **Passwörter hashen:**

   - bcrypt um das Passwort zu hashen, bevor es in der Datenbank gespeichert wird.

8. **Passwörter vergleichen:**

   - bcrypt.compare() zum Vergleichen des eingegebenen Passworts mit dem in der Datenbank gespeicherten gehashten Passwort.

9. **Middleware für die Authentifizierung:**

   - Middleware, die den JWT überprüft und den Benutzer authentifiziert. Diese Middleware wird für geschützte Routen verwendet.

10. **Geschützte Routen:**

    - Geschützte Routen definieren, die nur zugänglich sind, wenn ein gültiger JWT vorhanden ist.

11. **Logout:**

    - JWT auf dem Client löschen.

## Roadmap

- Layout in groben Zügen fixieren (Haupfarben, Seitenaufteilung, Logo)
- Datenbank einrichten
- alle HTML-Seiten erstellen
- Server: Authentication programmieren
- Client Requests
- e-mail Versand um neues Passwort anzulegen
- Testen

## Contributing

Peter Pruzina

## Authors and acknowledgment

Valentina Benedikter

## License

## Project status

In Planung
