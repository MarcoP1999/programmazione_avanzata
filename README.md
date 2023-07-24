# Progetto programmazione avanzata

## Obiettivo
L'obiettivo principale è di sviluppare un backend Node.js per processare e gestire i dataset di un modello di una rete neurale.
Gli utenti hanno la possibilità di caricare immagini e video in dataset, anch'essi caricabili.
Una delle principali funzionalità sarà quella di effettuare inferenze sui dataset e modelli caricati.
## Progettazione

### UML e diagrammi delle sequenze

## Pattern usati

### Singleton

Il pattern Singleton garantisce che per una classe venga creata una e una sola istanza. Nel caso della nostra applicazione viene usato con la classe che permette la connessione al Database per evitare richieste multiple.
### MVC

Questa applicazione si basa sul pattern MVC, composto quindi da una parte di Model, una di View e una di Controller.
*Il Model contiene i dati dell'applicazione, ma non la logica che dice come presentarli all'utente.
*La View sarebbe l'interfaccia, ma dato che nella nostra applicazione non è richiesto implementarla, la nostra View sarà Postman.
*Il Controller elabora i dati del Model e li passa all'interfaccia, in base alle richieste dell'utente.
Nel nostro caso c'è anche l'integrazione di una parte di Routing, con delle rotte che raccolgono le richieste e le inviano al corrispondente Controller. 

### Chain of responsability(Middleware)

Con middleware viene inteso uno strato intermedio che si occupa di validare le richieste che in questo caso sono prese dalle rotte.Tutte le richieste della nostra applicazione sono passate al vaglio dei vari middleware, che verificano la validità del token associato alla richiesta e della coerenza dei dati inseriti, e la possibilità di realizzare determinate azioni.

## Rotte e richieste API
| Rotte | Rotta | Parametri |
|--- |--- |--- |
| row 1 | column 2 | column 3 |
| row 2 | row 2 column 2 | row 2 column 3 |


## Metodo di utilizzo
Per testare il progetto, è necessario seguire questi passaggi:

1. Scaricare il progetto copiando l'URL del repository Git o scaricando il file ZIP.
2. Importare il pacchetto di chiamate fornito nella cartella postman in Postman.
3. Compilare il file .env con i dati qui forniti:
4. Installare Docker dal sito ufficiale.
5. Avviare Docker e assicurarsi che i servizi necessari per il progetto siano in esecuzione.
6. Utilizzare Postman per inviare le chiamate al server e verificare le risposte.
Lanciare quindi i seguenti comandi nella giusta directory:

'docker compose build'
'docker compose up'
## Software utilizzati

## Autori
* [Alesi Mattia](https://github.com/alesimattia)
* [Proietti Marco](https://github.com/MarcoP1999)
