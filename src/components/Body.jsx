import Hanger from './Hanger'
import Head from './Head'
import Neck from './Neck'
import LeftArm from './LeftArm'
import RightArm from './RightArm'
import Torso from './Torso'
import LeftLeg from './LeftLeg'
import RightLeg from './RightLeg'
import LooseMsg from './LooseMsg'

function Body() {
	return (
		<div className="body-container">
      <Hanger />
			<Head />
			<Neck />
      <LeftArm />
      <RightArm />
			<Torso />
      <LeftLeg />
      <RightLeg />
      <LooseMsg />
		</div>
	)
}

export default Body
