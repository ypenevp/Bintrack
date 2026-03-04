/** @type {import('tailwindcss').Config} */
module.exports={
  content:["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"], // Update this to include the paths to all files that contain Nativewind classes.
  presets:[require("nativewind/preset")],
  theme:{
    extend:{},
  },
  plugins:[],
}