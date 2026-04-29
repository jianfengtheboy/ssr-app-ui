<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section
      class="relative overflow-hidden bg-linear-to-br from-primary-600 to-primary-800 text-white"
    >
      <div class="container py-20 md:py-32">
        <div class="max-w-3xl" data-aos="fade-up">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            {{ t('home.hero.title') }}
          </h1>
          <p class="text-xl mb-8 text-primary-100">
            {{ t('home.hero.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink to="/contact" class="btn bg-white text-primary-700 hover:bg-gray-100">
              {{ t('home.hero.cta_primary') }}
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="btn bg-transparent border-2 border-white hover:bg-white/10"
            >
              {{ t('home.hero.cta_secondary') }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" :style="heroPatternStyle"></div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20">
      <div class="container">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12" data-aos="fade-up">
          {{ t('home.features.title') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            class="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
            :data-aos="'fade-up'"
            :data-aos-delay="index * 100"
          >
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">{{ feature.icon }}</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">
              {{ t(`home.features.items.${feature.key}.title`) }}
            </h3>
            <p class="text-gray-600">{{ t(`home.features.items.${feature.key}.description`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gray-50">
      <div class="container text-center" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of businesses worldwide using SSR_APP_UI solutions.
        </p>
        <NuxtLink to="/contact" class="btn btn-primary px-8 py-3 text-lg">
          Get Started Today
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'

const { t } = useI18n()

const features = [
  {
    key: 'global',
    icon: '🌍',
    title: 'Global Reach',
    description: 'Serving clients in 50+ countries worldwide',
  },
  {
    key: 'technology',
    icon: '⚡',
    title: 'Smart Technology',
    description: 'IoT-enabled vending solutions with real-time analytics',
  },
  {
    key: 'security',
    icon: '🛡️',
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with 99.9% uptime guarantee',
  },
]

const heroPatternStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
}
</script>
