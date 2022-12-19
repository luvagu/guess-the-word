export const ALPHABET = new Array(26)
	.fill(null)
	.map((_, i) => String.fromCharCode(i + 65))

export const classNames = (...classes) => classes.filter(Boolean).join(' ')

export const normalizeLatinWord = (str = '') =>
	str.normalize('NFD').replace(/\p{Diacritic}/gu, '')

export const checkWin = word =>
	word.every(({ discovered }) => discovered === true)

export const makeHeartsArray = num => new Array(num).fill('💚')

export const getRandomPlayerTurn = players =>
	players[Math.floor(Math.random() * players.length)]

export const switchPlayers = player => (player === 'red' ? 'blue' : 'red')
