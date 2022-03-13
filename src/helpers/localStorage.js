function isKeyExistsInLS(key) {
  var isExists = false
  if (localStorage.getItem(key) === null) {
    return isExists === true
  } else {
    return isExists === false
  }
}

export { isKeyExistsInLS }
