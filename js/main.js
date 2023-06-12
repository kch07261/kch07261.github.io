const slides = [slide1, slide2, slide3, slide4, slide5];
let num = 0;

const slideshow = () => {
    slides[num++].checked = 'checked';
    setTimeout(slideshow, 7000);
    if(num == 5) num = 0;
}
slideshow();