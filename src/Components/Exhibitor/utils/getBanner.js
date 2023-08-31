export default function getBanner(exhibitor) {
  const sponsorImg = exhibitor.custom_attributes?.custom_fields?.Banner_Images;
  let url = [];
  if (sponsorImg.startsWith("<")) {
    url = exhibitor.custom_attributes?.custom_fields?.Banner_Images.split(" ");
  } else {
    url = exhibitor.custom_attributes?.custom_fields?.Banner_Images.split(",");
  }

  return url[1].replace(
    "%2520hero%2520-%2520demo.png",
    "%20hero%20-%20demo.png"
  );
}
