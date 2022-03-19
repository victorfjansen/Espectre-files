<template>
  <div class="flex">
    <TheHeader />
    <Container class="content">
      <router-view />
    </Container>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import Container from './components/Container.vue'
export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
    Container,
  },
}
</script>

<style>
body {
  overflow-x: hidden;
}

.flex {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}
@media (max-width: 800px) {
  .title {
    font-size: 2rem;
    margin-top: 2em;
  }
  .paragraph {
    font-size: 0.7rem;
  }
  .none {
    display: none;
  }
  .subtitle {
    font-size: 1.3rem;
  }
}
</style>
