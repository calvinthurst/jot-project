import { appState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"

export class Jot {

  constructor(data) {
    this.id = generateId()
    this.title = data.title
    this.note = data.note || ''
    this.color = data.color
    this.createdAt = data.createdAt
    this.savedAt = data.savedAt || ''
  }


  get activeJotTemplate() {
    return `
    <div class="row bg-secondary border rounded">
            <div class="col-3">
              <h2>${this.title}<span class="fs-5 align-content-bottom" style="color:${this.color};"><i class="mdi mdi-circle"></i></span></h2>
              <p>Created at: ${this.createdAt}</p>
              <p>Updated at: ${this.savedAt}</p>
            </div>
            <div class="col-8 d-flex ">
            <textarea name="note" class="container-fluid active-jot col-11 rounded m-3" rows="10" onblur="app.jotsController.saveJot()">${this.note}</textarea>
            </div>
            <div class="col-1 ">
            <button class=" btn" onclick="app.jotsController.removeJot('${this.id}')"><i class="mdi mdi-delete-outline"></i></button>
            </div>
            </div>
    `
  }

  get jotsTemplate() {
    return `
    <div class="d-flex justify-content-between note-border" data-bs-dismiss="offcanvas" onclick="app.jotsController.setActive('${this.id}')">
      <p>${this.title}</p>
      <p style="color:${this.color};"><i class="mdi mdi-circle"></i></p>
      <p>${this.createdAt}</p>
    </div>`
  }

  // get computeJotsDate() {

  // }
  get computeSavedDate() {
    return this.createdAt.toLocaleDateString('en-us', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', }) + ' ' + this.createdAt.toLocaleTimeString()
  }

  get computeTitle() {

  }
}