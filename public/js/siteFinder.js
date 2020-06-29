
// <select class="form-class" name="siteName" id="siteName" required>
//   <option value="">Please select a site</option>
//   <option value="BEIJ"> China - Beijing </option>
//   <option value="CHEN"> China - Chengdu </option>
//   <option value="SHAN"> China - Shanghai </option>
//   <option value="PARI"> France - Paris </option>
//   <option value="FRAN"> Germany - Frankfurt </option>
//   <option value="ROME"> Italy - Rome </option>
//   <option value="HOKK"> Japan - Hokkaido </option>
//   <option value="NAGO"> Japan - Nagoya </option>
//   <option value="TOKY"> Japan - Tokyo </option>
//   <option value="LOND"> UK - London </option>
//   <option value="AUST"> US - Austin </option>
//   <option value="SANF"> US - San Francisco </option>
//   <option value="NEWY"> US - New York </option>
// </select>

// inventory entries as shown:
// { itemNum: "000001", description: "cardboard box", siteName: "AUST", wareCity: "Austin", wareCountry: "United States" }

siteFinder = (siteCode) => {
  switch (siteCode) {
    case "BEIJ":
      return { wareCity: "Beijing", wareCountry: "China" };
    case "CHEN":
      return { wareCity: "Chengdu", wareCountry: "China" };
    case "SHAN":
      return { wareCity: "Shanghai", wareCountry: "China" };
    case "PARI":
      return { wareCity: "Paris", wareCountry: "France" };
    case "FRAN":
      return { wareCity: "Frankfurt", wareCountry: "Germany" };
    case "ROME":
      return { wareCity: "Rome", wareCountry: "Italy" };
    case "HOKK":
      return { wareCity: "Hokkaido", wareCountry: "Japan" };
    case "NAGO":
      return { wareCity: "Nagoya", wareCountry: "Japan" };
    case "TOKY":
      return { wareCity: "Tokyo", wareCountry: "Japan" };
    case "LOND":
      return { wareCity: "London", wareCountry: "United Kingdom" };
    case "AUST":
      return { wareCity: "Austin", wareCountry: "United States" };
    case "SANF":
      return { wareCity: "San Francisco", wareCountry: "United States" };
    case "NEWY":
      return { wareCity: "New York", wareCountry: "United States" };
    default:
      return { wareCity: "Error!", wareCountry: "Error!" };
  }
};


module.exports = siteFinder;
