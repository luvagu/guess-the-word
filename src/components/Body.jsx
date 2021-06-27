import Head from './Head'
import Neck from './Neck'
import LeftArm from './LeftArm'
import Torso from './Torso'

function Body() {
	return (
		<div className="body-container">
			<Head />
			<Neck />
      <LeftArm />
			{/* <Torso /> */}
		</div>
	)
}

export default Body
