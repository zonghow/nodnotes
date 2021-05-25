export default function (
  ...args: Array<string | string[] | { [key: string]: boolean }>
) {
  let cls: string[] = [];

  for (const arg of args) {
    if (typeof arg === "string") {
      cls = cls.concat(arg.split(" ").filter(Boolean));
      continue;
    }
    if (Array.isArray(arg)) {
      cls = cls.concat(arg);
      continue;
    }
    if (typeof arg === "object") {
      Object.keys(arg).forEach((key) => {
        if (arg[key]) {
          cls = cls.concat(key);
        }
      });
    }
  }

  return cls.join(" ");
}
