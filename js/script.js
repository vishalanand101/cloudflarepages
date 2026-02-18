document.addEventListener("DOMContentLoaded", function () {
    // Update Date & Time (if you have a #datetime element)
    function updateDateTime() {
        const datetimeElement = document.getElementById("datetime");
        if (datetimeElement) {
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString();
            datetimeElement.textContent = formattedDate;
        }
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Scroll animation for sections (if present)
    const sections = document.querySelectorAll('.dynamic-content, .about');
    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        sections.forEach(section => {
            if (section.offsetTop < scrollPosition) {
                section.classList.add('show');
            }
        });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();  // Ensure sections are checked when the page is loaded
});
document.getElementById('login').addEventListener('click', async () => {
