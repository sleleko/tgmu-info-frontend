<template>
    <div id="getOrd">
        <b-button variant="info" v-on:click="getOrd">Список поступающих в аспирантуру</b-button>       
        
            <b-container fluid>
                <b-row>
                    <b-col md="12" class="my-1">
                        <b-form-group label-cols-sm="3" label="Поиск по любым полям:" class="mb-0">
                        <b-input-group>
                            <b-form-input v-model="filter" placeholder="Фраза для поиска"></b-form-input>
                            <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">Очистить</b-button>
                            </b-input-group-append>
                        </b-input-group>
                        </b-form-group>
                    </b-col>

                    <b-col md="12" class="my-1">
                        <b-form-group label-cols-sm="3" label="Результатов на странице:" class="mb-0">
                        <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>
                <!-- <b-button @click="toggleBusy">Toggle Busy State</b-button> -->
            <div v-for="(items, index) in items" v-bind:key="items.id">
                <h2>{{ index }}</h2>
                
                <b-table
                    id-table="ordinators"
                    :busy.sync="isBusy"
                    show-empty
                    empty-text="Нет доступных данных для показа"
                    empty-filtered-text="Нечего не найдено"
                    stacked="md"
                    :items="items"
                    :fields="fields"
                    :current-page="currentPage"
                    :per-page="perPage"
                    :filter="filter"
                    @filtered="onFiltered"
                >
                {{ items }}
                <div slot="table-busy" class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Идёт загрузка данных...</strong>
                </div>
                <template slot="name" slot-scope="row">
                    {{ row.value.first }} {{ row.value.last }}
                </template>

                </b-table>
            </div>
                <b-row>
                    <b-col md="12" class="my-1">
                        <b-pagination
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="perPage"
                        class="my-0"
                        ></b-pagination>
                    </b-col>
                </b-row>
        
            </b-container>
        
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            isBusy: false,
            url: {
                ord: 'http://192.168.3.102:5000/ord'
            },
            fields: [
                {
                    key: 'Delo',
                    label: 'Дело номер',
                    sortable: true
                },
                {
                    key: 'FizLico',    
                    label: 'Физическое лицо',
                    sortable: true
                },
                {   
                    key: 'Grazhdanstsvo',
                    label: 'Гражданство',
                    sortable: true
                },
                {
                    key: 'NapravOrg',
                    label: 'Направляющая организация',
                    sortable: true
                },
                {
                    key: 'PrichinaOtkaza',
                    label: 'Причина отказа',
                    sortable: true
                },
                {
                    key: 'Prioritet',
                    label: 'Приоритет',
                    sortable: true
                },
                {
                    key: 'Sostoyanie',
                    label: 'Состояние',
                    sortable: true
                },
                {
                    key: 'SubjectRF',
                    label: 'Субъект РФ',
                    sortable: true
                },
                {
                    key: 'VidDocementa',
                    label: 'Вид документа',
                    sortable: true
                }
            ],
            items: [],
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 10, 15],
            filter: null
        }
        
    },
    // props: {
    //     rownum = Number
    // },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },
    methods: {
        // old varint getOrd without BusyState copy for bkp
        // getOrd() {
        //     //console.log(this.url.ord);
        //     this.isBusy = true
        //     axios.get(this.url.ord)
        //         .then((response) => {
        //         //console.log(response.data);  
        //         this.arrays = response.data;
        //         this.isBusy = false
        //     })
        //     .catch(error => {
        //         console.log('--------- error ----------------');
        //         console.log(error)
        //     })
        // },
        getOrd() {
            //console.log(this.url.ord);
            this.isBusy = true;
            let promise = axios.get(this.url.ord)

            return promise.then(response => {
                let items = response.data;
                //console.log(response.data);  
                //this.items = response.data
                this.isBusy = false;
                this.items = items;
                return items
                
                // TODO:check later for pagination
                // if (this.currentPage == 1) {
                //     $('#first').addClass('disabled');
                //     }

                //     if (this.currentPage == this.totalPage) {
                //     $('#last').addClass('disabled');
                //     }
                //     if (this.previousPage == false) {
                //     $('#previ_btn').addClass('disabled');
                //     }
                //     if (this.nextPage == false) {
                //     $('#next_btn').addClass('disabled');
                // }


                //this.isBusy = false
            }).catch(error => {
                // eslint-disable-next-line 
                console.log('--------- error ----------------');
                // eslint-disable-next-line 
                console.log(error);
                this.isBusy = false;
                return []
            })
        },

        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        }
    }
}
</script>
