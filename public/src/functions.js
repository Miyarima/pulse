"use-strict";

document.addEventListener("DOMContentLoaded", function () {
    const notification = document.querySelectorAll("#notification");

    for (let i = 0; i < notification.length; i++) {
        if (notification[i]) {
            let progressBar = notification[i].querySelector("#progress-bar");
            let currentWidth = 0;
            progressBar = progressBar.children[0];

            setTimeout(
                function () {
                    notification[i].classList.remove("grid");
                    notification[i].classList.add("hidden");
                },
                3500 + i * 300,
            );

            const updateProgressBar = () => {
                currentWidth += 1;
                progressBar.style.width = `${currentWidth}%`;

                if (currentWidth >= 100) {
                    clearInterval(progressInterval);
                }
            };

            const progressInterval = setInterval(updateProgressBar, 35 + i * 3);
        }
    }
});
