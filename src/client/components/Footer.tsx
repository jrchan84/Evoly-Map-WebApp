import * as React from 'react';
import { useState, useEffect } from 'react';
import { FaGithub } from "react-icons/fa";
import '../scss/footer.scss';

function Footer() {
    return (
		<div className="footer">
            <ul className="footer-links">
                <li><p>Developed by <a target="_blank" rel="noopener noreferrer" href="https://jrchan.ca">Justin Chan</a></p></li>
                <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/jrchan84/Evoly-Map-WebApp"><FaGithub /></a></li>
            </ul>
		</div>
	);
}

export default Footer;