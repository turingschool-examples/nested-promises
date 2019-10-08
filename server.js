const express = require('express');
const cors = require('express-cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const app = express();
const railLines = require('./rail-lines.js');
const railSchedules = require('./rail-schedules.js');
const busRides = require('./bus-rides.js');
const busSchedules = require('./bus-schedules.js');
const skyRides = require('./sky-rides.js');
const skyRideSchedules = require('./sky-schedules.js')

app.use(cors({
  allowedOrigins: ['localhost:3000']
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/v1/rtd-schedules', (req, res) => {
  res.status(200).send({ 
    rails: 'http://localhost:3001/api/v1/light-rails',
    skyRides: 'http://localhost:3001/api/v1/sky-rides',
    buses: 'http://localhost:3001/api/v1/bus-rides',
  });
})

app.get('/api/v1/light-rails', (req, res) => {
  res.status(200).send(railLines)
});

app.get('/api/v1/light-rails/:rail', (req, res) => {
  const railLine = req.params.rail;
  if(!railSchedules[railLine]){
    return res.status(422).json({ message: `The ${railLine} rail line does not exist.` });
  }
  res.status(200).send(railSchedules[railLine]);
});

app.get('/api/v1/bus-rides', (req, res) => {
  res.status(200).send(busRides);
});

app.get('/api/v1/bus-rides/:bus', (req, res) => {
  const busRide = req.params.bus;
  if(!busSchedules[busRide]){
    return res.status(422).json({ message: `The ${busRide} bus ride does not exist.` });
  }
  res.status(200).send(busSchedules[busRide]);
});

app.get('/api/v1/sky-rides', (req, res) => {
  res.status(200).send(skyRides);
});

app.get('/api/v1/sky-rides/:skyride', (req, res) => {
  const { skyride } = req.params;
  if(!skyRideSchedules[skyride]){
    return res.status(422).json({ message: `The ${skyride} bus ride does not exist.` });
  }
  res.status(200).send(skyRideSchedules[skyride]);
})

app.listen(port, () => {
  console.log(`Nested Promises is now running on ${port}!`)
});
