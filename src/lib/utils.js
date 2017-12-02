// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
export function getParameterByName(param) {
  const url = window.location.href;
  const name = param.replace(/[[]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export default {
  getParameterByName,
};
