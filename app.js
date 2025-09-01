/*****************/
/* EDITABLE INFO */
/*****************/

/* -------------------------------------------------------- */

const CARDS = [
  {
    name: "YouTube",
    icon: "ri-youtube-fill",
    link: "https://youtube.com/tv",
    color: "#FF0000",
  },
  {
    name: "ARD Mediathek",
    icon: "ri-tv-line",
    link: "https://tv.ardmediathek.de/index.html?platform=browser",
    color: "#005696",
  }
];

/* -------------------------------------------------------- */

/******************/
/* CLOCK FUNCTION */
/******************/

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

var currentCardSelected = 0;

const updateDate = () => {
  // Create a new Date object and get the complete Date/Time information
  const completeDate = new Date();

  // Time Variables
  let currentHour = formatDigit(completeDate.getHours());
  let currentMinute = formatDigit(completeDate.getMinutes());

  // Date Variables
  let currentDay = completeDate.getDay();
  let currentNumber = completeDate.getDate();
  let currentMonth = completeDate.getMonth();
  let currentYear = completeDate.getFullYear();

  // Update the Time
  currentTime.innerHTML = `${currentHour}:${currentMinute}`;

  // Update the Date
  currentDate.innerHTML = `${DAYS[currentDay]} ${currentNumber}, ${MONTHS[currentMonth]} ${currentYear}`;

  // Create a Loop
  setTimeout(() => {
    updateDate();
  }, 1000);
};


const formatDigit = (digit) => {
  return digit > 9 ? `${digit}` : `0${digit}`;
};

/******************/
/* CARDS FUNCTION */
/******************/

const printCards = () => {
  cardContainer.innerHTML = "";
  var currentLoopingCard = 0;
  for (const card of CARDS) {
    let currentCard = document.createElement("a");
    let currentCardText = document.createElement("p");
    currentCardText.appendChild(document.createTextNode(card.name));
    let currentCardIcon = document.createElement("i");
    currentCardIcon.classList.add(card.icon);

    // Style the Card Element
    currentCard.classList.add("card");
    currentCard.href = card.link;

    // Style the Icon
    currentCardIcon.classList.add("card__icon");

    // Style the Text
    currentCardText.classList.add("card__name");

    currentCard.append(currentCardIcon);
    currentCard.append(currentCardText);

    // Initialize flag attributes
    currentCard.setAttribute("isHovered", false);
    currentCard.setAttribute("isFocused", false);

    cardContainer.appendChild(currentCard);

    if (currentLoopingCard === currentCardSelected) {
      currentCard.style.color = card.color;
      currentCard.style.borderColor = card.color;
    }

    // Handle the click event
    currentCard.addEventListener("click", async (event) => {
      // If the card doesn't have `clipboard: true` don't do anything
      if (!card.clipboard) return;

      // Prevent the page from opening
      event.preventDefault();
      // Copy the href to the clipboard
      try {
        await navigator.clipboard.writeText(card.link);
        currentCard.blur();
        currentCardText.innerText = "Saved to clipboard!";
        setTimeout(() => {
          currentCardText.innerText = card.name;
        }, 1500);
      } catch {
        currentCardText.innerText = "Unable to copy";
        setTimeout(() => {
          currentCardText.innerText = card.name;
        }, 1500);
      }
    });
    currentLoopingCard++;
  }
};

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            currentCardSelected = currentCardSelected < 1 ? 0 : currentCardSelected - 1;
            break;
        case 39:
            currentCardSelected = currentCardSelected > CARDS.length - 2 ? CARDS.length - 1 : currentCardSelected + 1;
            break;
        case 13:
            window.open(CARDS[currentCardSelected].link, "_blank", "width=0,height=0");
            break;
    }
    printCards();
};


/****************/
/* STARTER CODE */
/****************/

printCards();
updateDate();
