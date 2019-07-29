<template>
    <b-container fluid>
                <b-row>
                    <b-col md="12" class="my-1">
                        <b-form-row>
                            <b-col md="6">
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
                                        <BaseSimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="input" :class="{' show-keyboard': isActiveKbd }"/>

                                        <b-input-group-append>
                                            <b-button :disabled="!input" @click="input = ''">Очистить</b-button>
                                            <b-button @click="toggleKeyboard"><font-awesome-icon icon="keyboard" /></b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                            <b-col md="6">
                                <b-form-group label-cols-sm="10" label="Результатов на странице:" class="mb-0">
                                    <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                                </b-form-group>
                            </b-col>
                        </b-form-row>
                    </b-col>
                </b-row>
    
            </b-container fluid>
</template>
<script>
// kb
import BaseSimpleKeyboard from "../components/BaseSimpleKeyboard";
export default {
    name: "SearchBar",
    components: {
        BaseSimpleKeyboard
    },
    data() {
        return {
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
    methods: {
        // kb
        onChange(input) {
            this.input = input;
        },
        onKeyPress(button) {
            // eslint-disable-next-line
            console.log("button", button);
        },
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