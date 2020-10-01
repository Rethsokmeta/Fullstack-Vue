const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

global.Task = require('./api/models/taskModel');
const routes = require('./api/routes/taskRoutes');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(
  'mongodb://localhost/Vuecrudapp',
  { useNewUrlParser: true }
);


//Handle production
if (process.env.NODE_ENV === 'production') {
  //static folder
  app.use(express.static(__dirname + '../dist/'));

  //handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/dist/index.html'))
}


const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
app.listen(port);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started on port ${port}`);