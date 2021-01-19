var zipCodeField = document.querySelector('#app main form input')
var submitButton = document.querySelector('#app main form button')
var result = document.querySelector('#result')

submitButton.addEventListener('click', (e) => {
  e.preventDefault();

  var zipCode = zipCodeField.value

  zipCode = zipCode.replace(' ', '')
  zipCode = zipCode.replace('.', '')
  zipCode = zipCode.trim()

  axios
  .get('https://viacep.com.br/ws/' + zipCode + '/json/')
  .then((res) => {

    if(res.data.erro) {
      throw new Error('CEP inválido')
    }

    result.innerHTML = ''
    createTitle('Endereço encontrado!', '#16ab65')
    createLine(res.data.logradouro)
    createLine(res.data.localidade + '-' + res.data.uf)
    createLine(res.data.bairro)
  })
  .catch(() => {
    result.innerHTML = ''
    createTitle('Endereço não encontrado :(', '#a71c1c')
  })
})

function createTitle(text, color) {
  var line = document.createElement('h1')
  var text = document.createTextNode(text)

  line.appendChild(text)
  line.style.color = color
  result.appendChild(line)
}

function createLine(text) {
  var line = document.createElement('p')
  var text = document.createTextNode(text)

  line.appendChild(text)

  result.appendChild(line)
}