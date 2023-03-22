const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    colors: {
      primary: "#25b4cd",
      textprimary: "#000000",
      textsecondary: "#6e6e72",
      text: "#25b4cd",
      success: "#02c24d",
      warning: "#FDB85E",
      failure: "#be1622",
      disabled: "#bdbdbd",
      ...colors,
    },
    fontFamily: {
      "ibm-bold": ["IBMPlexSansThai-Bold"],
      "ibm-extralight": ["IBMPlexSansThai-ExtraLight"],
      "ibm-light": ["IBMPlexSansThai-Light"],
      "ibm-medium": ["IBMPlexSansThai-Medium"],
      "ibm-regular": ["IBMPlexSansThai-Regular"],
      "ibm-semibold": ["IBMPlexSansThai-SemiBold"],
      "ibm-thin": ["IBMPlexSansThai-Thin"],
    },
    extend: {
      borderRadius: {
        lg: "0.5rem",
      },
    },
  },
};
