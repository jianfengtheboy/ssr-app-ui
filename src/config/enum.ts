import { enumMng } from '~/utils/enum'

export enum ELang {
	zh = 'zh',
	en = 'en',
}

export const EnumUserState = enumMng([
	{ id: 1, name: '启用' },
	{ id: 0, name: '禁用' },
])

export const EnumStatus = enumMng([
	{ id: '0', name: '失败' },
	{ id: '1', name: '成功' },
])

export const EnumMenuType = enumMng([
	{ id: '1', name: '目录', status: 'info' },
	{ id: '2', name: '菜单', status: 'warning' },
	{ id: '3', name: '按钮', status: 'primary' },
])
