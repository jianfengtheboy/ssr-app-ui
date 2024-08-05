<script lang="ts" setup>
import zhLocale from 'element-plus/es/locale/lang/zh-cn'
import enLocale from 'element-plus/es/locale/lang/en'
import { ELang } from '~/config/enum'
import { storagePrefix } from '~/config/domain'

const config = useRuntimeConfig()
const langCookie: any = useCookie(`${storagePrefix}APPSTORE_LANGUAGE`).value

let localeLang = langCookie && langCookie.lang === ELang.en ? enLocale : zhLocale

// 设置页面SEO相关信息
useHead({
	title: config.public.systemName,
})
</script>

<template>
	<ClientOnly>
		<NuxtLayout>
			<!-- 路由 -->
			<el-config-provider :locale="localeLang">
				<NuxtPage />
			</el-config-provider>
		</NuxtLayout>
	</ClientOnly>
</template>
