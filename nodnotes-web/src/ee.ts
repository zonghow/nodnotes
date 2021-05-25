type Listener = (...args: any[]) => any;
type ListenerMap = Map<string | symbol, Array<Listener>>;

function createEE() {
  const listenermap: ListenerMap = new Map();

  function on(name: string | symbol, listener: Listener) {
    let listeners = listenermap.get(name)
    if (listeners) {
      listeners = listeners.concat(listener)
    } else {
      listeners = [listener]
    }
    listenermap.set(name, listeners);
  }

  function emit(name: string | symbol, ...args: any[]): boolean {
    const listeners = listenermap.get(name);
    if (listeners?.length) {
      listeners?.forEach((listener) => listener(...args));
      return true;
    }
    return false;
  }

  function remove(name: string | symbol, listener: Listener) {}

  function clear() {
    listenermap.clear();
  }

  return {
    on,
    emit,
    remove,
    clear,
  };
}

export { createEE };
