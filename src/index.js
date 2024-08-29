require('dotenv').config()
const express = require('express')
const route = require('./routes/api/v1/index');
const connectDB = require('./db/mongoosedb');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { fecebookprovider, googleProvider } = require('./utils/provider');
// const soketio = require('./utils/soketio');
const swaggerUi = require('swagger-ui-express');
YAML = require('yamljs');
const path=require('path')

// const swaggerDocument = YAML.load('./src/api.yaml')

const app = express();

googleProvider();
fecebookprovider()

const _dirname = path.resolve();

const __swaggerDistPath = path.join(_dirname, 'node_modules', 'swagger-ui-dist'); //install swagger-ui-dist

const swaggerDocument = YAML.load(path.resolve('./public', 'api.yaml'));


app.use(
  '/api/docs',
  express.static(__swaggerDistPath, { index: false }), // Serve Swagger UI assets
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      url: '/public/api.yaml' // Path to your YAML file
    }
  })
);

connectDB();
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors({
   origin: 'https://frutaible-user.vercel.app',
    // origin:'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus:200
}))
app.use(express.json());
app.use(cookieParser())
app.use(require('express-session')({ secret: 'riddhi22', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// soketio()   //vercel not suport
app.get('/',(req,res)=>{
    res.send('hello world')
});

app.use("/api/v1/", route);

app.listen(8000, () => {
    console.log("server start at port 8000.");
});

