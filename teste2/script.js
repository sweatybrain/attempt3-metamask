window.userWalletAddress= null
const web3 = new Web3(Web3.givenProvider);
 const buttonConnect = document.getElementById('buttonConnect')
const buttonTrade = document.getElementById('buttonTrade')
const buttonTransf = document.getElementById('buttonTransf')
const buttonValor = document.getElementById('buttonValor')
const selectTrade = document.getElementById('selectTrade')
const exitUser = document.getElementById('exitUser')
const network = document.getElementById('network')
const prince = document.getElementById('prince')
const token = document.getElementById('token')

function toggleButton() { 
if (!window.ethereum) { //verificando se o metamask não está instalado
buttonConnect.innerText = 'MetaMask não está instalado'
buttonConnect.classList.remove
buttonConnect.classList.add
return false
 }

 buttonConnect.addEventListener('click', loginWithMetaMask)
}

async function tradeOption() {
let params = [];

let option = $('#selectTrade').val();

if(option == 'bnb') {
params = [{
"chainId": "0x38", // 56 in decimal
"chainName": "Smart Chain",
"rpcUrls": [
"https://bsc-dataseed.binance.org"
],
"nativeCurrency": {
"name": "Binance Coin",
"symbol": "BNB",
"decimals": 18
},
"blockExplorerUrls": [
"https://bscscan.com"
]
}]
} else {
params = [{
"chainId": "0x89", 
"chainName": "Polygon Chain",
"rpcUrls": [
"https://polygon-rpc.com/"
],
"nativeCurrency": {
"name": "Polygon Coin",
"symbol": "MATIC",
"decimals": 18
},
"blockExplorerUrls": [
"https://polygonscan.com/"
]
}]
}
try {
if(option == 'eth'){
ethereum.request({
method: "wallet_switchEthereumChain",
params: [{
'chainId': "0x1"
}]
});
} else {
await ethereum.request({
method: 'wallet_addEthereumChain',
params,
})
}
} catch (error) {
// something failed, e.g., user denied request
}
}

function voltar(){
    document.getElementById('form-group').classList.add('hide-stuff')
    document.getElementById('btn-voltar').classList.add('hide-stuff')
}


async function sendTransaction(){ //Transferir para outra conta
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })




let params = [{
from: accounts[0],
to: $('#account').val(),
gas: Number(21000).toString(16),
gasPrince: Number(2500000).toString(16),
value: Number(web3.utils.toWei($('#value').val(), 'ether')).toString(16)


}]

console.log(web3.utils.toWei($('#value').val(), 'ether'))


let result = await window.ethereum.request({method: "eth_sendTransaction", params}).catch((err)=>{
if (err.code === 4001){

} 
checkTransaction().then(err => alert(err));
})




}
async function loginWithMetaMask() { //se conectando com o metamask e saida do hash e da rede

const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
.catch((e) => {
console.error(e.message)
return
})
if (!accounts) { return }

let option = $('#selectTrade').val();
const chainId = await ethereum.request({ method: 'eth_chainId' }); //necessário para descobrir a rede
//console.log(chainId) 

if(chainId == '0x1') { //manualmente definindo qual é a rede atráves do chaid, defini 4 resultados, eth, bin, poly, ava
network.classList.add('card-span')

document.getElementById('buttonNft').innerText = 'Mostrar NFTs da Ethereum'
network.innerText = 'Rede do usuário: Ethereum'
document.getElementById('nfts-container').innerHTML = ''
} else if (chainId == '0x38') {
network.classList.add('card-span')

document.getElementById('buttonNft').innerText = 'Mostrar NFTs da Binance'
network.innerText = 'Rede do usuário: Binance'
document.getElementById('nfts-container').innerHTML = ''
} else if (chainId == '0x89') {
network.classList.add('card-span')

document.getElementById('buttonNft').innerText = 'Mostrar NFTs da Polygon'
network.innerText = 'Rede do usuário: Polygon'
document.getElementById('nfts-container').innerHTML = ''
} else {
network.classList.add('card-span')
network.innerText = 'Rede não disponível'
} 

const getBalance = await web3.eth.getBalance(accounts[0]) //Saldo da carteira
let balance = (web3.utils.fromWei(getBalance))


if(option == 'bnb') {
    
let fromAddress = accounts[0];
let contractAddress = "0x00e1656e45f18ec6747F5a8496Fd39B50b38396D"; // BCOIN Contract
let contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
let contract = new web3.eth.Contract(contractABI, contractAddress, {
from: fromAddress
});

let balanceBCOIN = web3.utils.fromWei(await contract.methods.balanceOf(accounts[0]).call());
token.classList.add('card-span')
token.innerText = "Token: " + balanceBCOIN;
$('#token').show();

}else{
$('#token').hide();
}

window.userWalletAddress = accounts[0]
exitUser.classList.add('card-span')
exitUser.innerText =" Hash do usuário: " + window.userWalletAddress
prince.classList.add('card-span')
prince.innerText = "Carteira: " + balance
buttonConnect.innerText = 'Desconectar MetaMask'

$('#buttonValor, #buttonTrade, #selectTrade, #token').show();


buttonConnect.removeEventListener('click', loginWithMetaMask) 
setTimeout(() => {
buttonConnect.addEventListener('click', signOutOfMetaMask) 
}, 200)

$('#buttonValor').click(function(){
    document.getElementById('content-nft').classList.add('hide-stuff')
$('.showConta, .showValor, #buttonTransf').show();
$('#buttonValor').hide();
document.getElementById('btn-voltar').classList.remove('hide-stuff')
}) 

document.getElementById('buttonNft').classList.remove('hide-stuff')

}

function checkTransaction() {

let checkTransactionLopp = () => {
return ethereum.request({method: "eth_getTransactionReceipt", params}).catch((err)=>{
if (err != null) return 'Transação concluída!';
else return checkTransactionLopp();
});
};
return checkTransactionLopp();
}

ethereum.on('accountsChanged', function (accounts) { //Recarregar página caso mude a network
loginWithMetaMask();
})

ethereum.on('chainChanged', function (accounts) { //Recarregar página caso mude a network
loginWithMetaMask();
})

function clearNfts(){
    document.getElementById('nfts-container').innerHTML =''
}

async function showNFT() {
    document.getElementById('nfts-container').innerHTML = ''
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const chainId = await ethereum.request({ method: 'eth_chainId' })
    account = '0x504a91e38375d6a16e56C70A415306AC11140D41'
    console.log('hello')
    
    const options = {method: 'GET', headers: {accept: 'application/json', 'X-API-Key': 'test'}};
    let response = await fetch('https://deep-index.moralis.io/api/v2/'+ account +'/nft?chain='+ chainId, options)
      .then(function(response) {
        return response.json();
      })
      .catch(err => console.error(err));
      response.result.forEach(element => {
        let metadata = element.metadata;
        if(metadata) {
          let image = JSON.parse(metadata).image;
          if(image){
            $('#nfts-container').append(`<img class="nft" src="${image}">`)
          }
        }
      });


    } 

    async function getPreviousTransactions(){
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const chainId = await ethereum.request({ method: 'eth_chainId' })
        account = '0x504a91e38375d6a16e56C70A415306AC11140D41'

        const options = {method: 'GET', headers: {accept: 'application/json', 'X-API-Key': 'test'}};

       let response = await fetch('https://deep-index.moralis.io/api/v2/'+ account +'/?chain='+ chainId, options)
       .then(function(response) {
        return response.json();
      })
       .then(response => console.log(response))
       .catch(err => console.error(err));
       response.result.forEach(element => {
        let metadata = element.metadata;
        if(metadata) {
            let 
        }
       })
 
}





function signOutOfMetaMask() { //function deslogar
window.userWalletAddress = null
network.classList.remove('card-span')
token.classList.remove('card-span')
exitUser.classList.remove('card-span')
prince.classList.remove('card-span')
network.innerText = ''
exitUser.innerText = ''
prince.innerText = ''
document.getElementById('buttonNft').classList.add('hide-stuff')
document.getElementById('btn-voltar').classList.add('hide-stuff')


$('#buttonTransf, #buttonTrade, #selectTrade, #token, #buttonValor, .showConta, .showValor').hide();
$('#nfts-container').empty();

buttonConnect.innerText = 'Conectar MetaMask'

buttonConnect.removeEventListener('click', signOutOfMetaMask)
setTimeout(() => {
buttonConnect.addEventListener('click', loginWithMetaMask)
}, 200)

}

window.addEventListener('DOMContentLoaded', () => {
toggleButton()
});
