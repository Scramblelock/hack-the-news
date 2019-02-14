import React from 'react';
import TopCommenterCard from '../TopCommenterCard/TopCommenterCard';

const TopCommenters = ({ topCommenters, isTopCommenters }) => {
	if (isTopCommenters) {
		return (
			<div>
				<h1>Top 10 Commenters</h1>
				{topCommenters.map((commenter, id) => {
	        return (
						<TopCommenterCard 
	          	key={id}
	          	name={commenter[0]}
	          	rank={commenter[1]}
	          />
	        )
	      })}
			</div>
		);
	} else {
		return (
			<div>
				<h1>Top 10 Commenters</h1>
				<p>Loading ...</p>
			</div>
		)
	}
}

export default TopCommenters;