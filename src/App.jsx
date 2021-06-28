import { useEffect, useRef, useState } from 'react'
import Body from './components/body-parts/Body'

function App() {
	const [faults, setFaults] = useState(0)
	const [bodyPartsToShow, setBodyPartsToShow] = useState(faults)
	const [asserts, setAsserts] = useState([])
	const [secretWord, setSecretWord] = useState('')
	const [splitSecretWord, setSplitSecretWord] = useState([])
	const [gameStarted, setGameStarted] = useState(false)
  const [remainigLifes, setremainigLifes] = useState(7)

	const letterInput = useRef()

	const handleSubmit = e => {
		e.preventDefault()

		if (secretWord) {
			setSplitSecretWord(
				secretWord.split('').map(letter => ({ letter, discovered: false }))
			)
			setGameStarted(true)
		}
	}

	const checkInSecretWord = () => {}

	console.log(splitSecretWord)

	useEffect(() => {
		if (splitSecretWord.length) {
			letterInput.current.focus()
		}
	}, [splitSecretWord])

	return (
		<div className='wrapper'>
			<header>
				<h1>Guess The Word</h1>
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
									{discovered ? letter : '?'}
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
