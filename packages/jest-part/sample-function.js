function div(a, b){
    return a/b;
}
function containsNumbers(text) {
  for (let i = 0; i < text.length; i++) {
    const character = text.charAt(i);

    if(character >= '0' && character <= '9'){
        return true;
    
    }
  }

  return false;
}
exports.div = div;
exports.containsNumbers = containsNumbers;