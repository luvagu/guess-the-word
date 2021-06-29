function Header({ scores }) {
  return (
    <header>
				<h1>Guess The Word</h1>
				<div className='scores'>
					<span className='blue'>({scores.blue}) Blue</span>
					<span>vs</span>
					<span className='red'>Red ({scores.red})</span>
				</div>
			</header>
  )
}

export default Header
