import cron from 'node-cron';
import extractProjects from '../scraperNeubauProjekte/scraper.js';
import extractFlats from '../scraperFreieWohnungen/scraper.js';
import { Project } from '../models/projects.js';
import { Flat } from '../models/flats.js'; // Stellen Sie sicher, dass Flat korrekt importiert wird

// Deklaration der Aufgabe außerhalb der Funktion, um auf sie zugreifen zu können
let task;

// Funktion zum Starten des Scrapers
const startScraper = () => {
  task = cron.schedule(
    '0 7 * * *', // Einmal täglich um 7:00 AM ausführen
    async () => {
      console.log('Scraping-Vorgang läuft täglich um 7:00 AM');
      try {
        // Scrape Projekte
        const projectsURL = 'https://www.wbv-gpa.at/wohnungen/neue-projekte/';
        const projectsData = await extractProjects(projectsURL);
        // Überprüfen, ob jedes Projekt bereits in der Datenbank vorhanden ist
        for (const projectData of projectsData) {
          const existingProject = await Project.findOne({
            website: projectData.website,
          });
          if (existingProject) {
            console.log('Projekt bereits vorhanden:', existingProject.name);
          } else {
            // Projekt in DB speichern, wenn es noch nicht vorhanden ist
            await Project.create(projectData);
            console.log('Projekt gespeichert:', projectData.name);
          }
        }

        // Scrape freie Wohnungen
        const flatsURL = 'https://www.wbv-gpa.at/wohnungen/';
        const flatsData = await extractFlats(flatsURL);
        // Überprüfen, ob jede Wohnung bereits in der Datenbank vorhanden ist
        for (const flatData of flatsData) {
          const existingFlat = await Flat.findOne({
            website: flatData.website,
          });
          if (existingFlat) {
            console.log('Wohnung bereits vorhanden:', existingFlat.name);
          } else {
            // Wohnung in DB speichern, wenn sie noch nicht vorhanden ist
            await Flat.create(flatData);
            console.log('Wohnung gespeichert:', flatData.name);
          }
        }

        console.log('Scraping-Vorgang erfolgreich beendet');
      } catch (error) {
        console.error('Fehler beim Scraping-Vorgang:', error);
      }
    },
    {
      timezone: 'Europe/Vienna',
    }
  );
};

// Funktion zum Stoppen des Scrapers
const stopScraper = () => {
  if (task) {
    task.stop(); // Stoppt den Scheduler, wenn er vorhanden ist
    console.log('Scraping-Vorgang gestoppt');
  } else {
    console.log('Scraping-Vorgang ist nicht aktiv');
  }
};

export { startScraper, stopScraper };
