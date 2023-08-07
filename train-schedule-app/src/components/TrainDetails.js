import React from 'react';

const TrainDetails = ({ train }) => {
  return (
    <div>
      <p>Train Name: {train.trainName}</p>
      <p>Train Number: {train.trainNumber}</p>
      {/* Display more train details */}
    </div>
  );
};

export default TrainDetails;
