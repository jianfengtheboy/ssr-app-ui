<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="grow">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/layout/Header.vue'
import AppFooter from '~/components/layout/Footer.vue'
</script>
