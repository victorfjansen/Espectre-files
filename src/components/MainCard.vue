<template>
  <div>
    <router-link to="/estados" v-if="response">
      <a-card
        title="Brasil"
        :style="{
          maxWidth: '1000px',
          margin: '5em auto',
          boxShadow: '0px 6px 10px rgba(0,0,0,0.2)',
        }"
        class="card"
      >
        <p>
          <b>Casos Confirmados: {{ response.confirmed }}</b>
        </p>
        <div>
          <p :style="{ marginBottom: '-2px', marginTop: '5px' }">
            População vacinada: Aprox. 50 milhões de pessoas
          </p>
          <a-tooltip title="População totalmente vacinada" placement="bottom">
            <a-progress :percent="23" status="active" />
          </a-tooltip>
        </div>

        <div>
          <p :style="{ marginBottom: '-2px', marginTop: '5px' }">
            Mortes
          </p>
          <a-tooltip title="Mortes No Brasil" placement="bottom">
            <a-progress
              :percent="70"
              status="exception"
              :format="() => `${response.deaths}`"
            />
          </a-tooltip>
        </div>
        <a-typography-paragraph>
          <blockquote>{{ response.updated_at }}</blockquote>
        </a-typography-paragraph>
      </a-card>
    </router-link>
    <a-space v-else style="margin: 5rem auto">
      <a-spin size="large" />
    </a-space>
  </div>
</template>

<script>
import { notification } from 'ant-design-vue'
import { onBeforeMount, ref } from '@vue/runtime-core'

export default {
  setup() {
    let response = ref({})

    const fetchData = async () => {
      try {
        await fetch('https://covid19-brazil-api.now.sh/api/report/v1/brazil')
          .then((r) => r.json())
          .then((r) => {
            response.value = r.data
          })
      } catch (error) {
        notification.open({
          message: 'Verifique a sua internet e tente novamente',
          description:
            'Não foi possível puxar as informações do banco de dados. Isso pode ter haver com sua conexão. Verifique a sua internet e tente novamente ou entre em contato com o desenvolvedor - victorfjansen@outlook.com',
        })
      }
    }

    onBeforeMount(() => {
      fetchData()
    })

    return { response }
  },
}
</script>

<style scoped>
.card:hover {
  transform: scale(1.05);
}
</style>
