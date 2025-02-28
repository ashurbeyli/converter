# Project Overview

This project is designed for converting **MP4 files to GIF**. It consists of an **Angular** frontend, an **Express.js** backend, and a **worker** service running in a separate container, all orchestrated with **Docker** and **Docker Swarm**.

## Project Structure

- **Frontend**: Built with Angular, located in the root directory.
- **Backend**: Built with Express.js, also in the root directory. You can find `api` methods inside `src/api` folder.
- **Worker**: A separate TypeScript-based service or worker is located in `src/workers/converter`, running in its own Docker container and managed by Docker Swarm.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

Also you need to run the worker:

```bash
npm install -g ffmpeg
cd src/workers/converter
npm start
```

If `npm start` does not work, please try

```bash
npm install -g ts-node
ts-node converter.ts
```

## Docker Setup

The project uses **Docker** to containerize both the frontend, backend, and worker services, with **Docker Swarm** to manage and scale the worker service.

To run `production` build:

```bash
docker-compose build

docker swarm init

docker stack deploy -c docker-compose.yml converter_app
```

## What can be improved

- We could use message queue systems instead of http call for workers (RabbitMQ)
- Error handling could be improved
- Validation for mp4 file size, dimensions and length on the worker
- Websocket can be added for real-time upload/conversion progress bar
- More unit tests, as well as integration and E2E tests can be added
- We can have separate express.js Backend/API server
- Enviroment variables could be used for PORT, UploadDir, ImageUrls etc. 
- ...
