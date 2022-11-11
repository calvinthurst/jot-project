import { appState } from "../AppState.js"
import { Jot } from "../Models/Jot.js";
import { saveState } from "../Utils/Store.js";

class JotsServices {

  setActive(jot) {
    const setJot = appState.jots.find(j => j.id == jot)
    appState.activeJots = setJot
    console.log('services connected', appState.activeJots)
    // appState.emit('activeJots')
  }
  createJot(formData) {
    console.log(formData);
    const newJot = new Jot(formData)
    appState.jots = [...appState.jots, newJot]
    appState.activeJots = newJot
    let createDate = new Date()
    let newDate = createDate.toLocaleDateString()
    let newTime = createDate.toLocaleTimeString()
    newJot.createdAt = newDate + ' ' + newTime
    appState.jotNum = appState.jots.length
    appState.emit('jots')
    appState.emit('activeJots')
    saveState('jots', appState.jots)

  }
  saveJot(value) {
    let thisJot = appState.activeJots
    thisJot.note = value
    let saveDate = new Date()
    let newDate = saveDate.toLocaleDateString()
    let newTime = saveDate.toLocaleTimeString()
    thisJot.savedAt = newDate + ' ' + newTime
    console.log(thisJot.savedAt)
    appState.emit('activeJots')
    saveState('jots', appState.jots)
  }
  removeJot(jotId) {
    let newJots = appState.jots.filter(j => j.id != jotId)
    appState.jots = newJots
    appState.activeJots = null
    console.log(appState.jots)
    appState.jotNum = appState.jots.length
    appState.emit('activeJots')
    saveState('jots', appState.jots)

  }
}
export const jotsServices = new JotsServices()