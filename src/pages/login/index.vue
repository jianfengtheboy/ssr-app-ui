<script lang="ts" setup>
import { FormInstance, dayjs } from 'element-plus'
import _ from 'lodash'
import bcryptjs from 'bcryptjs'
import loginLeft from '~/assets/images/login/login_left.png'
import logo from '~/assets/images/common/logo.svg'
import { SystemName } from '~/config/domain'
import { encryptSha256 } from '~/utils/encrypt'
import { getCatcha, getUserSalt } from '~/apis/common'

definePageMeta({
	layout: 'fullscreen',
})

// 设置页面SEO相关信息
useHead({
	title: '登录',
})

const appStore = useAppStore()

const formRef = ref<FormInstance>()
const submitLoading = ref(false)
const showPassword = ref(true)
const formData = ref({
	username: '',
	password: '',
	captcha: '', // 验证码
	uuid: '', // 验证码对应的key
	flag: 1,
})

const formRule = {
	username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
	password: [{ required: true, message: '请输入密码', trigger: 'change' }],
	captcha: [{ required: true, message: '请输入验证码', trigger: 'change' }],
}

// 登录
const handleLogin = () => {
	formRef.value?.validate(async valid => {
		if (!valid) return
		try {
			submitLoading.value = true
			const params = _.cloneDeep(formData.value)
			let response: any = await getUserSalt({
				name: params.username,
			})
			if (!response) {
				throw '用户名密码错误'
			}
			params.password = encryptSha256(response + params.password)
			params.password = bcryptjs.hashSync(params.password, 10)
			await appStore.login(params)
		} catch (err) {
			loadCaptcha()
			console.error(err)
		} finally {
			submitLoading.value = false
		}
	})
}

// 获取验证码
const captchaImage = ref('')
const loadCaptcha = async () => {
	try {
		const response: any = await getCatcha()
		const { image, uuid } = response
		formData.value.uuid = uuid
		captchaImage.value = image || `data:image/gif;base64,${image}`
	} catch (error) {}
}

// 获取当前年度
const currYear = computed(() => {
	return dayjs().year()
})

onMounted(() => {
	loadCaptcha()
})
</script>

<template>
	<div class="login-page h-full w-full">
		<div class="login-container h-full w-full flex items-center justify-center">
			<div class="login-wrapper box-border flex items-center justify-around overflow-hidden">
				<div class="login-left">
					<el-image class="w-full h-full" :src="loginLeft" alt="login" />
				</div>
				<div class="login-form bg-white shadow-md">
					<div class="login-logo flex items-center justify-center">
						<el-image class="login-icon" :src="logo" />
						<span class="login-systemname font-bold whitespace-nowrap">{{ SystemName }}</span>
					</div>
					<el-form ref="formRef" :model="formData" :rules="formRule">
						<el-form-item prop="username">
							<el-input v-model="formData.username" placeholder="请输入用户名" autofocus maxlength="64">
								<template #prefix>
									<BaseIcon color="#000" :size="22">
										<IconCustomAccountLine />
									</BaseIcon>
								</template>
							</el-input>
						</el-form-item>

						<el-form-item prop="password">
							<el-input
								v-model="formData.password"
								:show-password="showPassword"
								placeholder="请输入密码"
								@keyup.enter="handleLogin"
								maxlength="32"
							>
								<template #prefix>
									<BaseIcon color="#000" :size="22">
										<IconCustomPasswordLine />
									</BaseIcon>
								</template>
								<template #suffix>
									<BaseIcon class="cursor-pointer" color="#000" :size="22" @click="showPassword = !showPassword">
										<IconCustomEyeClose v-if="showPassword" />
										<IconCustomEyeOpen v-else />
									</BaseIcon>
								</template>
							</el-input>
						</el-form-item>
						<div class="captcha-wrap" v-if="captchaImage">
							<el-form-item prop="captcha" class="captcha-input">
								<el-input
									v-model="formData.captcha"
									placeholder="请输入验证码"
									@keyup.enter="handleLogin"
									maxlength="6"
								>
									<template #prefix>
										<BaseIcon color="#000" :size="22">
											<IconCustomCaptcha />
										</BaseIcon>
									</template>
								</el-input>
							</el-form-item>
							<img :src="captchaImage" @click="loadCaptcha" alt="captcha" class="captcha" />
						</div>
					</el-form>

					<el-button class="button-login w-full" type="primary" :loading="submitLoading" @click="handleLogin">
						登 录
					</el-button>
				</div>
			</div>
		</div>
		<div class="login-footer w-full text-center text-gray-300">
			{{ `Copyright © 1992-${currYear} All Rights Reserved.` }}
		</div>
	</div>
</template>

<style lang="scss" scoped>
.login-page {
	background-image: url(../../assets/images/login/hx_bg@1x.png);
	background-position: 50%;
	background-repeat: no-repeat;
	background-size: cover;

	.login-container {
		background-image: url(../../assets/images/login/login_bg.svg);
		background-position: 50%;
		background-repeat: no-repeat;
		background-size: cover;

		.login-wrapper {
			width: 82%;
			height: 94%;
			padding: 0 4%;
			border-radius: 10px;

			.login-left {
				max-width: 600px;
			}

			.login-form {
				min-width: 410px;
				padding: 40px 35px;
				margin-left: 40px;
				border-radius: 10px;

				.login-logo {
					margin-bottom: 36px;

					.login-icon {
						width: 60px;
						margin-right: 24px;
					}

					.login-systemname {
						font-size: 32px;
					}
				}

				.captcha-wrap {
					display: flex;
					align-items: center;
					:deep(.el-form-item) {
						margin-bottom: 0;
					}
					.captcha-input {
						flex: 1;
					}
					.captcha {
						width: 94px;
						height: 46px;
						margin-left: 20px;
						cursor: pointer;
					}
				}

				.button-login {
					height: 50px;
					border-radius: 8px;
					font-size: 18px;
					margin-top: 40px;
					background-image: linear-gradient(90deg, #3054eb, #4965f2);
				}
			}
		}
	}

	.login-footer {
		position: fixed;
		left: 0;
		bottom: 20px;
	}

	:deep(.el-input__wrapper) {
		height: 48px;
		font-size: 16px;
		border-radius: 6px;
		border: none;
		padding-left: 20px;
	}

	:deep(.el-input__prefix) {
		margin-right: 10px;
	}

	:deep(.el-input__suffix .el-input__password) {
		display: none;
	}
}
</style>
