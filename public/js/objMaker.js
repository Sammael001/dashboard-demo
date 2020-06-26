
// objMaker creates a search object which we can use to query the Inventory collection
objMaker = (searchType, warehouse, itemNum, description) => {

  if (searchType === "fullInv") {
    // generate a switch for the warehouse
    switch (warehouse) {
      case "domestic":
        // search for any match of the 3 domestic warehouses
        return { $or: [{ siteName: /California/i }, { siteName: "Texas" }, { siteName: /Washington/i }] };
      case "India":
        // search by all India warehouses
        return { siteName: /India/i };
      default:
        // regular warehouse search should be fine
        return { siteName: warehouse };
    }
  } else if (searchType === "byDesc") { // search by description
    switch (warehouse) {
      case "all":
        return { description : { $regex: description, $options: "i" } };
      case "domestic":
        // search for any match of the 3 domestic warehouses
        return { $or: [{ siteName: /California/i }, { siteName: "Texas" }, { siteName: /Washington/i }],  description : { $regex: description, $options: "i" } };
      case "India":
        // search by all India warehouses
        return { siteName: /India/i, description : { $regex: description, $options: "i" } };
        // SAME as: { siteName: { $regex: warehouse, $options: "i" }, itemNum: itemNum };
      default:
        // regular warehouse search should be fine
        return { siteName: warehouse, description : { $regex: description, $options: "i" } };
    }
  } else { // searchType defaults to "byItem", may be coming from Check Inventory button on frus partpage
    // generate a switch for the warehouse + itemNum
    switch (warehouse) {
      case "all":
        return { itemNum: itemNum };
      case "domestic":
        // search for any match of the 3 domestic warehouses
        return { $or: [{ siteName: /California/i }, { siteName: "Texas" }, { siteName: /Washington/i }], itemNum: itemNum };
      case "India":
        // search by all India warehouses
        return { siteName: /India/i, itemNum: itemNum };
        // SAME as: { siteName: { $regex: warehouse, $options: "i" }, itemNum: itemNum };
      default:
        // regular warehouse search should be fine
        return { siteName: warehouse, itemNum: itemNum };
    }
  }
};


module.exports = objMaker;
