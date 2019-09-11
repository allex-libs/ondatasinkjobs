function createReadManyJob (execlib, mylib) {
  'use strict';

  var lib = execlib.lib,
    taskRegistry = execlib.execSuite.taskRegistry,
    ReadViaHashJobBase = mylib.ReadViaHashJobBase;

  function ReadManyJob (datasink, findobj, defer) {
    ReadViaHashJobBase.call(this, datasink, findobj, defer);
  }
  lib.inherit(ReadManyJob, ReadViaHashJobBase);
  ReadManyJob.prototype.isSingleShot = false;

  mylib.ReadManyJob = ReadManyJob;
  mylib.readMany = function (datasink, findobj) {
    return (new ReadManyJob(datasink, findobj)).go();
  };
}

module.exports = createReadManyJob;
