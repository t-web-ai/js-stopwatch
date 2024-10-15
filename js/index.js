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


const startTime = new WeakMap();
const endTime = new WeakMap();
const has_started = new WeakMap();
const previousTime = new WeakMap();
const result = new WeakMap();

// create "Timer" class - start 
class Timer {
    constructor() {
        startTime.set(this, 0);
        endTime.set(this, 0);
        has_started.set(this, null);
        previousTime.set(this, 0);
        result.set(this, 0);
    }
    start() {
        if (has_started.get(this))
            throw "Already Started";
        has_started.set(this, true);
        startTime.set(this, (new Date()).getTime());
    }
    stop() {
        if (!has_started.get(this))
            throw "Didn't even start";
        previousTime.set(this, result.get(this));
        has_started.set(this, null);
    }
    reset() {
        if (has_started.get(this))
            throw "You need to stop the process";
        startTime.set(this, 0);
        endTime.set(this, 0);
        has_started.set(this, null);
        previousTime.set(this, 0);
        result.set(this, 0);
    }
    result() {
        if (has_started.get(this)) {
            endTime.set(this, (new Date()).getTime());
            result.set(this, parseInt(previousTime.get(this)) + parseInt(((endTime.get(this) - startTime.get(this)) / 1000).toFixed()));
            return result.get(this);
        } else {
            return previousTime.get(this);
        }
    }
}
// create "Timer" class - end

const timer = new Timer();

close.addEventListener("click", () => {
    manageBox.close();
});