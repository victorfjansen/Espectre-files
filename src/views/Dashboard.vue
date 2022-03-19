<template>
  <transition name="fade" :appear="true">
    <div>
      <a-typography :style="{ marginTop: '10%' }">
        <a-typography-title class="title">
          Acompanhe o Progresso do coronavírus no Brasil
        </a-typography-title>
        <a-typography-paragraph class="paragraph">
          Aqui disponibilizamos as informações em relação ao Brasil. Fiquem a
          vontade para explorar!
        </a-typography-paragraph>
      </a-typography>
      <div :style="{ marginTop: '100px' }">
        <apexchart
          type="area"
          height="400"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
      <a-tooltip title="Clique Para Ver Mais" placement="top">
        <MainCard />
      </a-tooltip>
    </div>
  </transition>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import MainCard from '@/components/MainCard'
import { onBeforeMount } from '@vue/runtime-core'
export default {
  components: {
    MainCard,
  },
  setup() {
    const data = reactive({
      responseGraphic: {},
      series: [
        {
          name: 'Casos Confirmados',
          data: [],
        },
        {
          name: 'Mortes',
          data: [],
        },
        {
          name: 'Com Covid',
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'area',
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'datetime',
          categories: [],
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm',
          },
        },
      },
    })

    const getItems = (response, data, array) => {
      response.forEach((item) => {
        array.push(String(item[data]))
      })
    }

    const fetchData = async () => {
      const response = await fetch(
        'https://api.covid19api.com/total/country/brazil'
      ).then((r) => r.json())
      data.responseGraphic = response
      getItems(data.responseGraphic, 'Confirmed', data.series[0].data)
      getItems(data.responseGraphic, 'Deaths', data.series[1].data)
      getItems(data.responseGraphic, 'Active', data.series[2].data)
      getItems(data.responseGraphic, 'Date', data.chartOptions.xaxis.categories)
    }

    onBeforeMount(() => {
      fetchData()
    })

    return {
      ...toRefs(data),
    }
  },
}
</script>

<style scoped>
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
