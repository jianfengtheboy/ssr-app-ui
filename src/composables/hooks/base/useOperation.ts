import { ref } from 'vue'
import type { ElForm } from 'element-plus'

type ElFormInstance = InstanceType<typeof ElForm>

/**
 * 通用弹框操作
 */
export const useOperation = () => {
	const visible = ref(false)
	// 表单
	const formRef = ref<ElFormInstance>()
	// 取消操作
	const handleCancel = (callback?: Function) => {
		visible.value = false
		callback && callback()
	}
	// 关闭弹框之后触发
	const handleClosed = (callback?: Function) => {
		formRef.value?.resetFields() // 不在handleCancel调用，是因为不希望让客户看到数据销毁的过程
		callback && callback()
	}

	return { visible, formRef, handleCancel, handleClosed }
}
