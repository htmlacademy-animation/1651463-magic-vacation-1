export default class AnimatedPrizesSvg {
  constructor(elements) {
    this.elements = document.querySelectorAll(elements);
  }

  animate() {
    const journeysAnimate = this.elements[0].querySelector(`animate`);
    const casesAnimate = this.elements[1].querySelector(`animate`);
    const codesAnimate = this.elements[2].querySelector(`animate`);

    journeysAnimate.beginElement();

    setTimeout(() => {
      casesAnimate.beginElement();
    }, 4100);

    setTimeout(() => {
      codesAnimate.beginElement();
      this.addActiveClass();
    }, 6000);
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
