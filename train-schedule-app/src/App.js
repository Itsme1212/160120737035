import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes ,Route, BrowserRouter,Link } from 'react-router-dom';

const TrainList = ({ trains }) => (
  <div>
    <h2>All Trains</h2>
    <ul>
      {trains.map(train => (
        <li key={train.trainNumber}>
          <Link to={`/trains/${train.trainNumber}`}>{train.trainName}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const SingleTrain = ({ match }) => {
  const trainNumber = match.params.trainNumber;
  // Fetch train details using the trainNumber

  return (
    <div>
      {/* Display single train details */}
    </div>
  );
};

function App() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/trains')
      .then(response => {
        setTrains(response.data);
      })
      .catch(error => {
        console.error('Error fetching train data:', error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact render={() => <TrainList trains={trains} />} />
        <Route path="/trains/:trainNumber" component={SingleTrain} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
