<template>
  <div>
    <h1>Gerencie Vocábulos</h1>
    
    <form @submit.prevent="cadastrarVocabulo">
      <div>
        <label for="termo">Termo:</label>
        <input v-model="novoVocabulo.termo" id="termo" required>
      </div>
      <div>
        <label for="significado">Significado:</label>
        <input v-model="novoVocabulo.significado" id="significado" required>
      </div>
      <div>
        <label for="versao">Versão:</label>
        <input type="number" v-model="novoVocabulo.versao" id="versao" required>
      </div>
      <button type="submit">Cadastrar</button>
    </form>

    <form @submit.prevent="buscarVocabulo">
      <div>
        <label for="termoBusca">Termo:</label>
        <input v-model="termoBusca" id="termoBusca">
      </div>
      <div>
        <label for="versaoBusca">Versão:</label>
        <input type="number" v-model="versaoBusca" id="versaoBusca">
      </div>
      <button type="submit">Buscar</button>
    </form>

    <div v-if="mensagem">
      <p>{{ mensagem }}</p>
    </div>

    <table v-if="vocabulos.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Termo</th>
          <th>Significado</th>
          <th>Versão</th>
          <th>Ativo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vocabulo in vocabulos" :key="vocabulo.id">
          <td>{{ vocabulo.id }}</td>
          <td>{{ vocabulo.termo }}</td>
          <td>{{ vocabulo.significado }}</td>
          <td>{{ vocabulo.versao }}</td>
          <td>{{ vocabulo.dataHoraDesativacao ? 'Não' : 'Sim' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      novoVocabulo: {
        termo: '',
        significado: '',
        versao: null
      },
      vocabulos: [],
      termoBusca: '',
      versaoBusca: null,
      mensagem: ''
    };
  },
  methods: {
    async fetchVocabulos() {
      try {
        const response = await axios.get('/vocabulo');
        this.vocabulos = response.data;
      } catch (error) {
        console.error('Erro ao buscar vocábulos:', error);
      }
    },
    async cadastrarVocabulo() {
      try {
        await axios.post('/vocabulo', this.novoVocabulo);
        this.fetchVocabulos();
        this.novoVocabulo.termo = '';
        this.novoVocabulo.significado = '';
        this.novoVocabulo.versao = null;
      } catch (error) {
        console.error('Erro ao cadastrar vocabulo:', error);
      }
    },
    async buscarVocabulo() {
      try {
        const response = await axios.get(`/vocabulo/${this.termoBusca}/${this.versaoBusca}`);
        this.vocabulos = response.data;
        if (this.vocabulos.length === 0) {
          this.mensagem = 'Nenhum vocábulo foi encontrado para os critérios fornecidos';
        } else {
          this.mensagem = '';
        }
      } catch (error) {
        console.error('Erro ao buscar vocabulo:', error);
        this.mensagem = 'Erro ao buscar vocabulo';
      }
    }
  },
  created() {
    this.fetchVocabulos();
  }
};
</script>

<style scoped>
/* Adicione estilos aqui, se necessário */
</style>
