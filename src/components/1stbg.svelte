<script lang="ts">
</script>

<article class="wrapper">
  <slot></slot>
</article>

<style>
  @import url("https://fonts.googleapis.com/css?family=Lobster&display=swap");

  body {
    background: #fff;
  }

  .title {
    font-size: 2.5rem;
    font-family: "Lobster", cursive;
  }

  .wrapper {
    animation: scroll 100s linear infinite;
    background: url("https://images.unsplash.com/photo-1465146633011-14f8e0781093?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80"),
      #111111;
    color: #eee;
    height: 100vh;
    min-width: 360px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1000px;
    perspective-origin: 50% 50%;
  }

  @keyframes scroll {
    100% {
      background-position: 0px -400%;
    }
  }

  /* Fallback if the operatring system prefers reduced motion*/
  @media (prefers-reduced-motion) {
    .wrapper {
      animation: scroll 800s linear infinite;
    }
  }

  @media (min-width: 670px) {
    .title {
      font-size: 5rem;
    }
  }
</style> 