import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainDetails from '../components/TrainDetails';

const AllTrainsPage = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    axios.get('/api/trains')
      .then(response => {
        setTrains(response.data);
      })
      .catch(error => {
        console.error('Error fetching trains:', error);
      });
  }, []);

  return (
    <div>
      <h1>All Trains</h1>
      <ul>
        {trains.map(train => (
          <li key={train.trainNumber}>
            <TrainDetails train={train} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTrainsPage;
