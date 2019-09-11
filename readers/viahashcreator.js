function createReadViaHashJobBase (execlib, mylib) {
  'use strict';

  var lib = execlib.lib,
    taskRegistry = execlib.execSuite.taskRegistry,
    ReaderJobBase = mylib.ReaderJobBase;

  function ReadViaHashJobBase (datasink, findobj, defer) {
    ReaderJobBase.call(this, datasink, findobj, defer);
    this.findobj = findobj;
  }
  lib.inherit(ReadViaHashJobBase, ReaderJobBase);
  ReadViaHashJobBase.prototype.createFilter = function () {
    return mylib.utils.findObjectToExactFilterDescriptor(this.findobj);
  };

  mylib.ReadViaHashJobBase = ReadViaHashJobBase;
  mylib.readOne = function (datasink, findobj) {
    return (new ReadViaHashJobBase(datasink, findobj)).go();
  };
}

module.exports = createReadViaHashJobBase;
