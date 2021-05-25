import hotkeys from "hotkeys-js";
import { createEE } from "./ee";

const ee = createEE();

export const Hotkey = {
  UP: {
    eekey: Symbol("up"),
    keys: ["up", "ctrl+p"],
  },
  INDENT: {
    eekey: Symbol("indent"),
    keys: ["tab"],
  },
  UNINDENT: {
    eekey: Symbol("unindent"),
    keys: ["shift+tab"],
  },
};

function register() {
  hotkeys.filter = () => true;
  Object.values(Hotkey).forEach((hk) => {
    hotkeys(hk.keys.join(","), (e, handler) => {
      e.preventDefault();
      ee.emit(hk.eekey);
    });
  });
}

export const hotkeyEE = ee;
export const registerHotkeys = register;
