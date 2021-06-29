function LooseMsg({ loser }) {
	return <div className={`loose-msg bg-${loser}`}>{loser} Loses!</div>
}

export default LooseMsg
