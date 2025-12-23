
<template>
  <Cabecalho>

    <template v-slot:subtitulo>
        <h2>Praticando Vue</h2>
    </template>

    <template v-slot:extra>
        <h3>Testando</h3>
    </template>
    
  </Cabecalho>

  <ListaCidades />
</template>


<script>
import "./assets/estilo.css";
import Cabecalho from "./components/Cabecalho.vue";
import ListaCidades from "./components/ListaCidades.vue";

export default {
  components: { Cabecalho, ListaCidades },

  methods: {},
  computed: {},
};
</script>

<style>
</style>
