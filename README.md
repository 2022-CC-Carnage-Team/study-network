# coug-study-network
The backend + frontend for the study network

## Environment Setup
1. create a file named `.env` in the project root and copy the contents of `.env.example`
2. populate the environment variables with valid values. 
    - "CALLBACK_URL" will be the URL the oauth system will redirect back to. 
    - "SECRET" can be anything sufficiently random. 
    - "WEBAPP_URL" must be the root URL of the frontend (in a local environment with react running on a separate dev server this will be http://localhost:3000)

## Development Setup
1. run `npm install` in a terminal open to the root folder, to install the server packages
2. run `npm start` to start the server
3. open a second terminal and navigate to the `client` folder with `cd client`
4. run `npm install` to install the client packages
5. run `npm start` to start the react development server, a browser window should open

## VSCode
I'd recommend VSCode for development, included in this repo is a .vscode folder with some helpful launch presets for debugging. Note you'll still have to run `npm install` in both folders before using the vscode launch scripts.


