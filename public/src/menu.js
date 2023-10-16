"use-strict";

const btn = document.getElementById("menu-button");

btn.addEventListener("click", () => {
    const aside = document.getElementById("menu");
    aside.classList.remove("-translate-x-full");
    aside.classList.remove("w-64");
    aside.classList.add("translate-x-0");
    aside.classList.add("w-80");
});
