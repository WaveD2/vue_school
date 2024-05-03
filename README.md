```
npm clone https://github.com/WaveD2/vue_school.git

npm i

npm run dev
```

```
username : admin1@gmail.com
password : Abcd@12345
```

### `start`

Runs the app in the development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

You can customize the build process using the `vite.config.js` file.

### `serve`

Serves the production build from the `build` folder locally.

---

## File structure

    .
    ├── public                  # static files
    │   ├── favicon.ico
    │   ├── robots.txt
    ├── src                     # source files
    │   ├── assets              # static assets
    │   ├── axios               # connect api server
    │   ├── components          # reusable components shared across the app
    │   ├── constants
    │   ├── contexts            # context providers
    │   ├── layout              # layout UI page
    │   ├── styles              # global styles
    │   ├── pages               # reusable pages
    │   ├── utils               # helper functions
    │   ├── store               # store vuex
    │   ├── App.vue             # main app component
    │   ├── main.js             # app entry point
    ├── .eslintrc                  # eslint config
    ├── index.html                      # main html file
    ├── jsconfig.json                   # jsconfig for IDE
    ├── package.json
    ├── postcss.config.js               # postcss config for tailwind
    ├── tailwind.config.js              # tailwind config where you can add additional colors, fonts, etc.
    ├── vite.config.js
    ├── vercel.json             # vercel config
