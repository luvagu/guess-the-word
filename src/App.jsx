import { useEffect, useRef, useState } from 'react'
import Body from './components/body-parts/Body'

const checkWin = word => word.every(({ discovered }) => discovered === true)

function App() {
	const [remainigLifes, setRemainigLifes] = useState(7)
	const [bodyPartsToShow, setBodyPartsToShow] = useState(0)
	const [secretWord, setSecretWord] = useState('')
	const [splitSecretWord, setSplitSecretWord] = useState([])
	const [gameStarted, setGameStarted] = useState(false)
	const [prevGuesses, setPrevGuesses] = useState('')

	const letterInput = useRef()

	const handleSubmit = e => {
		e.preventDefault()

		if (secretWord) {
			const splitWord = secretWord
				.split('')
				.map(letter => ({ letter, discovered: false }))
			setSplitSecretWord(splitWord)
			setGameStarted(true)
		}
	}

	const checkInSecretWord = e => {
		const letter = e.target.value.toLowerCase()
		letterInput.current.blur()
		if (secretWord.includes(letter)) {
			const newSplitSecretWord = [...splitSecretWord].map(obj => {
				if (obj.letter === letter) obj.discovered = true
				return obj
			})
			setSplitSecretWord(newSplitSecretWord)
			if (checkWin(splitSecretWord)) {
				console.log("it's a win")
			}
		} else {
			setRemainigLifes(remainigLifes - 1)
			setBodyPartsToShow(bodyPartsToShow + 1)
			const wrongLetters =
				prevGuesses.length > 0 ? `${prevGuesses}-${letter}` : letter
			setPrevGuesses(wrongLetters)
		}
	}

	useEffect(() => {
		if (splitSecretWord.length) {
			letterInput.current.focus()
		}
	}, [splitSecretWord])

	return (
		<div className='wrapper'>
			<header>
				<h1>Guess The Word</h1>
				<div className='scores'>
					<span className='blue'>0 Blue</span>
          <span>vs</span>
					<span className='red'>Red 0</span>
				</div>
			</header>
			<aside>
				<Body numOfBodyPartsToShow={bodyPartsToShow} />
			</aside>
			<article>
				{gameStarted ? (
					<>
						<div className='secret-word'>
							{splitSecretWord.map(({ letter, discovered }, idx) => (
								<div key={idx} className='secret-letter'>
									{discovered ? letter : <span className='red'>?</span>}
								</div>
							))}
						</div>
						<div className='letter-input'>
							<input
								ref={letterInput}
								type='text'
								maxLength='1'
								placeholder='Guess letter'
								onChange={checkInSecretWord}
							/>
							<p>Lifes left: {remainigLifes}</p>
							{prevGuesses && (
								<p>
									Wrong guesses: <span>{prevGuesses}</span>
								</p>
							)}
						</div>
					</>
				) : (
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							placeholder='Enter word to guess'
							onChange={e => setSecretWord(e.target.value.toLowerCase())}
						/>
						<button type='submit'>Save</button>
					</form>
				)}
			</article>
		</div>
	)
}

export default App
