/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,html}"],
  darkMode: "class",  
  prefix: "tw-",
  theme: {
    colors: {
      'bg-primary': '#F5F5F5',
      'bg-secondary': '#E0E0E0',
      'accent': '#4F8BF9',
      'font': '#333333',
      'interactive': '#30A7A0',
      
      'dark-primary-bg': '#2B2B2B',
      'dark-secondary-bg': '#3C3F41',
      'dark-accent': '#FFA726',
      'dark-text': '#D3D3D3',
      'dark-interactive': '#00BCD4',
      grey: {
        "050": "#F7F7F7",
        "100": "#E1E1E1",
        "200": "#CFCFCF",
        "300": "#B1B1B1",
        "400": "#9E9E9E",
        "500": "#7E7E7E",
        "600": "#626262",
        "700": "#515151",
        "800": "#3B3B3B",
        "900": "#222222",
      }
    },
    fontFamily: {
      'mono': ['"Courier New"', 'Courier', 'monospace'],
    },
  }
}
