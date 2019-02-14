import React from 'react';
import StoryCard from '../StoryCard/StoryCard';

const TopStories = ({ stories, isStories }) => {
	if (isStories) {
		return (
			<div>
				<h1>Top 30 Stories</h1>
				{stories.map((story, id) => {
          return (
						<StoryCard 
            	key={id}
            	story={story}
            />
          )
        })}
			</div>
		);
	} else {
			return ( 
				<div>
					<h1>Top 30 Stories</h1>
					<p>Loading ... </p>
				</div> 
			);
		}
}

export default TopStories;