/**
* hex to rgba
* @param {string} hex
* @param {number} opacity 透明度
*/
export function colorToRgba (hex, opacity = 1) {
  return `rgba(${parseInt('0x' + hex.slice(1, 3))},${parseInt('0x' + hex.slice(3, 5))},${parseInt('0x' + hex.slice(5, 7))},${opacity})`
}
