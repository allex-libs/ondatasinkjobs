function createCreateIfNotExistingJob (execlib, JobOnDestroyable, mylib) {
  'use strict';

  var lib = execlib.lib,
    taskRegistry = execlib.execSuite.taskRegistry;

  function CreateIfNotExistingJob (datasink, findobj, createobj, defer) {
    JobOnDestroyable.call(this, datasink, defer);
    this.findobj = findobj;
    this.createobj = createobj;
  }
  lib.inherit(CreateIfNotExistingJob, JobOnDestroyable);
  CreateIfNotExistingJob.prototype.destroy = function () {
    this.createobj = null;
    this.findobj = null;
    JobOnDestroyable.prototype.destroy.call(this);
  };
  CreateIfNotExistingJob.prototype.go = function () {
    var ok = this.okToGo();
    if (!ok.ok) {
      return ok.val;
    }
    mylib.readOne(this.destroyable, this.findobj).then(
      this.onInitialRead.bind(this),
      this.reject.bind(this)
    );
    return ok.val;
  };
  CreateIfNotExistingJob.prototype.onInitialRead = function (rec) {
    if (lib.isVal(rec)) {
      this.resolve(rec);
      return;
    }
    if (!this.okToProceed()) {
      return;
    }
    this.destroyable.call('create', lib.extend({}, this.findobj, this.createobj)).then(
      this.resolve.bind(this),
      this.reject.bind(this)
    );
  };

  mylib.CreateIfNotExistingJob = CreateIfNotExistingJob;
  mylib.createIfNotExisting = function (datasink, findobj, createobj) {
    return (new CreateIfNotExistingJob(datasink, findobj, createobj)).go();
  };
}

module.exports = createCreateIfNotExistingJob;
