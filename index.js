const express = require('express');
const router = require('./routes/client/index.routes');
const app = express();
require('dotenv').config();


const port = process.env.PORT;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

router(app);
app.listen(port, () => {
    console.log(`Backend demo app listening at http://localhost:${port}`);
});
