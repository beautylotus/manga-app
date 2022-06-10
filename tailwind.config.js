module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#1f1f1f',
                primary: '#f43f5e',
                secondary: '#2f2f2f',
                ['highlight']: '#3f3f3f',
                ['deep-black']: '#1a1a1a',
            },
            listStyleType: {
                circle: 'circle',
            },
        },
        fontFamily: {
            primary: 'Nunito, sans-serif',
            secondary: 'League Spartan, sans-serif',
        },
    },
    corePlugins: {
        aspectRatio: false,
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/aspect-ratio'),
    ],
};
