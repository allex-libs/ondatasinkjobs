function createUpdateExactJob (lib, JobOnDestroyable, mylib) {
  'use strict';

  var qlib = lib.qlib;

  function UpdateExactJob (datasink, findobj, updateobj, optionsobj, defer) {
    JobOnDestroyable.call(this, datasink, defer);
    this.findobj = findobj;
    this.updateobj = updateobj;
    this.optionsobj = optionsobj;
  }
  lib.inherit(UpdateExactJob, JobOnDestroyable);
  UpdateExactJob.prototype.destroy = function () {
    this.optionsobj = null;
    this.updateobj = null;
    this.findobj = null;
    JobOnDestroyable.prototype.destroy.call(this);
  };
  UpdateExactJob.prototype.go = function () {
    var ok = this.okToGo();
    if (!ok.ok) {
      return ok.val;
    }
    qlib.promise2defer(this.destroyable.call('update', mylib.utils.findObjectToExactFilterDescriptor(this.findobj), this.updateobj, this.optionsobj), this);
    return ok.val;
  };

  mylib.UpdateExactJob = UpdateExactJob;
  mylib.updateExact = function (datasink, findobj, updateobj, optionsobj) {
    return (new UpdateExactJob(datasink, findobj, updateobj, optionsobj)).go();
  };
}

module.exports = createUpdateExactJob;
