document.addEventListener('DOMContentLoaded', async function () {
    const auth0 = await createAuth0Client({
        domain: 'dev-aw2zto4r1fqzsj8i.us.auth0.com',
        client_id: 'Loevn4yrlaE1UkugPQAeeDLQwtTPtoOu',
        redirect_uri: window.location.origin + '/login.html',
        cacheLocation: 'localstorage',
        useRefreshTokens: true
    });

    // Always attach login button handler
    const loginBtn = document.getElementById('auth0-login');
    if (loginBtn) {
        loginBtn.addEventListener('click', async function () {
            loginBtn.disabled = true;
            loginBtn.textContent = 'Opening...';
            try {
                await auth0.loginWithPopup();
                // After popup login, show project details
                if (window.location.pathname.endsWith('login.html')) {
                    window.dispatchEvent(new Event('cloudnativex:loginSuccess'));
                } else {
                    window.location.href = '/index.html';
                }
            } catch (e) {
                loginBtn.disabled = false;
                loginBtn.textContent = 'Sign in with Auth0';
                alert('Login failed: ' + (e.message || e));
            }
        });
    }

    // Handle the callback from Auth0 after redirect FIRST (for fallback)
    if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
        await auth0.handleRedirectCallback();
        if (window.location.pathname.endsWith('login.html')) {
            window.dispatchEvent(new Event('cloudnativex:loginSuccess'));
        } else {
            window.location.replace(window.location.pathname);
        }
        return;
    }

    // Now check if the user is already authenticated
    const isAuthenticated = await auth0.isAuthenticated();
    if (isAuthenticated) {
        // Show project details section if on login page
        if (window.location.pathname.endsWith('login.html')) {
            window.dispatchEvent(new Event('cloudnativex:loginSuccess'));
        } else {
            window.location.href = '/index.html';
        }
    }
});
