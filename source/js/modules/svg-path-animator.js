export default class SvgPathAnimator {
  constructor(
      selector = ``,
      startId = ``,
      duration = 0.5,
      delay = 0,

      property = ``,
      propertyDuration = 0.6,
      propertyDelay = 0.2,
  ) {
    this.svgPaths = document.querySelectorAll(`${selector} path`);
    this.startId = startId;
    this.duration = duration;
    this.delay = delay;

    this.property = property;
    this.propertyDuration = propertyDuration;
    this.propertyDelay = propertyDelay;
    this.preparePaths();
  }

  createAnimateElement(i, attributeName, from, to, delta) {
    const animate = document.createElementNS(`http://www.w3.org/2000/svg`, `animate`);
    animate.setAttribute(`attributeName`, attributeName);

    if (i === 0 && attributeName === `stroke-dashoffset`) {
      animate.setAttribute(`id`, `${this.startId}`);
      animate.setAttribute(`begin`, `indefinite`);
    } else {
      animate.setAttribute(`begin`, `${this.startId}.begin + ${delta * i}s`);
    }

    animate.setAttribute(`dur`, `${this.duration}s`);
    animate.setAttribute(`from`, `${from}`);
    animate.setAttribute(`to`, `${to}`);
    animate.setAttribute(`fill`, `freeze`);

    return animate;
  }

  createAnimateTransformElement(i, attributeName, delta) {
    const animate = document.createElementNS(`http://www.w3.org/2000/svg`, `animateTransform`);
    animate.setAttribute(`attributeName`, attributeName);
    animate.setAttribute(`begin`, `${this.startId}.begin + ${delta * i}s`);
    animate.setAttribute(`dur`, `${this.duration}s`);
    animate.setAttribute(`values`, `0 0; 0 140; 0 70; 0 100`);
    animate.setAttribute(`keyTimes`, `0; 0.5; 0.8; 1`);
    animate.setAttribute(`calcMode`, `spline`);
    animate.setAttribute(`keySplines`, `0.38 0 1 0.99; 0 0 0.58 1; 0.42, 0, 1, 1`);
    animate.setAttribute(`fill`, `freeze`);

    return animate;
  }

  preparePaths() {
    this.svgPaths.forEach((path, i) => {
      const pathLength = Math.round(path.getTotalLength());
      const pathDash = Math.round(pathLength / 3);

      path.setAttribute(`stroke-dashoffset`, `${pathLength}`);
      path.setAttribute(`stroke-dasharray`, `${pathLength}`);

      const animateDashoffset = this.createAnimateElement(i, `stroke-dashoffset`, 0, `${pathDash}`, this.delay);
      const animateDasharray = this.createAnimateElement(i, `stroke-dasharray`, `0 ${pathDash}`, `${pathDash} 0`, this.delay);

      path.appendChild(animateDashoffset);
      path.appendChild(animateDasharray);

      if (this.property !== undefined && this.property === `transform`) {
        const animateTransform = this.createAnimateTransformElement(i, `transform`, this.propertyDelay);
        path.appendChild(animateTransform);
      }
    });
  }

  animatePath() {
    const animateElement = document.getElementById(`${this.startId}`);
    animateElement.beginElement();
  }

  animate() {
    this.animatePath();
  }
}
