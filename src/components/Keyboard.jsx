import { ALPHABET, classNames } from '../helpers'

function Keyboard({
	activeLetters,
	addGuessedLetters,
	disabled = false,
	inactiveLetters,
	resetGame,
}) {
	return (
		<div className='keyboard'>
			{ALPHABET.map(letter => {
				const isActive = activeLetters.includes(letter)
				const isInactive = inactiveLetters.includes(letter)

				return (
					<button
						key={letter}
						className={classNames(
							'kbtn',
							isActive && 'active',
							isInactive && 'inactive'
						)}
						disabled={isActive || isInactive || disabled}
						onClick={() => addGuessedLetters(letter)}
						children={letter}
					/>
				)
			})}
			<button
				className={classNames('kbtn', disabled ? 'reset' : 'inactive')}
				disabled={!disabled}
				onClick={resetGame}
				children={'🔄'}
			/>
		</div>
	)
}

export default Keyboard
