const express = require('express');
const app = express();
const routes = require('./routes/routes');

//cors permite que un cliente se conecte a otro servidor para el intercambio ded recursos
const cors = require('cors');


require('./database');

app.use(express.json());

app.use(cors());

app.use('/' , routes());

app.listen(4000);