// const newArray = [
//   { _id: 1,
//     itemNum: '321-1634',
//     description: 'KIT FRU PS MODULE 19XXD/29XXD/3300D/45XXD 700W AC',
//     warehouse: 'WBLR1',
//     siteName: 'India - Bangalore',
//     oracleName: 'UPS-BANG',
//     onhand: '1',
//     vendor: 'UPS' },
//   { _id: 2,
//     itemNum: '321-1634',
//     description: 'KIT FRU PS MODULE 19XXD/29XXD/3300D/45XXD 700W AC',
//     warehouse: 'WBLR1',
//     siteName: 'India - Bangalore',
//     oracleName: 'UPS-BANG',
//     onhand: '1',
//     vendor: 'UPS' },
//   { _id: 3,
//     itemNum: '321-1634',
//     description: 'KIT FRU PS MODULE 19XXD/29XXD/3300D/45XXD 700W AC',
//     warehouse: 'WBOM1',
//     siteName: 'India - Mumbai',
//     oracleName: 'UPS-BHIWA',
//     onhand: '1',
//     vendor: 'UPS' },
//   { _id: 4,
//     itemNum: '321-1634',
//     description: 'KIT FRU PS MODULE 19XXD/29XXD/3300D/45XXD 700W AC',
//     warehouse: 'WDEL2',
//     siteName: 'India - New Delhi',
//     oracleName: 'UPS-DELHI',
//     onhand: '1',
//     vendor: 'UPS' },
//   { _id: 5,
//     itemNum: '321-1634',
//     description: 'KIT FRU PS MODULE 19XXD/29XXD/3300D/45XXD 700W AC',
//     warehouse: 'WDEL2',
//     siteName: 'India - New Delhi',
//     oracleName: 'UPS-DELHI',
//     onhand: '1',
//     vendor: 'UPS' },
//   { _id: 6,
//     itemNum: '321-1634',
//     description: 'KIT FRU PS MODULE 19XXD/29XXD/3300D/45XXD 700W AC',
//     warehouse: 'WMAA1',
//     siteName: 'India - Chennai',
//     oracleName: 'UPS-CHENNAI',
//     onhand: '1',
//     vendor: 'UPS' },
//   { _id: 7,
//     itemNum: '321-1634',
//     description: 'KIT FRU PS MODULE 19XXD/29XXD/3300D/45XXD 700W AC',
//     warehouse: 'WMAA1',
//     siteName: 'India - Chennai',
//     oracleName: 'UPS-CHENNAI',
//     onhand: '1',
//     vendor: 'UPS' },
//   { _id: 8,
//     itemNum: '321-1634',
//     description: 'KIT FRU PS MODULE 19XXD/29XXD/3300D/45XXD 700W AC',
//     warehouse: 'WMAA1',
//     siteName: 'India - Chennai',
//     oracleName: 'UPS-CHENNAI',
//     onhand: '1',
//     vendor: 'UPS' }
//   ];

  // WBLR1 = 2
  // WBOM1 = 1
  // WDEL2 = 2
  // WMAA1 = 3


myTally = (arr) => {

  let matched;
  let copy = [...arr]; // spread operator to clone myArray into copy
  const results = [];
  let remainder = [];

  // 1) convert all strings in onhand to ints by CLONING the copy array into remainder with forEach

  copy.forEach(item => {

    // ** if !item.serial || item.serial === "NA" || item.serial === "." || item.serial === "N/A"
    // ** create an obj and push the obj into a special gotSerial array
    // ** else, turn its onhand qty into an integer and push the obj into the remainder array

    let parsed = Number(item.onhand);
    // console.log(`parsed ${parsed} is a number?${Number.isInteger(parsed)}`); // returns TRUE
    let newObj = {
      itemNum: item.itemNum,
      description: item.description,
      warehouse: item.warehouse,
      siteName: item.siteName,
      oracleName: item.oracleName,
      onhand: parsed,
      vendor: item.vendor
      // ** add in a special variable to set all objs with undeclared S/Ns to Serial: "N/A"?
    };
    remainder.push(newObj);
  });

  // console.log("REMAINDER ARRAY after converting strings to nums:");
  // console.log(remainder);

  // so long as remainder has any entries, run the code below
  while (remainder.length > 0) {

      // (2) set filter criteria based on the first value in remainder, which will constantly change
    let myItem = remainder[0].itemNum;
    let myWarehouse = remainder[0].warehouse;
    let myDesc = remainder[0].description;
    let mySite = remainder[0].siteName;
    let myOracle = remainder[0].oracleName;
    let myVendor = remainder[0].vendor;

      // (3) find how many entries in the array match the filter criteria

    matched = remainder.filter(item => {
      return ((item.itemNum === myItem) && (item.warehouse === myWarehouse));
    });

      // (4) calculate totalOnhand by summing all onhand quantities in matched.onhand

    let totalOnhand = matched.reduce((prev, cur) => {
      return prev + cur.onhand;
    }, 0);

      // (5) create a new object with itemNum + warehouse derived from our filter, and onhand = totalOnhand
    let merged = {
      itemNum: myItem,
      description: myDesc,
      warehouse: myWarehouse,
      siteName: mySite,
      oracleName: myOracle,
      onhand: totalOnhand.toString(), // convert back to string here
      vendor: myVendor
    };

    // console.log("New merged object to be pushed into results:");
    // console.log(merged);

      // (6) push this new merged obj into results array
    results.push(merged);

      // (7) reset the remainder array, now excluding those entries which match the filter criteria we just used
    remainder = remainder.filter(item => {
      return (!((item.itemNum === myItem) && (item.warehouse === myWarehouse)));
    });

    // (8) and go back up to the start of the while:do loop, so long as remainder has any entries
  };

  // once remainder is empty, return
  // console.log("Results from myTally:");
  // console.log(results);

  return results;
  // ** instead, merge results with the gotSerial array, which is not compressed by qty, and return that

};

module.exports = myTally;


///
