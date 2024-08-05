<script lang="ts" setup>
import { IMenu } from '~/model/common'
import IconCompany from '~icons/custom/company'
import IconApplication from '~icons/custom/application'
import IconSystem from '~icons/custom/system'
import IconContent from '~icons/custom/content'
import IconBusiness from '~icons/custom/business'
import IconDataCenter from '~icons/custom/dataCenter'

interface IProps {
	config: IMenu
}

defineProps<IProps>()

// 图标和svg之间的对应关系
const IconMap = {
	application: IconApplication,
	company: IconCompany,
	system: IconSystem,
	content: IconContent,
	business: IconBusiness,
	dataCenter: IconDataCenter,
}

const appStore = useAppStore()
const getNameByLang = config => {
	if (appStore.lang == 'zh') return config.name
	return config.nameEn
}
</script>

<template>
	<el-sub-menu v-if="config.children" :index="String(config.id)">
		<template #title>
			<BaseIcon v-if="config.icon" :size="18">
				<component :is="IconMap[config.icon]"></component>
			</BaseIcon>
			<span class="ml-3 path-name">{{ getNameByLang(config) }}</span>
		</template>
		<MenuItem v-for="childConfig in config.children" :key="childConfig.id" :config="childConfig" />
	</el-sub-menu>

	<el-menu-item class="flex items-center" v-else :index="String(config.id)">
		<BaseIcon v-if="config.icon" :size="18">
			<component :is="IconMap[config.icon]"></component>
		</BaseIcon>
		<span v-else class="text-lg">•</span>
		<template #title>
			<span class="ml-3 path-name">{{ getNameByLang(config) }}</span>
		</template>
	</el-menu-item>
</template>
