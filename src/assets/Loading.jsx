export function LoadingBar({ placeholder = 'Loading' }) {
	return (
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M3 12a9 9 0 0 0 9 9a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9" />
				<path d="M17 12a5 5 0 1 0 -5 5" />
			</svg>
			<h2>{placeholder}</h2>
		</div>
	)
}
