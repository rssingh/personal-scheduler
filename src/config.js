function convertFromHex(hex) {
  var hex = hex.toString() //force conversion
  var str = ''
  for (var i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
  return str
}

export default {
  bucket: {
    slug: convertFromHex('746f646f2d617070'),
    type_slug: 'items',
    read_key: process.env.COSMIC_READ_KEY,
    write_key: process.env.COSMIC_WRITE_KEY
  }
}