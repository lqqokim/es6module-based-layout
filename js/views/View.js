const tag = '[View]'

export default {
  init(el) {
    if (!el) throw el
    this.el = el
    return this
  },

  on(event, handler) {
    this.el.addEventListener(event, handler)
    return this
  },

  emit(event, data) {
    const evt = new CustomEvent(event, { detail: data })
    this.el.dispatchEvent(evt)
    return this
  },

  hide(el) {
    el.style.display = 'none'
    return el;
  },

  show() {
    this.el.style.display = ''
    return this
  }
}