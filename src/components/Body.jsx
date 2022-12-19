import Hanger from './Hanger'
import Head from './body-parts/Head'
import Neck from './body-parts/Neck'
import LeftArm from './body-parts/LeftArm'
import RightArm from './body-parts/RightArm'
import Torso from './body-parts/Torso'
import LeftLeg from './body-parts/LeftLeg'
import RightLeg from './body-parts/RightLeg'
import LoseMsg from './LoseMsg'
import WinMsg from './WinMsg'
import Lives from './Lives'

const bodyParts = [
	<Head key='Head' />,
	<Neck key='Neck' />,
	<LeftArm key='LeftArm' />,
	<RightArm key='RightArm' />,
	<Torso key='Torso' />,
	<LeftLeg key='LeftLeg' />,
	<RightLeg key='RightLeg' />,
]

function Body({
	challenger,
	isLoser,
	isWinner,
	numOfBodyPartsToShow,
	remainigLifes,
}) {
	const body = bodyParts.slice(0, numOfBodyPartsToShow)

	return (
		<div className='body-container'>
			<Hanger />
			{body}
			{isLoser && <LoseMsg challenger={challenger} />}
			{isWinner && <WinMsg challenger={challenger} />}
			<Lives remainigLifes={remainigLifes} />
		</div>
	)
}

export default Body
