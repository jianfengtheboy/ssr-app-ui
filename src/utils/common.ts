import { ELang } from '@/config/enum'

// 获取当前浏览器语言
export const getCurrentLanguage = () => {
	const UAlang = navigator.language
	const langCode = UAlang.indexOf('zh') !== -1 ? ELang.zh : ELang.en
	return langCode
}

// 空判断
export const isEmpty = (val: any) => {
	if (typeof val === 'undefined' || val === null) return true
	if (typeof val === 'string' && val === '') return true
	if (typeof val === 'number') return false // 数值类型始终认为是非空
	if (Array.isArray(val) && val.length === 0) return true
	if (typeof val === 'object' && Object.keys(val).length === 0) return true
	return false
}

/**
 * 数值录入
 * @param {String} value       输入的值
 * @param {Boolean} minus      是否允许输入负数
 * @param {Number}  decimals   保留几位小数，不传参则不对小数进行处理，0表示整数。
 */
export const inputNumber = (value: string | number, minus: boolean = true, decimals?: number) => {
	if (!value) {
		return ''
	}
	let result = String(value)
	result = result.replace(/^(\-)*\D*(\d*(?:\.\d*)?).*$/g, '$1$2')
	// 正数处理，去除负号
	if (!minus) {
		result = result.replace('-', '')
	}
	// 小数处理
	const decimalIndex = result.indexOf('.')
	if (decimalIndex > -1 && decimals !== undefined) {
		if (decimals === 0) {
			result = result.slice(0, decimalIndex + decimals)
		} else if (decimals > 0) {
			result = result.slice(0, decimalIndex + decimals + 1)
		}
	}
	return result
}
