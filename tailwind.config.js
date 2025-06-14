module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: ({ theme }) => ({
        fuchsia: {
          css: {
            '--tw-prose-links': theme('colors.fuchsia.700'),
            '--tw-prose-headings': theme('colors.fuchsia.800'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};