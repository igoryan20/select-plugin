class Select {
  constructor (data) {
    this.selector = data.selector
    this.label = data.label
    this.url = data.url
    this.onSelect = data.onSelect
    
    this.initialSelect()
  }

  initialSelect () {
    console.log(this.selector)
  }



}

const select = new Select({
  selector: '#select',
  label: 'Выберите технологию',
  url: 'https://vladilen-dev.firebaseio.com/technologies.json',
  onSelect(selectedItem) {}
})