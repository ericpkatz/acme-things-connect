const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { Thing } = db.models;

db.syncAndSeed();

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/things', async(req, res, next)=> {
  try {
    res.send(await Thing.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/things', async(req, res, next)=> {
  try {
    const thing = await Thing.create({ name: Math.random()});
    res.send(thing);
  }
  catch(ex){
    next(ex);
  }
});



app.delete('/api/things/:id', async(req, res, next)=> {
  try {
    await Thing.destroy({ where: { id: req.params.id }});
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});
