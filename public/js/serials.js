
showCats = () => {
  const categories = document.querySelector(".categories");
  if ((!categories.style.display) || (categories.style.display === "none")) {
    categories.style.display = "block";
  } else {
    categories.style.display = "none";
  }

}


showSearch = () => {
  const searchForm = document.querySelector(".searchForm");
  searchForm.style.display = "block";
}

// set server OBJECTS in stringReader
// return server OBJ to showForm
// showForm will pass server OBJ to gotServer
// within gotServer, extract OBJ.message and OBJ.type (type of server)
// use obj.type to autofill server type values in showForm


// called by findServer()
showForm = (obj, str) => {
  const msgDiv = document.querySelector("#msgDiv");
  const msgText = document.querySelector("#msgText");
  const searchForm = document.querySelector(".searchForm");
  const serverType = document.querySelector("#serverType");
  msgDiv.style.display = "block";
  console.log(obj.msg);
  if (obj.msg === "Banned") {
    console.log(`S/N ${str} is banned.`);
    msgText.innerText = `S/N ${str} is banned.`
  } else if (obj.msg === "Not Found") {
    console.log(`S/N ${str} is not found.`);
    msgText.innerText = `S/N ${str} is not found.`
    //
  } else {
    searchForm.style.display = "block"; // display search form
    console.log(`${str}: ${obj.msg}`);
    msgText.innerText = `S/N ${str} is for: ${obj.msg}`; // advise which server type matches the S/N
    serverType.value = obj.type.toUpperCase(); // autofill serverType from obj.type
    console.log(`ServerType Value: ${serverType.value}`);
  }
}

// called by banList()
stringReader = (str) => { // stringReader returns an object with type and msg properties
  const servers = {
    wb1:    { type: "White Box 1", msg: "InfiniStream White Box 1"},
    nso:    { type: "White Box 2", msg: "InfiniStream White Box 2" },
    nsa:    { type: "Aquarius", msg: "Aquarius Unit OR R310 (DELL)" } ,
    ns3:    { type: "V3", msg: "Infinistream V3" },
    ns4:    { type: "Atlas", msg: "Atlas ( 2910D - 3300D - 4950D)" },
    ns5:    { type: "V4", msg: "Infinistream V4" },
    ns8:    { type: "V5", msg: "Infinistream V5" },
    ns6:    { type: "V4 or Cert/Qual Unit", msg: "Infinistream V4 or Certified/Qualified Unit" },
    esu:    { type: "ESU", msg: "ESU" },
    probe:  { type: "Probe/Netflow", msg: "Probe/ Netflow Collector" },
    pfs:    { type: "PFS3900", msg: "3900 PFS" },
    ngc:    { type: "Legacy NGC", msg: "Legacy NGC Unit" },
    blade:  { type: "PFS Blade", msg: "PFS Blades" },
    simena: { type: "Simena", msg: "1500 Legacy Simena PFS" },
    soft:   { type: "Software", msg: "SW Licenses" },
    dell:   { type: "Dell", msg: "Dell unit (Combination of 7 AlphaNumeric)" },
  };

  const { nso, nsa, ns3, ns4, ns5, ns6, ns8, esu, probe, pfs, ngc, blade, simena, wb1, soft, dell } = servers;

  const one = str.slice(0, 1);
  const two = str.slice(0, 2);
  const three = str.slice(0, 3);
  const last = str.slice(-1);

  if (two === "NS") {
    switch(three) {
      case "NSO":
        return { type: nso.type, msg: nso.msg };
        break;
      case "NSA":
        return { type: nsa.type, msg: nsa.msg };
        break;
      case "NS3":
        return { type: ns3.type, msg: ns3.msg };
        break;
      case "NS4":
        return { type: ns4.type, msg: ns4.msg };
        break;
      case "NS5":
        return { type: ns5.type, msg: ns5.msg };
        break;
      case "NS6":
        return { type: ns6.type, msg: ns6.msg };
        break;
      case "NS8":
        return { type: ns8.type, msg: ns8.msg };
        break;
      default:
        console.log(`no match!`);
        return { type: "N/A", msg: "Not Found" };
    }
  } else if (one === "5" && last === "F") { return { type: esu.type, msg: esu.msg };
  } else if (two === "20" && str.length === 8) { return { type: probe.type, msg: probe.msg };
  } else if (two === "PA") { return { type: pfs.type, msg: pfs.msg };
  } else if (last === "P" && str.length === 12) { return { type: ngc.type, msg: ngc.msg };
  } else if (two === "03" && str.length === 13 ) { return { type: blade.type, msg: blade.msg };
  } else if (two === "P0" && str.length === 8) { return { type: simena.type, msg: simena.msg };
  } else if ((one === "2" && str.indexOf("-") !== -1) || three === "ATS") { return { type: wb1.type, msg: wb1.msg };
  } else if (three === "400") { return { type: soft.type, msg: soft.msg };
  } else if (str.length === 7) { return { type: dell.type, msg: dell.msg };
  } else {
    return { type: "N/A", msg: "Not Found" };
  }
};

// called by findServer()
banList = (str) => {
  // banList checks if the S/N is banned...
  // if not, it returns the value of calling stringReader(str)
  if (str === "NS4150984004") {
    return {type: "N/A", msg: "Banned"};
  } else {
    return stringReader(str);
  }
}

// called by find button in search.ejs
findServer = () => {
  const serial = document.querySelector("#serial");
  console.log(`Serial.value = ${serial.value}`);
  const val = serial.value;
  if (!val) {
    console.log("Nothing was entered.");
    serial.setAttribute('placeholder',"Please enter a valid S/N to continue");
  } else {
    // serial.value = ""; // blank out the form
    const str = val.toUpperCase().trim();
    const obj = banList(str); // set obj equal to the value of calling banList with (str)
    showForm(obj, str); // then call showForm and pass in (obj) and (str)

  }
}



// 2XXX-XXXXX / ATSPXXXXXX  --  InfiniStream White Box 1
// NSOXXXXXXXXX  --  InfiniStream White Box 2
// NSAXXXXXXXXX  --  Aquarius Unit OR R310 (DELL)
// NS3XXXXXXXXXX  --  Infinistream V3
// NS4XXXXXXXXX  --  Atlas ( 2910D - 3300D - 4950D)
// NS5XXXXXXXXXX  --  Infinistream V4
// NS6XXXXXXXXXX  --  Infinistream V4 or Certified/Qualified Unit
// 5XXXXXXXXXXXXXF  --  ESU
// 20XXXXXX  --  Probe/ Netflow Collector
// XXXXXXXXXXXP  --  Legacy NGC Unit
// PAXXXXXX-XXXXXXXX-XXXXXX  --  3900 PFS
// 03XXXXXXXXXXX  --  PFS Blades
// P0XXXXXX  --  1500 Legacy Simena PFS
// Combination of 7 AlphaNumeric  --  Dell unit
// 40000XXXXX  --  SW License Serial Number
