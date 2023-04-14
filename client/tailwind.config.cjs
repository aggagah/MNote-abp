/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        sizes: {
            xSmall: 10,
            small: 12,
            medium: 16,
            large: 20,
            xLarge: 24,
            xxLarge: 32,
        },
        extend: {
            colors: {
                primary: "#F56C61",
                secondary: "#FEE2E7",
                tertiary: "#AA77FF",
                quaternary: "#3E3450",
                yellow: "#FFD465",
                gray: "#83829A",
                gray2: "#C1C0C8",
                white: "#F3F4F8",
                lightWhite: "#FAFAFC",
                buttonBlue: "#77ADFF",
                label: "#4e4e4e",
            },
            fontFamily: {
                regular: ["DM Sans"],
                medium: ["DMSans-Medium.ttf"],
                bold: ["DMSans-Bold.ttf"],
            },
            fontSize: {
                xSmall: 10,
                small: 12,
                medium: 16,
                large: 20,
                xLarge: 24,
                xxLarge: 32,
                logo: 130,
                buttonText: 23,
                formTitle: 40,
                formLabel: 25,
                dashboardLogo: 50,
            },
            lineHeight: {
                formInput: 3.5,
                sidebarItem: 3,
            },
            width: {
                sidebar: ["16%"],
                bodyContainer: ["84%"],
                cardWidth: 200,
            },
            height: {
                topbar: ["10%"],
                bodyHeight: ["90%"],
                cardHeight: 200,
            },
            padding: {
                bodyleft: ["16%"],
            },
            margin: {
                bodyleft: ["16%"],
                topContent: ["5%"],
            },
        },
    },
    plugins: [],
};
