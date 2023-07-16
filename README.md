#Progetto programmazione avanzata
#Si realizzi un sistema che consenta di gestire l’inferenza a partire da immagini o video forniti dall’utente su un modello pre-addestrato. Devono essere predisposte le seguenti rotte:
•	[U] Creazione di un data-set (fornire metadati minimi come nome ed una serie di tag sotto forma di lista di parole); all’inizio il data-set risulta vuoto.
•	[U] Cancellazione (logica) di un data-set
•	[U] Ottenere la lista dei data-set
•	[U] Aggiornamento di un data-set (con verifica della non sovrapposizione con progetti dello stesso utente con lo stesso nome)
•	[U] Inserimento di un contenuto all’interno del data-set
o	Caricamento di una immagine
o	Caricamento di un video (formato mp4)
o	Il costo associato ad ogni immagine è di 0.5 token e per i video è di 0.8 token / Mbyte; deve essere verificato se il credito disponibile è sufficiente a gestire la richiesta.
•	[U] Effettuare un’inferenza su uno specifico data-set; l’utente specifica l’id del modello da usare (nel vostro caso si usi come rete quella dell’esame di CV&DL). Restituire l’id del processamento che consentirà di richiedere lo stato del processamento ed alla fine consentirà di ottenere il JSON contenente i dettagli dell’inferenza.
o	Ogni richiesta di inferenza ha un costo di 4 token / immagine. L’inferenza ha luogo se i crediti associati all’utente sono sufficienti. Nel caso di video di applica un costo di 1.5 token/frame. Annullare apriori il processamento se il credito non è sufficiente.
•	[U] Creare una rotta che consenta di valutare lo stato di avanzamento del processamento distinguendo le fasi. Ad esempio, PENDING (in coda), RUNNING (in fase di inferenza), FAILED (in caso di errore riportando anche la tipologia di errore), ABORTED (credito non sufficiente), COMPLETED (processamento data-set completo).
o	In caso di COMPLETED ritornare anche il risultato dell’inferenza sotto forma di JSON (codifica a scelta dello studente);
•	[U] Creare una rotta che dato l’id del processamento e specificato il numero del frame consenta di ritornare l’immagine con il frame originale ed anche i bbox con le classi (nella parte sx immagine originale e nella parte destra il frame con i bbox). Ovviamente nel caso di processamento “COMPLETED”. Nel caso di dataset con una immagine specificare 0.
L’inferenza deve avvenire mediante una gestione delle code con Bull che consenta di interfacciare il codice già disponibile per effettuare l’inferenza (codice python).
•	[U] Restituire il credito residuo di un utente (necessaria autenticazione mediante token JWT)
