import { Fragment, useEffect, useRef, useState } from 'react'
import Container from './components/Container'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import Body from './components/Body'

const PLAYERS = ['red', 'blue']
const INIT_LIFES = 7

const splitWordCovertToObject = word =>
	word.split('').map(letter => ({ letter, discovered: false }))

const checkWin = word => word.every(({ discovered }) => discovered === true)

const makeHeartsArray = num => new Array(num).fill('💖')

const getRandomPlayerTurn = () =>
	PLAYERS[Math.floor(Math.random() * PLAYERS.length)]

const switchTurns = currentTurn => (currentTurn === 'red' ? 'blue' : 'red')

function App() {
	const [remainigLifes, setRemainigLifes] = useState(INIT_LIFES)
	const [bodyPartsToShow, setBodyPartsToShow] = useState(0)
	const [secretWord, setSecretWord] = useState('')
	const [splitSecretWord, setSplitSecretWord] = useState([])
	const [clue, setClue] = useState('')
	const [gameStarted, setGameStarted] = useState(false)
	const [roundEnded, setRoundEnded] = useState(false)
	const [prevGuesses, setPrevGuesses] = useState('')
	const [challenger, setChallenger] = useState(getRandomPlayerTurn())
	const [opponent, setOpponent] = useState(switchTurns(challenger))
	const [winner, setWinner] = useState('')
	const [scores, setScores] = useState({ red: 0, blue: 0 })
	const [apiStatus, setApiStatus] = useState({ loading: false, error: false })

	const letterInput = useRef()

	const handleSubmit = e => {
		e.preventDefault()

		if (secretWord) {
			setSplitSecretWord(splitWordCovertToObject(secretWord))
			setGameStarted(true)
		}
	}

	const getRandomWord = async () => {
		setApiStatus(prevStatus => ({ ...prevStatus, loading: true }))
		try {
			const API_URL = 'https://san-random-words.vercel.app/'
			const response = await fetch(API_URL)
			const data = await response.json()
			const { word, definition } = data[0]
			setSecretWord(word.toLowerCase())
			setSplitSecretWord(splitWordCovertToObject(word.toLowerCase()))
			setClue(definition)
			setGameStarted(true)
		} catch (error) {
			console.log(error.message)
			setApiStatus(prevStatus => ({
				...prevStatus,
				error:
					'Error loading random word. Please try again or enter word manually.',
			}))
		}
		setApiStatus(prevStatus => ({ ...prevStatus, loading: false }))
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
		setRemainigLifes(INIT_LIFES)
		setBodyPartsToShow(0)
		setPrevGuesses('')
		setChallenger(switchTurns(challenger))
		setOpponent(switchTurns(opponent))
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
		<Container>
			<Header scores={scores} />
			<Sidebar>
				<Body numOfBodyPartsToShow={bodyPartsToShow} />
			</Sidebar>
			<Content>
				{gameStarted ? (
					<Fragment>
						<div className='secret-word'>
							{splitSecretWord.map(({ letter, discovered }, idx) => (
								<div key={idx} className='secret-letter'>
									{discovered ? letter : <span className='red'>?</span>}
								</div>
							))}
						</div>
						<div className='letter-input'>
							{roundEnded ? (
								<Fragment>
									<p>
										<span className={winner}>{winner}</span> wins! 🥇
									</p>
									{winner === challenger && (
										<p>
											Secret word was: <span>{secretWord}</span>
										</p>
									)}
									<button type='button' onClick={resetGame}>
										Start New Round
									</button>
								</Fragment>
							) : (
								<Fragment>
									<input
										ref={letterInput}
										type='text'
										maxLength='1'
										placeholder='Enter guess'
										onChange={checkInSecretWord}
										onClick={e => (e.target.value = '')}
									/>
									<p>
										<span className={opponent}>{opponent}</span>'s lifes:{' '}
										{makeHeartsArray(remainigLifes).map((heart, idx) => (
											<span key={idx}>{heart}</span>
										))}
									</p>
									{clue && (
										<p>
											💡 Here is a clue: <span className='clue'>{clue}</span>
										</p>
									)}
									{prevGuesses && (
										<p>
											Wrong guesses: <span>{prevGuesses}</span>
										</p>
									)}
								</Fragment>
							)}
						</div>
					</Fragment>
				) : (
					<Fragment>
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
						<p>or</p>
						<button
							type='button'
							onClick={getRandomWord}
							disabled={apiStatus.loading}
						>
							{apiStatus.loading ? 'Loading...' : 'Get Random Secret Word'}
						</button>
						{apiStatus.error && (
							<p>
								<br />
								<span>{apiStatus.error}</span>
							</p>
						)}
					</Fragment>
				)}
			</Content>
		</Container>
	)
}

export default App
