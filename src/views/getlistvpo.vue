<template>
    <div id="getVpo">
        <h2>Список поступающих на Специалитет/Бакалавриат</h2>
                
            <b-container fluid>
                <b-row>
                    <b-col md="12" class="my-1">
                        <b-form-row>
                            <b-col md="8">
                                <b-form-group label-cols-lg="1" label="Поиск:" class="mb-10">
                                    <b-input-group > 
                                        <!-- <b-form-input 
                                            v-model="filter" 
                                            placeholder="Фраза для поиска"
                                            :value="input"
                                            class="input"
                                            @input="onInputChange"
                                            >
                                        </b-form-input> -->
                                        <!-- <b-form-input 
                                            
                                            placeholder="Фраза для поиска"
                                            :value="input"
                                            class="input"
                                            @input="onInputChange"
                                            >
                                        </b-form-input> -->
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
                            <b-col md="4">
                                <b-form-group label-cols-sm="8" label="Результатов на странице:" class="mb-0">
                                    <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
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
    name: "GetListVpo",
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
                    key: 'KonkursGruppa',
                    label: 'Конкурсная группа',
                    sortable: true
                },
                {
                    key: 'Delo',
                    label: 'Номер дела',
                    sortable: true
                },
                
                {   
                    key: 'SummaBallov',
                    label: 'Сумма баллов',
                    sortable: true
                },
                {
                    key: 'Predmet1',
                    label: 'Химия',
                    sortable: true
                },
                // {
                //     key: 'FormaIspytaniy1',
                //     label: 'Тип вступ. испыт.',
                //     sortable: true
                // },
                {
                    key: 'Predmet2',
                    label: 'Биология',
                    sortable: true
                },
                // {
                //     key: 'FormaIspytaniy2',
                //     label: 'Тип вступ. испыт.',
                //     sortable: true
                // },
                {
                    key: 'Predmet3',
                    label: 'Русский язык',
                    sortable: true
                },
                {
                    key: 'FormaIspytaniy3',
                    label: 'Тип вступ. испыт.',
                    sortable: true
                },
                {
                    key: 'SummaBallovIDKonkyrs',
                    label: 'Сумма баллов за ИД (Конкурсные)',
                    sortable: true
                },
                {
                    key: 'EstPreimPravo',
                    label: 'Есть преим. право',
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
                },
                {
                    key: 'NapravOrg',
                    label: 'Направляющая организация',
                    sortable: true
                }
            ],
            items: [],
            isBusy: false,
            isLoaded: false,
            filterValue: [],
            url: {
                mag: 'http://192.168.2.150:8181/vpo'
                // mag: 'http://192.168.20.37:5000/vpo'
                // mag: ''
            },
            totalRows: null,
            currentPage: 1,
            perPage: 50,
            pageOptions: [50, 100, 150, 300, 1000],
            filter: null,
            // kb
            input: '',
            isActiveKbd: false
            
        }
        
    },
    created: function () {
        this.isBusy = true;
        // this code for autoload GetListMag
        this.getVpo();
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
        getVpo() {
            let promise = axios.get(this.url.mag);
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
            // возвращает кол-во записей в таблице после фильтрации
            //console.log(filteredItems.length)
            // возвращает массив полей и значений таблицы
            //console.log(filteredItems[1])
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            //console.log(this.totalRows)
            this.currentPage = 1
        },
        // kb
        onChange(input) {
            this.input = input;
        },
        // onKeyPress(button) {
        //     // eslint-disable-next-line
        //     console.log("button", button);
        // },
        onInputChange(input) {
            this.input = input.target.value;
        },
        toggleKeyboard() {
            this.isActiveKbd = !this.isActiveKbd;
        }
        // onFocus() {
        //     this.focused = true
        // },
        // onBlur() {
        //     this.focused = false
        // }
        
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
        /* max-width: 850px; */
        opacity: 0;
        /* margin-top: -200%; */
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

    /* simple-keyboard.hg-theme-default {
        background-color: rgba(0,0,0,.2);
        padding: 5px;
        border-radius: 5px;
    }
    .simple-keyboard {
        max-width: 850px;
        position: absolute;
        display: block;
        z-index: 1;
        top: 3em;
    } */
</style>
