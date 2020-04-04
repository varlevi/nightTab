var snapshot = (function() {

  var mod = {};

  mod.snapshot = {
    get: function(index) {
      if (index != undefined && typeof index == "number") {
        if (mod.snapshot.all[index]) {
          return JSON.parse(JSON.stringify(mod.snapshot.all[index]));
        } else {
          return false;
        };
      } else {
        return JSON.parse(JSON.stringify(mod.snapshot.all));
      };
    },
    add: function(data) {
      if (data && data != null && data != undefined) {
        if ("snapshot" in data) {
          delete data.snapshot;
        };
        if (data.state.background.image.file.name != "") {
          data.state.background.image.file.name = "";
        };
        if (data.state.background.image.file.data != "") {
          data.state.background.image.file.data = "";
        };
        mod.snapshot.all.push(JSON.parse(JSON.stringify(data)));
      } else {
        return false;
      };
    },
    remove: function(index) {
      if (mod.snapshot.all[index]) {
        mod.snapshot.all.splice(index, 1);
      } else {
        return false;
      };
    },
    edit: function() {
      mod.snapshot.all.splice(stagedThemeCustom.position.index, 1, JSON.parse(JSON.stringify(stagedThemeCustom.theme)));
    },
    all: []
  };

  var get = function(index) {
    return mod.snapshot.get(index);
  };

  var add = function(data) {
    mod.snapshot.add(data);
  };

  var remove = function(index) {
    mod.snapshot.remove(index);
  };

  var init = function() {};

  return {
    get: get,
    add: add,
    remove: remove
  };

})();
