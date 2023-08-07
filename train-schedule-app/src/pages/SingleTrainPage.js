import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainDetails from '../components/TrainDetails';

const SingleTrainPage = ({ match }) => {
  const [train, setTrain] = useState(null);
  const trainNumber = match.params.trainNumber;

  useEffect(() => {
    axios.get(`/api/trains/${trainNumber}`)
      .then(response => {
        setTrain(response.data);
      })
      .catch(error => {
        console.error(`Error fetching train ${trainNumber} details:`, error);
      });
  }, [trainNumber]);

  return (
    <div>
      <h1>Train Details</h1>
      {train && <TrainDetails train={train} />}
    </div>
  );
};

export default SingleTrainPage;
