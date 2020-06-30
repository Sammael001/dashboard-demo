
pickUS = () => {
  document.getElementById("USDiv").style.display = "flex";
  document.getElementById("canDiv").style.display = "none";
  document.getElementById("intlDiv").style.display = "none";
};

pickCan = () => {
  document.getElementById("USDiv").style.display = "none";
  document.getElementById("canDiv").style.display = "flex";
  document.getElementById("intlDiv").style.display = "none";
};

pickIntl = () => {
  document.getElementById("USDiv").style.display = "none";
  document.getElementById("canDiv").style.display = "none";
  document.getElementById("intlDiv").style.display = "flex";
};
