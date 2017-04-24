// Check whether the page has changed in the next 2s
// and display an error if it hasn't
export default (selector, message) => {
  let error = true;
  for (let i = 0; i <= 2000; i += 100) {
    setTimeout(() => {
      if ($(selector).length) {
        error = false;
      }
      if (i === 2000 && error) {
        Materialize.toast(message || 'Error! Please try again later', 3000);
      }
    }, i);
  }
}
