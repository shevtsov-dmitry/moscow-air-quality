/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx, css, scss}'],
    theme: {
        extend: {
            fontFamily: {
                // 'circ-book': ['circ-book', 'sans-serif'],
            },
            screens: {
                laptop: '1600px',
                mobile: '800px',
            },
        },
    },
    plugins: ['prettier-plugin-tailwindcss'],
}
