import React, { useEffect, useState } from 'react';
import CarList from './Car/CarList';
import CarForm from './Car/CarForm';
import {data} from '../data/carlogodetails';
import { brandDetail } from '../Interface/CarModel';
import axios from 'axios';

const CarLogo: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');


  const handleLogoClick = (model: string) => {
    setShowForm(true);
    setSelectedModel(model);
  };
  
  const formSubmit = (carbrand: brandDetail) => {
    setShowForm(false);
    console.log(carbrand);
    axios.post("http://localhost:3001/data", {
      brand: selectedModel,
      items: carbrand
    })
    .then((response) => {
      console.log(response.data);
    });
  }
  return (
    <div>
      <h1>Car Details</h1>
      <CarList cars={data} onLogoClick={handleLogoClick} />
      {showForm && (
        <div>
          <h2>Add Car Details for {selectedModel}</h2>
          <CarForm onSubmit={formSubmit} />
        </div>
      )}
    </div>
  );
};

export default CarLogo;