import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Contacts from "./components/contacts.vue";
import Contact from "./components/contact.vue";

const routes = [
    {
        path: "",
        redirect: {name: "contacts"}
    },
    {
        path: "/contacts",
        component: Contacts,
        name: "contacts"
    },
    {
        path: "/contact/:id",
        component: Contact,
        name: "contact"
    }
];

export const router = new VueRouter({
    routes,
    mode: "history"
});