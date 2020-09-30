import deepmerge from 'deepmerge'
/**
 * merge 函数
*/
const merge = function (...params) {
  // https://github.com/TehShrike/deepmerge
  const emptyTarget = value => Array.isArray(value) ? [] : {}
  const clone = (value, options) => deepmerge(emptyTarget(value), value, options)
  function combineMerge (target, source, options) {
    const destination = target.slice()
    source.forEach(function (e, i) {
      // @fixme 注意，这里针对数组中是以下三种类型的，合并策略为覆盖！！
      // merge([1, 4], [1, 2, 3]) => [1, 2, 3]
      if (['undefined', 'string', 'number'].includes(typeof destination[i])) {
        const cloneRequested = options.clone !== false
        const shouldClone = cloneRequested && options.isMergeableObject && options.isMergeableObject(e)
        destination[i] = shouldClone ? clone(e, options) : e
      } else if (options.isMergeableObject && options.isMergeableObject(e)) {
        destination[i] = deepmerge(target[i], e, options)
      } else if (target.indexOf(e) === -1) {
        destination.push(e)
      }
    })
    return destination
  }
  return deepmerge.all([...params], { arrayMerge: combineMerge })
}

export {
  merge
}
