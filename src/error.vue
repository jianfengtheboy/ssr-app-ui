<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2023-08-28 15:17:42
 * @LastEditTime: 2024-08-05 21:16:01
 * @Description: 错误页面，等同于404、403页面
-->
<script lang="ts" setup>
import imgEmpty from '~/assets/images/common/empty-default.png'

const props = defineProps({
	error: Object
})

useHead({
	title: `${props.error?.statusCode}`,
})

const onBackToHome = async () => {
	const auth = await useAuth.get('token')
	if (!auth.value) {
		clearError({ redirect: '/' })
	} else {
		clearError({ redirect: '/welcome' })
	}
}
</script>

<template>
	<div class="grail flex items-center justify-center bg-white h-full text-center">
		<div class="py-40">
			<el-image :src="imgEmpty" class="w-full max-w-lg" />
			<div class="text-7xl sm:text-8xl font-medium mt-4 mb-8">{{ props.error?.statusCode }}</div>
			<div class="text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight">{{ props.error?.message }}</div>
			<div class="w-full flex items-center justify-center">
				<a @click="onBackToHome" class="gradient-border text-md sm:text-xl py-2 px-4 sm:py-3 sm:px-6 cursor-pointer">
					返回首页
				</a>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@media (prefers-color-scheme: light) {
	.gradient-border {
		background-color: rgba(255, 255, 255, 0.3);

		&::before {
			background: linear-gradient(90deg, #e2e2e2 0%, #e2e2e2 25%, #00dc82 50%, #36e4da 75%, #0047e1 100%);
		}
	}
}

.gradient-border {
	position: relative;
	border-radius: 0.5rem;
	-webkit-backdrop-filter: blur(10px);
	backdrop-filter: blur(10px);

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 0.5rem;
		padding: 2px;
		width: 100%;
		background-size: 400% auto;
		opacity: 0.5;
		transition: background-position 0.3s ease-in-out, opacity 0.2s ease-in-out;
		-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
	}

	&:hover {
		&::before {
			background-position: -50% 0;
			opacity: 1;
		}
	}
}
</style>
