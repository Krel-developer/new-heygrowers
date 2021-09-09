export function krelMaskInput(id, mask) {
  const i = document.getElementById(id)
  if (i) {
    const d = { 9: '[0-9]', a: '[a-z]' },
      msk = mask.split('')
    i.addEventListener('input', handler)
    i.addEventListener('focus', handler)
    i.addEventListener('blur', (e) => {
      const value = e.target.value
      console.log(value[value.length - 1])
      if (value[value.length - 1] === '_') {
        e.target.value = ''
      }
    })
    let firstIndex = mask.indexOf('9') - 1
    function handler(e) {
      if (e.type === 'focus' && i.value !== '') return
      let mskd = [],
        s = firstIndex

      msk.forEach((el, n) => {
        if (d[el]) {
          let t = new RegExp(d[el], 'i').test(i.value.charAt(n))
          mskd.push(t ? i.value.charAt(n) : '_')
          if (t && s === n && i.value.charAt(n) !== '_') {
            s++
          }
        } else {
          mskd.push(el)
          if (s === n) s++
        }
      })
      i.value = mskd.join('')
      i.selectionStart = i.selectionEnd = s < 0 ? 0 : s
      setTimeout(function () {
        i.selectionStart = i.selectionEnd = s < 0 ? 0 : s
      }, 0)
      if (e.inputType === 'deleteContentBackward') {
        if (msk[i.selectionStart - 1] === '-') {
          i.selectionStart = i.selectionEnd = i.selectionStart - 1
          setTimeout(function () {
            i.selectionStart = i.selectionEnd = i.selectionStart - 1
          }, 0)
        }
        if (msk[i.selectionStart - 2] === ')') {
          i.selectionStart = i.selectionEnd = i.selectionStart - 2
          setTimeout(function () {
            i.selectionStart = i.selectionEnd = i.selectionStart - 2
          }, 0)
        }
      }
    }
  }
}
