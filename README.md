# Progetto programmazione avanzata

## Obiettivo
L'obiettivo principale è di sviluppare un backend Node.js per processare e gestire i dataset di un modello di una rete neurale.
Gli utenti hanno la possibilità di caricare immagini e video in dataset, anch'essi caricabili.
Una delle principali funzionalità sarà quella di effettuare inferenze sui dataset e modelli caricati.
Sono state predisposte le seguenti rotte:
* Creazione di un data-set (fornire metadati minimi come nome ed una serie di tag sotto forma di lista di parole); all’inizio il data-set risulta vuoto.
* Cancellazione (logica) di un data-set
* Ottenere la lista dei data-set
* Aggiornamento di un data-set (con verifica della non sovrapposizione con progetti dello stesso utente con lo stesso nome)
* Inserimento di un contenuto all’interno del data-set:
  *Caricamento di una immagine
  * Caricamento di un insieme di frame sotto forma di zip
  * Il costo associato ad ogni immagine è di 0.5 token; deve essere verificato se il credito disponibile è sufficiente a gestire la richiesta.
* Effettuare un’inferenza su uno specifico data-set utilizzando SAM. Restituire l’id del processamento che consentirà di richiedere lo stato del processamento ed alla fine consentirà di ottenere il JSON contenente i dettagli dell’inferenza.
* Ogni richiesta di inferenza ha un costo di 4 token / immagine. L’inferenza ha luogo se i crediti associati all’utente sono sufficienti. Annullare apriori il processamento se il credito non è sufficiente.
* Creare una rotta che consenta di valutare lo stato di avanzamento del processamento distinguendo le fasi. Ad esempio, PENDING (in coda), RUNNING (in fase di inferenza), FAILED (in caso di errore riportando anche la tipologia di errore), ABORTED (credito non sufficiente), COMPLETED (processamento data-set completo).
* In caso di COMPLETED ritornare anche il risultato dell’inferenza sotto forma di JSON espresso come per ogni immagine il numero di oggetti segmentati e per ciascuno l’area espressa sotto forma di percentuale rispetto all’area totale;
* Creare una rotta che consenta dato l’id del processamento, se COMPLETED, di scaricare una immagine o uno zip che contiene il risultato dell’inferenza (maschera di segmentazione).
L’inferenza deve avvenire mediante una gestione delle code con Bull o Celery che consenta di interfacciare il codice già disponibile per effettuare l’inferenza (codice python).
* Restituire il credito residuo di un utente (necessaria autenticazione mediante token JWT)
Si chiede di sviluppare il codice possibilmente utilizzando typescript.

## Progettazione

### UML
![UML con le rotte da definire](https://github.com/MarcoP1999/programmazione_avanzata/blob/main/docs/Use_Case.png)
### Diagrammi delle sequenze e funzionamento
Foriremo in questa sezione una breve descrizione di ogni rotta e il diagramma di flusso ad essa associata.
| Tipo | Rotta | 
|--- |--- |
| GET | /budget| 
| GET | /dataset |
| POST | /dataset |
| PATCH | /dataset |
| DEL | /dataset|
| POST | /upload |
| POST | /upload |
| POST | /upload |
| GET | /py |

Seguendo l'ordine della tabella soprastante:
è possibile verificare il credito di un utente
vengono mostratii dataset dell'utente che li richiede
viene rinominato un dataset
viene cancellato un dataset
viene caricata un'immagine
viene caricato un file zip e poi spacchettato
...


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

'docker compose build'
'docker compose up'
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
