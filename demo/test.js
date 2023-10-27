// var longestPalindrome = function (s) {
//   function hui(sing) {
//     let f = true
//     for (let i = 0; i < sing.length / 2; i++) {
//       if (sing[i] !== sing[sing.length - 1 - i]) {
//         f = false
//       }
//     }
//     return f
//   }

//   // const f = []

//   // f(n) = f(n) + f(n)

//   // return f[n]
// }

// console.log(longestPalindrome('aacabdkacaa'))

const jobQueue = new Set()

const p = Promise.resolve()

let isFlushing = false

function flushJob() {
  if (isFlushing) return
  isFlushing = true
  p.then(() => {
    jobQueue.forEach((job) => job())
  }).finally(() => {
    isFlushing = false
  })
}

effect(
  () => {
    console.log(obj.job)
  },
  {
    scheduler(fn) {
      jobQueue.add(fn)
      flushJob()
    }
  }
)

obj.foo++
obj.foo++
