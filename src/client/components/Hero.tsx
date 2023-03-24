import * as React from 'react';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Map from './Map';
import '../scss/hero.scss';

function Hero() {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleSelection = (option: string) => {
        setSelectedOption(option);
    };

    return (
        <div className="hero">
            <Sidebar handleSelection={handleSelection}/>
            <Map selectedOption={selectedOption}/>
        </div>
    );
}

export default Hero;