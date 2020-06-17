<template>
<div class="container">
  <div class="row mt-2">
    <div class="card w-100">
      <h1 class="text-center">EDITE SEU CADASTRO</h1>
      <b-form class="row" @submit="enviaFormulario" @reset="resetarForm">
        <b-form-group label="Tipo de pessoa:" class="col-3">
          <b-form-select
            v-model="form.tipo_usuario"
            :options="options_tipo_usuario"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group label="CNPJ:" class="col-12" v-if="form.tipo_usuario === '1'">
          <the-mask :mask="['##.###.###/####-##']"
            class="form-control"
            required
            v-model="form.cnpj"
          />
        </b-form-group>

        <b-form-group label="Razão social:" class="col-12" v-if="form.tipo_usuario === '1'">
          <b-form-input
            type="text"
            required
            placeholder="Digite a razão social da empresa"
            v-model="form.razao_social"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Nome:" class="col-9">
          <b-form-input
            type="text"
            required
            placeholder="Digite o nome"
             v-model="form.nome"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="CPF:" class="col-4" v-if="form.tipo_usuario === '0'">
          <input type="text" class="form-control"  v-mask="'###.###.###-##'"
          required
           v-model="form.cpf">
        </b-form-group>

        <b-form-group label="Sexo:" class="col-4" v-if="form.tipo_usuario === '0'">
          <b-form-select
            v-model="form.sexo"
            :options="options_sexo"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group label="Data de nascimento:" class="col-4" v-if="form.tipo_usuario === '0'">
          <input type="text" class="form-control"  v-mask="'##/##/####'"
          required
          v-model="form.data_nascimento">
        </b-form-group>

        <b-form-group label="E-mail:" class="col-12">
          <b-form-input
            type="email"
            placeholder="Digite o seu E-mail"
             v-model="form.email"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Telefone:" class="col-6">
          <input type="text" class="form-control"  v-mask="'(##) ####-####'"
           v-model="form.telefone">
        </b-form-group>

        <b-form-group label="Celular:" class="col-6">
          <input type="text" class="form-control"  v-mask="'(##) #####-####'"
           v-model="form.celular">
        </b-form-group>

        <b-form-group label="CEP:" class="col-4">
          <b-form-input
            type="text"
            required
            placeholder="Digite o CEP da residência"
            v-mask="'#####-###'"
            v-model="form.endereco.cep"
            v-on:input="buscaEndereco"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Rua:" class="col-4">
          <b-form-input
            type="text"
            required
            placeholder="Digite o seu endereço"
            v-model="form.endereco.rua"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Bairro:" class="col-4">
          <b-form-input
            type="text"
            required
            placeholder="Digite o seu endereço"
            v-model="form.endereco.bairro"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Número:" class="col-4">
          <b-form-input
            type="text"
            required
            placeholder="Digite o número da residência"
            v-model="form.endereco.numero"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Cidade:" class="col-4">
          <b-form-input
            type="text"
            required
            placeholder="Digite o nome da sua cidade"
            v-model="form.endereco.cidade"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Estado:" class="col-4">
          <b-form-input
            type="text"
            required
            placeholder="Digite o seu estado"
            v-model="form.endereco.estado"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Complemento:" class="col-12">
          <b-form-input
            type="text"
            placeholder="Digite o complemento"
            v-model="form.endereco.complemento"
          ></b-form-input>
        </b-form-group>

        <b-form-group class="col-12">
          <b-button type="submit" variant="primary" class="w-100">Editar</b-button>
        </b-form-group>
      </b-form>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import axios from 'axios';
import _ from 'lodash';

export default {
  name: 'Edit',
  components: {
  },
  data() {
    return {
      form: {
        _id: '',
        tipo_usuario: null,
        nome: '',
        razao_social: '',
        cpf: '',
        cnpj: '',
        sexo: null,
        data_nascimento: '',
        email: '',
        telefone: '',
        celular: '',
        endereco: {
          rua: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          estado: '',
          cep: '',
        },
      },
      options_tipo_usuario: [{ text: 'Selecione uma opção', value: null }, { text: 'Pessoa Física', value: '0' }, { text: 'Pessoa Juridica', value: '1' }],
      options_sexo: [{ text: 'Selecione uma opção', value: null }, { text: 'Masculino', value: 'M' }, { text: 'Feminino', value: 'F' }],
    };
  },
  methods: {
    // eslint-disable-next-line func-names
    buscaEndereco: _.debounce(function () {
      if (this.form.endereco.cep.length === 9) {
        axios.get(`https://viacep.com.br/ws/${this.form.endereco.cep}/json/`).then((response) => {
          this.form.endereco.rua = response.data.logradouro;
          this.form.endereco.bairro = response.data.bairro;
          this.form.endereco.cidade = response.data.localidade;
          this.form.endereco.estado = response.data.uf;
        });
      }
    }, 500),
    enviaFormulario(event) {
      event.preventDefault();
      const { id } = this.$route.params;
      axios({
        method: 'put',
        url: `https://jsonbox.io/box_749478552ad9adebbca9/${id}`,
        data: {
          ...this.form,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ name: 'Home' });
          }
        });
    },
    buscaUsuarios() {
      const { id } = this.$route.params;
      axios({
        method: 'get',
        url: `https://jsonbox.io/box_749478552ad9adebbca9/${id}`,
      })
        .then((response) => {
          if (response.status === 200) {
            this.form = response.data;
          }
        });
    },
    resetarForm(event = null) {
      event.preventDefault();
      this.form = {
        tipo_usuario: null,
        nome: '',
        razao_social: '',
        cpf: '',
        cnpj: '',
        sexo: null,
        data_nascimento: '',
        email: '',
        telefone: '',
        celular: '',
        endereco: {
          rua: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          estado: '',
          cep: '',
        },
      };
    },
  },
  mounted() {
    this.buscaUsuarios();
  },
};
</script>
