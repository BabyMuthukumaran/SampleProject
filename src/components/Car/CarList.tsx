import React, { useState } from 'react';
import { CarDetail } from '../../Interface/CarModel';

const CarList: React.FC<{
    cars: CarDetail[];
    onLogoClick: (brand: string) => void;
}> = ({ cars, onLogoClick }) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {cars.map((car, index) => (
                <div key={index} onClick={() => onLogoClick(car.brand)} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px', width: '100px' }}>
                    <img src={car.logoUrl} alt={`${car.brand} Logo`} style={{ width: '100%', height: 'auto' }} />
                    <p style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}>{car.brand}</p>
                </div>
            ))}
        </div>
    );
};

export default CarList;