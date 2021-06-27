import Body from './components/body-parts/Body'

function App() {
	return (
		<div className='wrapper'>
			<header>
				<h1>Guess The Word</h1>
			</header>
			<aside>
        <Body />
      </aside>
			<article>Main Content</article>
		</div>
	)
}

export default App
