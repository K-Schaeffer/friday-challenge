import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/apollo", "@nuxtjs/tailwindcss"],
  apollo: {
    clients: {
      default: { httpEndpoint: process.env.SERVER_URL || "" },
    },
  },
});
