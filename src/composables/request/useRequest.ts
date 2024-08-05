import _ from 'lodash'
import { baseURL, storagePrefix } from '~/config/domain'
import message from '~/utils/message'

const baseOptions = {
	headers: {},
}

const fetch = $fetch.create({
	headers: {
		...baseOptions.headers,
	},

	// 请求拦截器
	onRequest({ options }) {
		const appStore = useAppStore()
		options.baseURL = baseURL
		const tokenCookie: any = useCookie(`${storagePrefix}APPSTORE_TOKEN`).value
		options.headers = new Headers(options.headers)
		if (tokenCookie && tokenCookie.token) {
			options.headers.set('Authorization', `Bearer ${tokenCookie.token}`)
		}
		options.headers.set('Accept-Language', appStore.lang == 'zh' ? 'zh-CN,zh' : 'en-US,en')
	},

	// 请求错误处理
	onRequestError(error) {
		message.error('请求失败')
		return Promise.reject(error)
	},

	// 响应拦截器
	onResponse({ response }) {
		const { code = 200, body, message: messageText } = response._data
		switch (code) {
			case 200:
				return Promise.resolve(body || response._data)
			case 401:
				message.error(messageText || '无权限')
				const appStore = useAppStore()
				appStore.logout(false)
				return Promise.reject(response._data)
			default:
				if (message) message.error(messageText || '响应失败')
				return Promise.reject(response._data)
		}
	},

	// 响应错误处理
	onResponseError(error) {
		const requestData: any = _.get(error, 'response.data')
		if (requestData instanceof Blob) {
			let reader = new FileReader()
			reader.onload = function () {
				try {
					if (typeof reader.result !== 'string') return
					const result = JSON.parse(reader.result)
					const { message } = result
					message.error(message)
					return Promise.reject(result)
				} catch (error) {}
			}
			reader.readAsText(requestData)
		} else {
			message.error('响应失败')
		}
		return Promise.reject(error)
	},
})

export const useRequest = {
	// get请求
	get: (url: string, data?: {}, config?: {}) => {
		return fetch(url, { method: 'GET', params: data, ...config })
	},

	// post请求
	post: (url: string, data?: {}, config?: {}) => {
		return fetch(url, { method: 'POST', body: { ...data }, ...config })
	},

	// put请求
	put: (url: string, data?: {}, config?: {}) => {
		return fetch(url, { method: 'PUT', body: { ...data }, ...config })
	},

	// delete请求
	delete: (url: string, data?: {}, config?: {}) => {
		return fetch(url, { method: 'DELETE', params: data, ...config })
	},

	// postOnly 请求
	postOnly: (url: string, data?: {}, config?: {}) => {
		return fetch(url, { method: 'POST', params: data, ...config })
	},

	// 设置请求头
	setHeader: (headers?: {}) => {
		baseOptions.headers = { ...baseOptions.headers, ...headers }
	},
}
