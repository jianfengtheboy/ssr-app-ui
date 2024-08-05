import { h, render } from 'vue'
import BaseConfirm from '~/components/base/BaseConfirm.vue'

interface IOptions<T> {
	type: Status
	confirmType: string
	title: string
	message: string | ((data: T) => void)
	description: string | ((data: T) => void)
	confirmText: string
	cancelText: string
	onConfirm: (data: T) => Promise<void>
	onClose: () => void
	beforeClose: (event: string, props: any, close: () => void) => void
}

const useConfirm = <T>(options: Partial<IOptions<T>>) => {
	const container = document.createElement('div')

	const handler = (data: T) => {
		const {
			type,
			confirmType,
			title = '提示',
			message,
			description,
			confirmText,
			cancelText,
			onConfirm,
			onClose,
			beforeClose,
		} = options

		const handleClose = () => {
			onClose && onClose()
			render(null, container)
		}

		const getMessage = (data: T) => {
			if (!message) return ''
			if (typeof message === 'string') {
				return message
			}
			return message(data)
		}

		const getDescription = (data: T) => {
			if (!description) return ''
			if (typeof description === 'string') {
				return description
			}
			return description(data)
		}

		const confirmNode = h(BaseConfirm as any, {
			type,
			confirmType,
			title,
			visible: true,
			confirmText,
			cancelText,
			message: getMessage(data),
			description: getDescription(data),
			async onConfirm() {
				const props = confirmNode.component?.props!
				if (beforeClose) return beforeClose('confirm', props, handleClose)

				props.confirmLoading = true
				if (onConfirm) {
					await onConfirm(data)
				}
				props.confirmLoading = false
				handleClose()
			},
			onClose: () => {
				const props = confirmNode.component?.props!
				if (beforeClose) return beforeClose('cancel', props, handleClose)
				handleClose()
			},
		})

		render(confirmNode, container)
	}

	return handler
}

export default useConfirm
