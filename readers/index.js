function createReaders (execlib, JobOnDestroyable, mylib) {
  'use strict';
  require('./basecreator')(execlib, JobOnDestroyable, mylib);
  require('./viahashcreator')(execlib, mylib);
  require('./readonecreator')(execlib, mylib);
  require('./readmanycreator')(execlib, mylib);
}

module.exports = createReaders;
