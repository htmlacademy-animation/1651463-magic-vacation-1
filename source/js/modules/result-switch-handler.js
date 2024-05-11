import SvgPathAnimator from "./svg-path-animator";

export default class ResultSwitchHandler {
  constructor() {
    const resultSvgTrip = new SvgPathAnimator(`.js-result-svg-trip`, `result_svg_trip`, 0.5);
    const resultSvgPrize = new SvgPathAnimator(`.js-result-svg-prize`, `result_svg_prize`, 0.5);
    const resultSvgNegative = new SvgPathAnimator(`.js-result-svg-negative`, `result_svg_negative`, 0.5, 0.02, `transform`, 0.6, 0.05);

    this.scriptRunSchemaResult = {
      result: [
        resultSvgTrip.animate.bind(resultSvgTrip),
      ],
      result2: [
        resultSvgPrize.animate.bind(resultSvgPrize),
      ],
      result3: [
        resultSvgNegative.animate.bind(resultSvgNegative),
      ],
    };
  }

  setSchemeResult(sectionId) {
    if (this.scriptRunSchemaResult[sectionId]) {
      for (const funct of this.scriptRunSchemaResult[sectionId]) {
        requestAnimationFrame(() => funct());
      }
    }
  }
}
