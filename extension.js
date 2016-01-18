
const LayoutManager = imports.ui.main.layoutManager;
const Shell = imports.gi.Shell;

const Mainloop = imports.mainloop;

const MessageTray = imports.ui.main.messageTray;
let _myDwell = 0;

var loop = true;

function init() { }

function enable() {
  Mainloop.timeout_add(1000, function(){
    if("_trayPressure" in LayoutManager) {
        LayoutManager._trayPressure._keybindingMode =
            Shell.KeyBindingMode.OVERVIEW;
    }

    _myDwell = MessageTray._trayDwellTimeout;
    MessageTray._trayDwellTimeout = function() { return false; };

    return loop;
  });
}

function disable() {
  loop = false;
    if("_trayPressure" in LayoutManager) {
        LayoutManager._trayPressure._keybindingMode =
            Shell.KeyBindingMode.NORMAL | Shell.KeyBindingMode.OVERVIEW;
    }

    if(_myDwell) {
        MessageTray._trayDwellTimeout = _myDwell;
        _myDwell = 0;
    }
}
