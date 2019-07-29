<template>
    <div>
        <h2> Выберите интересующий уровень подготовки: </h2>
        <b-container>
        <b-row>
            <b-col sm="6">
                <div class="mt-4">
                    <b-button variant="info" :to="{ path: '/GetLists/Vpo' }">Список поступающих на специалитет/бакалавриат</b-button>
                </div>
            </b-col>
            <b-col sm="6">
                <div class="mt-4">
                    <b-button variant="danger" :to="{ path: '/GetLists/Mag' }">Список поступающих в Магистратуру</b-button>
                </div>
            </b-col>
            <b-col sm="6">
                <div class="mt-4">
                    <b-button variant="warning" :to="{ path: '/GetLists/Ord' }">Список поступающих в Ординатуру</b-button>
                </div>
            </b-col>
            <b-col sm="6">
                <div class="mt-4">
                    <b-button variant="success" :to="{ path: '/GetLists/Asp' }" disabled="">Список поступающих в Аспирантуру</b-button>
                </div>
            </b-col>
        </b-row>
        </b-container>
    </div>
</template>
<script>
export default {
    name: 'GetLists',
    props: {
        typeList: String
    }
}
</script>
<style scoped>
    /* .sizing {
        width: 20em;
        height: 5em;
    } */
    a.btn {
        width: 17em;
    }
    .btn-warning {
        color: #fff;
        background-color: #776466;
        border-color: #776466;
    }
    .btn-warning:hover {
        color: #fff;
        background-color: #554849;
        border-color: #554849;
    }
    .btn-success {
        color: #fff;
        background-color: #6c774c;
        border-color: #6c774c;
    }
    .btn-success:hover {
        color: #fff;
        background-color: #4b5237;
        border-color: #4b5237;
    }
</style>
