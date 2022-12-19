function LooseMsg({ challenger }) {
	return (
		<div
			className={`end-game-msg bg-${challenger}`}
			children={`${challenger} Loses! 😞`}
		/>
	)
}

export default LooseMsg
