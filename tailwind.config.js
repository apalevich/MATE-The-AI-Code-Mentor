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
    },
    fontFamily: {
      'mono': ['"Courier New"', 'Courier', 'monospace'],
    },
  }
}
