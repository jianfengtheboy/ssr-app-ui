import { IEnumResult } from '@/model/enum'

export interface IColumnConfig {
	// 列唯一标识
	prop: string
	// 字段名
	label: string
	// 排序字段
	sort?: number
	// 列宽度
	width?: string
	visible?: Function
	sortable?: boolean | string
	enumModel?: IEnumResult
	enumShowMode?: 'tag' | 'span'
	i18n?: boolean
	// 格式化方法
	formatter?: '%' | '0.0' | Function | undefined
}

export interface ITableConfig {
	// 一页展示多少条
	size?: number
	// 是否单行显示
	isSingleLine?: boolean
	items: IColumnConfig[]
}
