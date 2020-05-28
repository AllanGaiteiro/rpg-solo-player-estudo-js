(function () {
    // teste
    /*
    alert('script.js is Ok')
    testeSprit()
    */
    ///variaveis basicas
    var cnv = document.querySelector('canvas')

    var ctx = cnv.getContext('2d')
    cnv.width = 960
    cnv.height = 600
    var blok = []
    var sprites = []
    var actor = []
    var objet = []
    var carros = []
    var mapas = []
    var mapAtual
    var cordX
    var cordY
    /*    var scn = new Image()
        scn.src = '../images/Sem título.png'
        scn.width = 1650
        scn.height = 1650
    */
    var bancoImg =
        [
            '$Hero01.png', 'actor.png', 'actor.png',
            '11111111.png', '11111111.png', '11111111.png', '11111111.png', '11111111.png', '11111111.png',
        ]

    var senario = [
        { nome: 'centroCity', src: 'Senario1.png', cord: { x: 0, y: 0 }, width: 1650, height: 1650, eventos: { event: '', event2: '' } },
        { nome: 'centroCity', src: 'Senario1.png', cord: { x: 1, y: 1 }, width: 1650, height: 1650, eventos: { event: '', event2: '' } }
    ]
    var character = [
        ////////pessoas
        { nome: 'alex', actor: true, objet: false, auto: false, posX: 100, posY: 100, width: 180 / 3, height: 240 / 4, visible: true, haveImg: true, img: '', srcX: 0, srcY: 0, control: true, colid: true, animar: true },/// principal
        { nome: 'allan', actor: true, objet: false, auto: false, posX: 270, posY: 400, width: 144 / 3, height: 196 / 4, visible: true, haveImg: true, img: '', srcX: 0, srcY: 0, control: false, colid: true, animar: true },
        { nome: 'aladin', actor: true, objet: false, auto: false, posX: 300, posY: 400, width: 144 / 3, height: 196 / 4, visible: true, haveImg: true, img: '', srcX: 0, srcY: 0, control: false, colid: true, animar: true },
        ///carros
        { nome: 'alib', actor: false, objet: false, auto: true, posX: 700, posY: 230, width: 288 / 3, height: 256 / 4, visible: true, haveImg: true, img: '', srcX: 0, srcY: 0, control: false, colid: true, animar: true },
        { nome: ' ', actor: false, objet: false, auto: true, posX: 110, posY: 400, width: 288 / 3, height: 256 / 4, visible: true, haveImg: true, img: '', srcX: 0, srcY: 0, control: false, colid: true, animar: true },
        { nome: ' ', actor: false, objet: false, auto: true, posX: 1550, posY: 300, width: 288 / 3, height: 256 / 4, visible: true, haveImg: true, img: '', srcX: 0, srcY: 0, control: false, colid: true, animar: true },

        { nome: 'alib', actor: false, objet: false, auto: true, posX: 170, posY: 290, width: 288 / 3, height: 256 / 4, visible: true, haveImg: true, img: '', srcX: 0, srcY: 0, control: false, colid: true, animar: true },
        { nome: ' ', actor: false, objet: false, auto: true, posX: 190, posY: 1060, width: 288 / 3, height: 256 / 4, visible: true, haveImg: true, img: '', srcX: 0, srcY: 0, control: false, colid: true, animar: true },
        { nome: ' ', actor: false, objet: false, auto: true, posX: 1480, posY: 300, width: 288 / 3, height: 256 / 4, visible: true, haveImg: true, img: '', srcX: 0, srcY: 0, control: false, colid: true, animar: true },

    ]
    //y270//x170//y1060//x1480
    /// varivais de movimentos
    var w = 87, s = 83, a = 65, d = 68
    var cima = 38, baixo = 40, esq = 37, dir = 39
    /////////////////////

    var cam = {
        posX: 0,
        posY: 0,
        width: cnv.width,
        height: cnv.height,

        frontLeft: function () {
            return this.posX + (this.width * 0.3)
        },
        frontRight: function () {
            return this.posX + (this.width * 0.7)
        },
        frontTop: function () {
            return this.posY + (this.height * 0.3)
        },
        frontBottom: function () {
            return this.posY + (this.height * 0.7)
        }
    }
    ///// centralizar a camera 
    function atualizar() {
        mapAtual = atualizarMap()
        sprites[0].movCam(cam, mapAtual)
        sprites[0].move(mapAtual)
        eventos(carros, mapas, mapAtual)
        //gravity(cnv,bola)
        colizao(sprites)// influenciado e influenciador  
    }

    function atualizarMap() {
        //alert(cordX)
        for (var i in mapas) {
            //alert(mapas[i].src)
            let s = mapas[i]

            //alert(scn.cord.x)
            if (s.cord.x == cordX && s.cord.y == cordY) {
                //alert(s.width)
                return s
            }
        }
    }




    function carregar() {
        cordX = 0
        cordY = 0
        ///// criando image senario
        for (var i in senario) {
            let scn = senario[i]
            //alert(scn.cord.x)
            //alert('../images/' + scn.src)
            var img = new Image()
            img.src = '../images/' + scn.src
            //alert(img.src)
            var mapa = new Mapas(img, scn)
            mapas.push(mapa)
        }

        for (var i in bancoImg) {
            let srcImg = '../images/charateres/' + bancoImg[i]
            let c = character[i]
            //// criando img do obeto ou personagem
            var img = new Image()
            img.src = srcImg
            c.img = img
            if (c.actor) {
                var char = new Actores(c)
                actor.push(char)
                sprites.push(char)
            } else if (c.objet) {
                var char = new Objetos(c)
                objet.push(char)
                sprites.push(char)
            } else if (c.auto) {
                var char = new Carros(c)
                carros.push(char)
                sprites.push(char)
            }
            /// criar colizoes
            if (c.colid) {
                blok.push(char)
            } else {

            }
            //// eventos

        }
        loop()
    }

    window.addEventListener('keydown', function () {
        let tecl = event.keyCode
        //this.alert(tecl)
        if (tecl == w || tecl == cima) {
            sprites[0].movCima = true
        }
        if (tecl == s || tecl == baixo) {
            sprites[0].movBaixo = true
        }
        if (tecl == a || tecl == esq) {
            sprites[0].movEsq = true
        }
        if (tecl == d || tecl == dir) {
            sprites[0].movDir = true
        }
    })
    window.addEventListener('keyup', function () {
        let tecl = event.keyCode
        //this.alert(tecl)
        if (tecl == w || tecl == cima) {
            sprites[0].movCima = false
        }
        if (tecl == s || tecl == baixo) {
            sprites[0].movBaixo = false
        }
        if (tecl == a || tecl == esq) {
            sprites[0].movEsq = false
        }
        if (tecl == d || tecl == dir) {
            sprites[0].movDir = false
        }
    })

    function renderizar() {
        ctx.save()
        ctx.translate(-cam.posX, - cam.posY)
        ctx.clearRect(0, 0, cnv.width, cnv.height)
        //ctx.drawImage(scn,0,0,1750,1750,0,0,1750,1750)
        ctx.drawImage(mapAtual.img, 0, 0, mapAtual.width, mapAtual.height, mapAtual.posX, mapAtual.posY, mapAtual.width, mapAtual.height)
        for (var i in sprites) {
            let spr = sprites[i]

            if (spr.visible) {
                spr.move(mapAtual)
                spr.draw(ctx)

            } else {
                //ctx.fillRect(spr.posX,spr.posY,spr.width,spr.height)
            }
        }
        ctx.restore()
        sprites[0].barraLife(ctx)
    }
    function loop() {
        //actor[0].heart = 0
        if (actor[0].heart <= 0) {
            gameOver()
        } else {

            atualizar()
            renderizar()

            requestAnimationFrame(loop, cnv)
        }
    }
    carregar()
    //requestAnimationFrame(carregar,cnv)
}())