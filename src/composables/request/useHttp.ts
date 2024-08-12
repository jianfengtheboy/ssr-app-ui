/**
 * 基于useFetch请求的同一封装
 * @param { url, method, serverURL, options }
 * @param url: 接口
 * @param method: 请求方法，默认为 post
 * @param serverURL: 请求的 baseURL
 * @param options: 参数集合 { query, params, body, headers, key, server, pick, watch, transform, immediate }，具体可参考：https://nuxt.com/docs/api/composables/use-fetch
 * @return
 * 注意：options参数中，key 建议在页面请求时建议都配置一个独一无二的值，否则会出现 相同接口应用于不同页面时，数据发生混乱的问题
 */
import { baseURL, storagePrefix } from '~/config/domain'
import message from '~/utils/message'

const enum MethodEnum {
	Get = 'GET',
	Post = 'POST',
}

export const useHttp = (requestParams?: any): Promise<any> => {
	return new Promise((resolve, reject) => {
		const appStore = useAppStore()
		const tokenCookie: any = useCookie(`${storagePrefix}APPSTORE_TOKEN`).value
		const baseHeaders =
			tokenCookie && tokenCookie.token
				? {
						Authorization: tokenCookie.token,
						'Accept-Language': appStore.lang == 'zh' ? 'zh-CN,zh' : 'en-US,en',
				  }
				: {
						'Accept-Language': appStore.lang == 'zh' ? 'zh-CN,zh' : 'en-US,en',
				  }

		useFetch(requestParams.url, {
			key: requestParams?.key || `${new Date().valueOf()}`,
			baseURL,
			method: requestParams.method || MethodEnum.Post,
			headers: {
				...baseHeaders,
			},
			...requestParams,
		})
			.then(({ data, pending, refresh, execute, error }) => {
				if (error.value) {
					message.error('响应失败' || error.value)
					return reject(error.value)
				}
				const { code = 200, body, message: messageText } = data.value as any
				switch (code) {
					case 200:
						return resolve(body || data.value)
					case 401:
						message.warning(messageText || '无权限')
						const appStore = useAppStore()
						appStore.logout(false)
						return reject(data.value)
					default:
						if (messageText) message.error(messageText || '响应失败')
						return reject(data.value)
				}
			})
			.catch(err => {
				message.error('请求失败' || err)
				return reject(err)
			})
	})
}
