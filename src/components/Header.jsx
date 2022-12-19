function Header({ scores, challenger }) {
	const className = color =>
		challenger === color ? `${color} bg-turn-${challenger}` : color

	return (
		<header>
			<h1>Guess The Word</h1>
			<div className='scores'>
				<span className={className('blue')}>({scores.blue}) Blue</span>
				<span>vs</span>
				<span className={className('red')}>Red ({scores.red})</span>
			</div>
		</header>
	)
}

export default Header
