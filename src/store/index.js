import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import contacts from "./modules/contacts";
import contact from "./modules/contact";

export const store = new Vuex.Store({
    modules: {
        contacts,
        contact
    },
    strict: process.env.NODE_ENV !== 'production'
});