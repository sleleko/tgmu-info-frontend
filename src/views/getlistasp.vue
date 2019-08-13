<template>
    <div id="getAsp">
        <h2>Список поступающих в Аспирантуру</h2>
                
            <b-container fluid>
                <b-row>
                    <b-col md="12" class="my-1">
                        <b-form-row>
                            <!-- <b-col md="8"> -->
                            <b-col md="12">
                                <b-form-group label-cols-lg="1" label="Поиск:" class="mb-10">
                                    <b-input-group > 
                                        <input
                                            :value="input"
                                            class="input form-control"
                                            @input="onInputChange"
                                            placeholder="Фраза для поиска"
                                            >
                                        <BaseSimpleKeyboard @onChange="onChange" :input="input" :class="{' show-keyboard': isActiveKbd }"/>

                                        <b-input-group-append>
                                            <b-button :disabled="!input" @click="input = ''">Очистить <font-awesome-icon icon="trash-alt" /></b-button>
                                            <b-button variant="success" @click="toggleKeyboard">Показать/скрыть клавиатуру <font-awesome-icon icon="keyboard" /></b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                        </b-form-row>
                    </b-col>
                </b-row>
    
            </b-container fluid>
            <b-container fluid>
                <b-row>
                    <b-table
                        striped
                        responsive
                        show-empty
                        :items="items"
                        :fields="fields"
                        :current-page="currentPage"
                        :per-page="perPage"
                        primary-key="index"
                        :busy.sync="isBusy"
                        :filter="input"
                        empty-text="Нет доступных данных для показа"
                        empty-filtered-text="Нечего не найдено"
                        @filtered="onFiltered"
                    >
                    <template slot="index" slot-scope="data">
                        {{ data.index + 1 }}
                    </template>
                    <!-- custom emty textx slots -->
                    <template slot="empty" slot-scope="scope">
                    <h4>{{ scope.emptyText }}</h4>
                    </template>
                    <template slot="emptyfiltered" slot-scope="scope">
                    <h4>{{ scope.emptyFilteredText }}</h4>
                    </template>
                    <!-- end custom slots -->
                    <!-- {{ items }} -->
                    <!-- table busy slots -->
                    <div slot="table-busy" class="text-center text-danger my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>Идёт загрузка данных...</strong>
                    </div>
                    <!-- end table busy slots -->
                    
                    <!-- temp disbale -->
                    <!-- <template slot="name" slot-scope="row">
                        {{ row.value.first }} {{ row.value.last }}
                    </template> -->
                    
                    </b-table>
                </b-row>
                <b-row v-show="isLoaded">
                    <b-col md="12" class="my-1">
                        <b-pagination
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="perPage"
                        class="my-0"
                        align="center"
                        ></b-pagination>
                    </b-col>
                </b-row>
        
            </b-container fluid>
        
    </div>
</template>
<script>
import axios from 'axios';
import BaseSimpleKeyboard from "../components/BaseSimpleKeyboard";

import "../App.css";

export default {
    name: "GetListAsp",
    components: {
        BaseSimpleKeyboard
    },
    data() {
        return {
            fields: [
                {
                    key: 'index',
                    label: '#',
                    sortable: true
                },
                {
                    key: 'FizLico',    
                    label: 'Физическое лицо',
                    sortable: true
                },
                {
                    key: 'Specialnost',
                    label: 'Конкурсная группа',
                    sortable: true
                },
                {
                    key: 'Profile',
                    label: 'Профиль',
                    sortable: true
                },
                {   
                    key: 'SummaBallov',
                    label: 'Сумма баллов',
                    sortable: true
                },
                {
                    key: 'Predmet1',
                    label: 'Дисциплина специальности',
                    sortable: true
                },
                {
                    key: 'Predmet2',
                    label: 'Иностранный язык',
                    sortable: true
                },
                {
                    key: 'Predmet3',
                    label: 'Филосовия',
                    sortable: true
                },
                {
                    key: 'SummaBallovIDKonkyrs',
                    label: 'Сумма баллов за ИД (Конкурсные)',
                    sortable: true
                },
                {
                    key: 'VidDocementa',
                    label: 'Вид документа об образовании',
                    sortable: true
                },
                {
                    key: 'SoglasieNaZachislenie',
                    label: 'Согласие на зачисление',
                    sortable: true
                }
            ],
            items: [],
            isBusy: false,
            isLoaded: false,
            filterValue: [],
            url: {
                asp: 'http://192.168.2.150:8181/asp'
            },
            totalRows: null,
            currentPage: 1,
            perPage: 15,
            pageOptions: [50, 100, 150, 300, 1000],
            filter: null,
            // kb
            input: '',
            isActiveKbd: false
            
        }
        
    },
    created: function () {
        this.isBusy = true;
        // this code for autoload GetListAsp
        this.getAsp();
        // console.log(this.items.length)

        
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      },
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.items.length
    }, 
    methods: {
        getAsp() {
            let promise = axios.get(this.url.asp);
            return promise.then (resp => {
                    let items = resp.data;
            this.isBusy = false;
            this.isLoaded = true;
                  //console.log(items)
            this.items = items
            //console.log(items.length)
            // init pagination on load
            this.totalRows = this.items.length
            return this.items
            }).catch (error => {
                    // eslint-disable-next-line 
                    console.log('--------- error ----------------');
                    // eslint-disable-next-line 
                    if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // eslint-disable-next-line
                    console.log(error.response.data);
                    // eslint-disable-next-line
                    console.log(error.response.status);
                    // eslint-disable-next-line
                    console.log(error.response.headers);
                    } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    // eslint-disable-next-line
                    console.log(error.request);
                    } else {
                    // Something happened in setting up the request that triggered an Error
                    // eslint-disable-next-line
                    console.log('Error', error.message);
                    }
                    // eslint-disable-next-line
                    console.log(error.config);
                    this.isBusy = false;
                    
            return [];
            })
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            //console.log(this.totalRows)
            this.currentPage = 1
        },
        // kb
        onChange(input) {
            this.input = input;
        },
        onInputChange(input) {
            this.input = input.target.value;
        },
        toggleKeyboard() {
            this.isActiveKbd = !this.isActiveKbd;
        }
    }
}
</script>
<style>
.table {
        font-size: 10px;
    }
</style>
<style scoped>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .simple-keyboard {
        position: absolute;
        width: 140%;
        opacity: 0;
        top: -100em;
        transition: top 0s ease-in-out 0.3s, opacity 0.3s ease-in-out;
    }
    .simple-keyboard.hg-theme-default {
        background-color: rgba(0,0,0,.6);
    }

    .show-keyboard {
        opacity: 1;
        /* margin-top: 0; */
        position: absolute;
        top:3em;
        z-index: 3;
    }

    .hg-button span {
        pointer-events: none;
    }
</style>