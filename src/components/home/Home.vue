<template>
  <div>
    <h1 class="centralizado" v-text="titulo"></h1>
    <p class="centralizado" v-show="mensagem"> {{ mensagem }}</p>

    <input type="text" class="filtro" @input="filtro = $event.target.value" placeholder="search">

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
        <meu-painel :titulo="foto.titulo">
            <imagem-responsiva v-meu-transform:scale.animate="2" :url="foto.url" :titulo="foto.titulo"/>
            <router-link :to="{ name: 'altera', params: {id: foto._id} }">
              <meu-botao tipo="button" rotulo="ALTERAR" />
            </router-link>
            <meu-botao tipo="button" rotulo="REMOVER" @botaoAtivado="remove(foto)" :confirmacao="true"  estilo="perigo" />
        </meu-painel>
      </li>
    </ul>

  </div>
</template>

<script>
// importation of the Painel component
// It needs the same name of the file
import Painel from '../shared/painel/Painel';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva';
import Botao from '../shared/botao/Botao';
import FotoService from '../../domain/foto/FotoService.js';

//directive
import transform from '../../directives/Transform';

export default {
  // we need to add a component propertie and give an alias to the component
  // so it can be used on the template of its father
  components: {
    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao': Botao
  },
  directives: {
    'meu-transform': transform
  },

  data(){
    return {
      titulo: 'Alurapic',
      fotos: [],
      filtro: '',
      mensagem: ''
    }
  },
  computed: {
    fotosComFiltro(){
      if(this.filtro){
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      }
      if(!this.filtro){
        return this.fotos;
      }
    }
  },
  methods: {
    remove(foto){

      this.service.apaga(foto._id)
        .then(()=> {
          let indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice, 1);
          this.mensagem = 'Foto removida com sucesso';
        }, err => {
          this.mensagem = err.message;
        });
    }
  },
  created() {

    this.service = new FotoService(this.$resource);
    this.service
      .lista()
      .then(fotos => this.fotos = fotos, err => this.mensagem = err.message);

  }
}
</script>

<style>

  .centralizado {
    text-align: center;
  }

  .lista-fotos {
    list-style: none;
  }
  .lista-fotos-item {
    display: inline-block;
  }

  .filtro {
    display: block;
    width: 100%;
  }
</style>
