import hotkeys from "hotkeys-js";
import { createEE } from "./ee";

function createHotkey(keys: string[]) {
  const ee = createEE();
  const symbol = Symbol();
  hotkeys(keys.join(","), (e: KeyboardEvent) => {
    e.preventDefault();
    ee.emit(symbol);
  });
  return {
    on: (callback: () => any) => {
      ee.on(symbol, callback);
    },
  };
}

const Up = createHotkey(["up", "ctrl+p"]);
const Down = createHotkey(["down", "ctrl+n"]);
const Indent = createHotkey(["tab"]);
const Unindent = createHotkey(["shift+tab"]);

export { Up, Down, Indent, Unindent };
