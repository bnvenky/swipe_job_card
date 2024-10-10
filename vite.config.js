import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'


const manifestForPlugin = {
  registerType: "prompt",
  includeAssets: ['favicon.ico', "apple-touc-icon.png", "masked-icon.png" ],
  manifest: {
    name: "Job Application",
    short_name: "Job app",
    description: "An app that can show the Job card details.",
    icons: [
      
      {
        src: "",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "",
        sizes: "512x512",
        type: "image/png",
        purpose:'favicon'
      },
      {
        src: '',
        sizes:'180x180',
        type:'image/png',
        purpose:'apple touch icon',
      },
      {
        src: "",
        sizes: "144x144",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "",
        sizes: "256x256",
        type: "image/png",
        purpose: "icon"
      },
      {
        src: "",
        sizes: "384x384",
        type: "image/png",
        purpose: "any maskable"
      }
    ],
    theme_color: "#181818",
    background_color: "#e8eac2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};



// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), VitePWA(manifestForPlugin)],
});