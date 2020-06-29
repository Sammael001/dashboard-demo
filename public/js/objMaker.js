
// inventory entries as shown:
// { itemNum: "000001", description: "cardboard box", siteCode: "AUST", wareCity: "Austin", wareCountry: "United States" }

// objMaker creates a search object which we can use to query the Inventory collection
objMaker = (searchType, wareCountry, itemNum, description) => {

  if (searchType === "fullInv") { // if wanting to display entire warehouse inventory by country...
    // ...just return search obj for wareCountry
      return { wareCountry: wareCountry };
  } else if (searchType === "byDesc") { // else, if searching by description...
    switch (wareCountry) {
      case "all": // ...and wanting to display all warehouse inventory matching that desc...
        // ...return searchObj for the desc alone
        return { description : { $regex: description, $options: "i" } };
      default:
        // else, return searchObj for wareCountry and desc
        return { wareCountry: wareCountry, description : { $regex: description, $options: "i" } };
    }
  } else { // searchType defaults to "byItem"
    // generate a switch for the wareCountry + itemNum
    switch (wareCountry) {
      case "all":
        return { itemNum: itemNum };
      default:
        return { wareCountry: wareCountry, itemNum: itemNum };
    }
  }
};


module.exports = objMaker;
