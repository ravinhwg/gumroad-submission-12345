# Gumroad Submission.

## How to setup the project.

This project is made using yarn workspaces.

| package                  | Description       |
| ------------------------ | ----------------- |
| `packages/frontend`      | Vanilla JS Client |
| `packages/backend`       | ExpressJS Server  |
| `packages/reactfrontend` | React JS Client   |

Rename .env.example to .env and fill with required postgres credentials. To start, run
`cd packages/backend && npm start` to start the server.
