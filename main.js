 console.log("Processo Principal")

 const { app, BrowserWindow, nativeTheme,Menu,shell } = require('electron')  // Importaçao

 const createWindow = () => {       // Janela Principal 
    // nativeTheme.themeSource ='dark'
   const win = new BrowserWindow({       
     width: 800, // largura 
     height: 600,// altura
     icon: './src/public/img/piggy.png'
    //  resizable: false, // evitar o redimensionamento 
    //  titleBarStyle:'hidden'  esconder barra de titulo e menu 
    //  autoHideMenuBar: true // esconder menu 
   })
   Menu.setApplicationMenu(Menu.buildFromTemplate(template))

   win.loadFile('./src/views/index.html')
 }
 // janela sobre 
 const aboutWindow = () => {       // Janela Principal 
    // nativeTheme.themeSource ='dark'
   const about = new BrowserWindow({       
     width: 360, // largura 
     height: 220,// altura
     icon: './src/public/img/piggy.png',
      resizable: false, // evitar o redimensionamento 
     titleBarStyle:'hidden',  //esconder barra de titulo e menu 
    // autoHideMenuBar: true // esconder menu 
   })
   
   //iniciar a janela com o menu personalizado 
  

   about.loadFile('./src/views/sobre.html') 
}

 app.whenReady().then(() => {  // executa de forma assincrona a aplicaçao 
   createWindow()
 })

//  Template do menu personalizado

const  template = [
    {
        label: 'Arquivo',
        submenu:[
            {
                label: 'sair',
                click:()=> app.quit(),
                accelerator: 'Alt+F4'
            }
        ]
    },
    {
        label: 'Exibir',
        submenu:[
            {
              label:'Recarregar',
              role: 'reload'  
            },{
                label:'Ferramentas do Desenvolvedor',
                role:'toggleDevTools'
            },{
                type:'separator'

            },{
                label:'aplicar zoom',
                role:'zoomIn'
            },{
                label:'Reduzir',
                role:'zoomOut'
            },{
                label:'Restaurar o zoom padrao',
                role:'resetZoom'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu:[
            {
                label:'docs',
                click: ()=> shell.openExternal('https://www.electronjs.org/docs/latest/')
            },
            {
                type:   'separator'
            },
            
            {
                label:  'Sobre',
                accelerator:'Alt+F1',
                click: ()=> aboutWindow()
            },
        ]
    }

]