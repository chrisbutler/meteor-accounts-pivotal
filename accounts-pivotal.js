if (Meteor.isClient) {
  Meteor.loginWithPivotal = function(user, password, callback) {
    if (user && password) {
      Accounts.callLoginMethod({
        methodArguments: [{
          user: user,
          password: password,
          service: 'pivotal'
        }],
        userCallback: function (error, result) {
          if (error) {
            callback && callback(error);
          } else {
            callback && callback();
          }
        }
      });
    }
  };
}

if (Meteor.isServer) {
  Accounts.addAutopublishFields({
    forLoggedInUser: ['services.pivotal'],
    forOtherUsers: ['services.pivotal.username']
  });

  Future = Npm.require('fibers/future');

  var NonEmptyString = Match.Where(function (x) {
    check(x, String);
    return x.length > 0;
  });

  Accounts.registerLoginHandler("pivotal", function (options) {
    check(options, {
      user: NonEmptyString,
      password: NonEmptyString,
      service: 'pivotal'
    });

    if (options.service === 'pivotal' && options.user && options.password) {
      var response = new Future();
      HTTP.get("https://www.pivotaltracker.com/services/v5/me", {auth: options.user + ':' + options.password}, function (error, result) {
        if (error) {
          response.return(error.response.data);
        } else {
          var d = result.data;
          if (_.indexOf([d.username, d.email], options.user) != -1) {
            var serviceData = {
              username: d.username,
              email: d.email,
              id: d.id,
              token: d.api_token
            };
            var opts = {
              profile: {
                name: d.name
              }
            };
            var user = Accounts.updateOrCreateUserFromExternalService('pivotal', serviceData, opts);
            response.return({userId: user.userId});
          } else {
            response.return({error: 'Invalid Login.'});
          }
        }
      });
      return response.wait();
    } else {
      return undefined;
    }
  });
}
