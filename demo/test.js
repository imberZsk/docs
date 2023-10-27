var longestPalindrome = function (s) {
  function hui(sing) {
    let f = true
    for (let i = 0; i < sing.length / 2; i++) {
      if (sing[i] !== sing[sing.length - 1 - i]) {
        f = false
      }
    }
    return f
  }

  // const f = []

  // f(n) = f(n) + f(n)

  // return f[n]
}

console.log(longestPalindrome('aacabdkacaa'))
