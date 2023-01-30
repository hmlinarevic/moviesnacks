![hello](https://github.com/hmlinarevic/moviesnacks/blob/main/src/assets/moviesnacks-64.png?raw=true)

# moviesnacks

---

## Description

This is a little demo app that allows users to discover movies. Please find in the readme file instructions on how to get started with this project.

## API

This project uses themoviedb.org for all the movie data. To run this project please create `.env` file in your project root with the following configuration. Follow this [documentation](https://www.themoviedb.org/documentation/api) to apply for your own api key. _In this [Vite.js](https://vitejs.dev/) project environment variables are prefixed with 'VITE'_.

```js
VITE_API_URL=https://api.themoviedb.org/3
VITE_IMG_API_URL=https://image.tmdb.org/t/p/w500
VITE_API_KEY=[your api key here]
```

---

## Getting Started with Devcontainer and VSCode

This guide will help you get started with using Devcontainer and VSCode for your development environment.

### Prerequisites

- [VSCode](https://code.visualstudio.com/)
- [Docker](https://www.docker.com/)
- [Devcontainer Extension for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Setup

1. Install the prerequisites listed above on your machine.
2. Open VSCode and install the Devcontainer extension from the Extensions tab in the sidebar (Ctrl+Shift+X).
3. Create a new folder for your project, then open it in VSCode (File > Open Folder).
4. In the bottom left corner of VSCode, click on the Remote Status (green icon).
5. Select `Reopen in Container` from the dropdown menu, then wait for your container to build and start up (this may take a few minutes).
6. Once your container is running, you should see a new terminal window open up at the bottom of VSCode where you can run commands inside the container environment!

You're now ready to start coding inside your devcontainer!

---

## Building the App with Docker Container

This guide will show you how to build and deploy your application using Docker containers.

### Prerequisites

Before you begin, make sure you have the following installed:

- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)
- [Project repo](https://github.com/hmlinarevic/moviesnacks)

### Building the Image

1. Clone your application repository: `git clone https://github.com/hmlinarevic/moviesnacks`
2. Change into the directory of your cloned repository: `cd moviesnacks`
3. Build the Docker image: `docker build -t your_tag .`
4. Check that the image was built successfully: `docker images`

### Running the Container with Nginx

1. Run a container from your newly built image: `docker run -i -rm -p 8080:80 your_tag`
2. Check that the container is running: `docker ps`

### Accessing Your App

1. Visit http://localhost:8080 in a browser to access your app!

---

## React Application with Vite

This is a React application that uses [Vite](https://github.com/vitejs/vite) as its development server.

### Prerequisites

- Node.js 14.18+, 16+

### Getting Started

1. Clone the repository: `git clone https://github.com/hmlinarevic/moviesnacks`
2. Install dependencies: `npm install` or `yarn install`
3. Start the development server: `npm run dev`
4. Open http://localhost:5173 in your browser to view the application

### Building for Production

To build a production version of the application, run:

```sh
npm run build # or yarn build
```

This will create a production-ready version of the application in the `dist/` directory, which you can then deploy to your web server of choice.
