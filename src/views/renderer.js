// processo de renderizaçao   do documento index . html

console.log("Processo  de Renderização")




// exemplo de comando que so funciona no Node.js
console.log(`Electron:${api.verElectron()}`)

// envio de uma mensagem
api.hello("oi")

// recebimento da mensagem
api.answer((event,message)=>{
console.log(`processo de rebderizaçao recebeu uma mensagem${message}`)
})

// funçao que é executada quando o botao for clicado 

function sobre(){
   api.openAbout()
}
