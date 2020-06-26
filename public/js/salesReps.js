
pickCurrCust = () => {
  document.getElementById("currCustDiv").style.display = "block";
  document.getElementById("newCustDiv").style.display = "none";
  document.getElementById("servDiv").style.display = "none";
};

pickNewCust = () => {
  document.getElementById("currCustDiv").style.display = "none";
  document.getElementById("newCustDiv").style.display = "block";
  document.getElementById("servDiv").style.display = "none";
};

pickServ = () => {
  document.getElementById("currCustDiv").style.display = "none";
  document.getElementById("newCustDiv").style.display = "none";
  document.getElementById("servDiv").style.display = "block";
};
