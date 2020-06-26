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
