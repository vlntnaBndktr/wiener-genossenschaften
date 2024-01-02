// Benutzerdefinierte Fehlerklasse die von Error erbt
class HttpError extends Error {
  //neue Instanz mit 2 Parametern erstellen:
  constructor(message, errorCode) {
    super(message); // ruft den Konstruktor der übergeordneten Klasse (Error) auf und übergibt die message als Fehlermeldung.
    this.errorCode = errorCode; // neue Eigenschaft 'errorCode' zur Instanz hinzufügen
  }
}

export default HttpError;
