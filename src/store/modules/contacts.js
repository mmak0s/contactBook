import Vue from 'vue';

export default {
    namespaced: true,
    state: {
        persons: [
            {
                photo: "/assets/person1.jpg",
                name: "Jacky Nikson",
                phoneNumber: "+1234567890"
            },
            {
                photo: "/assets/person2.jpg",
                name: "Jacky Nikson",
                phoneNumber: "+1236567220"
            },
            {
                photo: "/assets/person3.jpg",
                name: "Jacky Nikson",
                phoneNumber: "+1224567850"
            }
        ],
        history: {
            oldParam: {
                key: "",
                value: ""
            },
            newParam: {
                key: "",
                value: ""
            }
        }
    },
    getters: {
        persons(state){
            return state.persons;
        },
        person: (state) => (id) => {
            return state.persons[id];
        }
    },
    mutations: {
        deletePerson(state, payload){
            if(confirm("Удалить контакт?")){ // получаем подтверждение действия
                state.persons.splice(payload.index, 1); // удаляем объект контакта из массива контактов
            }
        },
        addPerson(state, payload){
            // добавляем контакт
            state.persons.push({
                // id: newId,
                name: payload.name,
                phoneNumber: payload.phone
            });
        },
        removeParam(state, payload){
            if(confirm("Удалить поле?")){
                //Инициализируем изменение в истории
                state.history.oldParam.key = payload.key;
                state.history.oldParam.value = payload.value;
                state.history.newParam.key = "";
                state.history.newParam.value = ""; 
                
                //Удаляем поле
                Vue.delete(state.persons[payload.index], payload.key);
            }
        },
        addParam(state, payload){ 
            //Инициализируем изменение в истории
            state.history.newParam.key = payload.key;
            state.history.newParam.value = payload.value;
            state.history.oldParam.key = "";
            state.history.oldParam.value = "";
            
            //Добавляем поле
            Vue.set(state.persons[payload.index], payload.key, payload.value);
            
        },
        pushRedactedParam(state, payload){
            //Инициализируем изменение в истории
            state.history.oldParam.key = payload.oldKey;
            state.history.oldParam.value = payload.oldValue;
            state.history.newParam.key = payload.newKey;
            state.history.newParam.value = payload.value;

            //Удаляем старое поле
            Vue.delete(state.persons[payload.index], payload.oldKey);

            //Добавляем новое поле
            Vue.set(state.persons[payload.index], payload.newKey, payload.value);
        },
        returnBack(state, payload){
            if (state.history.oldParam.key != "") { // проверяем наличие старого поля в истории изменений
                if (state.history.newParam.key != "") { // проверяем наличие нового поля в истории изменений
                    // Соответственно логике приложения, это значит что последнее действие было редактирование поля, удаляем новое поле и добавляем старое
                    Vue.delete(state.persons[payload.index], state.history.newParam.key);
                    Vue.set(state.persons[payload.index],state.history.oldParam.key, state.history.oldParam.value);
                }else{
                    // Соответственно логике приложения, это значит что последнее действие было удаление поля, добавляем старое поле
                    Vue.set(state.persons[payload.index],state.history.oldParam.key, state.history.oldParam.value);
                }
            }else{
                if (state.history.newParam.key != "") { // проверяем наличие нового поля в истории изменений при том что старое поле отсутствует
                    // Соответственно логике приложения, это значит что последнее действие было добавление поля, удаляем новое поле
                    Vue.delete(state.persons[payload.index], state.history.newParam.key);
                }
            }
        }
    },
    actions: {
        deletePerson(state, payload){
            state.commit("deletePerson", payload);
        },
        addPerson(state, payload){
            state.commit("addPerson", payload);
        },
        removeParam(state, payload){
            state.commit("removeParam", payload);
        },
        addParam(state, payload){
            state.commit("addParam", payload);
        },
        pushRedactedParam(state, payload){
            state.commit("pushRedactedParam", payload);
        },
        returnBack(state, payload){
            state.commit("returnBack", payload);
        }
    }
}