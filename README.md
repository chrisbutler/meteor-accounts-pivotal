# Accounts-Pivotal

Sign in with your Pivotal Tracker credentials

### Usage
Accounts-Pivotal behaves identically to accounts-password. Pass a username or email address, a password, and a callback function to `Meteor.loginWithPivotal` and if the credentials match the response, the user will be logged in (and created first, if no matching account exists).

    Meteor.loginWithPivotal(user, password, callback(error) {
        if (!error) {
            //user logged in successfully
        }
    });

### Installation

As always, `meteor add chrisbutler:accounts-pivotal` will add the package to your project.
