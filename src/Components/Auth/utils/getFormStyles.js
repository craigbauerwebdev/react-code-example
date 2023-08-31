export default function getFormStyles({
  loginPageBackgroundImageURL,
  loginPageBackgroundColor,
  backgroundColor,
  backgroundImageURL,
  backgroundImage,
}) {
  if (loginPageBackgroundImageURL) {
    return {
      backgroundImage: `url("${loginPageBackgroundImageURL}")`,
    };
  }

  if (loginPageBackgroundColor) {
    return {
      backgroundColor: loginPageBackgroundColor,
    };
  }

  if (backgroundImageURL) {
    return {
      backgroundImage: `url("${backgroundImageURL}")`,
    };
  }

  if (backgroundImage) {
    return {
      backgroundImage: `url("${backgroundImage}")`,
    };
  }

  if (backgroundColor) {
    return {
      backgroundColor: backgroundColor,
    };
  }
}
