document.addEventListener("DOMContentLoaded", async function () {
    // Initialize the Auth0 client
    const auth0 = await createAuth0Client({
        domain: 'dev-aw2zto4r1fqzsj8i.us.auth0.com',  // Replace with your Auth0 domain (e.g., 'your-app.auth0.com')
        client_id: 'Loevn4yrlaE1UkugPQAeeDLQwtTPtoOu',  // Replace with your Auth0 client ID
        redirect_uri: window.location.href,  // Set the redirect URI to the current URL
    });

    // Check if the user is authenticated
    async function checkAuthentication() {
        const isAuthenticated = await auth0.isAuthenticated();

        if (isAuthenticated) {
            // User is authenticated, show logout button and user info
            document.getElementById('login').style.display = 'none';
            document.getElementById('logout').style.display = 'inline';
            const user = await auth0.getUser();
            console.log(user);  // Log the user info to the console (you can use this in your app)
        } else {
            // User is not authenticated, show login button
            document.getElementById('login').style.display = 'inline';
            document.getElementById('logout').style.display = 'none';
        }
    }

    // Handle Login
    document.getElementById('login').addEventListener('click', async () => {
        await auth0.loginWithRedirect();
    });

    // Handle Logout
    document.getElementById('logout').addEventListener('click', async () => {
        await auth0.logout({
            returnTo: window.location.href,  // Redirect back to the current page after logout
        });
    });

    // Handle the callback from Auth0
    if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
        await auth0.handleRedirectCallback();
        window.location.replace(window.location.pathname);
    }

    // Check authentication on page load
    checkAuthentication();

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
