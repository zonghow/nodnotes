export default function(...args) {
  let cls = []

  args.forEach(item => {
    if (typeof item === "string") {
      cls = cls.concat(item.split(" ").filter(Boolean))
      return
    }
    if (Array.isArray(item)) {
      cls = cls.concat(item)
      return
    }
    if (typeof item === "object") {
      Object.keys(item).forEach(key => {
        if (item[key]) {
          cls = cls.concat(key)
        }
      })
    }
  })

  return cls.join(" ")
}