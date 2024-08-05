// 删除cookie，name有值时删除指定cookie，反之删除所有cookie
export const clearCookie = (name?: string) => {
	if (name) {
		const exp = new Date()
		exp.setTime(exp.getTime() + -1 * 24 * 60 * 60 * 1000)
		const cval = getCookie(name)
		document.cookie = name + '=' + cval + '; expires=' + exp.toUTCString()
	} else {
		const keys = document.cookie.match(/[^ =;]+(?=\=)/g)
		if (keys) {
			for (var i = keys.length; i--; ) document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
		}
	}
}

const getCookie = (name: string) => {
	let cookieValue = ''
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';')
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i].trim()
			if (cookie.substring(0, name.length + 1) == name + '=') {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
				break
			}
		}
	}
	return cookieValue
}
