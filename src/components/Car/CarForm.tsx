import React, { useState } from 'react';
import { brandDetail } from '../../Interface/CarModel';

const CarForm: React.FC<{ onSubmit: (car: brandDetail) => void }> = ({ onSubmit }) => {

    const [formData, setFormData] = useState({
        model: '',
        year: '',
        color: '',
        insurance: '',
        location: '',
        owners: '',
        fitments: '',
        kms: '',
        fuelType: '',
        transmission: '',
        fileURL: ''
    });

    const labelData: brandDetail = {
        model: 'Model',
        year: 'Year of manufacture',
        color: 'Color',
        insurance: 'Insurance valid upto',
        location: 'Location',
        owners: 'No of owners',
        fitments: 'External fitments',
        kms: 'Kms',
        fuelType: "Fuel Type",
        transmission: 'Transmission',
        fileURL: 'Upload Image'

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const fileHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        const name = e.target.name;
        if (file) {

            const reader = new FileReader();

            reader.onload = function () {
                const result = reader.result as string;
                setFormData(prevState => ({
                ...prevState, 
                [name]: result
            }));
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {Object.entries(formData).map(([key, value]) => (
                <div key={key} style={{ marginBottom: '20px' }}>
                    <label htmlFor={key}>{labelData[key as keyof typeof formData]}</label>
                    {key !== 'fileURL' ?
                        (<input
                            type="text"
                            id={key}
                            name={key}
                            value={value}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '16px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        />) : (
                            <>
                                <input
                                    type="file"
                                    id={key}
                                    name={key}
                                    onChange={fileHandleChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        fontSize: '16px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                    }}
                                />
                            </>
                        )}
                </div>
            ))}
            <button type="submit" style={styles.submitButton}>Submit</button>
        </form>
    );
};

const styles = {
    inputGroup: {
        marginBottom: '20px',
    },
    inputField: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    submitButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    },
};
export default CarForm;