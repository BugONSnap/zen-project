<script lang="ts">
</script>

<div class="hero">
  <div class="hero__title"> </div>
  <div class="cube"></div>
  <div class="cube"></div>
  <div class="cube"></div>
  <div class="cube"></div>
  <div class="cube"></div>
  <div class="cube"></div>
  <div class="cube"></div>
  <div class="cube"></div>
  <div class="cube"></div>
  <slot></slot>
</div>

<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:700');

  .hero {
    background-color: #0040C1;
    position: relative;
    height: 100vh;
    overflow: hidden;
    font-family: 'Montserrat', sans-serif;
  }

  .hero__title {
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 50px;
    z-index: 1;
  }

  .cube {
    position: absolute;
    top: 80vh;
    left: 45vw;
    width: 10px;
    height: 10px;
    border: solid 1px #003b9e; /* darken(#0040C1, 8%) */
    transform-origin: top left;
    transform: scale(0) rotate(0deg) translate(-50%, -50%);
    animation: cube 8s ease-in forwards infinite;
  }
  
  .cube:nth-child(2n) {
    border-color: #0048da; /* lighten(#0040C1, 10%) */
  }
  
  .cube:nth-child(2) {
    animation-delay: 2s;
    left: 25vw;
    top: 40vh;
  }
  
  .cube:nth-child(3) {
    animation-delay: 4s;
    left: 75vw;
    top: 50vh;
  }
  
  .cube:nth-child(4) {
    animation-delay: 6s;
    left: 90vw;
    top: 10vh;
  }
  
  .cube:nth-child(5) {
    animation-delay: 8s;
    left: 10vw;
    top: 85vh;
  }
  
  .cube:nth-child(6) {
    animation-delay: 10s;
    left: 50vw;
    top: 10vh;
  }

  .cube:nth-child(7) {
    animation-delay: 1s;
    left: 15vw;
    top: 30vh;
  }
  
  .cube:nth-child(8) {
    animation-delay: 3s;
    left: 85vw;
    top: 70vh;
  }
  
  .cube:nth-child(9) {
    animation-delay: 5s;
    left: 35vw;
    top: 20vh;
  }
  
  .cube:nth-child(10) {
    animation-delay: 7s;
    left: 65vw;
    top: 60vh;
  }

  @keyframes cube {
    from {
      transform: scale(0) rotate(0deg) translate(-50%, -50%);   
      opacity: 1;
    }
    to {
      transform: scale(20) rotate(960deg) translate(-50%, -50%); 
      opacity: 0;
    }
  }
</style> 