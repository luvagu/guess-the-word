import Hanger from '../Hanger'
import Head from './Head'
import Neck from './Neck'
import LeftArm from './LeftArm'
import RightArm from './RightArm'
import Torso from './Torso'
import LeftLeg from './LeftLeg'
import RightLeg from './RightLeg'
import LoseMsg from '../LoseMsg'

function Body({ numOfBodyPartsToShow }) {
	const bodyParts = [
		<Head key='Head' />,
		<Neck key='Neck' />,
		<LeftArm key='LeftArm' />,
		<RightArm key='RightArm' />,
		<Torso key='Torso' />,
		<LeftLeg key='LeftLeg' />,
		<RightLeg key='RightLeg' />,
	]
	
	return (
		<div className='body-container'>
			<Hanger />
			{numOfBodyPartsToShow > 0 && bodyParts.slice(0, numOfBodyPartsToShow)}
			{numOfBodyPartsToShow === 7 && <LoseMsg />}
		</div>
	)
}

export default Body
