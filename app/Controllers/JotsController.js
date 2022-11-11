import { appState } from "../AppState.js";
import { jotsServices } from "../Services/JotsServices.js";
import { getFormData } from "../Utils/FormHandler.js";
import { setHTML, setText } from "../Utils/Writer.js";
import { Pop } from "../Utils/Pop.js";



function _drawJots() {
  let jots = appState.jots
  console.log('this jot is', jots)
  let template = ''
  jots.forEach(j => template += j.jotsTemplate)
  setHTML('jots', template)
}
function _drawActiveJot() {
  if (appState.activeJots != null) {
    let activeJot = appState.activeJots
    setHTML('activeJot', activeJot.activeJotTemplate)
  } else {
    setHTML('activeJot', 'select a note')
  }
}
function _drawJotNum() {
  console.log(appState.jotNum)
  setText('jotsNum', 'Jots: ' + appState.jotNum)
}

export class JotsController {
  constructor() {
    _drawJotNum()
    _drawJots()
    appState.on('activeJots', _drawActiveJot)
    appState.on('jots', _drawJots)
    appState.on('jotNum', _drawJotNum)
  }

  setActive(jot) {
    jotsServices.setActive(jot)
  }

  createJot() {
    window.event.preventDefault()
    let form = window.event.target
    let formData = getFormData(form)
    jotsServices.createJot(formData)

    form.reset()
  }

  saveJot() {
    console.log('jot saved')
    let newNote = document.querySelector('.active-jot')
    jotsServices.saveJot(newNote.value)
  }

  async removeJot(jotId) {
    if (await Pop.confirm('Are you sure you want to unJot this Jot')) {
      jotsServices.removeJot(jotId)
    }
  }
}