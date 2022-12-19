import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import Container from './components/Container'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import Body from './components/Body'
import Keyboard from './components/Keyboard'
import randomEnglishWords from 'random-words'
import randomSpanishWords from 'random-spanish-words'
import './App.css'
import SecretWord from './components/SecretWord'
import {
	getRandomPlayerTurn,
	normalizeLatinWord,
	switchPlayers,
} from './helpers'

const PLAYERS = ['red', 'blue']
const INIT_LIFES = 7

function App() {
	const [secretWord, setSecretWord] = useState('')
	const [guessedLetters, setGuessedLetters] = useState([])
	const [gameStarted, setGameStarted] = useState(false)
	const [challenger, setChallenger] = useState(getRandomPlayerTurn(PLAYERS))
	const [opponent, setOpponent] = useState(switchPlayers(challenger))
	const [scores, setScores] = useState({ red: 0, blue: 0 })
	const [error, setError] = useState(null)

	const handleSubmit = e => {
		e.preventDefault()

		if (secretWord) {
			setGameStarted(true)
		}
	}

	const getRandomWord = (lang = 'en') => {
		setError(null)

		try {
			const randomWord = normalizeLatinWord(
				(lang === 'en'
					? randomEnglishWords()
					: randomSpanishWords()
				).toUpperCase()
			)
			setSecretWord(randomWord)
			setGameStarted(true)
		} catch (error) {
			setError(
				`Error getting random "${lang}" word. Please try again or enter a word manually.`
			)
		}
	}

	const addGuessedLetters = useCallback(
		letter => {
			if (!guessedLetters.includes(letter)) {
				setGuessedLetters(currentLetters => [...currentLetters, letter])
			}
		},
		[guessedLetters]
	)

	const activeLetters = guessedLetters.filter(letter =>
		secretWord.includes(letter)
	)

	const incorrectLetters = guessedLetters.filter(
		letter => !secretWord.includes(letter)
	)

	const isLoser = incorrectLetters.length >= INIT_LIFES

	const isWinner =
		secretWord &&
		secretWord.split('').every(letter => guessedLetters.includes(letter))

	const remainigLifes = INIT_LIFES - incorrectLetters.length

	const resetGame = () => {
		setSecretWord('')
		setGuessedLetters([])
		setGameStarted(false)
		setChallenger(switchPlayers(challenger))
		setOpponent(switchPlayers(opponent))
	}

	useEffect(() => {
		if (isLoser) {
			setScores(prevScores => ({
				...prevScores,
				[opponent]: prevScores[opponent] + 1,
			}))
		}
		if (isWinner) {
			setScores(prevScores => ({
				...prevScores,
				[challenger]: prevScores[challenger] + 1,
			}))
		}
	}, [isLoser, isWinner])

	useEffect(() => {
		if (gameStarted) {
			const handler = e => {
				const key = e.key.toUpperCase()

				if (!key.match(/[A-Z]/)) return

				e.preventDefault()
				addGuessedLetters(key)
			}

			document.addEventListener('keypress', handler)

			return () => {
				document.removeEventListener('keypress', handler)
			}
		}
	}, [gameStarted])

	useEffect(() => {
		if (error) {
			const timeout = setTimeout(() => setError(null), 3000)

			return () => {
				clearTimeout(timeout)
			}
		}
	}, [error])

	return (
		<Container>
			<Header scores={scores} challenger={challenger} />
			<Sidebar>
				<Body
					challenger={challenger}
					isLoser={isLoser}
					isWinner={isWinner}
					numOfBodyPartsToShow={incorrectLetters.length}
					remainigLifes={remainigLifes}
				/>
			</Sidebar>
			<Content gap={gameStarted && '1rem'}>
				{gameStarted ? (
					<Fragment>
						<SecretWord
							guessedLetters={guessedLetters}
							reveal={isLoser}
							secretWord={secretWord}
						/>
						<Keyboard
							activeLetters={activeLetters}
							addGuessedLetters={addGuessedLetters}
							disabled={isWinner || isLoser}
							inactiveLetters={incorrectLetters}
							resetGame={resetGame}
						/>
					</Fragment>
				) : (
					<Fragment>
						<p>
							<span className={challenger}>{challenger}</span>&apos;s turn to
							guess. <span className={opponent}>{opponent}</span> must enter or
							get a random secret word.
						</p>
						<form onSubmit={handleSubmit} className='secret-word-form'>
							<input
								type='text'
								placeholder='Enter secret word'
								onChange={e =>
									setSecretWord(
										e.target.value.toUpperCase().replace(/[\W\d]/gi, '')
									)
								}
								value={secretWord}
							/>
							<button type='submit'>Save</button>
						</form>
						<p>- or -</p>
						<button
							type='button'
							onClick={() => getRandomWord('en')}
							children={'Get Random English Word'}
							disabled={!!error}
						/>
						<button
							type='button'
							onClick={() => getRandomWord('es')}
							children={'Get Random Spanish Word'}
							disabled={!!error}
						/>
						{error && (
							<p>
								<span>{error}</span>
							</p>
						)}
					</Fragment>
				)}
			</Content>
		</Container>
	)
}

export default App
