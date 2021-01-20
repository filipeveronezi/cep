const zipCodeField = document.querySelector('#app main form input')
const submitButton = document.querySelector('#app main form button')
const result = document.querySelector('#result')

submitButton.addEventListener('click', async (e) => {
  e.preventDefault();

  let zipCode = zipCodeField.value

  zipCode = zipCode.replace(' ', '')
  zipCode = zipCode.replace('.', '')
  zipCode = zipCode.trim()

  try {
    const response = await axios.get('https://viacep.com.br/ws/' + zipCode + '/json/')

    if(response.data.erro) {
      throw new Error ('CEP inválido')
    }
    
    result.innerHTML = ''
    createTitle('Endereço encontrado!', '#16ab65')
    createLine(response.data.logradouro)
    createLine(response.data.localidade + '-' + response.data.uf)
    createLine(response.data.bairro)
  } catch (error) {
    result.innerHTML = ''
    createTitle('Endereço não encontrado :(', '#a71c1c')
  }
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