import Hanger from './Hanger'
import Head from './body-parts/Head'
import Neck from './body-parts/Neck'
import LeftArm from './body-parts/LeftArm'
import RightArm from './body-parts/RightArm'
import Torso from './body-parts/Torso'
import LeftLeg from './body-parts/LeftLeg'
import RightLeg from './body-parts/RightLeg'
import LoseMsg from './LoseMsg'

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
