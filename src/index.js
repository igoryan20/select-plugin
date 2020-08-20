import './style.css'

class Select {
  constructor (data) {
    this.selectId = data.selector
    this.label = data.label
    this.url = data.url
    this.onSelect = data.onSelect

    this.selectElement = document.getElementById(this.selectId)

    this.initialSelect()
    
    this.initialCustomEvents() 

    this.dispatchEvents()   

  }

  initialSelect () {    
    this.selectElement.style.width = "300px"
    this.selectElement.style.display = "flex"
    this.selectElement.style.flexDirection = 'column'
    this.selectElement.style.overflow = "hidden"

    
    let inputField = document.createElement('div')
    let triangle = document.createElement('div')
    let rotateSquare = document.createElement("div")
    let hideSquare = document.createElement("div")
    let title = document.createElement('p')
    
    rotateSquare.id = "rotateSquare"
    rotateSquare.style.width = "8px"
    rotateSquare.style.height = "8px"
    rotateSquare.style.position = "relative"
    rotateSquare.style.top = "2px"
    rotateSquare.style.background = "#616161"
    rotateSquare.style.transform = "rotate(45deg)"

    hideSquare.id = "hideSquare"
    hideSquare.style.width = "12px"
    hideSquare.style.height = "8px"
    hideSquare.style.position = "relative"
    hideSquare.style.top = "-10px"
    hideSquare.style.right = "2px"
    hideSquare.style.background = "#fff"

    triangle.id = "triangle"
    triangle.style.position = 'relative'
    triangle.style.top = "16px"
    triangle.style.left = "115px"
    triangle.appendChild(rotateSquare)
    triangle.appendChild(hideSquare)

    title.id = "select-title"
    title.innerHTML = this.label
    title.style.marginTop = "15px"

    inputField.id = 'input-field'
    inputField.style.width = "100%"
    inputField.style.height = "45px"
    inputField.style.borderBottom = "2px solid #eee"
    inputField.style.display = 'flex'

    inputField.appendChild(title)
    inputField.appendChild(triangle)

    this.selectElement.appendChild(inputField)
  }

  initialCustomEvents () {
    this.hasItems = false

    this.expandSelectEvent = new CustomEvent('expandSelect', {
       detail: {
          object: this,
          url: this.url
         }
      })

    this.closeSelectEvent = new Event('closeSelect')
    
  }

  dispatchEvents () {

    let inputField = document.getElementById('input-field')
    inputField.addEventListener('mouseenter', this.focusListener)
    inputField.addEventListener('mouseleave', this.unfocusListener)

    inputField.onclick = () => {
        this.selectElement.addEventListener('expandSelect', this.expandSelectListener)
        this.selectElement.dispatchEvent(this.expandSelectEvent)
    }
    

  }

  focusListener () {
      this.style.cursor = "pointer"
      this.style.borderBottom = "1.5px solid #9e9e9e"
  }

  unfocusListener () {
      this.style.borderBottom = "1.5px solid #eee"
  }

  expandSelectListener (data) {
    let Select = data.detail.object    
    let technologiesList = document.getElementById('technologiesList')

    if (technologiesList) {
      if(technologiesList.style.height != '0px') {
        technologiesList.style.height = '0'
        Select.transformTriangle('down')
      } else {
        technologiesList.style.height = '300px'
        Select.transformTriangle('up')
      }
    } else {
      Select.transformElements()
      Select.uploadData(data.detail.url)
    }  
  }  

  transformElements () {
    // transform title
    let title = document.getElementById('select-title')

    title.animate({
      fontSize: [ "16px", "12px" ],
      marginTop: ["15px", "0"],
      marginLeft: ["0", "4px"],
      color: ["#616161", "#9e9e9e"],
      easing: ['ease-in', 'ease-out']
    }, 100)    
    title.style.fontSize = "12px"
    title.style.marginTop = "0"
    title.style.marginLeft = "4px"
    title.style.color = "#9e9e9e"
    title.style.width = '130px'

    this.transformTriangle('up')
  }

  transformTriangle (direction) {

    
    let triangle = document.getElementById('triangle')
    
    if (direction === 'up') {
      for (let i = 0; i <= 180; i++) {
        setTimeout(() => {
          triangle.style.transform = 'rotate(' + i + "deg)"
        }, i * 0.8)
      }
      triangle.style.top = '-5px'
      document.getElementById('select-title').style.marginRight = "30px"
    } else {
      for (let i = 180; i <= 360; i++) {
        setTimeout(() => {
          triangle.style.transform = 'rotate(' + i + "deg)"
        }, (i-180) * 0.8)
      }
      triangle.style.top = '20px'
    }
  }

  uploadData (url) {
    let jsonData = {}
    let HttpRequest = new XMLHttpRequest()
    HttpRequest.open('GET', url, true)
    HttpRequest.onload = function (e) {
      if (HttpRequest.readyState === 4) {
        if (HttpRequest.status === 200) {
          jsonData = JSON.parse(HttpRequest.responseText)
        
          let technologiesList = document.createElement('div')
          technologiesList.id = 'technologiesList'
          
          for (let key in jsonData) {
            let technologyName = document.createElement('p')
            technologyName.innerHTML = jsonData[key].label
            technologyName.className = 'technology'
            technologyName.style.paddingTop = "15px"
            technologyName.style.paddingBottom = "15px"
            technologyName.style.paddingLeft = "10px"
            technologyName.style.marginRight = "5px"
            technologyName.style.boxShadow = "2px 0 0 0 rgba(0, 0, 0, 0.14)"

            technologyName.addEventListener('mouseenter', function () {
              this.style.cursor = 'pointer'
              this.style.background = "#eee"
            })
            technologyName.addEventListener('mouseleave', function () {
              this.style.background = "#fff"
            })

            technologyName.addEventListener('click', function() {

              if(document.getElementsByClassName('active')[0]) {
                document.getElementsByClassName('active')[0].style.color = '#424242'
                document.getElementsByClassName('active')[0].className = 'techology'
              }             

              this.className = 'active'

              this.style.color = "#039be5"

              document.getElementById('select-title').style.color = "#039be5"

              if (document.getElementById('technologyTitle')) {
                document.getElementById('technologyTitle').innerHTML = this.innerHTML

              } else {
                let technologyTitle = document.createElement('p')
                technologyTitle.id = 'technologyTitle'
                technologyTitle.style.width = "100px"
                technologyTitle.innerHTML = this.innerHTML
                technologyTitle.style.position = 'relative'
                technologyTitle.style.top = "20px"
                technologyTitle.style.right = '170px'
                
                document.getElementById('input-field').appendChild(technologyTitle)
              }
              document.getElementById('log').innerHTML = "Выбранный элемент: " + this.innerHTML

              

              document.getElementById('technologiesList').style.height = '0'

              let triangle = document.getElementById('triangle')
    
              for (let i = 180; i <= 360; i++) {
                setTimeout(() => {
                  triangle.style.transform = 'rotate(' + i + "deg)"
                }, (i-180) * 0.8)
              }
              triangle.style.top = '20px'
            })

            technologiesList.appendChild(technologyName)
          }

          technologiesList.style.boxSizing = "content-box"
          technologiesList.style.marginTop = "10px"
          technologiesList.style.paddingRight = "15px"
          technologiesList.style.height = "300px"
          technologiesList.style.width = "317px"
          technologiesList.style.overflow = 'auto'
          technologiesList.style.marginLeft = "3px"
          technologiesList.style.boxShadow = "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)"

          
          document.getElementById('select').appendChild(technologiesList)

        } else {
          console.error(HttpRequest.statusText)
        }
      } else {
        console.log('wait')
      }
    }
    HttpRequest.onerror = function (e) {
      console.error(e.type)
    }
    HttpRequest.send(null)
  }
}

const select = new Select({
  selector: 'select',
  label: 'Выберите технологию',
  url: 'https://vue-crm-cea62.firebaseio.com/technologies.json'
})