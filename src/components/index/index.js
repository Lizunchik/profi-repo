const express = require('express');

const bodyParser = require("body-parser");
const app = express();

const cors = require("cors");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const _ = require("lodash");
const adapter = new FileSync("db.json");
const { v4: uuidv4 } = require("uuid");
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ basket: { content:[] }}).write();
app.use(cors());
app.use(bodyParser.json());

app.post("/users", (req, res) => {
  const goods = db
    .get("users")
    .push({ ...req.body, id: uuidv4() })
    .write();
  res.json({ data: req.body });
});
app.get("/users", (req, res) => {
  const goods = db.get("users").value();
  res.json({ data: goods });
});

app.post("/basket/content", (req, res) => {

  let arr = db.get("basket").value().content;
  console.log(arr);
  console.log(req.body.id);
  let item =  arr.find(x=> x.id == req.body.id);
  if (item){
      item.amount++;
  }
    else{
     
      arr.push({ ...req.body})
    }
  res.json({ data: req.body });
});

app.get("/basket/content", (req, res) => {
  const goods = db.get("basket").value().content;
  res.json({data: goods});
});

app.get("/basket", (req, res) => {
  const goods = db.get("basket").value();
  res.json({ data: goods });
});

app.delete("/basket/:id", (req, res) => {
 //const goods = db.get("basket").value().content.remove({ productId: req.params.id }).write();
 let arr =db.get("basket").value().content;
 let item = arr.find(x=>x.id == req.params.id);
 let index = arr.indexOf(item);
 const goods = arr.splice(index, 1);
  res.json({ data: req.params.id });
});

app.listen(3000, () => {
  console.log('server is running on port 3000!');
});