import * as React from 'react';
import Dropdown from './Dropdown';
import '../scss/sidebar.scss';

type SidebarProps = {
	handleSelection: (x: string) => void;
}

function Sidebar({ handleSelection }: SidebarProps) {

	const handleDropdownChange = (select: string) => {
		handleSelection(select);
	};

    return (
		<div className="sidebar">
            <h3>Choose Dataset</h3>
			<p>Data is generated randomly for all datasets.</p>
			<Dropdown onOptionSelect={handleDropdownChange}/>
		</div>
	);
}

export default Sidebar;