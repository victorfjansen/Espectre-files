<template>
  <div class="container">
    <a-typography :style="{ marginTop: '15rem' }" class="container">
      <a-typography-title class="title">
        Ops.. Página Não encontrada. Volte a página inicial!
      </a-typography-title>
    </a-typography>
    <a-button @click="goToHome" type="primary" class="button">Home</a-button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()

    const goToHome = () => {
      router.push('/')
    }

    return { goToHome }
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.button {
  display: inline-block;
  width: 150px;
  margin-top: 5rem;
  margin: 2rem auto;
}
</style>
