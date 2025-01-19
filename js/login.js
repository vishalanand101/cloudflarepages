document.addEventListener('DOMContentLoaded', async function () {
    const auth0 = await createAuth0Client({
        domain: 'dev-aw2zto4r1fqzsj8i.us.auth0.com',  // Replace with your Auth0 domain
        client_id: 'Loevn4yrlaE1UkugPQAeeDLQwtTPtoOu',  // Replace with your Auth0 client ID
        redirect_uri: 'https://neuralnet.co.in/dashboard.html',  // Redirect URI after login
    });

    // Check if the user is already authenticated
    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
        const user = await auth0.getUser();
        console.log(user);  // Log user data (or use this data in your app)
        
        // Redirect to dashboard after successful login
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
        
        // Redirect to the dashboard after successful login
        window.location.replace('/dashboard.html');  // This ensures the user ends up at the dashboard page
    }
});
