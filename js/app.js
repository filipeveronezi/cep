const zipCodeField = document.querySelector('#app main form input')
const submitButton = document.querySelector('#app main form button')
const result = document.querySelector('#result')

submitButton.addEventListener('click', (e) => {
  e.preventDefault();

  let zipCode = zipCodeField.value

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
  const line = document.createElement('h1')
  const titleText = document.createTextNode(text)

  line.appendChild(titleText)
  line.style.color = color
  result.appendChild(line)
}

function createLine(text) {
  const line = document.createElement('p')
  const lineText = document.createTextNode(text)

  line.appendChild(lineText)

  result.appendChild(line)
}