<script setup>
const props = defineProps({
  title: String,
})
</script>

<template>
  <header class="bg-white shadow">
    <slot name="header"></slot>
  </header>
  <main>
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <!-- Your content -->
      <div class="px-4 py-6 sm:px-0">
        <slot></slot>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>
