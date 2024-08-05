<script lang="ts" setup>
import imgWelcome from '~/assets/images/common/welcome.png'
import { SystemName } from '@/config/domain'

// 设置页面SEO相关信息
useHead({
	title: '欢迎使用',
})

definePageMeta({
	title: '欢迎使用',
	titleEn: 'Welcome',
})
</script>

<template>
	<div class="welcome h-full bg-white text-center flex items-center justify-center">
		<div>
			<img class="welcome-image" :src="imgWelcome" alt="welcome" />
			<div class="text-xl mt-5">欢迎进入{{ SystemName }}</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.welcome {
	border-radius: 10px;

	&-image {
		width: 640px;
	}
}
</style>
