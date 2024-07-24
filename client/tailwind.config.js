/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", //this is basically check the index.html file ,,,,also all the file inside the src folder and any tailwind css class you add is going to be detected and css equivalent of that is going to be created
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
