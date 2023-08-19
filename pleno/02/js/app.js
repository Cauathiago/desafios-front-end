const nav = document.querySelector("nav");
const toggleMenu = document.querySelector(".nav__menu");

// toggle moblie navigation
toggleMenu.addEventListener("click", () => {
    nav.classList.toggle("active");
});

const getStartedBtn = document.querySelector("#get-started-btn");
const shortenLinkInput = document.querySelector("#shorten-link-input");

// get input field's position on different screen size
const mediaQuery = window.matchMedia("(max-width: 1000x)");
let inputPosition = 0;

const updatePosition = () => {
    if (mediaQuery.matches) {
        inputPosition =
            window.scrollY + shortenLinkInput.getBoundingClientRect().top - 125;
    } else {
        inputPosition =
            window.scrollY + shortenLinkInput.getBoundingClientRect().top - 65;
    }
};

//Autofocus input field on header button clicked
getStartedBtn.addEventListener("click", () => {
    updatePosition();
    window.scrollTo({
        top: inputPosition,
    });
    shortenLinkInput.focus();
});

const listContainer = document.querySelector(".url__list-container");
let lastCopiedButton = null;

// Load list items from localStorage
if (localStorage.getItem("listItems")) {
    listContainer.innerHTML = localStorage.getItem("listItems");
}

// Delete list on button click and remove from localStorage
listContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const listItem = e.target.parentElement;
        const listItems = listContainer.innerHTML;

        // Check if the deleted item exists in the list before removing it from localStorage
        if (listItems.includes(listItem.outerHTML)) {
            const updatedListItems = listItems.replace(listItem.outerHTML, "");
            localStorage.setItem("listItems", updatedListItems);
        }

        // Remove the deleted item from the list
        listItem.remove();
    } else if (e.target.classList.contains("copy-btn")) {
        // Change the copied button's style
        const copyButton = e.target;
        copyButton.textContent = "Copied";
        copyButton.style.background = "hsl(260, 8%, 14%)";

        // Reset the last button's style
        if (lastCopiedButton && lastCopiedButton !== copyButton) {
            //check if there was one copied button before
            lastCopiedButton.textContent = "Copy";
            lastCopiedButton.style.background = "hsl(180, 66%, 49%)";
        }

        // Remember the last copied button
        lastCopiedButton = copyButton;
    }
});

//delete list on button click
listContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
    }
});

const urlForm = document.querySelector(".url__form");
const urlInput = document.querySelector(".url__input");
const urlSubmit = document.querySelector(".url__submit");
const urlError = document.querySelector(".url__error");

const errorMessages = {
    1: "No URL specified. Please enter a valid URL.",
    2: "Invalid URL submitted. Please enter a valid URL.",
    3: "Rate limit reached. Please wait and try again.",
    4: "Your IP address has been blocked. Please contact support.",
    5: "The short code is already taken. Please try a different URL.",
    6: "Unknown error. Please try again later.",
    7: "No code specified. Please enter a valid short code.",
    8: "Invalid code submitted. Please enter a valid short code.",
    9: "Missing required parameters. Please try again.",
    10: "The URL cannot be shortened. Please try a different URL.",
};

urlForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(`https://api.shrtco.de/v2/shorten?url=${urlInput.value}`)
        .then((res) => res.json())
        .then((data) => {
            if (!data.ok) {
                urlInput.style.border = "3px solid hsl(0, 87%, 67%)";
                urlError.style.display = "block";

                const errorCode = data.error_code;
                const errorMessage =
                    errorMessages[errorCode] ||
                    "An unknown error occurred. Please try again later.";
                urlError.textContent = errorMessage;
            } else {
                urlInput.style.border = "none";
                urlError.style.display = "none";

                listContainer.innerHTML += `<li class="url__list">
                <p class="old-link">${urlInput.value}</p>
                <hr />
                <div class="url__list-short">
                    <a href="${data.result.full_short_link}" class="short-link"
                        >${data.result.full_short_link}</a
                    >
                    <button type="button" class="copy-btn" onclick="navigator.clipboard.writeText('${data.result.full_short_link}')">Copy</button>
                </div>
                <button type="button" class="delete-btn">❌</button>
            </li>`;
                urlInput.value = "";

                // Save the updated list to localStorage
                const listItems = listContainer.innerHTML;
                localStorage.setItem("listItems", listItems);
            }
        });
});