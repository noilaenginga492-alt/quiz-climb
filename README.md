# QuizClimb Backend API — Week 11 (CRUD & Validation)

## Endpoints & Roles

| Method | Path | Who Can Call | Notes |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Public | Service status check |
| `GET` | `/api/v1/health` | Public | Database connectivity check (`200` / `503`) |
| `GET` | `/api/v1/game-info` | Public | Game metadata and limits |
| `GET` | `/api/v1/results` | Hub (`X-Hub-Key`) | Finished game player results; supports `?since=` |
| `GET` | `/api/v1/question-sets` | Public / Demo User | Lists all question sets (`200`) |
| `GET` | `/api/v1/question-sets/:id` | Public / Demo User | Gets one question set by ID (`200` / `404`) |
| `POST` | `/api/v1/question-sets` | `HOST`, `ADMIN` (`X-Demo-User`) | Creates a question set (`201`); `401` if missing user, `403` if wrong role |
| `PATCH` / `PUT` | `/api/v1/question-sets/:id` | Owner `HOST`, `ADMIN` (`X-Demo-User`) | Updates a question set (`200`); `403` if not owner/admin |
| `DELETE` | `/api/v1/question-sets/:id` | Owner `HOST`, `ADMIN` (`X-Demo-User`) | Deletes a question set (`204`); `409` if in use |
| `GET` | `/api/v1/sessions` | Public / Demo User | Lists game sessions (`200`) |
| `GET` | `/api/v1/sessions/:code` | Public / Demo User | Gets a session by 6-digit `code` (`200` / `404`) |
| `POST` | `/api/v1/sessions` | `HOST`, `ADMIN` (`X-Demo-User`) | Creates a session with server-generated 6-digit `session_code` (`201`) |
| `PATCH` / `PUT` | `/api/v1/sessions/:code` | Owner `HOST`, `ADMIN` (`X-Demo-User`) | Updates session status (`200`) |
| `GET` | `/api/v1/sessions/:code/players` | Public / Demo User | Lists players and scores in a session (`200` / `404`) |
| `POST` | `/api/v1/sessions/:code/players` | Authenticated Demo User (`X-Demo-User`) | Joins session (`201`), rejoins same seat (`200`), or returns `409 ALREADY_IN_GAME` if active in another game |

## When Is a Game Considered "Completed"?

A game session is treated as **completed** once its `status` is set to `'closed'` (for example via `PATCH /api/v1/sessions/:code` with `{ "status": "closed" }`). Once `'closed'`, the player no longer blocks joining a new session under the one-game-at-a-time rule, and finished game player results can be queried via `GET /api/v1/results`.
