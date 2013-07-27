suite('ProfileBuilder', function() {
  var sinon;
  setup(function() {
    sinon = global.sinon.sandbox.create();
  });

  teardown(function() {
    sinon.restore();
  });

  var ProfileBuilder = require('../'),
      mozprofile = require('mozilla-profile-builder');

  var subject;
  var options = {
    prefs: { original: true }
  };

  setup(function() {
    subject = new ProfileBuilder(options);
  });

  test('initialization', function() {
    assert.deepEqual(subject.options, options);
  });

  suite('#build', function() {
    var stub,
        // profile returned by mozprofile.create
        profile = { path: '/path/to/profile' },
        // overrides on the profile options
        overrides = { a: true, prefs: { override: true } },
        // expected profile options (subject.options + overrides)
        expectedOptions,
        // profile path returned by build
        profilePath;

    setup(function(done) {
      stub = sinon.stub(mozprofile, 'create');

      // expected merge result
      expectedOptions = {
        a: true,
        prefs: { original: true, override: true }
      };

      // invoke the callback given to the stub async
      stub.callsArgWithAsync(1, null, profile);

      subject.build(overrides, function(err, _profilePath) {
        if (err) return done(err);
        profilePath = _profilePath;
        done();
      });
    });

    test('profile path', function() {
      assert.equal(profile.path, profilePath);
    });

    test('options given to mozprofile.create', function() {
      var call = stub.lastCall;
      assert.deepEqual(call.args[0], expectedOptions);
    });
  });

  test('#rebuild', function(done) {
    var build = sinon.stub(subject, 'build'),
        destroy = sinon.stub(subject, 'destroy');

    build.callsArgWithAsync(1);
    destroy.callsArgWithAsync(0);

    var overrides = { a: true };
    subject.rebuild(overrides, function() {
      assert.calledWith(build, overrides);
      done();
    });
  });

  suite('#destroy', function() {
    test('without profile', function(done) {
      subject.destroy(done);
    });

    test('with profile', function(done) {
      var calledDestroy = false;
      var profile = {
        destroy: function(callback) {
          calledDestroy = true;
          process.nextTick(callback);
        }
      };

      subject.profile = profile;
      subject.destroy(function(err) {
        assert.ok(!subject.profile, 'resets profile');
        done(err);
      });
    });
  });

});

