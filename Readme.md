# image-processing
#### Script Needed
The scripts in the json file are as follow `npm run test` which generate a production build and run the Jasmine tests in the `/build` folder, `npm run start` is used to start the development server, `npm run build` uses TypeScript to build the `build` folder which is the production build, `npm run prettier` is used to format the files, `npm run lint` is to use eslint to lint the code, `npm run build`  uses nodejs to run the index.js file, run `npm install` to install all dependencies.
#### Endpoint to be accessed 
the jpg used for the project is palmtunnel.jpg, it can be access in this format `http://localhost:3000/api/images?filename=palmtunnel&width=100&height=80`, when a new width and height is passed it creates a thumb in the `src/assests/thumb` in the format `filename-width-height`, when the endpoint is visited subsequent times result is fetched from a cache, when a file is deleted, it creates another one.
#### Other minor implementations
the code returns only the picture with the filename if no width and height is passed.
