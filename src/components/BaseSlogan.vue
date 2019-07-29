<template>
    <div id="slogan"  class="mt-3">
        <h1>{{ msg }}</h1>
        <h6>{{ disclaimer }}</h6>

        <!-- <h3>Выберите интересующий Вас раздел:</h3>
        <div class="mt-3">
          <b-button-group size="lg">
            <b-button variant="success">Видеоролик о нашем вузе</b-button>
            <b-button variant="info">Справочная информация о поступлении</b-button>
            <b-button variant="warning">Списки поступающих</b-button>
          </b-button-group>
        </div> -->
    </div>
</template>
<script>
export default {
    name: 'MainMenu',
    props: {
        msg: String,
        disclaimer: String
    }
}
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
