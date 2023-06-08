// import express
import express from "express";
// import cors
import cors from "cors";
 
import bodyParser from "body-parser";
 
// import routes
import Router from "./routes/routes.js";
  
// init express
const app = express();

// use cors
app.use(cors());

// use public static folder
app.use(express.static('./public'));

// use express json
app.use(express.json());
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use router
app.use(Router);
  
app.listen(5000, () => console.log('Server backend running at http://localhost:5000'));
