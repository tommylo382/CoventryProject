// show the value of the silder in real time

const slider = document.querySelector("input[type=range]")
slider.addEventListener("input", () => {
    document.querySelector("output").value = slider.value;
});