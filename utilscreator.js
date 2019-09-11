function createUtils (execlib, mylib) {
  'use strict';

  var lib = execlib.lib;

  function equalizer (eqs, value, name) {
    eqs.push({
      op: 'eq',
      field: name,
      value: value
    });
  }

  function findObjectToExactFilterDescriptor (findobj) {
    var eqs, _eqs;
    if (!(lib.isVal(findobj) && ('object' === typeof findobj))) {
      return {};
    }
    eqs = [];
    _eqs = eqs;
    lib.traverseShallow(findobj, equalizer.bind(null, _eqs));
    _eqs = null;
    if (eqs.length===0) {
      return {};
    }
    if (eqs.length===1) {
      return eqs[0];
    }
    return {
      op: 'and',
      filters: eqs
    };
  }


  mylib.utils = {
    findObjectToExactFilterDescriptor: findObjectToExactFilterDescriptor
  };
}

module.exports = createUtils;
