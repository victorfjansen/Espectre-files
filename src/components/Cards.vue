<template>
  <a-card
    :title="state"
    :style="{ maxWidth: '320px', boxShadow: '0px 6px 10px rgba(0,0,0,0.1)' }"
    class="title"
  >
    <p>✔ Casos confirmados: {{ cases }}</p>
    <p>☠ Mortes confirmadas: {{ deaths }}</p>
    <p>😥 Suspeitas: {{ suspects }}</p>
    <p>❌ Resultados Negativos: {{ refuses }}</p>
    <a-tooltip title="Porcentagem de mortes em relação aos casos confirmados">
      <a-progress
        status="exception"
        :percent="mortes"
        :format="() => `${mortes}%`"
      />
    </a-tooltip>
    <a-typography-paragraph>
      <blockquote>Ultima Atualização: {{ datetime }}</blockquote>
    </a-typography-paragraph>
  </a-card>
</template>

<script>
import { computed } from '@vue/reactivity'
export default {
  props: {
    state: { type: String, required: true },
    cases: { type: Number, required: true },
    deaths: { type: Number, required: true },
    suspects: { type: Number, required: true },
    datetime: { type: String, required: true },
    refuses: { type: Number, required: true },
  },
  setup(props) {
    const mortes = computed(
      () => +((props.deaths * 100) / props.cases).toFixed(2)
    )
    return { mortes }
  },
}
</script>

<style scoped></style>
