/**
 * 获取url中的查询字符串参数
 * @param {String} url  url字符串
 */
export const getURLParams = (url: string) => {
	const search = url.split('?')[1]
	if (!search) {
		return {}
	}
	return JSON.parse(
		'{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
	)
}
