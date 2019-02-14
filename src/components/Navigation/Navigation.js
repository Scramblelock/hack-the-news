import React from 'react';
import hackthenews from  './hackthenews.png';
import htn from './htn.png';
import './Navigation.css';

const Navigation = ({ getTopStories, reloadPage }) => {

	return (
		<div className='container'>
			<div className='smallLogoComponent'>
					<img 
						className='htn' alt='htn' src={htn} onClick={reloadPage}/> 
			</div>
			<div className='bigLogoComponent'>
				<img className='hackthenews' alt='hackthenews' src={hackthenews} />
			</div>
			<div className='navLinksComponent'>	
			</div>
		</div>
	);
};

export default Navigation;