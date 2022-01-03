export function createTableData(data, columns) {
  return columns.reduce((a, c) => { return { ...a, [c]: data[c] } }, {});
}