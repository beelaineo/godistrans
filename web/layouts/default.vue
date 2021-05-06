<template>
  <div>
    <Status />
    <Nuxt />
  </div>
</template>

<style>
html {
  font-family:
    'Arial Narrow',
    Arial,
    sans-serif;
  font-size: 18px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #000;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

::selection {
  color: #fff;
  text-shadow: 0px 0px 3px hotpink;
}

body {
  color: #fff;
  background-color: #000;
}

h1, h2, h3, h4 {
  font-weight: 400;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>
