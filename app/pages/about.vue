<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gray-50">
      <div class="container py-20 md:py-32">
        <div class="max-w-3xl" data-aos="fade-up">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">About SSR_APP_UI</h1>
          <p class="text-xl text-gray-600">
            Leading the future of vending technology with innovation and excellence.
          </p>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-20">
      <div class="container">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 class="text-3xl font-bold mb-6">Our Mission</h2>
            <p class="text-lg text-gray-600 mb-6">
              To revolutionize the vending industry by providing cutting-edge technology solutions
              that enhance customer experiences and drive business growth worldwide.
            </p>
            <p class="text-lg text-gray-600">
              Founded in 2018, SSR_APP_UI has grown to become a global leader in smart vending
              solutions, serving clients in over 50 countries.
            </p>
          </div>
          <div class="relative" data-aos="fade-left">
            <div class="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="SSR_APP_UI Office"
                class="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="py-20 bg-gray-50">
      <div class="container">
        <h2 class="text-3xl font-bold text-center mb-12" data-aos="fade-up">Our Leadership</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(member, index) in team"
            :key="member.name"
            class="text-center"
            :data-aos="'fade-up'"
            :data-aos-delay="index * 100"
          >
            <div class="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
              <img :src="member.image" :alt="member.name" class="w-full h-full object-cover" />
            </div>
            <h3 class="text-xl font-semibold mb-1">{{ member.name }}</h3>
            <p class="text-primary-600 mb-2">{{ member.position }}</p>
            <p class="text-gray-600 text-sm">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const team = [
  {
    name: 'Alex Johnson',
    position: 'CEO & Founder',
    description: '20+ years in technology and automation',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Maria Rodriguez',
    position: 'CTO',
    description: 'IoT and AI technology expert',
    image:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w-400&q=80',
  },
  {
    name: 'David Chen',
    position: 'Head of Global Operations',
    description: 'International business development leader',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
]
</script>
