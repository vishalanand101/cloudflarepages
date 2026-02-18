document.addEventListener('DOMContentLoaded', async function () {
    const auth0 = await createAuth0Client({
        domain: 'dev-aw2zto4r1fqzsj8i.us.auth0.com',
        client_id: 'Loevn4yrlaE1UkugPQAeeDLQwtTPtoOu',
        redirect_uri: window.location.origin + '/login.html',
        cacheLocation: 'localstorage',
        useRefreshTokens: true
    });

    // Check if the user is already authenticated
    const isAuthenticated = await auth0.isAuthenticated();
    if (isAuthenticated) {
        // Show project details section if on login page
        if (window.location.pathname.endsWith('login.html')) {
            window.dispatchEvent(new Event('cloudnativex:loginSuccess'));
        } else {
            window.location.href = '/index.html';
        }
    } else {
        const loginBtn = document.getElementById('auth0-login');
        if (loginBtn) {
            loginBtn.addEventListener('click', async function () {
                loginBtn.disabled = true;
                loginBtn.textContent = 'Redirecting...';
                await auth0.loginWithRedirect();
            });
        }
    }

    // Handle the callback from Auth0 after redirect
    if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
        await auth0.handleRedirectCallback();
        // After callback, show project details if on login page
        if (window.location.pathname.endsWith('login.html')) {
            window.dispatchEvent(new Event('cloudnativex:loginSuccess'));
        } else {
            window.location.replace(window.location.pathname);
        }
    }
});
