function SecretWord({ guessedLetters, reveal, secretWord }) {
	return (
		<div className='secret-word'>
			{secretWord.split('').map((letter, idx) => {
				const showLetter = guessedLetters.includes(letter)
				const className = !showLetter ? 'red' : ''
				const characterToShow = !showLetter && !reveal ? '?' : letter

				return (
					<div key={idx} className='secret-letter'>
						<span className={className}>{characterToShow}</span>
					</div>
				)
			})}
		</div>
	)
}

export default SecretWord
