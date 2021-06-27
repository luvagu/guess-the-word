import { useState } from 'react'
import Body from './components/body-parts/Body'

function App() {
  const [bodyPartsToShow, setBodyPartsToShow] = useState(0)

	return (
		<div className='wrapper'>
			<header>
				<h1>Guess The Word</h1>
			</header>
			<aside>
        <Body numOfBodyPartsToShow={bodyPartsToShow} />
      </aside>
			<article>Main Content</article>
		</div>
	)
}

export default App
