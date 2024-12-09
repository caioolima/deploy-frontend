// sliderConfig.js

function slidesToShow() {
  if(window.innerWidth <= 480) { /* Telas muito pequenas */
    return 1
  } 
  if(window.innerWidth <= 660) { /* Telas pequenas */
    return 2
  } 
  return 3
}



export const defaultSliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: slidesToShow(),
  slidesToScroll: slidesToShow(),
};
