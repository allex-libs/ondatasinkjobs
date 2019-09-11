function createReadOneJob (execlib, mylib) {
  'use strict';

  var lib = execlib.lib,
    taskRegistry = execlib.execSuite.taskRegistry,
    ReadViaHashJobBase = mylib.ReadViaHashJobBase;

  function ReadOneJob (datasink, findobj, defer) {
    ReadViaHashJobBase.call(this, datasink, findobj, defer);
    this.findobj = findobj;
  }
  lib.inherit(ReadOneJob, ReadViaHashJobBase);
  ReadOneJob.prototype.isSingleShot = true;

  mylib.ReadOneJob = ReadOneJob;
  mylib.readOne = function (datasink, findobj) {
    return (new ReadOneJob(datasink, findobj)).go();
  };
}

module.exports = createReadOneJob;
