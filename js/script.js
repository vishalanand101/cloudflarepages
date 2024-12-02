document.addEventListener("DOMContentLoaded", function() {
    function updateDateTime() {
        const datetimeElement = document.getElementById("datetime");
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString();
        datetimeElement.textContent = formattedDate;
    }

    // Update the time on page load and every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
});
