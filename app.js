const container = document.querySelector(".container");
const userInput = document.getElementById("userInput");
const submitBTN = document.getElementById("submit");
const downloadBTN = document.getElementById("download");
const sizeOption = document.querySelector(".sizeOptions");
const BGcolor = document.getElementById("BGcolor");
const FGcolor = document.getElementById("FGcolor");

let QR_code;
let sizechoice, BGcolorchoice, FGcolorchoice;

// sizes 
sizeOption.addEventListener("change", () => {
    sizechoice = sizeOption.value;
});

// bg color 
BGcolor.addEventListener("input", () => {
    BGcolorchoice = BGcolor.value;
});

// fg color 
FGcolor.addEventListener("input", () => {
    FGcolorchoice = FGcolor.value;
});

const inputFormatter = (value) => {
    value = value.replace(/[^a-z0-9A-Z]+/g, "");
    return value;
};

submitBTN.addEventListener("click", async () => {
    container.innerHTML = "";

    QR_code = await new QRCode(container, { 
        text: userInput.value,
        width: sizechoice,
        height: sizechoice,
        colorDark: FGcolorchoice,
        colorLight: BGcolorchoice,
    });
    // download
    const src = container.firstChild.toDataURL("image/png");
    downloadBTN.href = src;
    let userValue = userInput.value;
    try {
        userValue = new URL(userValue).hostname;
    } catch (_) {
        userValue = inputFormatter(userValue);
    }
    downloadBTN.download = `${userValue}QR`;
    downloadBTN.classList.remove("hide");
});

userInput.addEventListener("input", () => {
    if (userInput.value.trim().length < 1) {
        submitBTN.disabled = true;
        downloadBTN.href = "";
        downloadBTN.classList.add("hide");
    } else {
        submitBTN.disabled = false;
    }
});

window.onload = () => {
    container.innerHTML = "";
    sizechoice = 100;
    sizeOption.value = 100;
    userInput.value = "";
    BGcolor.value = BGcolorchoice = "#ffffff";
    FGcolor.value = FGcolorchoice = "#000000";
    downloadBTN.classList.add("hide");
    submitBTN.disabled = true;
};
