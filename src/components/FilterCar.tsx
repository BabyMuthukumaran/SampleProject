import React, { useState, useEffect } from 'react';
import { brandDetail } from '../Interface/CarModel';
import axios from 'axios';

interface CarItem {
    id: string;
    brand: string;
    items: {
        model: string;
        year: string;
        color: string;
        insurance: string;
        location: string;
        owners: string;
        fitments: string;
        kms: string;
        transmission: string;
    };
}

interface Collection {
    [key: string]: string[];
}

const FilterCar: React.FC = () => {
    const [data, setData] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:3001/data")
            .then((response) => {
                console.log(response.data);
                setData(response.data)
            });

    }, []);

    const splitDataIntoCollections = (field: string): Collection => {
        const collection: Collection = {};
        data.forEach((car: any) => {
            const fieldValue = car.items[field].toLowerCase();
            if (!collection[fieldValue]) {
                collection[fieldValue] = [];
            }
            if (!collection[fieldValue].includes(car.brand)) {
                collection[fieldValue].push(car.brand);
            }
        });
        return collection;
    };

    return (
        <div>
            <h4>Location</h4>
            <select>
                <option value="">Select a Location</option>
                {Object.entries(splitDataIntoCollections('location')).map(([value]) => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>

            <h4>Models</h4>
            {Object.entries(splitDataIntoCollections('model')).map(([value]) => (
                <div key={value}>
                    <input
                        type="checkbox"
                        id={value}
                        value={value}
                    />
                    <label htmlFor={value}>{value}</label>
                </div>
            ))}
            <h4>Models</h4>
            {Object.entries(splitDataIntoCollections('owners')).map(([value]) => (
                <div key={value}>
                    <input
                        type="radio"
                        id={value}
                        value={value}
                    />
                    <label htmlFor={value}>{value} Owners</label>
                </div>
            ))}
            <h4>Models</h4>
            {Object.entries(splitDataIntoCollections('transmission')).map(([value]) => (
                <div key={value}>
                    <input
                        type="radio"
                        id={value}
                        value={value}
                    />
                    <label htmlFor={value}>{value}</label>
                </div>
            ))}
        </div>
    );
};

export default FilterCar;
