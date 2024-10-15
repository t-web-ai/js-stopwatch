let start = document.querySelector(".start-btn");
let stop = document.querySelector(".stop-btn");
let reset = document.querySelector(".reset-btn");
let close = document.querySelector(".close-btn");
let errorBox = document.querySelector(".error-box");
let errorMsg = document.querySelector(".error-message");
let resultBox = document.querySelector(".result-box");

errorBox.style.zIndex = "1";

const manageBox = {
    open: function (message) {
        errorBox.style.opacity = "1";
        errorBox.style.transform = "scale(1)";
        errorBox.style.backdropFilter = "blur(2px)";
        errorBox.style.zIndex = "1";
        errorMsg.innerText = message ?? "Initializing...";
    },
    close: function () {
        errorBox.style.opacity = "0";
        errorBox.style.transform = "scale(0.5)";
        errorBox.style.backdropFilter = "blur(0)";
        errorBox.style.zIndex = "0";
    }
};

const manageResult = {
    timeInterval: null,
    startShowing: function (timer) {
        this.timeInterval = setInterval(() => {
            resultBox.innerText = timer.result();
        }, 500);
    },
    stopShowing: function () {
        clearInterval(this.timeInterval);
    }
};