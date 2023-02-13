import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  modules: ["@nuxtjs/apollo", "@nuxtjs/tailwindcss"],
  apollo: {
    clients: {
      default: { httpEndpoint: process.env.SERVER_URL || "" },
    },
  },
});
