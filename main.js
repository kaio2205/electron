const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain } = require('electron')  // Importaçao

//  relacionado ao preload.js (path é o caminho)
const path = require('node:path')

const createWindow = () => {       // Janela Principal 
    // nativeTheme.themeSource ='dark'
    const win = new BrowserWindow({
        width: 800, // largura 
        height: 600,// altura
        icon: './src/public/img/piggy.png',
        //  resizable: false, // evitar o redimensionamento 
        //  titleBarStyle:'hidden'  esconder barra de titulo e menu 
        //  autoHideMenuBar: true // esconder menu
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')
}
// janela sobre 
let about // bug de abertura de vairas janelas



const aboutWindow = () => {     // Janela sobre
    
    // se a janela about nao estiver aberta
    if (!about) {  // bug (1)
        about = new BrowserWindow({
            width: 360, // largura 
            height: 220,// altura
            icon: './src/public/img/piggy.png',
            resizable: false,  // evitar o redimensionamento 
           // titleBarStyle: 'hidden',  esconder barra de titulo e menu 
            // autoHideMenuBar: true // esconder menu 
        })
    }
    //iniciar a janela com o menu personalizado 
    about.loadFile('./src/views/sobre.html')
     
    // bug (2)
    about.on('closed,',()=>{
        about = null
    })
}


// janela secundaria 


const childwindow = ()=>{
//  obten a jenela pai
    const father = BrowserWindow.getFocusedWindow()

    if (father) {
        const child = new BrowserWindow({
            width: 640,
            height: 450,
            icon: "./src/public/img/piggy.png",
            autoHideMenuBar:true,
            resizable: false,
            parent: father,       // obtem a relaçao parent
            modal: true // foco na janela 
        })
        child.loadFile("./src/views/child.html")
    }

    




}














app.whenReady().then(() => {  // executa de forma assincrona a aplicaçao 
    createWindow()
})

//  Template do menu personalizado

const template = [
    {
        label: 'Arquivo',
        submenu: [
           { 
            label:"janela secundaria",
            click:()  => childwindow()

           },
           
           
            {
                label: 'sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            }
        ]
    },
    {
        label: 'Exibir',
        submenu: [
            {
                label: 'Recarregar',
                role: 'reload'
            }, {
                label: 'Ferramentas do Desenvolvedor',
                role: 'toggleDevTools'
            }, {
                type: 'separator'

            }, {
                label: 'aplicar zoom',
                role: 'zoomIn'
            }, {
                label: 'Reduzir',
                role: 'zoomOut'
            }, {
                label: 'Restaurar o zoom padrao',
                role: 'resetZoom'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'docs',
                click: () => shell.openExternal('https://www.electronjs.org/docs/latest/')
            },
            {
                type: 'separator'
            },

            {
                label: 'Sobre',
                accelerator: 'Alt+F1',
                click: () => aboutWindow()
            },
        ]
    }

]


// Processos 
console.log("Processo Principal")

// exemplo de comando que so funciona no Node.js
console.log(`Electron:${process.versions.electron}`)

// Exemplo 2: recebimento de uma mensagem do renderer 

ipcMain.on('send-message', (event, message) => {

    console.log(`processo principal recebeu uma mensagem:${message}`)
    // enviar uma resposta ao renderizador
    event.reply('receive-message',"  ola renderizador")
})


// Exemplo 3 recebimento de uma açao a ser executada 

ipcMain.on("open-about", () => {
    aboutWindow()
})
