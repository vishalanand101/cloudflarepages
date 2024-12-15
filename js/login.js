document.addEventListener('DOMContentLoaded', async function () {
    const auth0 = await createAuth0Client({
        domain: 'dev-aw2zto4r1fqzsj8i.us.auth0.com',  // Replace with your Auth0 domain
        client_id: 'Loevn4yrlaE1UkugPQAeeDLQwtTPtoOu',  // Replace with your Auth0 client ID
        redirect_uri: window.location.href,  // This should be the URL of your login.html page
    });

    // Check if the user is already authenticated
    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
        const user = await auth0.getUser();
        console.log(user);  // Log user data (or use this data in your app)
        
        // Optionally redirect user to dashboard after successful login
        window.location.href = '/dashboard.html';  // Redirect to the dashboard page after successful login
    } else {
        // If user is not authenticated, display login button
        document.getElementById('auth0-login').style.display = 'inline';

        // Handle login button click
        document.getElementById('auth0-login').addEventListener('click', async function () {
            await auth0.loginWithRedirect();
        });
    }

    // Handle the callback from Auth0 after redirect
    if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
        await auth0.handleRedirectCallback();
        
        // Redirect to the same page to remove code/state from URL (you can also redirect to a specific page here)
        window.location.replace('/dashboard.html');  // Redirect to dashboard after successful login
    }
});
