document.addEventListener("DOMContentLoaded", function () {
    // Update Date & Time
    function updateDateTime() {
        const datetimeElement = document.getElementById("datetime");
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString();
        datetimeElement.textContent = formattedDate;
    }

    // Update the time on page load and every second
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Scroll animation for sections
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

    // Mouse interaction effect (parallax effect)
    document.addEventListener('mousemove', function (e) {
        const background = document.querySelector('.particles');
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        background.style.transform = `translate(${mouseX / 50}px, ${mouseY / 50}px)`;
    });
});
