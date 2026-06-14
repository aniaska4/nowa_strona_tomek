const path    = require('path')
const sqlite3 = require('sqlite3').verbose()

const DB_PATH = path.join(__dirname, 'database/pianist.db')
const db      = new sqlite3.Database(DB_PATH)

const events = [
  // --- Nadchodzące (wg. oryginalnej strony) ---
  {
    title:       'Klassische Sonntage in Belp',
    date:        '2025-01-25',
    venue:       'Katholische Kirche in Belp',
    city:        'Belp, Szwajcaria',
    description: 'Gregory Feldmann (baryton), Tomasz Domański (fortepian). Program: Schumann, Barber, Campo.',
  },
  {
    title:       'Konzerte in der Kirche',
    date:        '2026-02-01',
    venue:       'Reformierte Kirche Meggen',
    city:        'Meggen, Szwajcaria',
    description: 'Gregory Feldmann (baryton), Tomasz Domański (fortepian). Program: Schumann, Barber, Campo.',
  },
  {
    title:       'Konzert zu 4 Hände',
    date:        '2026-02-22',
    venue:       'Rössli Wahlendorf',
    city:        'Wahlendorf, Szwajcaria',
    description: 'Lidiia Domańska (fortepian), Tomasz Domański (fortepian). Program: Brahms, Dvořák, Raff, de Falla.',
  },
  // --- Archiwum ---
  {
    title:       'Sentimentale Reise',
    date:        '2024-11-10',
    venue:       'Bruder Klaus Kirche in Bern',
    city:        'Berno, Szwajcaria',
    description: 'Paweł Grzyb (tenor), Lidiia Vodyk (fortepian), Tomasz Domański (organy, fortepian).',
  },
  {
    title:       'Klassische Sonntage in Belp',
    date:        '2024-11-03',
    venue:       'Katholische Kirche in Belp',
    city:        'Belp, Szwajcaria',
    description: 'Jonathan Reuveni (wiolonczela), Tomasz Domański (fortepian). Program: Schumann, Bruch, Chopin.',
  },
  {
    title:       'Solidaritätskonzert für Hochwasseropfer in Polen',
    date:        '2024-10-27',
    venue:       'Hotel Schwanen',
    city:        'Rapperswil, Szwajcaria',
    description: 'Maciej Burdzy (skrzypce), Lidiia Vodyk (fortepian), Tomasz Domański (fortepian). Program: Gershwin, Szymanowski, de Falla, Dvořák.',
  },
  {
    title:       'Abend mit Klassischer Musik',
    date:        '2024-10-26',
    venue:       'Reformierte Kirche in Kallnach',
    city:        'Kallnach, Szwajcaria',
    description: 'Jonathan Reuveni (wiolonczela), Tomasz Domański (fortepian). Program: Schumann, Bruch, Chopin.',
  },
  {
    title:       'Chopin nad Bugiem',
    date:        '2024-08-13',
    venue:       'Mielnik',
    city:        'Mielnik, Polska',
    description: 'Marek Bracha, Lidiia Vodyk, Tomasz Domański (fortepian), Meccore String Quartet. Program: Fryderyk Chopin.',
  },
  {
    title:       'Klassische Sonntage in Belp',
    date:        '2024-06-23',
    venue:       'Katholische Kirche in Belp',
    city:        'Belp, Szwajcaria',
    description: 'Maciej Burdzy (skrzypce), Tomasz Domański (fortepian). Program: Wieniawski, Szymanowski, Brahms.',
  },
  {
    title:       'Concert with Mission',
    date:        '2024-06-09',
    venue:       'Bruder Klaus Kirche in Bern',
    city:        'Berno, Szwajcaria',
    description: 'Ewa Żmudzka-Grzyb (sopran), Paweł Grzyb (tenor), Paweł Mazurkiewicz (fortepian), Tomasz Domański (organy, fortepian). Program: Gomółka, Bach, Mozart, Tosti, Rameau.',
  },
  {
    title:       'Liederabend – Schubert: Die Winterreise',
    date:        '2024-05-30',
    venue:       'Music at 22 Mansfield Street',
    city:        'Londyn, Wielka Brytania',
    description: 'Felix Gygli (baryton), Tomasz Domański (fortepian). Program: Schubert – Die Winterreise D. 911.',
  },
  {
    title:       'Concert Lyrique',
    date:        '2024-05-20',
    venue:       'Wydarzenie prywatne',
    city:        'Murs, Francja',
    description: 'Emy Gazeilles (sopran), Diego Godoy (tenor), Tomasz Domański (fortepian). Arie i duety z oper Gounoda, Verdiego, Mozarta, Delibes\'a, Pucciniego, Masseneta.',
  },
  {
    title:       'Tribschener Salonkonzerte – Europäische Klänge zu Wagners Zeit',
    date:        '2024-05-03',
    venue:       'Richard Wagner Museum',
    city:        'Lucerna, Szwajcaria',
    description: 'Tereza Kotlánová (sopran), Tomasz Domański (fortepian). Program: Dvořák, Brahms, Berlioz, Verdi, Sullivan.',
  },
  {
    title:       'Klassische Sonntage in Belp',
    date:        '2024-04-28',
    venue:       'Katholische Kirche in Belp',
    city:        'Belp, Szwajcaria',
    description: 'Tereza Kotlánová (sopran), Tiphaine Frere (flet), Tomasz Domański (fortepian). Program: Ravel, Gaubert, Liebermann, Messiaen.',
  },
  {
    title:       'Liederabend – Schubert: Die Winterreise',
    date:        '2024-04-21',
    venue:       'Swiss Foundation for Young Musicians',
    city:        'Bazylea, Szwajcaria',
    description: 'Felix Gygli (baryton), Tomasz Domański (fortepian). Program: Schubert – Die Winterreise D. 911.',
  },
  {
    title:       'Ene due rabe',
    date:        '2024-04-14',
    venue:       'Warsaw National Philharmonic Concert Hall',
    city:        'Warszawa, Polska',
    description: 'Aleksandra Żakiewicz (sopran), Tomasz Domański (fortepian). Program: Szymanowski, Lutosławski, Palester.',
  },
  {
    title:       'Klassische Sonntage in Belp – Tänze nicht zum Tanzen',
    date:        '2024-02-25',
    venue:       'Katholische Kirche in Belp',
    city:        'Belp, Szwajcaria',
    description: 'Lidiia Vodyk (fortepian), Tomasz Domański (fortepian). Program: Brahms, Ravel, Grieg, de Falla.',
  },
  {
    title:       'Liederabend – Schubert: Die Winterreise',
    date:        '2024-02-10',
    venue:       'Reformierte Kirche in Kallnach',
    city:        'Kallnach, Szwajcaria',
    description: 'Felix Gygli (baryton), Tomasz Domański (fortepian). Program: Schubert – Die Winterreise D. 911.',
  },
  {
    title:       '147th birthday of Feliks Nowowiejski',
    date:        '2024-02-04',
    venue:       'Warszawskie Towarzystwo Muzyczne',
    city:        'Warszawa, Polska',
    description: 'Aleksandra Żakiewicz (sopran), Tomasz Domański (fortepian). Program: Nowowiejski, Roger Quilter.',
  },
  {
    title:       'Neujahrskonzert: Mit Freude ins Neue Jahr',
    date:        '2024-01-21',
    venue:       'Bruder Klaus Kirche in Bern',
    city:        'Berno, Szwajcaria',
    description: 'Ewa Żmudzka-Grzyb (sopran), Paweł Grzyb (tenor), Tomasz Domański (organy, fortepian), Paweł Mazurkiewicz (fortepian). Program: Praetorius, Caldara, Händel, Mozart, Liszt, Chopin, Strauss.',
  },
  {
    title:       'Klassische Sonntage in Belp – Die Winterreise',
    date:        '2024-01-14',
    venue:       'Katholische Kirche in Belp',
    city:        'Belp, Szwajcaria',
    description: 'Felix Gygli (baryton), Tomasz Domański (fortepian). Program: Schubert – Die Winterreise D. 911.',
  },
  {
    title:       'Klassische Sonntage in Belp',
    date:        '2023-09-17',
    venue:       'Katholische Kirche in Belp',
    city:        'Belp, Szwajcaria',
    description: 'Katarzyna Drozd (klarnet), Gleb Sidaruk (wiolonczela), Tomasz Domański (fortepian). Program: Beethoven – Trio B-dur op. 11, Brahms – Trio a-moll op. 114.',
  },
  {
    title:       'Afterwork / Foyer de l\'Opéra #5',
    date:        '2023-02-22',
    venue:       'Opéra de Nice – Foyer Montserrat Caballé',
    city:        'Nicea, Francja',
    description: 'Lyriel Benameur (sopran), Felix Gygli (baryton), Tomasz Domański (fortepian). Program: H. Wolf, G. Bizet.',
  },
  {
    title:       '146th birthday of Feliks Nowowiejski',
    date:        '2023-02-07',
    venue:       'Salon Muzyczny Feliksa Nowowiejskiego',
    city:        'Poznań, Polska',
    description: 'Aleksandra Żakiewicz (sopran), Tomasz Domański (fortepian). Program: Nowowiejski, Roger Quilter.',
  },
  {
    title:       'Słowa Ubrane w Dźwięk',
    date:        '2022-11-13',
    venue:       'Pałac w Jabłonnie',
    city:        'Jabłonna, Polska',
    description: 'Aleksandra Żakiewicz (sopran), Tomasz Domański (fortepian). Program: Nowowiejski, Szymanowski, Lutosławski, Karałow.',
  },
  {
    title:       'Kammermusik am Sonntagmorgen',
    date:        '2022-10-09',
    venue:       'Schloss Oberhofen',
    city:        'Oberhofen, Szwajcaria',
    description: 'Anna Raszyńska (flet), Tomasz Domański (fortepian). Program: Bach, Mozart, Chopin, Fauré, Poulenc.',
  },
]

db.serialize(() => {
  // Clear existing events first to avoid duplicates on re-run
  db.run('DELETE FROM events', () => {
    const stmt = db.prepare(
      'INSERT INTO events (title, date, venue, city, description) VALUES (?, ?, ?, ?, ?)'
    )
    for (const e of events) {
      stmt.run(e.title, e.date, e.venue, e.city, e.description)
    }
    stmt.finalize(() => {
      console.log(`Inserted ${events.length} events.`)
      db.close()
    })
  })
})
