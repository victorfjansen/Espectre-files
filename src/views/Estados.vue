<template>
  <transition name="fade" :appear="true" v-if="response">
    <div>
      <a-typography style="margin-top: 10%">
        <a-typography-title class="title">
          <blockquote>Estados:</blockquote>
        </a-typography-title>
      </a-typography>
      <div class="cards-grid">
        <Cards
          v-for="item in response.data"
          :key="item.uid"
          :state="item.state"
          :cases="item.cases"
          :deaths="item.deaths"
          :suspects="item.suspects"
          :refuses="item.refuses"
          :datetime="item.datetime"
        />
      </div>
      <a-back-top>
        <div class="ant-back-top-inner"><CaretUpFilled /></div>
      </a-back-top>
    </div>
  </transition>
  <a-space v-else :style="{ marginTop: '8rem' }">
    <a-spin size="large" />
  </a-space>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { onBeforeMount } from '@vue/runtime-core'
import Cards from '@/components/Cards.vue'
import { notification } from 'ant-design-vue'
import { CaretUpFilled } from '@ant-design/icons-vue'
export default {
  components: {
    CaretUpFilled,
    Cards,
  },
  setup() {
    const data = reactive({
      response: null,
    })

    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://covid19-brazil-api.now.sh/api/report/v1?&q=sp'
        ).then((r) => r.json())
        data.response = response
      } catch {
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
    return { ...toRefs(data) }
  },
}
</script>

<style scoped>
.cards-grid {
  display: grid;
  grid-template-columns: 320px 320px 320px;
  gap: 30px;
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

.azul {
  color: #1890ff;
}

.ant-back-top-inner {
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 4px;
  background-color: #1088e9;
  color: #fff;
  text-align: center;
  font-size: 20px;
}

@media (max-width: 1150px) {
  .cards-grid {
    grid-template-columns: minmax(100px, 450px) minmax(100px, 450px);
    gap: 10px;
  }
}

@media (max-width: 880px) {
  .cards-grid {
    grid-template-columns: minmax(100px, 450px);
    gap: 30px;
  }
}
</style>
