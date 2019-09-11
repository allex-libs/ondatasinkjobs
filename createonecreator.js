function createCreateOneJob (lib, JobOnDestroyable, mylib) {
  var qlib = lib.qlib;
  function CreateOneJob (datasink, record, defer) {
    JobOnDestroyable.call(this, datasink, defer);
    this.record = record;
  }
  lib.inherit(CreateOneJob, JobOnDestroyable);
  CreateOneJob.prototype.destroy = function () {
    this.record = null;
    JobOnDestroyable.prototype.destroy.call(this);
  };
  CreateOneJob.prototype.go = function () {
    var ok = this.okToGo();
    if (!ok.ok) {
      return ok.val;
    }
    qlib.promise2defer(
      this.destroyable.call('create', this.record),
      this
    );
    return ok.val;
  };

  mylib.CreateOneJob = CreateOneJob;
  mylib.createOne = function (datasink, record) {
    return (new CreateOneJob(datasink, record)).go();
  };
}

module.exports = createCreateOneJob;
