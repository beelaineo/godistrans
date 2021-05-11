<template>
  <svg preserveAspectRatio="none" width="215" height="215" viewBox="0 0 215 215" fill="none" xmlns="http://www.w3.org/2000/svg">
    <filter id="dropshadow" height="130%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="4"/> <!-- stdDeviation is how much to blur -->
    <feOffset dx="3" dy="3" result="offsetblur"/> <!-- how much to offset -->
    <feComponentTransfer>
      <feFuncA type="linear" slope="0.75"/> <!-- slope is the opacity of the shadow -->
    </feComponentTransfer>
    <feMerge>
      <feMergeNode/> <!-- this contains the offset blurred image -->
      <feMergeNode in="SourceGraphic"/> <!-- this contains the element that the filter is applied to -->
    </feMerge>
  </filter>

    <path d="M107.066 1L151.509 107.066L107.066 213.132" vector-effect="non-scaling-stroke" stroke="white" stroke-width="2" style="filter:url(#dropshadow)"/>
  </svg>
</template>
