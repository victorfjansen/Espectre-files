<template>
  <transition name="fade" :appear="true">
    <div>
      <a-typography
        :style="{
          display: 'grid',
          alignItems: 'center',
          marginTop: '10%',
        }"
      >
        <a-typography-title class="title"
          >Monitore o progresso do
          <span class="covid">covid</span></a-typography-title
        >
        <a-typography-paragraph class="paragraph">
          O coronavírus é um vírus que causa uma doença respiratória —a
          covid-19— pelo agente coronavírus, identificado em dezembro de 2019 na
          China. Os coronavírus são uma grande família viral, conhecidos desde
          meados de 1960, que causam infecções respiratórias em seres humanos e
          em animais. Geralmente, infecções por coronavírus causam doenças
          respiratórias leves a moderadas, semelhantes a um resfriado comum.
        </a-typography-paragraph>
        <a-typography-text strong class="paragraph">
          Alguns coronavírus podem causar doenças graves com impacto importante
          em termos de saúde pública, como a Sars (Síndrome Respiratória Aguda
          Grave), identificada em 2002 e a Mers (Síndrome Respiratória do
          Oriente Médio), identificada em 2012.
        </a-typography-text>
        <a-typography-title :level="2" class="subtitle"
          >Nossos Objetivos</a-typography-title
        >
        <a-typography-paragraph class="paragraph">
          Desejamos contribuir com a divulgação de tais informações de uma
          maneira simples e direta, sem muitas enrolações.
        </a-typography-paragraph>
      </a-typography>

      <div class="none">
        <p :style="{ marginBottom: '-2px', marginTop: '5px' }">
          Quantidade de Pessoas Já Vacinadas:
        </p>
        <a-progress :percent="23" :format="() => `23% ou 48.300.000`" />
      </div>
    </div>
  </transition>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { onBeforeMount } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { notification } from 'ant-design-vue'
import { computed } from '@vue/reactivity'

export default {
  setup() {
    const data = reactive({
      response: {},
    })

    const router = useRouter()
    const store = useStore()
    const responsegetters = computed(() => store.getters.$response)

    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://covid19-brazil-api.now.sh/api/report/v1/brazil'
        ).then((r) => r.json())

        data.response = response
        updateResponse()
      } catch (error) {
        notification.open({
          message: 'Verifique a sua internet e tente novamente',
          description:
            'Não foi possível puxar as informações do banco de dados. Isso pode ter haver com sua conexão. Verifique a sua internet e tente novamente ou entre em contato com o desenvolvedor - victorfjansen@outlook.com',
        })
      }
    }

    const updateResponse = () => {
      store.dispatch('updateResponse', data.response)
    }

    const pushDashboard = () => {
      router.push('/dashboard')
    }

    onBeforeMount(() => {
      fetchData()
    })

    return { ...toRefs(data), pushDashboard, responsegetters }
  },
}
</script>

<style scoped>
.covid {
  color: #1890ff;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate3d(-30px, 0, 0);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s;
}
</style>
