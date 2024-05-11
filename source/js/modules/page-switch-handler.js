import AccentTypographyBuild from "./accent-typography-build";
import AnimatedPrizesSvg from "./animated-prizes-svg";

export default class PageSwitchHandler {
  constructor() {
    const introTitle = new AccentTypographyBuild(`.intro__title`, 500, `accent-typography--active`, `transform`);
    const introDate = new AccentTypographyBuild(`.intro__date`, 500, `accent-typography--active`, `transform`, 500);
    const sliderTitle = new AccentTypographyBuild(`.slider__item-title`, 500, `accent-typography--active`, `transform`);
    const prizesTitle = new AccentTypographyBuild(`.prizes__title`, 500, `accent-typography--active`, `transform`);
    const rulesTitle = new AccentTypographyBuild(`.rules__title`, 500, `accent-typography--active`, `transform`);
    const gameTitle = new AccentTypographyBuild(`.game__title`, 500, `accent-typography--active`, `transform`);

    const prizesSvg = new AnimatedPrizesSvg(`.js-prizes-icon`);

    this.scriptRunSchema = {
      top: [
        introTitle.runAnimation.bind(introTitle),
        introDate.runAnimation.bind(introDate),
      ],
      story: [
        sliderTitle.runAnimation.bind(sliderTitle),
      ],
      prizes: [
        prizesSvg.animate.bind(prizesSvg),
        prizesTitle.runAnimation.bind(prizesTitle),
      ],
      rules: [
        rulesTitle.runAnimation.bind(rulesTitle),
      ],
      game: [
        gameTitle.runAnimation.bind(gameTitle),
      ],
    };

    this.scriptDestroySchema = {
      top: [
        introTitle.destroyAnimation.bind(introTitle),
        introDate.destroyAnimation.bind(introDate),
      ],
      story: [
        sliderTitle.destroyAnimation.bind(sliderTitle),
      ],
      prizes: [
        prizesSvg.stopAnimate.bind(prizesSvg),
        prizesTitle.destroyAnimation.bind(prizesTitle),
      ],
      rules: [
        rulesTitle.destroyAnimation.bind(rulesTitle),
      ],
      game: [
        gameTitle.destroyAnimation.bind(gameTitle),
      ],
    };
  }

  setColorScheme(sectionId) {
    this.resetScheme();
    if (this.scriptRunSchema[sectionId]) {
      [...this.scriptRunSchema[sectionId]].forEach((funct) => {
        setTimeout(() => funct(), 100);
      });
    }
  }

  resetScheme() {
    for (const destroySchema in this.scriptDestroySchema) {
      if (this.scriptDestroySchema.hasOwnProperty(destroySchema)) {
        this.scriptDestroySchema[destroySchema].forEach((funct) => funct());
      }
    }
  }
}
