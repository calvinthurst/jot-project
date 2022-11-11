import { Jot } from "./Models/Jot.js"
import { Value } from "./Models/Value.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  values = loadState('values', [Value])

  /** @type {import('./Models/Jot.js').Jot[]} */
  jots = loadState('jots', [Jot])
  // jots = [
  //   new Jot({
  //     title: 'hello',
  //     note: 'this is a jot',
  //     color: '#2954D6'
  //   })
  // ]

  activeJots = null

  jotNum = this.jots.length || 0
}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
