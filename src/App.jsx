import { useEffect, useRef, useState } from 'react'
import Body from './components/body-parts/Body'

const checkWin = word => word.every(({ discovered }) => discovered === true)

const PLAYERS = ['red', 'blue']

const getRandomPlayerTurn = () => {
	return PLAYERS[Math.floor(Math.random() * PLAYERS.length)]
}

function App() {
	const [remainigLifes, setRemainigLifes] = useState(7)
	const [bodyPartsToShow, setBodyPartsToShow] = useState(0)
	const [secretWord, setSecretWord] = useState('')
	const [splitSecretWord, setSplitSecretWord] = useState([])
	const [gameStarted, setGameStarted] = useState(false)
	const [roundEnded, setRoundEnded] = useState(false)
	const [prevGuesses, setPrevGuesses] = useState('')
	const [challenger, setChallenger] = useState(getRandomPlayerTurn())
	const [opponent, setOpponent] = useState(
		challenger === 'red' ? 'blue' : 'red'
	)
	const [winner, setWinner] = useState('')
	const [scores, setScores] = useState({ red: 0, blue: 0 })

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
				const winnerScore = scores[opponent] + 1
				setScores({ ...scores, [opponent]: winnerScore })
				setRoundEnded(true)
				setWinner(opponent)
			}
		} else {
			setRemainigLifes(remainigLifes - 1)
			setBodyPartsToShow(bodyPartsToShow + 1)
			const wrongLetters =
				prevGuesses.length > 0 ? `${prevGuesses}-${letter}` : letter
			setPrevGuesses(wrongLetters)
		}
	}

	const resetGame = () => {
		setGameStarted(false)
		setRoundEnded(false)
		setRemainigLifes(7)
		setBodyPartsToShow(0)
		setPrevGuesses('')
		setChallenger(challenger === 'red' ? 'blue' : 'red')
		setOpponent(opponent === 'red' ? 'blue' : 'red')
	}

	useEffect(() => {
		if (remainigLifes === 0) {
			setRoundEnded(true)
			setWinner(challenger)
			setScores(prevScores => ({
				...prevScores,
				[challenger]: prevScores[challenger] + 1,
			}))
		}
	}, [remainigLifes, challenger])

	return (
		<div className='wrapper'>
			<header>
				<h1>Guess The Word</h1>
				<div className='scores'>
					<span className='blue'>{scores.blue} Blue</span>
					<span>vs</span>
					<span className='red'>Red {scores.red}</span>
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
							{roundEnded ? (
								<>
									<p>
										<span className={winner}>{winner}</span> wins!
									</p>
									{winner === challenger && (
										<p>
											Secret word was: <span>{secretWord}</span>
										</p>
									)}
									<button type='button' onClick={resetGame}>
										Start New Round
									</button>
								</>
							) : (
								<input
									ref={letterInput}
									type='text'
									maxLength='1'
									placeholder='Enter guess'
									onChange={checkInSecretWord}
									onClick={e => (e.target.value = '')}
								/>
							)}
							<p>
								<span className={opponent}>{opponent}</span>'s lifes left:{' '}
								{remainigLifes}
							</p>
							{prevGuesses && (
								<p>
									Wrong guesses: <span>{prevGuesses}</span>
								</p>
							)}
						</div>
					</>
				) : (
					<>
						<p>
							It&apos;s <span className={challenger}>{challenger}</span>&apos;s
							turn to challenge <span className={opponent}>{opponent}</span>!
						</p>
						<form onSubmit={handleSubmit}>
							<input
								type='text'
								placeholder='Enter secret word'
								onChange={e => setSecretWord(e.target.value.toLowerCase())}
							/>
							<button type='submit'>Save</button>
						</form>
					</>
				)}
			</article>
		</div>
	)
}

export default App
