const nav = document.querySelector(".navigation");
const navItems = document.querySelectorAll(".nav-item");
let active = "weekly";

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    active = item.innerHTML.toLowerCase();
    console.log(active);
    populatePage(fetchData);
    // handleNavClick(item);
  });
});

let fetchData = [];

const retrieveData = async () => {
  fetch("data.json")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return res.json();
    })
    .then((json) => {
      fetchData = json;
      populatePage(fetchData);
    })
    .catch((err) => {
      console.error(`Fetch problem: ${err.message}`);
    });
};

retrieveData();

const populatePage = (data) => {
  // console.log(data);
  data.forEach((item) => {
    const { title, timeframes } = item;
    const container = document.querySelector(
      `.${title.split(" ").join("-").toLowerCase()}`
    );
    const details = container.querySelector(".details");
    details.innerHTML = "";
    details.innerHTML = `
            <p class="present">${timeframes[`${active}`].current}hrs</p>
            <p class="previous">
            ${
              active === "daily"
                ? "Yesterday"
                : active === "weekly"
                ? "Last Week"
                : "Last Month"
            } - ${timeframes[`${active}`].previous}hrs</p>
            `;
  });
};
