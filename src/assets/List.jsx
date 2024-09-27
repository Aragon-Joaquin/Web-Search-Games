export function List({ classCSS, onClickFunction }) {
	return (
		<svg
			onClick={onClickFunction ? onClickFunction : ''}
			className={classCSS}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M4 3h16" />
			<path d="M4 9h16" />
			<path d="M4 15h16" />
			<path d="M4 21h16" />
		</svg>
	)
}
