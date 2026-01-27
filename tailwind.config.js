/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'clove-orange': '#FF9966',
                'clove-pink': '#FF6B9D',
                'clove-purple': '#C77DFF',
                'clove-blue': '#4ECDC4',
                'clove-green': '#95E1D3',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
