export default class AnimatedPrizesSvg {
  constructor(elements) {
    this.elements = document.querySelectorAll(elements);
  }

  animate() {
    const journeysAnimate = this.elements[0].querySelector(`animate`);
    const casesAnimate = this.elements[1].querySelector(`animate`);

    journeysAnimate.beginElement();

    setTimeout(() => {
      casesAnimate.beginElement();
      this.addActiveClass();
    }, 4100);
  }

  addActiveClass() {
    this.elements.forEach((svg) => {
      svg.classList.add(`active`);
    });
  }

  stopAnimate() {
    this.elements.forEach((svg) => {
      if (svg.classList.contains(`active`)) {
        return false;
      }
    });
  }
}
