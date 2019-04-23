import React from 'react';
import './TopCommenterCard.css';

const TopCommenterCard = ({ name, rank }) => {
	return (
		<div className='commenterBox'>
			<h3>{name}</h3>
			<p>Comments posted: {rank}</p>
		</div>
	);
};

export default TopCommenterCard;