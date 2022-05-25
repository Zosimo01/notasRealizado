 export const animationFunction=({
    node,
    animation,
    options
  }:{node:HTMLElement,animation:any,options:any})=>{

   const {finished}= node.animate(
      animation,
      options
    );
return finished;
  }