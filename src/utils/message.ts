import { h, AppContext, isVNode } from 'vue'
import { ElMessage, MessageParams, ElMessageBox } from 'element-plus'
import IconLoading from '~icons/custom/loading'
import { storagePrefix } from '~/config/domain'
import { getCurrentLanguage } from '@/utils/common'

// 获取localStorage中缓存的语言设置
const getStoreLang = () => {
	let store: any = useCookie(`${storagePrefix}APPSTORE_LANGUAGE`).value
	if (store) {
		return store.lang
	}
	return ''
}

const info = (options?: MessageParams, appContext?: AppContext | null) => {
	ElMessage.closeAll()
	return ElMessage.info(options, appContext)
}

const success = (options?: MessageParams, appContext?: AppContext | null) => {
	ElMessage.closeAll()
	const lang = getStoreLang() || getCurrentLanguage()
	const defaultMessage = lang === 'zh' ? '操作成功!' : 'Operation succeeded!'
	return ElMessage.success(options || defaultMessage, appContext)
}

const warning = (options?: MessageParams, appContext?: AppContext | null) => {
	ElMessage.closeAll()
	return ElMessage.warning(options, appContext)
}

const error = (options?: MessageParams, appContext?: AppContext | null) => {
	ElMessage.closeAll()
	return ElMessage.error(options, appContext)
}

const loading = (options?: MessageParams, appContext?: AppContext | null) => {
	ElMessage.closeAll()
	let params: MessageParams | undefined = undefined
	if (typeof options === 'string' || isVNode(options)) {
		params = {
			message: options,
		}
	} else {
		params = options
	}

	return ElMessage(
		{
			icon: h(IconLoading, { spin: true }),
			...params,
		},
		appContext
	)
}

const confirm = async function (title, type: any = 'warning') {
	try {
		const lang = getStoreLang() || getCurrentLanguage()
		await ElMessageBox.confirm(title, lang === 'zh' ? '提示' : 'Tip', {
			confirmButtonText: lang === 'zh' ? '确定' : 'confirm',
			cancelButtonText: lang === 'zh' ? '取消' : 'cancel',
			type,
		})
		return Promise.resolve()
	} catch (error) {
		return Promise.reject()
	}
}

export default {
	info,
	success,
	warning,
	error,
	loading,
	confirm,
}
