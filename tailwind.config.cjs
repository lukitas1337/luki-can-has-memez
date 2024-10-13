/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',        // Ensure index.html is included
    './src/**/*.{js,jsx}', // Add jsx for React
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["acid","synthwave"],
  },
  darkMode: ['class', '[data-theme="night"]']
}
