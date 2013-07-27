This documented is designed to be an high level guide to what kind of api every profile builder should expose.

## The API

```js
/**
@param {Options} [options] optional options typically passed directly to mozilla-profile-builder.
*/
function ProfileBuilder(options) {
}

ProfileBuilder.prototype = {
  /**
  Each profile builder is expected to expose a .profile object which contains .path.
  Generally this is just the result from mozilla-profile-builder's create method.
  
  This property is _suggested_ and is not strictly part of the interface. 
  */
  profile: null,

  /**
  Creates the profile... The expectation is .profile is populated after this is called.
  The callback will expect the typicall node style error as first argument and the path where
  the profile exists on disk as the second argument.
  
  @param {Function} callback [Error err, String profile].
  */
  build: function(callback) {},
  
  /**
  Destroys the built profile. This method should be idempotent and handle cases where the profile was
  never created or has been destroyed already.
  
  @param {Fucntion} callback [Error err, String profile].
  */
  destroy: function(callback) {},
  
  /**
  In typical cases this is simply destroy + build but is here for special cases where the profile can simply be
  cleaned up rather then being completely removed and rewritten.
  
  @param {Function} callback [Error err, String profile].
  */
  rebuild: function(callback) {}
};

```
