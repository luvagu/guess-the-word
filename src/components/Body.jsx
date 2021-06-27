import Head from './Head'
import Neck from './Neck'
import LeftArm from './LeftArm'
import RightArm from './RightArm'
import Torso from './Torso'

function Body() {
	return (
		<div className="body-container">
			<Head />
			<Neck />
      <LeftArm />
      <RightArm />
			{/* <Torso /> */}
		</div>
	)
}

export default Body
