function createFilteredReaderJob (execlib, mylib) {
  'use strict';

  var lib = execlib.lib,
    ReaderJobBase = mylib.ReaderJobBase;

  function FilteredReaderJob (datasink, options) {
    ReaderJobBase.call(this, datasink, options);
  }
  lib.inherit(FilteredReaderJob, ReaderJobBase);
  FilteredReaderJob.prototype.createFilter = function () {
    return this.findobj;
  };
  FilteredReaderJob.prototype.isSingleShot = false;

  mylib.FilteredReaderJob = FilteredReaderJob;
  mylib.readFiltered = function (datasink, filterdesc) {
    return (new FilteredReaderJob(datasink, filterdesc)).go();
  };
}
module.exports = createFilteredReaderJob;
