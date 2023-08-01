# Progetto programmazione avanzata

## Obiettivo
Si intende sviluppare un backend Node.js per processare e gestire i dataset di un modello di una rete neurale.
Gli utenti hanno la possibilità di caricare immagini o un insieme di frame (.zip) in uno specifico dataset, creabili a piacimento.
\
Una delle principali funzionalità sarà quella di effettuare task di segmentazione sui dataset, utilizzando il modello preaddestrato [*Segment Anything Model*](https://github.com/facebookresearch/segment-anything).

Data la richiesta computazionale elevata in fase di inferenza, il tutto verrà gestito tramite delle code di processi, con il tool [BullMQ](https://docs.bullmq.io/)

## Progettazione

### UML
![UML con le rotte da definire](https://github.com/MarcoP1999/programmazione_avanzata/blob/main/docs/Use_Case.png)
### Diagrammi delle sequenze e funzionamento
Foriremo in questa sezione una breve descrizione di ogni rotta e il diagramma di flusso ad essa associata.
| Verbo | Rotta |Descrizione|
| --- | --- | --- |
| GET | /budget | Leggere il credito di un utente |
| PATCH | /budget | Ricaricare il credito di un utente (funzionalità *admin*) |
| GET | /dataset |Lista dei dataset dell'utente che li richiede. (Se *admin* mostra tutti i ds. memorizzati)|
| POST | /dataset | Creazione di un nuovo dataset |
| PATCH | /dataset | Aggiornamento del nome di un dataset |
| DEL | /dataset| Eliminazione di un dataset |
| POST | /upload | Caricamento di una lista di immagini o file zip con insieme di frame |
| GET | /process | Richiesta di un nuovo task di segmentazione |
| GET | /status | Controllo dello stato attuale di un task avviato. In caso di completamento viene restituito il risultato della segmentazione (json) |

Seguendo l'ordine della tabella soprastante:
* ![Diagramma di flusso per verificare il credito di un utente](https://github.com/MarcoP1999/programmazione_avanzata/blob/main/docs/readBudget.png)
* ![Diagramma di flusso per ricaricare il credito di un utente](https://github.com/MarcoP1999/programmazione_avanzata/blob/main/docs/chargeBudget.png)
* ![Diagramma di flusso per mostrare i dateset di un utente o tutti i dataset in caso di utente admin](https://github.com/MarcoP1999/programmazione_avanzata/blob/main/docs/Screenshot%202023-07-30%20141652.png)
* ![Diagramma di flusso per rinominare un dataset](https://github.com/MarcoP1999/programmazione_avanzata/blob/main/docs/Screenshot%202023-07-30%20141733.png)
* ![Diagramma di flusso per cancellare un dataset](https://github.com/MarcoP1999/programmazione_avanzata/blob/main/docs/Screenshot%202023-07-30%20141733.png)
* ![Diagramma di flusso per caricare un'immagine in un dataset](https://github.com/MarcoP1999/programmazione_avanzata/blob/main/docs/insertImage.png)
* ![Diagramma di flusso per caricare un file zip che verrà poi spacchettato in un dataset](https://github.com/MarcoP1999/programmazione_avanzata/blob/main/docs/insertZIP.png)
...
Per far funzionare queste rotte bisogna genereare un token JWT con gli adeguati parametri e con le credenziali di un utente autenticato(admin e non) e poi passarlo a Postman che risponderà alla richiesta.

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


## Metodo di utilizzo
Per testare il progetto, è necessario seguire questi passaggi:

1. Scaricare il progetto copiando l'URL del repository Git o scaricando il file ZIP.
2. Importare il pacchetto di chiamate fornito nella cartella postman in Postman.
3. Compilare il file .env con i dati qui forniti:
4. Installare Docker dal sito ufficiale.
5. Avviare Docker e assicurarsi che i servizi necessari per il progetto siano in esecuzione.
6. Utilizzare Postman per inviare le chiamate al server e verificare le risposte.
Lanciare quindi i seguenti comandi nella giusta directory:
```javascript
'docker compose build'
'docker compose up'
```
## Software utilizzati
* [Express.js](https://expressjs.com/it/)
* [Postgres](https://www.postgresql.org/)
* [Node.js](https://nodejs.org/en)
* [JWT](https://jwt.io/)
* [VSC](https://code.visualstudio.com/)
* [Typescript](https://www.typescriptlang.org/)
* [Docker](https://www.docker.com/)
* [Sequelize](https://sequelize.org/)
* [Postman](https://www.postman.com/)
## Autori
* [Alesi Mattia](https://github.com/alesimattia)
* [Proietti Marco](https://github.com/MarcoP1999)
