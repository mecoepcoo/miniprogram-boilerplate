/**
 * 获取设备方向
 * @param {number} width 可视域宽度
 * @param {number} height 可视域高度
 */
export function getOrientation(width, height) {
  return width > height ? 'landscape' : 'portrait';
}
