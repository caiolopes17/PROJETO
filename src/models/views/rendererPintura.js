function buscarCEP() {
    let cep = document.getElementById('inputCEPClient').value
    let urlAPI = `https://viacep.com.br/ws/${cep}/json/`
    fetch(urlAPI)
        .then(response => response.json())
        .then(dados => {
            
            document.getElementById('inputAddressClient').value = dados.logradouro
            document.getElementById('inputNeighborhoodClient').value = dados.bairro
            document.getElementById('inputCityClient').value = dados.localidade
            document.getElementById('inputUFClient').value = dados.uf
        })
        .catch(error => console.log(error))
}

const foco = document.getElementById('searchClient')

let arrayClient = []

document.addEventListener('DOMContentLoaded', () => {
    btnUpdate.disabled = true
    btnDelete.disabled = true
    btnCreate.disabled = false
    foco.focus()
})

let frmClient = document.getElementById('formClient')
let nameClient = document.getElementById('inputNameClient')
let cpfClient = document.getElementById('inputCPFClient')
let emailClient = document.getElementById('inputEmailClient')
let phoneClient = document.getElementById('inputPhoneClient')
let cepClient = document.getElementById('inputCEPClient')
let addressClient = document.getElementById('inputAddressClient')
let numberClient = document.getElementById('inputNumberClient')
let complementClient = document.getElementById('inputComplementClient')
let neighborhoodClient = document.getElementById('inputNeighborhoodClient')
let cityClient = document.getElementById('inputCityClient')
let ufClient = document.getElementById('inputUFClient')
let idClient = document.getElementById('inputIdClient')

function teclaEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault() 
        searchName()
    }
}

frmClient.addEventListener('keydown', teclaEnter)

function restaurarEnter() {
    frmClient.removeEventListener('keydown', teclaEnter)
}

frmClient.addEventListener('submit', async (event) => {
   
    event.preventDefault()
    
    if (idClient.value === "") {
    
        const client = {
            nameCli: nameClient.value,
            cpfCli: cpfClient.value,
            emailCli: emailClient.value,
            phoneCli: phoneClient.value,
            cepCli: cepClient.value,
            addressCli: addressClient.value,
            numberCli: numberClient.value,
            complementCli: complementClient.value,
            neighborhoodCli: neighborhoodClient.value,
            cityCli: cityClient.value,
            ufCli: ufClient.value
        }
    
        api.newClient(client)
    } else {
 
       const client = {
        idCli: idClient.value,
        nameCli: nameClient.value,
        cpfCli: cpfClient.value,
        emailCli: emailClient.value,
        phoneCli: phoneClient.value,
        cepCli: cepClient.value,
        addressCli: addressClient.value,
        numberCli: numberClient.value,
        complementCli: complementClient.value,
        neighborhoodCli: neighborhoodClient.value,
        cityCli: cityClient.value,
        ufCli: ufClient.value
    }
  
    api.updateClient(client)
    }
})

api.setName((args) => {
    console.log("teste do IPC 'set-name'")
    let busca = document.getElementById('searchClient').value
    foco.value = ""
    nameClient.focus()
   
    nameClient.value = busca
    restaurarEnter()
})

function searchName() {
    
    let cliName = document.getElementById('searchClient').value
    console.log(cliName) 

    if (cliName === "") {
        api.validateSearch()
    } else {
        
        api.searchName(cliName)
        
        api.renderClient((event, client) => {
            
            console.log(client)
            
            const clientData = JSON.parse(client)
            arrayClient = clientData
            arrayClient.forEach((c) => {
                idClient.value = c._id
                nameClient.value = c.nomeCliente
                cpfClient.value = c.cpfCliente
                emailClient.value = c.emailCliente
                phoneClient.value = c.foneCliente
                cepClient.value = c.cepCliente
                addressClient.value = c.logradouroCliente
                numberClient.value = c.numeroCliente
                complementClient.value = c.complementoCliente
                neighborhoodClient.value = c.bairroCliente
                cityClient.value = c.cidadeCliente
                ufClient.value = c.ufCliente
                restaurarEnter()
                btnCreate.disabled = true
                btnUpdate.disabled = false
                btnDelete.disabled = false
            })
        })
    }
}


function removeClient() {
   
    api.deleteClient(idClient.value)
}

function resetForm() {
    location.reload()
}

api.resetForm((args) => {
    resetForm()
})
