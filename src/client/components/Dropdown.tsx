import React, { useState, useEffect, ChangeEvent } from "react";
import { getDatasets } from '../api/dataset';
import '../scss/dropdown.scss';

function Dropdown() {
    const [datasets, setDatasets] = useState([]);

    useEffect(() => {
        getDatasets().then((data) => setDatasets(data));
    }, []);

    const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        if (selectedId) {
            console.log(selectedId);
        }
    };

    return (
        <div className="select">
            <select id="dropdown" defaultValue="" onChange={handleSelect}>
            <option value="" disabled hidden>Select an option</option>
                {datasets.map((dataset) => (
                    <option key={dataset} value={dataset}>
                        {dataset}
                    </option>
                ))}
            </select>
            <div className="select-arrow">
            </div>
        </div>
    );
}

export default Dropdown;