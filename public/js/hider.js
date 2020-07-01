showEdit = () => {
  const x = document.getElementById("editDiv");
  const y = document.getElementById("deleteDiv");
  x.style.display = "block";
  x.scrollIntoView();
  y.style.display = "none";
};

cancelEdit = () => {
  const c = document.getElementById("container");
  const x = document.getElementById("editDiv");
  c.scrollIntoView(true);
  x.style.display = "none";
};

showDelete = () => {
  const x = document.getElementById("editDiv");
  const y = document.getElementById("deleteDiv");
  y.style.display = "block";
  y.scrollIntoView();
  x.style.display = "none";

};

cancelDelete = () => {
  const c = document.getElementById("container");
  const y = document.getElementById("deleteDiv");
  c.scrollIntoView(true);
  y.style.display = "none";
};

showInventory = () => {
  const x = document.getElementById("checkInv");
  x.style.display = "block";
  x.scrollIntoView();
};

showCats = () => {
  const categories = document.querySelector(".categories");
  if ((!categories.style.display) || (categories.style.display === "none")) {
    categories.style.display = "block";
  } else {
    categories.style.display = "none";
  }
};

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
