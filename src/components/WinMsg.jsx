function WinMsg({ challenger }) {
	return (
		<div
			className={`end-game-msg bg-green ${challenger}`}
			children={`${challenger} Wins! 🥇`}
		/>
	)
}

export default WinMsg
