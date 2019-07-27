var switchMessage = (function() {

  var _doNotShowAgain = false;

  var mod = {};

  mod.doNotShowAgainUpdate = function() {
    if (_doNotShowAgain) {
      helper.setObject({
        object: state.get(),
        path: "switchMessage",
        newValue: false
      });
    };
    data.save();
  };

  var render = {};

  render.message = function() {
    var form = helper.node("form|class:switch-message-form");
    var fieldset = helper.node("fieldset");
    var inputWrap = helper.node("div|class:input-wrap");
    var input = helper.node("input|type:checkbox,id:switch-message-input");
    var label = helper.node("label:Do not show this message again|for:switch-message-input");
    var div = helper.node("div");
    var para1 = helper.node("p:This version of nightTab was kindly made into a Firefox addon by the good work of Abaldetti while the project was in the early stages of development. nightTab has now officially been released for Firefox.");
    var para2 = helper.node("p:To avoid having to maintain two copies of this project this addon will not recieve any more updates. It is advisable you switch over to the official supported version.");
    var para3 = helper.node("p:Be sure to backup your settings with the Export options found in the menu before making the switch.");
    input.addEventListener("change", function() {
      _doNotShowAgain = this.checked;
    }, false);
    div.appendChild(para1);
    div.appendChild(para2);
    div.appendChild(para3);
    inputWrap.appendChild(input);
    inputWrap.appendChild(label);
    fieldset.appendChild(inputWrap);
    form.appendChild(fieldset);
    div.appendChild(form);
    return div;
  };

  render.open = function() {
    shade.open({
      action: function() {
        modal.close();
        pagelock.unlock();
      }
    });
    modal.open({
      heading: "Thanks for using nightTab",
      content: render.message(),
      successAction: function() {
        mod.doNotShowAgainUpdate();
        window.location.href = "https://addons.mozilla.org/en-GB/firefox/addon/nighttab/";
      },
      cancelAction: function() {
        mod.doNotShowAgainUpdate();
        shade.close();
        modal.close();
        pagelock.unlock();
      },
      actionText: "Switch now",
      cancelText: "Cancel",
      size: "small"
    });
    pagelock.lock();
  };

  var open = function() {
    render.open();
  };

  var check = function() {
    if (state.get().switchMessage) {
      open();
    };
  };

  var init = function() {
    check();
  };

  // exposed methods
  return {
    init: init
  };

})();
