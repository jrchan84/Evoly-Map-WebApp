import * as React from 'react';
import { useState, useEffect } from 'react';
import '../scss/header.scss';

function Header() {
    return (
		<div className="header">
			<div className="title">
				<h1>Map Visualization</h1>
			</div>
		</div>
	);
}

export default Header;