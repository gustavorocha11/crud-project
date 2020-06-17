<template>
<div class="container">
  <div class="row mt-2">
    <div class="card w-100">
      <h1 class="text-center">FAÇA SEU CADASTRO</h1>
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

        <b-form-group class="col-6">
          <b-button type="submit" variant="primary" class="w-100">Cadastrar</b-button>
        </b-form-group>
        <b-form-group class="col-6">
          <b-button type="reset" variant="danger" class="w-100">Resetar Formulario</b-button>
        </b-form-group>

      </b-form>
    </div>
  </div>
  <div class="row mt-2">
    <table class="table">
      <thead>
        <th>Tipo de pessoa</th>
        <th>Nome</th>
        <th>Sexo</th>
        <th>E-mail</th>
        <th>Celular</th>
        <th class="text-right">Ações</th>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios"
            v-bind:key="usuario._id">
          <td>
            <span v-if="usuario.tipo_usuario === '1'">Pessoa Juridica</span>
            <span v-if="usuario.tipo_usuario === '0'">Pessoa Física</span>
          </td>
          <td>{{usuario.nome}}</td>
          <td>{{usuario.sexo}}</td>
          <td>{{usuario.email}}</td>
          <td>{{usuario.celular}}</td>
          <td class="text-right">
            <b-button variant="danger" @click="deletarUsuario(usuario._id)">
              <b-icon icon="trash"></b-icon>
              Deletar
            </b-button>

            <router-link :to="'/editar/'+usuario._id" class="btn btn-warning ml-2">
              <b-icon icon="pencil"></b-icon>
              Editar
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import axios from 'axios';
import _ from 'lodash';

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      usuarios: [],
      form: {
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
      axios({
        method: 'post',
        url: 'https://jsonbox.io/box_749478552ad9adebbca9',
        data: {
          ...this.form,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            this.usuarios.push(response.data);
            this.resetarForm(event);
          }
        });
    },
    buscaUsuarios() {
      axios({
        method: 'get',
        url: 'https://jsonbox.io/box_749478552ad9adebbca9',
      })
        .then((response) => {
          this.usuarios = response.data;
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
    deletarUsuario(id) {
      axios({
        method: 'delete',
        url: `https://jsonbox.io/box_749478552ad9adebbca9/${id}`,
      })
        .then((response) => {
          if (response.status === 200 && response.data.message === 'Record removed.') {
            // eslint-disable-next-line no-underscore-dangle
            const usuarioIndex = this.usuarios.findIndex((usuario) => usuario._id === id);
            this.usuarios.splice(usuarioIndex, 1);
          }
        });
    },
  },
  mounted() {
    this.buscaUsuarios();
  },
};
</script>

<style lang="scss" scoped>
  .card{
    padding: 20px;
  }
</style>
