import * as React from 'react';
import { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import '../scss/sidebar.scss';

function Sidebar() {
    return (
		<div className="sidebar">
            <h3>Choose Dataset</h3>
			<p>Data is generated randomly for all datasets.</p>
			<Dropdown/>
		</div>
	);
}

export default Sidebar;