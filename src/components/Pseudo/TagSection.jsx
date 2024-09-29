export function TagSection({ tagsArray, tagName }) {
	return (
		<>
			<ul className="tagContainerSection">
				<h4>{tagName}</h4>
				{tagsArray.length > 0 &&
					tagsArray.map((tag) => {
						return (
							<li className="tagSpan" key={tag} onClick={() => console.log('Filter')}>
								{tag}
							</li>
						)
					})}
			</ul>
		</>
	)
}
