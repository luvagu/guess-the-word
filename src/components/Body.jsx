import Head from './Head'
import Neck from './Neck'
import Torso from './Torso'

function Body() {
	return (
		<div className="body-container">
			<Head />
			<Neck />
			<Torso />
		</div>
	)
}

export default Body
