/** @type {import ('tailwindcss').Config;} */

import themes from 'daisyui/theme/object';

export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme : {
    extend : {},
  },
  plugins : [require("daisyui")],
  daisyui : {
    themes : [
      {
        tracer : {
          "primary" : "#2563eb"
        }
      }
    ]
  }
}