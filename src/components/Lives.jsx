import { makeHeartsArray } from '../helpers'

function Lives({ remainigLifes }) {
	return (
		<div className='lives'>
			{makeHeartsArray(remainigLifes).map((heart, idx) => (
				<span key={idx}>{heart}</span>
			))}
		</div>
	)
}

export default Lives
