document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll("[data-menu]");

  menuItems.forEach((menu) => {
    menu.addEventListener("click", async function (event) {
      event.stopPropagation(); // Prevent the click from triggering outside click listener

      const menuType = menu.getAttribute("data-menu");
      const dropdown = document.getElementById(`dropdown-${menuType}`);

      // Close other dropdowns except the current one
      document.querySelectorAll(".absolute").forEach((d) => {
        if (d !== dropdown) d.classList.add("hidden");
      });

      // Fetching and populating dropdown if empty
      if (!dropdown.hasChildNodes()) {
        try {
          const response = await fetch(`Assets/data/${menuType}.json`);
          const data = await response.json();

          dropdown.innerHTML = data.items
            .map(
              (item) =>
                `<a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-200 hover:text-black" >${item}</a>`
            )
            .join("");
        } catch (error) {
          console.error("Error fetching menu data:", error);
        }
      }

      dropdown.classList.toggle("hidden");
    });
  });

  // Prevent dropdown from closing when clicking inside it
  document.querySelectorAll(".absolute").forEach((dropdown) => {
    dropdown.addEventListener("click", (event) => event.stopPropagation());
  });

  // Hiding dropdowns 
  document.addEventListener("click", function (event) {
    if (
      !event.target.closest("[data-menu]") &&
      !event.target.closest(".absolute")
    ) {
      document
        .querySelectorAll(".absolute")
        .forEach((d) => d.classList.add("hidden"));
    }
  });
});

// Menu Button Functipn
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menuButton");
  const menuBox = document.getElementById("menuBox");
  const overlay = document.getElementById("overlay");

  // Toggle menu and overlay
  menuButton.addEventListener("click", () => {
    menuBox.classList.toggle("hidden");
    overlay.classList.toggle("pointer-events-none");

    setTimeout(() => {
      menuBox.classList.toggle("opacity-100");
      menuBox.classList.toggle("scale-100");
      overlay.classList.toggle("opacity-50");
    }, 10);
  });

  // Hide menu when clicking outside
  overlay.addEventListener("click", () => {
    menuBox.classList.add("hidden");
    overlay.classList.add("pointer-events-none");
    overlay.classList.remove("opacity-50");
  });

  // Fetch and populate menu options
  fetch("Assets/data/menu.json")
    .then((response) => response.json())
    .then((data) => {
      menuBox.innerHTML = data.items
        .map(
          (item) => `
              <div class="px-4 py-2 text-sm text-gray-700 cursor-pointer rounded-md
                          hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200">
                ${item}
              </div>`
        )
        .join("");
    })
    .catch((error) => console.error("Error loading menu:", error));
});



// HAMBERGER ICON
document.getElementById("hamberg").addEventListener("click", function () {
  const navMenu = document.getElementById("navMenu");
  navMenu.classList.toggle("hidden");
  navMenu.classList.toggle("flex");
  navMenu.classList.toggle("flex-col");
  navMenu.classList.toggle("items-center");
  navMenu.classList.toggle("w-full");
  navMenu.classList.toggle("p-4");
});


//   SignUp Functionality

const signupButton = document.getElementById("signupButton");
const signupPopup = document.getElementById("signupPopup");
const signupOverlay = document.getElementById("signupOverlay");
const closeSignupPopup = document.getElementById("closeSignupPopup");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError"); 

// Show Popup
signupButton.addEventListener("click", () => {
  signupPopup.classList.remove("hidden");
  signupOverlay.classList.remove("pointer-events-none");

  setTimeout(() => {
    signupOverlay.classList.add("opacity-50");
    signupPopup.classList.add("scale-100", "opacity-100");
  }, 10);
});

// Close Popup Function
const closePopup = () => {
  signupOverlay.classList.remove("opacity-50");
  signupPopup.classList.remove("scale-100", "opacity-100");

  setTimeout(() => {
    signupPopup.classList.add("hidden");
    signupOverlay.classList.add("pointer-events-none");
  }, 300);
};

// Close on button or overlay click
closeSignupPopup.addEventListener("click", closePopup);
signupOverlay.addEventListener("click", closePopup);

// Email Validation on Input
emailInput.addEventListener("input", () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value)) {
    emailError.classList.remove("hidden");
    emailInput.classList.add("border-red-500");
  } else {
    emailError.classList.add("hidden");
    emailInput.classList.remove("border-red-500");
  }
});

// Form Submission Handling
document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;

  // Email Validation
  if (emailInput.value.trim() === "") {
    emailError.textContent = "Email is required.";
    emailError.classList.remove("hidden");
    emailInput.classList.add("border-red-500");
    valid = false;
  }

  // Password Validation
  if (passwordInput.value.trim() === "") {
    passwordError.textContent = "Password is required.";
    passwordError.classList.remove("hidden");
    passwordInput.classList.add("border-red-500");
    valid = false;
  } else {
    passwordError.classList.add("hidden");
    passwordInput.classList.remove("border-red-500");
  }


  if (valid && emailError.classList.contains("hidden")) {
    alert("Form submitted successfully!");
    closePopup();

    emailInput.value = "";
    passwordInput.value = "";
  }
});

// Section 1 background
document.addEventListener("DOMContentLoaded", () => {
  const heroBackground = document.getElementById("hero-background");
  const thumbnailsContainer = document.getElementById("image-thumbnails");
  const heroText = document.getElementById("hero-text");
  const heroButton = document.getElementById("hero-button");

  // Helper function to retrigger animation
  function retriggerAnimation(element, classesToRemove, classesToAdd) {
    element.classList.remove(...classesToRemove);
    element.offsetWidth;
    element.classList.add(...classesToAdd);
  }

  fetch("Assets/data/images.json")
    .then((response) => response.json())
    .then((data) => {
      const images = data.backgroundImages;

      // Set default background image and initial animation
      heroBackground.style.backgroundImage = `url('${images[0].background}')`;
      setTimeout(() => {
        retriggerAnimation(
          heroText,
          ["opacity-0", "-translate-x-10"],
          ["opacity-100", "translate-x-0"]
        );
        retriggerAnimation(
          heroButton,
          ["opacity-0", "-translate-x-10"],
          ["opacity-100", "translate-x-0"]
        );
      }, 200);

      images.forEach((image, index) => {
        const thumbnail = document.createElement("img");
        thumbnail.src = image.thumbnail;
        thumbnail.alt = `Thumbnail ${index + 1}`;
        thumbnail.className = `w-[241px] h-[157px] rounded-lg cursor-pointer border-4 transition-transform hover:scale-105 object-cover ${
          index === 0 ? "border-[#FEFA17]" : "border-white"
        }`;

        thumbnail.addEventListener("click", () => {
          // Fade out background
          heroBackground.classList.add("opacity-0");

          // Remove animation classes to prepare for retriggering
          retriggerAnimation(
            heroText,
            ["opacity-100", "translate-x-0"],
            ["opacity-0", "-translate-x-10"]
          );
          retriggerAnimation(
            heroButton,
            ["opacity-100", "translate-x-0"],
            ["opacity-0", "-translate-x-10"]
          );

          setTimeout(() => {
            // Change background image and fade it in
            heroBackground.style.backgroundImage = `url('${image.background}')`;
            heroBackground.classList.remove("opacity-0");
            heroBackground.classList.add("opacity-100");

            // Retrigger text and button animations
            retriggerAnimation(
              heroText,
              ["opacity-0", "-translate-x-10"],
              ["opacity-100", "translate-x-0"]
            );
            retriggerAnimation(
              heroButton,
              ["opacity-0", "-translate-x-10"],
              ["opacity-100", "translate-x-0"]
            );
          }, 300); // Sync with fade duration

          // Update thumbnail borders
          document.querySelectorAll("#image-thumbnails img").forEach((img) => {
            img.classList.remove("border-[#FEFA17]");
            img.classList.add("border-white");
          });
          thumbnail.classList.remove("border-white");
          thumbnail.classList.add("border-[#FEFA17]");
        });

        thumbnailsContainer.appendChild(thumbnail);
      });
    })
    .catch((error) => console.error("Error fetching images:", error));
});

//   ARROW BUTTON FUNCTIONALITY
document.addEventListener("DOMContentLoaded", function () {
  const thumbnails = [
    "Assets/images/image1.jpg",
    "Assets/images/image2.jpg",
    "Assets/images/image3.jpg",
  ];

  let currentIndex = 0;
  const backgroundSection = document.getElementById("hero-background");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  function updateBackground() {
    backgroundSection.style.backgroundImage = `url('${thumbnails[currentIndex]}')`;
  }

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    updateBackground();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % thumbnails.length;
    updateBackground();
  });


  updateBackground();
});

// SEARCH SECTION LOCATION
document.addEventListener("DOMContentLoaded", () => {
  const locationButton = document.getElementById("selectedLocation");
  const locationList = document.getElementById("locationList");
  const selectedName = document.getElementById("selectedName");
  const selectedIcon = document.getElementById("selectedIcon");

  // Fetch locations from JSON
  fetch("Assets/data/locations.json")
    .then((response) => response.json())
    .then((locations) => {
      locations.forEach((location) => {
        const li = document.createElement("li");
        li.className =
          "flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100";

        li.innerHTML = `
                    <img src="${location.icon}" alt="${location.name}" class="w-5 h-5 mr-2">
                    <span>${location.name}</span>
                `;

        li.addEventListener("click", (e) => {
          e.stopPropagation();
          selectedName.textContent = location.name;
          selectedIcon.src = location.icon;
          selectedIcon.classList.remove("hidden");
          locationList.classList.add("hidden");
        });

        locationList.appendChild(li);
      });
    });

  // Toggle dropdown visibility
  locationButton.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent dropdown from closing immediately
    locationList.classList.toggle("hidden");
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !locationButton.contains(e.target) &&
      !locationList.contains(e.target)
    ) {
      locationList.classList.add("hidden");
    }
  });
});

// DATE FUNCTIONALITY
document.addEventListener("DOMContentLoaded", () => {
  const checkinInput = document.getElementById("checkinInput");
  const checkinDateText = document.getElementById("checkinDateText");

  const checkoutInput = document.getElementById("checkoutInput");
  const checkoutDateText = document.getElementById("checkoutDateText");

  // Helper function to format the date as "02 January 2024"
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Update text on date selection
  checkinInput.addEventListener("change", () => {
    checkinDateText.textContent = checkinInput.value
      ? formatDate(checkinInput.value)
      : "Select date";
  });

  checkoutInput.addEventListener("change", () => {
    checkoutDateText.textContent = checkoutInput.value
      ? formatDate(checkoutInput.value)
      : "Select date";
  });
});

// CARDS FOR HOTELS
document.addEventListener("DOMContentLoaded", () => {
  const toursContainer = document.getElementById("toursContainer");
  const filterButtons = document.querySelectorAll(".filter-button");

  let toursData = [];
  let selectedFilters = {
    category: "Any",
    duration: "Any",
    price: "Any",
    rating: "Any",
  };

  // Fetch tour data
  fetch("Assets/data/featured-tours.json")
    .then((response) => response.json())
    .then((tours) => {
      toursData = tours;
      displayTours(tours);
    })
    .catch((error) => console.error("Error fetching data:", error));

  // Function to display tours
  function displayTours(tours) {
    toursContainer.innerHTML = ""; 

    if (tours.length === 0) {
      toursContainer.innerHTML = `<p class="text-center text-gray-500 mt-10">No tours match the selected filters.</p>`;
      return;
    }

    tours.forEach((tour) => {
      const card = document.createElement("div");
      card.className =
        "relative rounded-[16px] border border-[#E4E6E8] overflow-visible shadow-sm";

      card.innerHTML = `
          <div class="relative">
            <img src="${tour.image}" alt="${
        tour.name
      }" class="w-full h-[260px] object-cover rounded-t-[16px]" />
            <span class="absolute top-3 left-3 bg-white text-[#F09814] text-sm font-semibold px-3 py-1 rounded-full cursor-pointer hover:scale-110 transition-transform ease-in-out !block">
              ${tour.badge}
            </span>
            <button class="absolute top-3 right-3 rounded-full bg-white p-1.5 hover:scale-110 transition-transform ease-in-out !block">
              <img src="Assets/icons/heart.svg" alt="Favorite" class="w-6 h-6" />
            </button>
          </div>
  
          <div class="bg-white p-4 rounded-b-[16px] -mt-6 shadow-md relative z-10">
            <div class="flex items-center space-x-1 ml-auto mb-2 rounded-full bg-white shadow-md px-2 py-1 w-fit">
              <img src="Assets/icons/star.svg" alt="Rating" class="w-4 h-4" />
              <span class="font-medium text-[14px]">${tour.rating}</span>
              <span class="text-[#737373] text-[12px]">(${
                tour.reviews
              } reviews)</span>
            </div>
  
            <h3 class="font-bold text-lg mb-2">${tour.name}</h3>
  
            <div class="flex items-center text-sm text-[#737373] space-x-4 mb-4">
              <span class="flex items-center space-x-1">
                <img src="Assets/icons/clock.svg" alt="Clock" class="w-4 h-4">
                <span>${tour.stay}</span>
              </span>
              <span class="flex items-center space-x-1">
                <img src="Assets/icons/guest.svg" alt="Guest" class="w-4 h-4">
                <span>${tour.guests}</span>
              </span>
            </div>
  
            <div class="flex justify-between items-center">
              <p class="font-semibold text-xl">$${tour.price.toFixed(
                2
              )} <span class="text-[#737373] text-sm">/ person</span></p>
              <button class="bg-[#F2F4F6] px-4 py-2 rounded-full text-sm font-medium border border-[#E4E6E8] hover:scale-110 transition-transform ease-in-out">Book Now</button>
            </div>
          </div>
        `;

      toursContainer.appendChild(card);
    });
  }

  // Filtering function
  function filterTours() {
    const filteredTours = toursData.filter((tour) => {
      return (
        (selectedFilters.category === "Any" ||
          tour.category === selectedFilters.category) &&
        (selectedFilters.duration === "Any" ||
          tour.stay === selectedFilters.duration) &&
        (selectedFilters.price === "Any" ||
          isPriceInRange(tour.price, selectedFilters.price)) &&
        (selectedFilters.rating === "Any" ||
          Math.floor(tour.rating) == selectedFilters.rating)
      );
    });

    displayTours(filteredTours);
  }

  // Price range check
  function isPriceInRange(price, range) {
    if (range === "Any") return true;
    const [min, max] = range.split("-").map(Number);
    return price >= min && price <= max;
  }

  // Create dropdown logic
  function createDropdown(button, options, filterKey) {
    const dropdown = document.createElement("div");
    dropdown.className =
      "absolute bg-white shadow-lg rounded-lg mt-2 py-2 hidden z-50";

    options.forEach((option) => {
      const item = document.createElement("div");
      item.className = "px-4 py-2 hover:bg-gray-200 cursor-pointer text-black";
      item.textContent = option;

      item.addEventListener("click", (e) => {
        e.stopPropagation();
        selectedFilters[filterKey] = option; // Update selected filter
        filterTours(); // Filter tours based on updated selection
        dropdown.classList.add("hidden"); // Hide dropdown after selection
        button.querySelector("span").textContent = option; // Update button label
      });

      dropdown.appendChild(item);
    });

    button.appendChild(dropdown);

    button.addEventListener("click", (e) => {
      e.stopPropagation();
      document
        .querySelectorAll(".dropdown")
        .forEach((d) => d.classList.add("hidden")); // Hide other dropdowns
      dropdown.classList.toggle("hidden"); // Toggle current dropdown
    });

    // Hide dropdown when clicking outside
    document.addEventListener("click", (event) => {
      if (!button.contains(event.target)) {
        dropdown.classList.add("hidden");
      }
    });
  }

  // Attach dropdowns with 'Any' as default option
  createDropdown(
    filterButtons[0],
    [
      "Any",
      "Hotel",
      "Villa",
      "Hostel",
      "Resort",
      "Tour",
      "Adventure",
      "Cruise",
    ],
    "category"
  );
  createDropdown(
    filterButtons[1],
    [
      "Any",
      "1 day 2 nights",
      "2 days 3 nights",
      "3 days 3 nights",
      "5 days 4 nights",
      "6 days 7 nights",
    ],
    "duration"
  );
  createDropdown(filterButtons[2], ["Any", "1", "2", "3", "4", "5"], "rating");
  createDropdown(
    filterButtons[3],
    ["Any", "0-10", "10-20", "20-30", "30-50"],
    "price"
  );
});








//   CATEGORIES SECTION 3

const grid = document.getElementById("categoriesGrid");
const viewMoreBtn = document.getElementById("viewMoreBtn");
let categories = [];
let startIndex = 0; 

// Fetch categories from the JSON file
fetch("Assets/data/categories.json")
  .then((response) => response.json())
  .then((data) => {
    categories = data;
    renderCategories();
  });


function renderCategories() {
  grid.innerHTML = "";

  const visibleCategories = categories.slice(startIndex, startIndex + 8);
  visibleCategories.forEach((category) => {
    const card = document.createElement("div");
    card.className =
      " border-[1px] border-[#E4E6E8] rounded-2xl shadow-lg p-4 hover:shadow-2xl transition transform";
      card.innerHTML = `
      <img src="${category.image}" alt="${category.title}" class="rounded-2xl w-full h-32 object-cover" />
      <h3 class="mt-4 text-lg font-semibold">${category.title}</h3>
      
      <!-- Flex container for text and button -->
      <div class="flex justify-between items-center mt-2">
        <p class="text-sm text-gray-500">${category.tours} Tours, ${category.activities} Activities</p>
        <button class="flex justify-center items-center rounded-full bg-[#E4E6E8] w-8 h-8 transition transform hover:scale-110">
          <img src="Assets/icons/right-arrow.svg" alt="Next" class="w-3 h-3" />
        </button>
      </div>
    `;
    
    grid.appendChild(card);
  });
}

// Handle "View More" button click
viewMoreBtn.addEventListener("click", () => {
  startIndex = (startIndex + 4) % categories.length;

  // Smooth left shift animation
  grid.classList.add("opacity-0", "-translate-x-5");
  setTimeout(() => {
    renderCategories();
    grid.classList.remove("-translate-x-5");
    grid.classList.add("translate-x-0");
    grid.classList.remove("opacity-0");
  }, 300);
});












// SECTION 6 TOP RATED HOTELS

document.addEventListener("DOMContentLoaded", () => {
  const topRated = document.getElementById("topRated");
  const previous = document.getElementById("prev");
  const next = document.getElementById("nex");

  let tours = [];
  let currentIndex = 0;
  const itemsPerPage = 3;

  // Fetch tours from the JSON file
  fetch("Assets/data/featured-tours.json")
    .then((response) => response.json())
    .then((data) => {
      tours = data;
      renderTours();
      updateButtonState();
    })
    .catch((error) => console.error("Error fetching tours:", error));

  // Render tours based on current index
  function renderTours() {
    topRated.innerHTML = ""; // Clear existing cards

    const visibleTours = tours.slice(currentIndex, currentIndex + itemsPerPage);
    visibleTours.forEach((tour) => {
      const card = document.createElement("div");
      card.className =
        "relative rounded-[16px] border border-[#E4E6E8] overflow-hidden shadow-sm transition-transform duration-500";

      card.innerHTML = `
        <div class="relative">
          <img src="${tour.image}" alt="${tour.name}" class="w-full h-[260px] object-cover rounded-t-[16px]" />
          <span class="absolute top-3 left-3 bg-white text-[#F09814] text-sm font-semibold px-3 py-1 rounded-full cursor-pointer hover:scale-110 transition !block">
            ${tour.badge}
          </span>
          <button class="absolute top-3 right-3 rounded-full bg-white p-1.5 hover:scale-110 transition !block">
            <img src="Assets/icons/heart.svg" alt="Favorite" class="w-6 h-6" />
          </button>
        </div>
        <div class="bg-white p-4 rounded-b-[16px] -mt-6 shadow-md relative z-10">
          <div class="flex items-center space-x-1 ml-auto mb-2 rounded-full bg-white shadow-md px-2 py-1 w-fit">
            <img src="Assets/icons/star.svg" alt="Rating" class="w-4 h-4" />
            <span class="font-medium text-[14px]">${tour.rating}</span>
            <span class="text-[#737373] text-[12px]">(${tour.reviews} reviews)</span>
          </div>
          <h3 class="font-bold text-lg mb-2">${tour.name}</h3>
          <div class="flex items-center text-sm text-[#737373] space-x-4 mb-4">
            <span class="flex items-center space-x-1">
              <img src="Assets/icons/clock.svg" alt="Clock" class="w-4 h-4">
              <span>${tour.stay}</span>
            </span>
            <span class="flex items-center space-x-1">
              <img src="Assets/icons/guest.svg" alt="Guest" class="w-4 h-4">
              <span>${tour.guests}</span>
            </span>
          </div>
          <div class="flex justify-between items-center">
            <p class="font-semibold text-xl">$${tour.price.toFixed(2)} <span class="text-[#737373] text-sm">/ person</span></p>
            <button class="bg-[#F2F4F6] px-4 py-2 rounded-full text-sm font-medium border border-[#E4E6E8] hover:scale-110 transition">Book Now</button>
          </div>
        </div>
      `;

      topRated.appendChild(card);
    });
  }

  // Update the state of navigation buttons
  function updateButtonState() {
    previous.disabled = currentIndex === 0;
    next.disabled = currentIndex + itemsPerPage >= tours.length;

    previous.classList.toggle("opacity-50", previous.disabled);
    next.classList.toggle("opacity-50", next.disabled);
  }

  // Handle Previous button click
  previous.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= itemsPerPage;

      // Add animation for smooth right-to-left shift
      topRated.classList.add("opacity-0", "-translate-x-5");
      setTimeout(() => {
        renderTours();
        topRated.classList.remove("-translate-x-5");
        topRated.classList.add("translate-x-0");
        topRated.classList.remove("opacity-0");
        updateButtonState();
      }, 300);
    }
  });

  // Handle Next button click
  next.addEventListener("click", () => {
    if (currentIndex + itemsPerPage < tours.length) {
      currentIndex += itemsPerPage;

      // Add animation for smooth left-to-right shift
      topRated.classList.add("opacity-0", "translate-x-5");
      setTimeout(() => {
        renderTours();
        topRated.classList.remove("translate-x-5");
        topRated.classList.add("translate-x-0");
        topRated.classList.remove("opacity-0");
        updateButtonState();
      }, 300);
    }
  });
});













// SECTION 7 TESTIMONIALS

const container = document.getElementById('testimonial-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let testimonials = [];
let currentIndex = 0;
const cardsToShow = 3;

// Fetch data from JSON
async function fetchTestimonials() {
  try {
    const response = await fetch('Assets/data/testimonials.json');
    testimonials = await response.json();
    displayTestimonials(currentIndex);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
  }
}

// Display testimonials based on current index
function displayTestimonials(startIndex) {
// Add Tailwind classes for smooth transition
container.classList.add("transition-all", "duration-500", "ease-in-out", "opacity-0", "-translate-x-5");

setTimeout(() => {
  container.innerHTML = ''; // Clear existing cards

  const visibleTestimonials = testimonials.slice(startIndex, startIndex + cardsToShow);

  visibleTestimonials.forEach(testimonial => {
    const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);

    const card = `
      <div class="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
        <div>
          <h3 class="font-semibold text-lg mb-2">${testimonial.heading}</h3>
          <p class="text-gray-600 mb-4">${testimonial.review}</p>
        </div>
        <div class="flex items-center justify-between mt-4">
          <div class="flex items-center">
            <img src="${testimonial.image}" alt="${testimonial.name}" class="w-10 h-10 rounded-full mr-3">
            <div>
              <p class="font-medium">${testimonial.name}</p>
              <p class="text-sm text-gray-500">${testimonial.location}</p>
            </div>
          </div>
          <div class="text-yellow-400 text-lg">${stars}</div>
        </div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', card);
  });

  // Smooth fade-in & slide-in
  container.classList.remove("-translate-x-5");
  container.classList.add("translate-x-0");
  container.classList.remove("opacity-0");
}, 500); // Increased timeout to match the slower duration
 // Matches the animation duration
}


// Navigation
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + cardsToShow) % testimonials.length;
  displayTestimonials(currentIndex);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - cardsToShow + testimonials.length) % testimonials.length;
  displayTestimonials(currentIndex);
});

// Initialize
fetchTestimonials();



















// SECTION 9 NEWS
const newsContainer = document.getElementById("newsContainer");
const viewmore = document.getElementById("viewmore");

let currentPage = 0;
const itemsPerPage = 3;
let newsData = [];

// Fetch the news data on page load
fetch("Assets/data/news.json")
  .then(response => response.json())
  .then(data => {
    newsData = data;
    displayNews(); // Load the first set of news cards
  });

// Function to display news based on current page
function displayNews() {
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  const newsSlice = newsData.slice(start, end);

  newsContainer.innerHTML = ""; // Clear previous cards

  newsSlice.forEach(news => {
    const card = document.createElement("div");
    card.className = "rounded-2xl shadow-md overflow-hidden";

    card.innerHTML = `
      <div class="relative">
        <img src="${news.image}" alt="${news.title}" class="w-full h-[260px] object-cover" />
        <span class="absolute top-3 left-3 bg-white text-[#F09814] text-sm font-semibold px-3 py-1 rounded-full !block">${news.topTag}</span>
        <button class="absolute top-3 right-3 bg-white/30 rounded-full p-2 hover:bg-white hover:scale-110  duration-300  transition-colors !block">
          <img src="Assets/icons/heart.svg" alt="Favorite" class="w-5 h-5" />
        </button>
      </div>

      <div class="bg-white p-5">
        <div class="flex items-center text-gray-500 text-sm space-x-4 mb-3">
          <span class="flex items-center space-x-1">
            <img src="Assets/icons/calendar.svg" alt="Date" class="w-4 h-4" />
            <span>${news.date}</span>
          </span>
          <span class="flex items-center space-x-1">
            <img src="Assets/icons/clock.svg" alt="Time" class="w-4 h-4" />
            <span>${news.time}</span>
          </span>
          <span class="flex items-center space-x-1">
            <img src="Assets/icons/comment.svg" alt="Comments" class="w-4 h-4" />
            <span>${news.comments} comments</span>
          </span>
        </div>

        <h3 class="font-bold text-lg mb-4">${news.title}</h3>

        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <img src="${news.authorImage}" alt="${news.author}" class="w-8 h-8 rounded-full" />
            <p class="text-sm font-medium">${news.author}</p>
          </div>
          <button class="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition">Keep Reading</button>
        </div>
      </div>
    `;

    newsContainer.appendChild(card);
  });

  // Hide the button if no more pages are left
  if ((currentPage + 1) * itemsPerPage >= newsData.length) {
    viewmore.style.display = "none";
  }
}

// Event Listener for "View More" button
viewmore.addEventListener("click", () => {
  currentPage++;
  displayNews();
});








// FOOTER EMAIL VALIDATION
const emailIn = document.getElementById("emailIn");
const emailErr = document.getElementById("emailErr");

emailIn.addEventListener("input", () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailPattern.test(emailIn.value)) {
    emailIn.classList.remove("border-red-500");
    emailIn.classList.add("border-green-500");
    emailErr.classList.add("hidden");
  } else {
    emailIn.classList.remove("border-green-500");
    emailIn.classList.add("border-red-500");
    emailErr.classList.remove("hidden");
  }
});













document.addEventListener("DOMContentLoaded", function () {
  const chatPopup = document.getElementById("chatPopup");
  const aiBuddyBtn = document.getElementById("aiBuddyBtn");
  const closeChat = document.getElementById("closeChat");

  // Open chat popup
aiBuddyBtn.addEventListener("click", () => {
  if (chatPopup.classList.contains("hidden")) {
    chatPopup.classList.remove("hidden");

    // Add a small delay to allow Tailwind's transition to work
    setTimeout(() => {
      chatPopup.classList.remove("opacity-0", "translate-y-10", "scale-95");
      chatPopup.classList.add("opacity-100", "translate-y-0", "scale-100");
    }, 10);
  }
});

  

  // Close chat popup
  closeChat.addEventListener("click", () => {
    chatPopup.classList.remove("opacity-100", "translate-y-0");
    chatPopup.classList.add("opacity-0", "translate-y-10");
  
    // Delay hiding element to allow animation to finish
    setTimeout(() => chatPopup.classList.add("hidden"), 300);
  });
  
});






// AIzaSyBzzvM5n_MbXXw2izLzLbMmD1x44lCqgmI


const typingForm = document.querySelector(".typing-form");
const chatContainer = document.querySelector(".chat-list");
const suggestions = document.querySelectorAll(".suggestion");
const deleteChatButton = document.querySelector("#delete-chat-button");

// State variables
let userMessage = null;
let isResponseGenerating = false;

// API configuration
const API_KEY = "AIzaSyBzzvM5n_MbXXw2izLzLbMmD1x44lCqgmI"; // Your API key here
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// Load chat data from local storage
const loadDataFromLocalstorage = () => {
  const savedChats = localStorage.getItem("saved-chats");
  chatContainer.innerHTML = savedChats || "";
  document.body.classList.toggle("hide-header", !!savedChats);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

// Create a new message element
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes, "p-3", "bg-gray-200", "rounded-lg", "max-w-[85%]","mb-3");
  div.innerHTML = content;
  return div;
};


const showTypingEffect = (text, textElement, incomingMessageDiv) => {
  const words = text.split(" ");
  let currentWordIndex = 0;
  const typingInterval = setInterval(() => {
    textElement.innerText += (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex++];

    incomingMessageDiv.querySelector(".icon").classList.add("hide");

    if (currentWordIndex === words.length) {
      clearInterval(typingInterval);
      isResponseGenerating = false;
      incomingMessageDiv.querySelector(".icon").classList.remove("hide");
      localStorage.setItem("saved-chats", chatContainer.innerHTML);
    }
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
  }, 75);
};

// Fetch response from API
const generateAPIResponse = async (loadingDiv) => {
  const textElement = loadingDiv.querySelector(".text");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        contents: [{ role: "user", parts: [{ text: userMessage }] }] 
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.candidates || !data.candidates[0]) {
      throw new Error("Failed to fetch response");
    }

    const apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1");

    loadingDiv.remove();

    const aiMessageHtml = `
      <div class="message-content flex items-center gap-3">
        <img class="w-10 h-10 rounded-full" src="Assets/icons/gemini.png" alt="Gemini avatar">
        <p class="text">${apiResponse}</p>
      </div>
    `;

    const aiMessageDiv = createMessageElement(aiMessageHtml, "incoming");
    chatContainer.appendChild(aiMessageDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);

  } catch (error) {
    console.error("API Error:", error);
    textElement.innerText = "Error fetching response. Try again!";
    textElement.parentElement.closest(".message").classList.add("error");
  } finally {
    isResponseGenerating = false;
  }
};

// Show loading animation
const showLoadingAnimation = () => {
  const html = `
    <div id="loadingMessage" class="message-content flex items-center gap-3">
      <img class="w-10 h-10 rounded-full" src="Assets/icons/gemini.png" alt="Gemini avatar">
      <p class="text"></p>
      <div class="flex gap-1 items-center justify-center mt-1">
        <div class="w-1.5 h-3 bg-gray-400 rounded animate-pulse"></div>
        <div class="w-1.5 h-3 bg-gray-400 rounded animate-pulse [animation-delay:200ms]"></div>
        <div class="w-1.5 h-3 bg-gray-400 rounded animate-pulse [animation-delay:400ms]"></div>
      </div>
    </div>
  `;

  const loadingDiv = createMessageElement(html, "incoming", "loading");
  chatContainer.appendChild(loadingDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);

  generateAPIResponse(loadingDiv);
};

// Handle outgoing chat messages
const handleOutgoingChat = () => {
  userMessage = typingForm.querySelector(".typing-input").value.trim();
  
  if (!userMessage || isResponseGenerating) return;
  
  isResponseGenerating = true;

  const html = `
    <div class="message-content">
      <img class="avatar" src="Assets/users/jimmy.png" alt="User avatar">
      <p class="text">${userMessage}</p>
    </div>
  `;

  const outgoingMessageDiv = createMessageElement(html, "outgoing", "bg-blue-200");
  chatContainer.appendChild(outgoingMessageDiv);

  typingForm.reset();
  document.body.classList.add("hide-header");
  chatContainer.scrollTo(0, chatContainer.scrollHeight);

  setTimeout(showLoadingAnimation, 500);
};

// Delete chat history
deleteChatButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all the chats?")) {
    localStorage.removeItem("saved-chats");
    loadDataFromLocalstorage();
  }
});

// Handle chat suggestions
suggestions.forEach(suggestion => {
  suggestion.addEventListener("click", () => {
    userMessage = suggestion.querySelector(".text").innerText;
    handleOutgoingChat();
  });
});

// Prevent default form submission
typingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleOutgoingChat();
});

// Load chat history
loadDataFromLocalstorage();



