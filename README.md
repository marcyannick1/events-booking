
# 🎟️ Application de réservation d’événements

> TP — Architecture logicielle & clusters SGBD  
> Étudiant : [Ton nom]  
> Date : Mai 2025

---

## 📌 Objectif

Développer une application de réservation de places pour des événements (concerts, conférences, expositions), en respectant les principes d’**architecture logicielle** moderne :
- Architecture microservices
- DDD, SOLID, TDD
- Haute disponibilité via **cluster MariaDB Galera**

---

## 🧱 Architecture choisie

### 🧩 Microservices

| Microservice         | Rôle                                       |
|----------------------|--------------------------------------------|
| `event-service`      | Gestion des événements (CRUD, capacité)    |
| `reservation-service`| Création et gestion des réservations       |
| `user-service`       | Gestion des utilisateurs                   |
| `notification-service` | Envoi des mails de confirmation          |
| `api-gateway`        | Point d’entrée unique                      |

📂 Voir `/docs/architecture` pour les diagrammes :
- Diagramme de cas d'utilisation
- Diagramme de contexte
- Diagramme des conteneurs

### Justification

- Services indépendants, découplage métier (DDD)
- Scalabilité horizontale
- Tolérance aux pannes grâce à MariaDB Galera

---

## 🧠 DDD : Domain Driven Design

- **Bounded Contexts** : EventContext, ReservationContext, UserContext
- **Ubiquitous Language** : réservation, événement, billet, capacité
- **Agrégats** :
  - `Reservation` (racine) → contient des `Ticket`
  - `Event` (racine) → contient les infos et la capacité

📎 Voir `/docs/ddd` pour les diagrammes de classes.

---

## 🧪 Qualité logicielle

- **KISS** : services simples, API REST claire, modèles courts
- **SOLID** :
  - S : chaque service a une seule responsabilité
  - O : Event extensible avec gestion dynamique de capacité
  - L, I, D respectés dans les interfaces métiers
- **TDD** :
  - Tests unitaires : services métiers (`*.test.js`)
  - Tests d’intégration : communication inter-service

---

## 🗃️ Base de données – Cluster MariaDB Galera

- Configuration 3 nœuds dans `/infrastructure/db/`
- Réplication synchrone
- Test de failover : arrêt d’un nœud = service OK
- Migration automatique via Flyway (optionnel)

📎 Voir `/docs/db/galera-setup.md` pour les détails

---

## 🚀 Lancement du projet

### Pré-requis

- Docker + Docker Compose
- Git

### Lancer en local

```bash
git clone https://github.com/ton-username/projet-reservation.git
cd projet-reservation
docker-compose up --build
```

L’API Gateway sera disponible sur `http://localhost:8080`

---

## 🧪 Tests

```bash
# Exemple : tests reservation-service
cd services/reservation-service
npm install
npm test
```

---

## ⚠️ Résilience et failover

Tests manuels :
1. Arrêt du nœud `mariadb-node1`
2. Réservation toujours possible via `node2` ou `node3`
3. Redémarrage automatique via Docker

---

## 📚 ADR – Décisions architecturales

Voir `/docs/adr/` :
- `001-microservices-vs-monolith.md`
- `002-galera-vs-postgres-cluster.md`

---

## 📊 Améliorations possibles

- Authentification via OAuth2
- Caching via Redis
- Monitoring Prometheus + Grafana
- CI/CD GitHub Actions

---

## 📁 Arborescence simplifiée

```
📦 projet-reservation
├── services/
│   ├── event-service/
│   ├── reservation-service/
│   ├── user-service/
├── infrastructure/
│   ├── db/ (Galera)
│   ├── docker-compose.yml
├── docs/
│   ├── architecture/
│   ├── ddd/
│   ├── db/
│   └── adr/
├── README.md
```

---

## 👨‍💻 Auteur

- [Ton nom]
- Étudiant en [nom de l’école ou promo]
