<template>
    <div>
        <h3>Contacts <span @click="createContact">+</span></h3>
        <table class="contacts-list">
                <router-link 
                            class="contacts-list__item" 
                            v-for="(item, index) in persons"
                            :key="index"
                            :to="'/contact/' + index" 
                            tag="tr" >
                    <!-- <div class="contacts-list__item-photo">
                        <img :src="item.photo" alt="Photo">
                    </div> -->
                    <td class="contacts-list__item-name">
                        {{item.name}}
                    </td>
                    <td class="contacts-list__item-number">
                        {{item.phoneNumber}}
                    </td>
                    <td class="contacts-list__item-button destroy" @click.prevent="removeContact(index)">
                        -
                    </td>
                </router-link>
                <tr class="contacts-list__item" v-if="newContact">
                    <input type="name" placeholder="Имя контакта" v-model="newContactName">
                    <input type="phone" placeholder="Номер телефона" v-model="newContactPhone">
                    <div class="contacts-list__item-buttons">
                        <div class="contacts-list__item-button confirm"  @click.prevent="sendContact">
                            +
                        </div>
                        <div class="contacts-list__item-button destroy"  @click="newContact = false">
                            -
                        </div>
                    </div>
                </tr>
        </table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
    data () {
        return {
            newContact: false,
            newContactName: "",
            newContactPhone: ""
        }
    },
    methods: {
        ...mapActions("contacts", { // получаем actions из склада
            remove: "deletePerson",
            create: "addPerson"
        }),
        removeContact(idx){
            this.remove({index: idx}); // вызываем экшн deletePerson мутации deletePerson
        },
        createContact(){
            this.newContact = true;
        },
        sendContact(){
            this.create({ // вызываем экшн addPerson мутации addPerson
                name: this.newContactName,
                phone: this.newContactPhone
            });
            this.newContactName = ""; // стираем данные последнего созданного контакта
            this.newContactPhone = "";
            this.newContact = false; // снимаем видимость полей для ввода данных нового контакта
        }
    },
    computed: {
        ...mapGetters("contacts", {
            persons: "persons" // через геттер получаем массив контактов
        })
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
  .contacts-list{
      width: 100%;
      .contacts-list__item{
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          align-items: center;
          padding: 10px 20px;
          border: 1px solid rgb(197, 197, 197);
          cursor: pointer;

          &:not(:last-child){
              border-bottom:  none;
          }

          .contacts-list__item-number{
              text-align: center;
          }
          .contacts-list__item-buttons{
              display: flex;
              justify-content: flex-end;
              .contacts-list__item-button.confirm{
                  margin-right: 10px;
              }
          }
          .contacts-list__item-button{
              justify-self: right;
          }

          .contacts-list__item-photo{
              img{
                max-width: 50px;
                border-radius: 30px;
              }
          }
          input{
              border: 1px solid rgb(197, 197, 197);
              padding: 10px 20px;
              border-radius: 30px;
          }
      }
  }
  .contacts-list__item-button{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
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
    }
</style>