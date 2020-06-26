
// case "WSSY1":
// return { siteName: "Australia", oracleName: "UPS-AUS", vendor: "UPS" };
// case "SAO":
// return { siteName: "Brazil", oracleName: "NDI-Brazil", vendor: "GCI" };
// case "WBWN1":
// return { siteName: "Brunei", oracleName: "UPS-BRUNEI", vendor: "UPS" };
// case "ONT":
// return { siteName: "California - Ontario - Kaiser", oracleName: "NDI-ONTCA", vendor: "GCI" };
// case "SAC":
// return { siteName: "California - Sacremento - Kaiser", oracleName: "NDI-WSACRA", vendor: "GCI" };
// case "WBJS1":
// return { siteName: "China", oracleName: "UPS-CHINA", vendor: "UPS" };
// case "WBLR1":
// return { siteName: "India - Bangalore", oracleName: "UPS-BANG", vendor: "UPS" };
// case "WMAA1":
// return { siteName: "India - Chennai", oracleName: "UPS-CHENNAI", vendor: "UPS" };
// case "WCCU1":
// return { siteName: "India - Kolkata", oracleName: "UPS-KOLK", vendor: "UPS" };
// case "WBOM1":
// return { siteName: "India - Mumbai", oracleName: "UPS-BHIWA", vendor: "UPS" };
// case "WDEL2":
// return { siteName: "India - New Delhi", oracleName: "UPS-DELHI", vendor: "UPS" };
// case "ROM":
// return { siteName: "Italy", oracleName: "NDI-ROME", vendor: "GCI" };
// case "WNRT1":
// return { siteName: "Japan", oracleName: "UPS-JAPAN", vendor: "UPS" };
// case "MEX":
// return { siteName: "Mexico", oracleName: "NDI-MEX", vendor: "GCI" };
// case "CAS":
// return { siteName: "Morocco", oracleName: "NDI-Morocc", vendor: "GCI" };
// case "TILD":
// return { siteName: "Netherlands", oracleName: "NDI-NETH", vendor: "GCI" };
// case "WAUK1":
// return { siteName: "New Zealand", oracleName: "UPS-NEWZEA", vendor: "UPS" };
// case "MCT":
// return { siteName: "Oman", oracleName: "NDI-OMAN", vendor: "GCI" };
// case "WSIN1":
// return { siteName: "Singapore", oracleName: "UPS-SING", vendor: "UPS" };
// case "WTPE3":
// return { siteName: "Taiwan", oracleName: "UPS-TAIWAN", vendor: "UPS" };
// case "DAL":
// return { siteName: "Texas", oracleName: "n/a", vendor: "GCI" };
// case "LHR":
// return { siteName: "United Kingdom", oracleName: "NDI-UK", vendor: "GCI" };
// case "DC":
// return { siteName: "Washington DC - Kaiser", oracleName: "NDI-VIRG", vendor: "GCI" };

siteFinder = (warehouse) => {
  switch (warehouse) {
    case "WSSY1":
      return { siteName: "Australia", oracleName: "UPS-AUS", vendor: "UPS" };
    case "SAO":
      return { siteName: "Brazil", oracleName: "NDI-Brazil", vendor: "GCI" };
    case "WBWN1":
      return { siteName: "Brunei", oracleName: "UPS-BRUNEI", vendor: "UPS" };
    case "ONT":
      return { siteName: "California - Ontario - Kaiser", oracleName: "NDI-ONTCA", vendor: "GCI" };
    case "SAC":
      return { siteName: "California - Sacremento - Kaiser", oracleName: "NDI-WSACRA", vendor: "GCI" };
    case "WBJS1":
      return { siteName: "China", oracleName: "UPS-CHINA", vendor: "UPS" };
    case "WBLR1":
      return { siteName: "India - Bangalore", oracleName: "UPS-BANG", vendor: "UPS" };
    case "WMAA1":
      return { siteName: "India - Chennai", oracleName: "UPS-CHENNAI", vendor: "UPS" };
    case "WCCU1":
      return { siteName: "India - Kolkata", oracleName: "UPS-KOLK", vendor: "UPS" };
    case "WBOM1":
      return { siteName: "India - Mumbai", oracleName: "UPS-BHIWA", vendor: "UPS" };
    case "WDEL2":
      return { siteName: "India - New Delhi", oracleName: "UPS-DELHI", vendor: "UPS" };
    case "ROM":
      return { siteName: "Italy", oracleName: "NDI-ROME", vendor: "GCI" };
    case "WNRT1":
      return { siteName: "Japan", oracleName: "UPS-JAPAN", vendor: "UPS" };
    case "MEX":
      return { siteName: "Mexico", oracleName: "NDI-MEX", vendor: "GCI" };
    case "CAS":
      return { siteName: "Morocco", oracleName: "NDI-MOROCC", vendor: "GCI" };
    case "TILD":
      return { siteName: "Netherlands", oracleName: "NDI-NETH", vendor: "GCI" };
    case "WAUK1":
      return { siteName: "New Zealand", oracleName: "UPS-NEWZEA", vendor: "UPS" };
    case "MCT":
      return { siteName: "Oman", oracleName: "NDI-OMAN", vendor: "GCI" };
    case "WSIN1":
      return { siteName: "Singapore", oracleName: "UPS-SING", vendor: "UPS" };
    case "WTPE3":
      return { siteName: "Taiwan", oracleName: "UPS-TAIWAN", vendor: "UPS" };
    case "DAL":
      return { siteName: "Texas", oracleName: "n/a", vendor: "GCI" };
    case "LHR":
      return { siteName: "United Kingdom", oracleName: "NDI-UK", vendor: "GCI" };
    case "DC":
      return { siteName: "Washington DC - Kaiser", oracleName: "NDI-VIRG", vendor: "GCI" };
    default:
      return { siteName: "Error!", oracleName: "Error!", vendor: "Error!" };
  }
};

// siteFinder("WAUK1");

module.exports = siteFinder;
