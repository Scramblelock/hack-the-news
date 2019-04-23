import React from 'react';
import './StoryCard.css';

const StoryCard = ({ story }) => {
	return (
		<div className='storyBox'>
			<h3>{story}</h3>
		</div>
	);
};

export default StoryCard;