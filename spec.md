This documented is designed to be an high level guide to what kind of api every profile builder should expose.

## The Implementation

```js
/**
@param {Options} [options] typically passed directly to mozilla-profile-builder.
*/
function ProfileBuilder(options) {
  // copy options to this instance
}

ProfileBuilder.prototype = {
  /**
  Default options for all .builds and rebuilds.  

  @type {Object}
  */
  options: null,

  /**
  Build the initial profile state. The callback is invoked with the
  typical node style error first and the path to the profile on disk as
  the second argument.

  This object may have a default set of options (this.options) which
  are merged with the overrides.

  Merge Algorithm:
    - let "result" be a new object that is neither this.options or overrides.
    - copy all properties from this.options to "result"
    - begin copying overrides into result:
      a. when the property is an object on both "result" and overrides
         merge objects recursively
      b. when one or both properties are not objects copy property from
         overrides into "result"
    - result is used as the particular set options for this operation.
  
  @param {Object} overrides for options given in constructor.
  @param {Function} callback [Error err, String profile].
  */
  build: function(overrides, callback) {},
  
  /**
  Destroys the built profile. This method should be idempotent and handle cases
  where the profile was never created or has been destroyed already.
  
  @param {Fucntion} callback [Error err, String profile].
  */
  destroy: function(callback) {},
  
  /**
  In typical cases this is simply destroy + build but is here for special cases
  where the profile can simply be cleaned up rather then being completely 
  removed and rewritten.

  See the notes on build for the override algorithm.
  
  @param {Object} overrides for options given in constructor.
  @param {Function} callback [Error err, String profile].
  */
  rebuild: function(overrides, callback) {}
};

```

## Usage

```js
var builder = new ProfileBuilder({ prefs: {}, apps: {}, settings: {} });

// notice every api returns the profile which the method operated on.
builder.create(function(err, profile) {
  builder.destroy(function(err, profile) {
    
  });
});

```
