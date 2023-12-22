/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        vividOrange: "#FF7A00",
      },
      backgroundImage:{
        linearColor: "linear-gradient(180deg, #ED2B00, #03019B)",
        'mydo-logo': "url('Images/mydo.jpg')"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}

