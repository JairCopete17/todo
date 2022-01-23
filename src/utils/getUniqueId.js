export default function getUniqueId () {
	let uid = Math.random().toString(36).slice(2)
	return uid
}