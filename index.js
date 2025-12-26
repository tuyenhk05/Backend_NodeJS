const express = require('express');
const database = require('./config/database');
const systemconfig = require('./config/system');
const methodOverride = require('method-override');
const router = require('./routes/client/index.routes');
const routerAdmin = require('./routes/admin/index.router');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
require('dotenv').config();
app.use(methodOverride('_method'));

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT;
database.connect();

app.locals.prefixAdmin = systemconfig.preficxAdmin;

router(app);
routerAdmin(app);


app.listen(port, () => {
    console.log(`Backend demo app listening at http://localhost:${port}`);
});


