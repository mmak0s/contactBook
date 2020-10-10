<template>
    <div>
        <h3>Contact {{contact.name}} <span @click="createParam">+</span><span @click="back">back</span></h3>
        <div class="contact-data">
            <img :src="contact.photo" alt="Photo">
            <table class="params">
                <tr 
                    v-for="(item, key, index) in contact"
                    :key="index">
                    <td>{{key}}</td>
                    <td>{{item}}</td>
                    <td>
                        <div class="contacts-list__item-buttons">
                            <div class="contacts-list__item-button redact"  @click.prevent="redactParam(key, item)">
                                <span>
                                    ...
                                </span>
                            </div>
                            <div class="contacts-list__item-button destroy"  @click.prevent="deleteParam(key, item)">
                                <span>
                                    -
                                </span>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr v-if="newParam" class="newParam-fields">
                    <input type="text" placeholder="Название" v-model="newParamtKey">
                    <input type="text" placeholder="Значение" v-model="newParamtValue">
                    <div class="contacts-list__item-buttons">
                        <div class="contacts-list__item-button confirm"  @click.prevent="sendParam">
                            +
                        </div>
                        <div class="contacts-list__item-button destroy"  @click="newParam = false">
                            -
                        </div>
                    </div>
                </tr>
                <tr v-if="redactingParam" class="newParam-fields">
                    <input type="text" id="redParamField1" placeholder="Название" v-model="redactingParamtKey">
                    <input type="text" id="redParamField2" placeholder="Значение" v-model="redactingParamtValue">
                    <div class="contacts-list__item-buttons">
                        <div class="contacts-list__item-button confirm"  @click.prevent="sendRedaction">
                            +
                        </div>
                        <div class="contacts-list__item-button destroy"  @click="cancelRedaction">
                            -
                        </div>
                    </div>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
    data () {
        return {
            newParam: false,
            newParamtKey: "",
            newParamtValue: "",
            redactingParam: false,
            redactingParamtKey: "",
            redactingParamtValue: "",
            lastAction: {
                key: "",
                value: ""
            }
        }
    },
    methods: {
        ...mapActions("contacts", { // получаем actions из склада
            removeParam: "removeParam",
            addParam: "addParam",
            pushRedactedParam: "pushRedactedParam",
            returnBack: "returnBack"
        }),
        deleteParam(key, item){
            this.removeParam({key: key, value: item, index: this.id}); // вызываем экшн removeParam мутации removeParam, которая удаляет поле
        },
        createParam(){
            this.newParam = true; // отображаем поля для ввода данных нового поля
        },
        sendParam(){
            this.addParam({ // вызываем экшн addParam мутации addParam, которая создаёт поле, как нагрузку принимает новый ключ, новое значение и айди контакта который изменяется
                key: this.newParamtKey,
                value: this.newParamtValue,
                index: this.id
            });
            // стираем данные последнего созданного поля
            this.newParamtKey = ""; 
            this.newParamtValue = "";

            this.newParam = false; // снимаем видимость полей для ввода данных нового поля
        },
        redactParam(key,item){
            this.redactingParam = true; // отображаем поля для редактирования данных поля

            // помещаем в поля для ввода текущие данные изменяемого поля
            this.redactingParamtKey = key;
            this.redactingParamtValue = item;

            // сохраняем эти данные в отдельном свойстве, дабы получить к ним доступ извне тела цикла по отображению полей
            this.lastAction.key = key;
            this.lastAction.value = item;
        },
        sendRedaction(key){
            this.pushRedactedParam({ // вызываем экшн pushRedactedParam мутации pushRedactedParam, которая создаёт новое поле удаляя редактируемое, что создаёт видимость редактирования старого поля
                oldKey: this.lastAction.key,
                oldValue: this.lastAction.value,
                newKey: this.redactingParamtKey,
                value: this.redactingParamtValue,
                index: this.id
            });

            this.redactingParamtKey = "";
            this.redactingParamtValue = "";

            this.redactingParam = false;
        },
        cancelRedaction(){
            if (confirm("Отменить изменения?")) { // получаем подтверждение действия
                this.redactingParam = false;
            }
        },
        back(){
            this.returnBack({// вызываем экшн returnBack мутации returnBack, которая отменяет последнее действие пользователя, будь то редактирование, удаление или добавление поля.
                index: this.id
            });
        }
    },
    computed: {
        ...mapGetters("contacts", {
            person: "person" // через геттер получаем массив контактов
        }),
        id(){
            return this.$route.params.id; // получаем id контакта на который перешли через vue-router
        },
        contact(){
            return this.person(this.id); // получаем объект с данными контакта на странице которого находимся из склада
        }
    }
}
</script>

<style lang="scss">
    h3{
        font-weight: 500;
        span{
            color: #fff;
            font-size: 1.8rem;
            padding: 2px 8px;
            border-radius: 3px;
            background: rgb(41, 158, 61);
            text-align: center;
            margin-left: 10px;
            cursor: pointer;
        }
    }
    .contact-data{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 30px;
        img{
            width: 300px;
        }
        
        .params{
            width: 100%;
            tr{
                display: flex;
                margin-bottom: 10px;
                justify-content: space-between;
            }
        }
    }
    .contacts-list__item-buttons{
        display: flex;
        justify-content: flex-end;
        .contacts-list__item-button.confirm{
            margin-right: 6px;
        }
    }
    .contacts-list__item-button{
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 20px;
        height: 20px;
        margin-right: 6px;
        border-radius: 50%;
        color: #fff;
        font-size: 2rem;
        text-align: center;
        &.destroy{
            background: rgb(206, 50, 50);
        }
        &.confirm{
            background: rgb(41, 158, 61);
        }
        &.redact{
            background: rgb(216, 231, 4);
        }
    }
</style>