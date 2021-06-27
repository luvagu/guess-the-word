import Hanger from '../Hanger'
import Head from './Head'
import Neck from './Neck'
import LeftArm from './LeftArm'
import RightArm from './RightArm'
import Torso from './Torso'
import LeftLeg from './LeftLeg'
import RightLeg from './RightLeg'
import LooseMsg from '../LooseMsg'

function Body({ numOfBodyPartsToShow = 0 }) {
	const bodyParts = [
		<Head />,
		<Neck />,
		<LeftArm />,
		<RightArm />,
		<Torso />,
		<LeftLeg />,
		<RightLeg />,
	]
	
	return (
		<div className='body-container'>
			<Hanger />
			{numOfBodyPartsToShow > 0 && bodyParts.slice(0, numOfBodyPartsToShow)}
			{numOfBodyPartsToShow === 7 && <LooseMsg />}
		</div>
	)
}

export default Body
