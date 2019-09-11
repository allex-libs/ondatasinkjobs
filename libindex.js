function createLib (execlib, datalib, jobondestroyablelib) {
  'use strict';

  var ret = {},
    JobOnDestroyable = jobondestroyablelib.JobOnDestroyable;

  require('./utilscreator')(execlib, ret);
  require('./createonecreator')(execlib.lib, JobOnDestroyable, ret);
  require('./readers')(execlib, JobOnDestroyable, ret);
  require('./updateexactcreator')(execlib.lib, JobOnDestroyable, ret);
  require('./createifnotexistingcreator')(execlib, JobOnDestroyable, ret);

  return ret;
}

module.exports = createLib;
