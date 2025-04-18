<script setup lang="ts">

</script>

<template>
  <div class="box-shadow rounded-lg text-4">
    <slot />
  </div>
</template>

<style lang="css" scoped>
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src:
    url('../assets/fonts/JetBrainsMono-Regular.woff2') format('woff2'),
    url('../assets/fonts/JetBrainsMono-Regular.ttf') format('truetype');
}

.box-shadow {
  box-shadow: 0.5rem 0.5rem 1rem var(--grey-3);
  background-color: var(--grey-5);
}

:deep(*) {
  font-family: 'JetBrains Mono', 'Courier New', Courier, monospace;
  font-size: 1rem;
  line-height: 1.5rem;
}

:deep(code) {
  counter-reset: step;
  counter-increment: step 0;
}

:deep(code .line::before) {
  content: counter(step);
  counter-increment: step;
  width: 1rem;
  margin-right: 1.5rem;
  display: inline-block;
  text-align: right;
  color: rgba(115, 138, 148, 0.4);
}

:deep(.diff .remove) {
  background-color: var(--color-red);
  opacity: 0.7;
}

:deep(.diff .remove)::before {
  content: '-';
  color: var(--color-red);
  font-weight: bold;
}

:deep(.diff .add) {
  background-color: var(--color-green);
}

:deep(.diff .add)::before {
  content: '+';
  color: var(--color-green);
  font-weight: bold;
}

:deep(.diff .highlighted) {
  background-color: var(--grey-4);
}
</style>
