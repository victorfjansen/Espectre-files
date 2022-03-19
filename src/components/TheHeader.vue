<template>
  <a-layout-header
    class="header"
    :style="{ position: 'fixed', top: '0', width: '100%', zIndex: '100' }"
  >
    <a-row class="flex-header">
      <a-col
        ><router-link to="/" @click="updateHome()"
          ><div class="logo">
            <img src="@/assets/logo.svg" alt="LogoMarca" />
            <img
              src="@/assets/Espectre.svg"
              alt="LogoMarca"
              class="logo_frase"
            /></div></router-link
      ></a-col>
      <a-col>
        <a-menu
          mode="horizontal"
          :style="{ lineHeight: '64px', border: 'none' }"
          v-model:selectedKeys="selectedKeys"
        >
          <a-menu-item key="1"
            ><router-link to="/">Home</router-link></a-menu-item
          >
          <a-menu-item key="2"
            ><router-link to="/dashboard">Dashboard</router-link></a-menu-item
          >
        </a-menu>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  name: 'TheHeader',
  setup() {
    const selectedKeys = ref(['1'])

    const updateHome = () => {
      selectedKeys.value = ['1']
    }

    return { selectedKeys, updateHome }
  },
}
</script>

<style scoped>
.header {
  background: white;
  border: none;
  box-shadow: 3px 2px 5px rgba(0, 0, 0, 0.1);
}

.router-link-exact-active {
  color: #1890ff;
}

.flex-header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1070px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
}

.logo {
  width: 100%;
  display: grid;
  align-items: center;
  align-content: center;
  grid-template-columns: 45px 70px;
  gap: 11px;
  margin-left: -20px;
}

.logo img {
  width: 100%;
}

@media (max-width: 600px) {
  .logo_frase {
    display: none;
  }
}
</style>
