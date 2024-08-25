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

const swaggerDocument = YAML.load('./src/api.yaml')

const app = express();

googleProvider();
fecebookprovider()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json());
app.use(cookieParser())
app.use(require('express-session')({ secret: 'riddhi22', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

connectDB();
// soketio()

app.use("/api/v1/", route);

app.listen(8000, () => {
    console.log("server start at port 8000.");
});
