const prohibited = [
  ".com",
  ".co",
  ".org",
  ".biz",
  ".io",
  ".edu",
  ".gov",
  ".mil",
  ".net",
  ".int",
  ".de",
  ".cn",
  ".uk",
  ".ai",
  ".tv",
  ".tk",
  ".au",
  ".info",
  ".it",
  ".blog",
  ".shop",
  ".ru",
  "www.",
  "http",
];

const checkForURL = (str) => {
  if (new RegExp(prohibited.join("|")).test(str)) {
    return true;
  }
  return false;
};

export default checkForURL;
