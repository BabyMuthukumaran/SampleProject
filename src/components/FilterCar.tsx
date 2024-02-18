import React, { useState, useEffect, memo } from 'react';
import { brandDetail, CarItem } from '../Interface/CarModel';
import { useSelector, useDispatch } from "react-redux";
import { getAllCarItemAsync } from "../slices/reducer";
import { AppDispatch, RootState } from '../store';



const FilterCar: React.FC = () => {
    const responseData = useSelector((state: RootState) => state.cars.carItems);

    const dispatch = useDispatch<AppDispatch>();
    const [data, setData] = useState<CarItem[]>([]);
    const [fileUrls, setFileUrls] = useState<string[]>([]);
    const [modelData, setModelData] = useState<string[]>([]);
    const [filterScenario, setFilterScenario] = useState<brandDetail>({
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

    useEffect(() => {


        return () => {
           
            setFileUrls([])
            setModelData([]);
        }
    }, []);

    useEffect(() => {
        dispatch(getAllCarItemAsync());
    }, [dispatch]);

    useEffect(() => {

        const removeEmptyString = Object.entries(filterScenario).filter(([, value]) => value !== '');

        const filteredItems = responseData.filter(item => {

            const allConditionsTrue = removeEmptyString.length > 0 && removeEmptyString.every(([key]) => {
                return filterScenario[key as keyof typeof filterScenario].toLowerCase() === item.items[key as keyof typeof filterScenario].toLowerCase();
            });
            const allmodelCondtionsTrue = modelData.length > 0 && modelData.some(element => {
                return element === item.items.model.toLowerCase();
            });
            return (removeEmptyString.length > 0 && modelData.length > 0) ? (allmodelCondtionsTrue && allConditionsTrue) : (allConditionsTrue || allmodelCondtionsTrue);
        });
        console.log(filteredItems);
        const fileURLs: string[] = filteredItems.map((item: CarItem) => item.items.fileURL);
        setFileUrls(fileURLs)
    }, [filterScenario, modelData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "model") {
            if ((e.target as HTMLInputElement).checked === false && modelData.includes(value)) {
                setModelData(modelData.filter(item => item != value));
            }
            else if ((e.target as HTMLInputElement).checked === true) {
                setModelData(prevState => ([
                    ...prevState,
                    value
                ]))
            }
        }
        else {
            setFilterScenario(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilterScenario(prevState => ({
            ...prevState,
            'location': value
        }));
    };


    const splitDataIntoCollections = (field: string): string[][] => {
        const collection: string[][] = [];
        responseData !== null && responseData.length > 0 && responseData.forEach((car: any, index) => {
            const fieldValue = car.items[field].toLowerCase();
            if (fieldValue != "" && !collection.some(subArray => Array.isArray(subArray) && subArray.includes(fieldValue)) && !collection[index]) {
                collection[index] = [];
                collection[index].push(fieldValue);
            }
        });
        return collection;
    };

    return (
        <div>
            <h4>Location</h4>
            <select onChange={handleLocationChange}>
                <option value="">Select a Location</option>
                {splitDataIntoCollections('location').map((value, index) =>
                (
                    <option key={index} value={value}>{value}</option>
                )
                )}
            </select>

            <h4>Models</h4>
            {splitDataIntoCollections('model').map((value, index) =>
            (
                <div key={index}>
                    <input
                        type="checkbox"
                        id={index.toString()}
                        name="model"
                        value={value}
                        onChange={handleChange}
                    />
                    <label htmlFor="model">{value}</label>
                </div>
            )
            )}
            <h4>Owners</h4>
            {splitDataIntoCollections('owners').map((value, index) =>
            (
                <div key={index}>
                    <input
                        type="radio"
                        id={index.toString()}
                        name="owners"
                        value={value}
                        onChange={handleChange}
                    />
                    <label htmlFor="owners">{value}</label>
                </div>
            )
            )}
            <h4>Fuel Type</h4>
            {splitDataIntoCollections('fuelType').map((value, index) =>
            (
                <div key={index}>
                    <input
                        type="radio"
                        id={index.toString()}
                        name="fuelType"
                        value={value}
                        onChange={handleChange}
                    />
                    <label htmlFor="fuelType">{value}</label>
                </div>
            )
            )}
            <h4>Transmission</h4>
            {splitDataIntoCollections('transmission').map((value, index) =>
            (
                <div key={index}>
                    <input
                        type="radio"
                        id={index.toString()}
                        name="transmission"
                        value={value}
                        onChange={handleChange}
                    />
                    <label htmlFor="transmission">{value}</label>
                </div>
            )
            )}


            {fileUrls.length > 0 && <> <h3>Filtered Result</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {fileUrls.map((fileUrl, index) => (
                        <div key={index} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px', width: '300px' }}>
                            <img src={fileUrl} style={{ width: '100%', height: 'auto' }} />
                        </div>
                    ))}
                </div>
            </>
            }
        </div>
    );
};

export default FilterCar;
