"use-strict";

document.addEventListener("DOMContentLoaded", function () {
    const notification = document.getElementById("notification");

    if (notification) {
        let progressBar = document.getElementById("progress-bar");
        let currentWidth = 0;
        progressBar = progressBar.children[0];

        setTimeout(function () {
            notification.classList.remove("grid");
            notification.classList.add("hidden");
        }, 3000);

        const updateProgressBar = () => {
            currentWidth += 1;
            progressBar.style.width = `${currentWidth}%`;

            if (currentWidth >= 100) {
                clearInterval(progressInterval);
            }
        };

        const progressInterval = setInterval(updateProgressBar, 30);
    }
});
