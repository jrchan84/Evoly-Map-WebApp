import * as React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Map from './Map';
import '../scss/hero.scss';

function Hero() {
    return (
        <div className="hero">
            <Sidebar/>
            <Map/>
        </div>
    );
}

export default Hero;