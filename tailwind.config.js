/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'client-info': "url('../public/reports/report_bg.png')",
      }
    },
  },
  plugins: [],
}
