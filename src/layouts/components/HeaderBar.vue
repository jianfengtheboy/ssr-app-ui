<script lang="ts" setup>
import { SystemName } from '@/config/domain'

const appStore = useAppStore()
const userInfo = computed(() => appStore.userInfo)

const toHome = () => {
	navigateTo('/welcome')
}
</script>

<template>
	<div class="header-bar flex items-center flex-none">
		<div class="flex flex-1 items-center">
			<div class="flex items-center justify-start cursor-pointer" @click="toHome">
				<div class="system-name text-white font-semibold">{{ SystemName }}</div>
			</div>
		</div>

		<el-dropdown trigger="hover">
			<div class="avatar-wrap flex items-center cursor-pointer">
				<div class="avatar rounded-full flex items-center justify-center">
					<BaseIcon :size="20" color="#0084CF">
						<IconCustomAvatarUser />
					</BaseIcon>
				</div>
				<div class="text-white ml-2">{{ userInfo.userName }}</div>
			</div>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item>
						<BaseIcon>
							<IconCustomAdminRole />
						</BaseIcon>
						个人信息
					</el-dropdown-item>
					<el-dropdown-item>
						<BaseIcon>
							<IconCustomEdit />
						</BaseIcon>
						修改密码
					</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<el-divider direction="vertical" />
		<el-link class="text-white logout-btn" :underline="false" @click="appStore.logout()">
			<BaseIcon class="button-hover mx-1" :size="18" color="#fff">
				<IconCustomExit />
			</BaseIcon>
			退出登录
		</el-link>
	</div>
</template>

<style lang="scss" scoped>
.header-bar {
	height: var(--header-height);
	padding: 0 20px;
	background: linear-gradient(315deg, rgb(73, 143, 242) 0%, rgb(73, 101, 242) 100%);
	background-origin: border-box;

	:deep(.el-breadcrumb__separator) {
		font-weight: normal;
		color: var(--white);
	}

	.system-name {
		font-size: 24px;
	}

	.avatar-wrap {
		&:focus-visible {
			outline: none;
		}
	}

	.avatar {
		width: 36px;
		height: 36px;
		background-color: var(--theme-bg);
	}

	.logout-btn {
		&:hover {
			color: rgba(255, 255, 255, 0.8);
		}
	}
}
</style>
