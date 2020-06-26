
module.exports = {

  findTerr: function(state) {
    if (state === "Alaska" || state === "Washington (state)") {
      return "West";
    } else if (state === "Kansas" || state === "Missouri") {
      return "Mountain";
    } else if (state === "Montana" || state === "Idaho" || state === "Wyoming" || state === "Utah" || state === "Colorado" || state === "-- Las Vegas") {
      return "Northwest";
    } else if (state === "North Dakota" || state === "South Dakota" || state === "Minnesota" || state === "Wisconsin" || state === "Michigan" || state === "Nebraska" || state === "Iowa" || state === "Illinois") {
      return "North Central";
    } else if (state === "Maine" || state === "New Hampshire" || state === "Vermont" || state === "Massachusetts" || state === "Rhode Island" || state === "Connecticut" || state === "New Jersey" || state === "New York (southern)" ) {
      return "Northeast";
    } else if (state === "New York (upstate)" || state === "Pennsylvania" || state === "Delaware" || state === "Washington DC" || state === "Virginia" || state === "West Virginia" || state === "Maryland" || state === "Ohio" || state === "Indiana" || state === "Kentucky") {
      return "Mid-Atlantic";
    } else if (state === "Tennessee" || state === "North Carolina" || state === "South Carolina" || state === "Georgia" || state === "Florida" || state === "Alabama" || state === "Mississippi") {
      return "Southeast";
    } else if (state === "California (southern)" || state === "Arizona" || state === "New Mexico" ) {
      return "Southwest";
    } else if (state === "Texas" || state === "Oklahoma" || state === "Arkansas" || state === "Louisiana") {
      return "South Central";
    } else if (state === "Federal") {
      return "Federal";
    } else if (state === "Oregon" || state === "California (northern)" || state === "Nevada (not Las Vegas)") {
      return "Nor-Cal";
    } else if (state === "Yukon Territory" || state === "Northwest Territories" || state === "Nunavut" || state === "British Columbia" || state === "Alberta" || state === "Saskatchewan" || state === "Manitoba") {
      return "Western Canada";
    } else if (state === "Quebec" || state === "Ontario" || state === "Newfoundland-Labrador" || state === "Prince Edward Island" || state === "New Brunswick" || state === "Nova Scotia") {
      return "Eastern Canada";
    } else {
      return "Error!";
    }
  },

  findRep: function(terr) {
    switch (terr) {
      case "West":
      case "Mountain":
        return { name: "Scott Houran", phone: "9722442625", email: "Scott.Houran@netscout.com" };
      case "North Central":
        return { name: "Jason Ouelette and Stuart Smith", phone: "9786144314 / 9722442670", email: "Jason.Ouellette@netscout.com / Stuart.Smith@netscout.com" };
      case "Northwest":
      case "Western Canada":
        return { name: "Gerry Vilarino", phone: "9722442612", email: "Gerry.Vilarino@netscout.com" };
      case "Northeast":
        return { name: "Beth McDowell", phone: "9722442620", email: "Beth.McDowell@netscout.com" };
      case "Mid-Atlantic":
        return { name: "Keith Bonneau and Jason Ouelette", phone: "9786144127 / 9786144314", email: "Keith.Bonneau@netscout.com / Jason.Ouellette@netscout.com" };
      case "Southeast":
        return { name: "Rae Lynn Meier-Cipollone", phone: "9722442643", email: "Rae.Meier-Cipollone@netscout.com" };
      case "Nor-Cal":
        return { name: "David Gundacker", phone: "4085715043", email: "David.Gundacker@netscout.com" };
      case "South Central":
      case "Southwest":
        return { name: "Wes Johnson", phone: "9722442610", email: "Wesley.Johnson@netscout.com" };
      case "Federal":
        return { name: "Gregg Hyams", phone: "9722442616", email: "Gregg.Hyams@netscout.com" };
      case "Eastern Canada":
        return { name: "Susan Collins", phone: "7192728678", email: "Susan.Collins@netscout.com" };
      case "South America":
        return { name: "Bill Rosenthal", phone: "7813624478", email: "Bill.Rosenthal@netscout.com" };
      case "UK":
        return { name: "Michael Gibbs", phone: "+44 134 4767054", email: "Michael.Gibbs@netscout.com" };
      case "Europe":
        return { name: "Amina Oudghiri", phone: "+44 (0) 7790 816 221", email: "Amina.Oudghiri@netscout.com" };
      case "Baltic":
        return { name: "Shariq Ali", phone: "+4961969519030", email: "Shariq.Ali@netscout.com" };
      case "Middle East":
        return { name: "Abdu Alssaid", phone: "+44 7946 56 35 20", email: "Abdu.Alssaid@netscout.com" };
      case "Asia":
      case "N/A":
        return { name: "Tom Le Poidevin", phone: "+44 (0) 7733 376996", email: "Tom.LePoidevin@netscout.com" };
      default:
        return {};
    }
  },

  states: ["Please select", "Federal", "Alabama", "Alaska", "Arizona", "Arkansas", "California (northern)", "California (southern)", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada (not Las Vegas)", "-- Las Vegas", "New Hampshire", "New Jersey", "New Mexico", "New York (southern)", "New York (upstate)", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington DC", "Washington (state)", "West Virginia", "Wisconsin", "Wyoming"],

  provinces: ["Please select", "Yukon Territory", "Northwest Territories", "Nunavut", "British Columbia", "Alberta", "Saskatchewan", "Manitoba", "Quebec", "Ontario", "Newfoundland-Labrador", "Prince Edward Island", "New Brunswick", "Nova Scotia"],

  countries: [
    { name: "South America", domain: "South America" },
    { name: "UK", domain: "United Kingdom (England, Scotland, Wales, Ireland)" },
    { name: "Europe", domain: "France, Spain, Italy, Greece, Russia, and Eastern Europe (Poland, Ukraine, Turkey, Romania, Belarus, Bulgaria)" },
    { name: "Baltic", domain: "Germany and the Baltic States (Estonia, Latvia, Lithuania)" },
    { name: "Middle East", domain: "Middle East and India" },
    { name: "Asia", domain: "Asia" },
    { name: "N/A", domain: "I don't see my country listed here" }
  ]

};


// { name: "Marci Eaton", phone: "9786144158", email: "Marci.Eaton@netscout.com" }
