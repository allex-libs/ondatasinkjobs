function createReaderBase (execlib, JobOnDestroyable, mylib) {
  'use strict';

  var lib = execlib.lib,
    taskRegistry = execlib.execSuite.taskRegistry;

  function ReaderJobBase (datasink, findobj, defer) {
    JobOnDestroyable.call(this, datasink, defer);
    this.findobj = findobj;
  }
  lib.inherit(ReaderJobBase, JobOnDestroyable);
  ReaderJobBase.prototype.destroy = function () {
    this.findobj = null;
    JobOnDestroyable.prototype.destroy.call(this);
  };
  ReaderJobBase.prototype.go = function () {
    var ok = this.okToGo();
    if (!ok.ok) {
      return ok.val;
    }
    taskRegistry.run('readFromDataSink', {
      sink: this.destroyable,
      filter: this.createFilter(),
      cb: this.resolve.bind(this),
      errorcb: this.reject.bind(this),
      singleshot: this.isSingleShot,
      continuous: false
    });
    return ok.val;
  };
  ReaderJobBase.prototype.createFilter = function () {
    throw new Error('createFilter not implemented in', this.constructor.name);
  };

  mylib.ReaderJobBase = ReaderJobBase;
}

module.exports = createReaderBase;
