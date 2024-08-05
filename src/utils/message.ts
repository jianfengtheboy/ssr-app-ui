import { h, AppContext, isVNode } from 'vue'
import { ElMessage, MessageParams, ElMessageBox } from 'element-plus'
import IconLoading from '~icons/custom/loading'

const info = (options?: MessageParams, appContext?: AppContext | null) => {
	ElMessage.closeAll()
	return ElMessage.info(options, appContext)
}

const success = (options?: MessageParams, appContext?: AppContext | null) => {
	ElMessage.closeAll()
	return ElMessage.success(options || '操作成功', appContext)
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
		await ElMessageBox.confirm(title, '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
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
