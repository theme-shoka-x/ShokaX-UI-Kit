<script setup lang="ts">
defineProps<{
  src: string
  name: string
  desc: string
}>()
</script>

<template>
  <div itemprop="author" itemscope itemtype="http://schema.org/Person" class="author">
    <img :src="src" loading="lazy" decoding="async" class="image" alt="author avatar">
    <p itemprop="name" class="name">
      {{ name }}
    </p>
    <div itemprop="description" class="description">
      {{ desc }}
    </div>
  </div>
</template>

<style lang="css" scoped>
.author {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.author:hover .image {
  animation: shake 0.5s;
}

.image {
  border: 0.0625rem solid var(--body-bg-shadow, rgba(0, 0, 0, 0.05));
  display: block;
  margin: 0 auto;
  max-width: 10rem;
  padding: 0.125rem;
  box-shadow: 0 0 1rem 0.625rem var(--body-bg-shadow, rgba(0, 0, 0, 0.05));
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
}

.name {
  color: var(--grey-7);
  font-weight: 400;
  margin: 0.3125rem 0 0;
  text-align: center;
}

.description {
  color: var(--grey-5);
  font-size: 1rem;
  margin-top: 0.3125rem;
  text-align: center;
}

@keyframes shake {
  0% {
    transform: scale(1);
  }

  10%,
  20% {
    transform: scale(0.9) rotate(3deg);
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale(1.1) rotate(-3deg);
  }

  40%,
  60%,
  80% {
    transform: scale(1.1) rotate(3deg);
  }

  100% {
    transform: scale(1);
  }
}
</style>
