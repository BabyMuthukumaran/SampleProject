import React, { useState} from 'react';
import CarList from './Car/CarList';
import CarForm from './Car/CarForm';
import { data } from '../data/carlogodetails';
import { CarItem, brandDetail } from '../Interface/CarModel';
import { useDispatch, useSelector } from "react-redux";
import { addCarItemAsync } from "../slices/reducer";
import { AppDispatch, RootState } from '../store';

interface ComponentProps {
  addCarItemAsync: (data: CarItem) => void;
}

const CarLogo: React.FC = () => {
   
  const dispatch = useDispatch<AppDispatch>();
  const [showForm, setShowForm] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');


  const handleLogoClick = (model: string) => {
    setShowForm(true);
    setSelectedModel(model);
  };

  const formSubmit = (carbrand: brandDetail) => {
    setShowForm(false);
    dispatch(addCarItemAsync({ brand: selectedModel, items: carbrand } as CarItem));
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