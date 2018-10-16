const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: 'http://localhost:8000' })); // Gatsby dev port
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: 'application/json' }));

app.post('/auth', (req, res) => {
  console.log(req.body);
  res.send();
})
app.listen(3030, () => {
  console.log(`http://localhost:3030 listening for Auth`);
})