<template>
    <div>
      <h1>Gerenciamento de Encomendas</h1>
      
      <!-- Formulário para adicionar nova Encomenda -->
      <form @submit.prevent="addEncomenda">
        <div>
          <label for="conteudo">Conteúdo:</label>
          <input type="text" v-model="novaEncomenda.conteudo" id="conteudo" required>
        </div>
        <div>
          <label for="dataHoraPrevista">Data e Hora Prevista:</label>
          <input type="datetime-local" v-model="novaEncomenda.dataHoraPrevista" id="dataHoraPrevista" required>
        </div>
        <div>
          <label for="dataHoraEntrega">Data e Hora de Entrega:</label>
          <input type="datetime-local" v-model="novaEncomenda.dataHoraEntrega" id="dataHoraEntrega">
        </div>
        <div>
          <label for="valorDeclarado">Valor Declarado:</label>
          <input type="number" v-model="novaEncomenda.valorDeclarado" id="valorDeclarado" required>
        </div>
        <button type="submit">Adicionar Encomenda</button>
      </form>
  
      <!-- Formulário para buscar Encomenda -->
      <div>
        <h2>Buscar Encomenda</h2>
        <input type="text" v-model="buscaConteudo" placeholder="Conteúdo">
        <input type="datetime-local" v-model="buscaDataHoraPrevista">
        <button @click="buscarEncomenda">Buscar</button>
      </div>
  
      <!-- Lista de Encomendas -->
      <div v-if="encomendas.length">
        <h2>Lista de Encomendas</h2>
        <table>
          <thead>
            <tr>
              <th>Rastreio</th>
              <th>Valor Declarado</th>
              <th>Conteúdo</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="encomenda in encomendas" :key="encomenda.rastreio">
              <td>{{ encomenda.rastreio }}</td>
              <td>{{ encomenda.valorDeclarado }}</td>
              <td>{{ encomenda.conteudo }}</td>
              <td>{{ getStatus(encomenda) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>Nenhum registro foi encontrado para os critérios fornecidos.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        encomendas: [],
        novaEncomenda: {
          conteudo: '',
          dataHoraPrevista: '',
          dataHoraEntrega: '',
          valorDeclarado: null
        },
        buscaConteudo: '',
        buscaDataHoraPrevista: ''
      };
    },
    methods: {
      fetchEncomendas() {
        axios.get('/encomenda')
          .then(response => {
            this.encomendas = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      addEncomenda() {
        axios.post('/encomenda', this.novaEncomenda)
          .then(() => {
            this.fetchEncomendas();
            this.novaEncomenda.conteudo = '';
            this.novaEncomenda.dataHoraPrevista = '';
            this.novaEncomenda.dataHoraEntrega = '';
            this.novaEncomenda.valorDeclarado = null;
          })
          .catch(error => {
            console.error(error);
          });
      },
      buscarEncomenda() {
        const conteudo = this.buscaConteudo ? this.buscaConteudo : null;
        const dataHoraPrevista = this.buscaDataHoraPrevista ? this.buscaDataHoraPrevista : null;
        const params = {
          conteudo: conteudo,
          dataHoraPrevista: dataHoraPrevista
        };
        
        axios.get(`/encomenda/${params.conteudo}/${params.dataHoraPrevista}`)
          .then(response => {
            this.encomendas = response.data;
          })
          .catch(error => {
            console.error(error);
            this.encomendas = [];
          });
      },
      getStatus(encomenda) {
        if (!encomenda.dataHoraEntrega) {
          return 'Pendente';
        } else if (encomenda.dataHoraEntrega > encomenda.dataHoraPrevista) {
          return 'Entregue com atraso';
        } else {
          return 'Entregue ok';
        }
      }
    },
    mounted() {
      this.fetchEncomendas();
    }
  };
  </script>
  