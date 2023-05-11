# Spécifications du projet

### URLS de l'api

- GET - /temperature/all | Retourne toutes les températures
  <br />
  réponse:

```json
[{ "id": 1, "value_celsius": 22.5, "date": "2023-05-10T20:37:44.964-04:00" }]
```

- POST - /temperature | Insert une température
  <br />
  requête:

```json
{ "value_celsius": 22.5 }
```

- POST - /temperature/many | Insert plusieurs températures
  <br />
  requête:

```json
[{ "value_celsius": 22.5 }]
```

- GET - /intrusion/all | Retourne toutes les intrusions
  <br />
  réponse:

```json
[{ "id": 1, "date": "2023-05-10T20:37:44.964-04:00" }]
```

- POST - /intrusion | Insert une intrusion
  <br />
  requête:

```json
{}
```

- GET - /stop | Arrête la prise de donner du arduino
  <br />
  réponse:

```json
true
```

- GET - /demarrer | Démarre la prise de donner du arduino
  <br />
  réponse:

```json
true
```
