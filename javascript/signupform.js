// Cookie functions
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

let allAccounts = [{ user: "admin", pass: "1234", firstName: "", lastName: "" }];

// Check for existing login on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedUsername = getCookie("username");
    if (savedUsername) {
        const account = allAccounts.find(acc => acc.user === savedUsername);
        if (account) {
            document.getElementById('signinMessage').innerHTML = '<div class="alert alert-success">Welcome back, ' + account.firstName + '!</div>';
        }
    }
});

// Sign-Up Form Submission
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const firstName = document.getElementById('signupFirstName').value;
    const lastName = document.getElementById('signupLastName').value;
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    // Check if the user already exists
    const userExists = allAccounts.some(account => account.user === username);

    if (userExists) {
        document.getElementById('signupMessage').innerHTML = '<div class="alert alert-danger">Username already exists.</div>';
    } else {
        allAccounts.push({ user: username, pass: password, firstName: firstName, lastName: lastName });
        document.getElementById('signupMessage').innerHTML = '<div class="alert alert-success">Account created successfully.</div>';
        document.getElementById('signupForm').reset();
    }
});

// Sign-In Form Submission
document.getElementById('signinForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('signinUsername').value;
    const password = document.getElementById('signinPassword').value;

    // Check if the username and password match
    const validAccount = allAccounts.find(account => account.user === username && account.pass === password);

    if (validAccount) {
        document.getElementById('signinMessage').innerHTML = '<div class="alert alert-success">Login successful. Welcome, ' + validAccount.firstName + '!</div>';
        setCookie("username", username, 30); // Set cookie for 30 days
    } else {
        document.getElementById('signinMessage').innerHTML = '<div class="alert alert-danger">Invalid username or password.</div>';
    }
});