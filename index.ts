// require the Express

import cors from "cors";
import express from "express";

// creates an instance of an Express server 
const app = express();
app.use( cors() );

// define the port 
const port = 3000;
// run the server 
app.listen( port, () => console.log( `Listening on port: ${ port }.` ) );
