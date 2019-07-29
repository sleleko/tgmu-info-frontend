<template>
    <div id="menu">
        <h1>{{ msg }}</h1>

        <h3>Выберите интересующий Вас раздел:</h3>
        <div class="mt-3">
          <b-button-group size="lg">
            <b-button variant="success" :to="{ path: 'ShowVideo' }" disabled="">Видеоролик о нашем вузе <font-awesome-icon icon="video" /></b-button>
            <b-button variant="info" :to="{ path: 'GetHelp' }" disabled="">Справочная информация о поступлении <font-awesome-icon icon="keyboard" /></b-button>
            <b-button variant="warning" :to="{ path: 'getlists' }">Списки поступающих <font-awesome-icon icon="list" /></b-button>
          </b-button-group>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MainMenu',
    props: {
        msg: String
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
a.btn-success, a.btn-info {
    color: #ffffff;
}
a.btn-warning {
    color:#000
}
</style>
