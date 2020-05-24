
var Sprite = function (nome, posX, posY, width, height, visible, haveImg, img,/*srcX,srcY,*/colid) {
    // posisoes e larguras basicas //
    this.nome = nome
    this.posX = posX
    this.posY = posY
    this.sWidth = this.width = width
    this.sHeight = this.height = height
    this.visible = visible
    if (this.visible) {
        this.haveImg = haveImg
        this.img = img
        /*this.srcX = srcX
        this.srcY = srcY
        */


    }
    this.colid = colid

}

/////////Proto tipes de Sprites
Sprite.prototype.draw = function () {
    if (!this.visible) {
    } else if (this.haveImg) {

        this.srcX = this.srcY = 0
        this.draw = function (ctx) {

            ctx.drawImage(this.img, this.srcX, this.srcY, this.sWidth, this.sHeight, this.posX, this.posY, this.width, this.height)
            this.animation()
        }
    }
}
Sprite.prototype.move = function (scn) {
    //if (this.control) {
    if (this.movCima) {
        this.posY -= this.speed
        this.srcY = this.height * 3
    }
    if (this.movBaixo) {
        this.posY += this.speed
        this.srcY = this.height * 0
    }
    if (this.movDir) {
        this.posX += this.speed
        this.srcY = this.height * 2
    }
    if (this.movEsq) {
        this.posX -= this.speed
        this.srcY = this.height
    }

    this.posX = Math.max(0, Math.min(scn.width - this.width, this.posX))
    this.posY = Math.max(0, Math.min(scn.height - this.height, this.posY))
    //} else {   
    //}
}
Sprite.prototype.animation = function () {
    if (this.animar) {
        this.countAnim = 0
        this.animation = function () {
            if (this.movCima || this.movBaixo || this.movDir || this.movEsq) {
                this.countAnim++
                if (this.countAnim >= 24) {
                    this.countAnim = 0
                }
                this.srcX = Math.floor(this.countAnim / 8) * this.width

            }
        }
    }
}
Sprite.prototype.halfWidth = function () {
    return this.width / 2
}
Sprite.prototype.halfHeight = function () {
    return this.height / 2
}
Sprite.prototype.centerX = function () {
    return this.posX + this.halfWidth()
}
Sprite.prototype.centerY = function () {
    return this.posY + this.halfHeight()
}

//////// atores //////////////////
Sprite.prototype.movCam = function (cam, map) {

    if (this.control) {

        if (this.posX < cam.frontLeft()) {

            cam.posX = this.posX - (cam.width * 0.3)
        }
        if (this.posX + this.width > cam.frontRight()) {
            cam.posX = this.posX + this.width - (cam.width * 0.7)
        }
        if (this.posY < cam.frontTop()) {

            cam.posY = this.posY - (cam.height * 0.3)
        }
        if (this.posY + this.height > cam.frontBottom()) {
            cam.posY = this.posY + this.height - (cam.height * 0.7)
        }
    }

    cam.posX = Math.max(0, Math.min(map.width - cam.width, cam.posX))
    cam.posY = Math.max(0, Math.min(map.height - cam.height, cam.posY))
    /*        }
        } else {
            
        }
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
    */
}

var Actores = function (nome, posX, posY, width, height, visible, haveImg, img,/*srcX,srcY,*/control, colid, animar/*,vida,dano*/) {
    Sprite.call(this, nome, posX, posY, width, height, visible, haveImg, img,/*srcX,srcY,*/colid)
    this.control = control
    this.movCima = this.movBaixo = this.movEsq = this.movDir = false
    this.speed = 2
    this.animar = animar
    this.heart = 100
    
}
Actores.prototype = Object.create(Sprite.prototype)

Actores.prototype.atributos = function () {
    
    this.energ
    this.ataq
    this.def
    this.mag_Ataq
    this.mag_Def  
}
Actores.prototype.vida = function(dano){
    this.heart +=  -dano/10
}
Actores.prototype.barraLife = function(ctx){
    ctx.fillStyle = 'black'
    ctx.fillRect(8,8,104,14) 
    ctx.fillStyle = 'red'
    ctx.fillRect(10,10,this.heart,10)           
}


/////////////Objetos /////////////////////

var Objeto = function (nome, posX, posY, width, height, visible, haveImg, img,/*srcX,srcY,*/colid, animar) {
    Sprite.call(this, nome, posX, posY, width, height, visible, haveImg, img,/*srcX,srcY,*/colid)
}
Objeto.prototype = Object.create(Sprite.prototype)



/////////// Carrros /////


var Carros = function (nome, posX, posY, width, height, visible, haveImg, img,/*srcX,srcY,*/control, colid, animar/*,vida,dano*/) {

    Sprite.call(this, nome, posX, posY, width, height, visible, haveImg, img,/*srcX,srcY,*/colid)

    this.vX = this.vY = this.numbAutomove = this.event1 = 0
    this.control = control
    this.movCima = this.movBaixo = this.movEsq = this.movDir = false
    this.speed = 2
    this.animar = animar
}
Carros.prototype = Object.create(Sprite.prototype)

Carros.prototype.event_1 = function (p1, p2, p3, p4) {


    this.p1 = p1
    this.p2 = p2 //x170
    this.p3 = p3 //y1060
    this.p4 = p4 //x1480
    //alert(ev.posX)
    if (this.posX > this.p2 && this.posX < this.p4) {
        this.movCima = this.movBaixo = this.movEsq = this.movDir = false
        if (this.posY == this.p3) {
            if (this.p3 != 1120) {
                this.movEsq = true
            } else {
                this.movDir = true
            }
        }
        if (this.posY == this.p1) {
            if (this.p1 != 230) {
                this.movDir = true
            } else {
                this.movEsq = true
            }
        }
    } else if (this.posY > this.p1 && this.posY < this.p3) {
        this.movCima = this.movBaixo = this.movEsq = this.movDir = false
        if (this.posX == this.p2) {
            if (this.p2 != 110) {
                this.movCima = true
            } else {
                this.movBaixo = true
            }
        }
        if (this.posX == this.p4) {
            if (this.p4 != 1550) {
                this.movBaixo = true
            } else {
                this.movCima = true
            }
        }
    } else {
        this.movCima = this.movBaixo = this.movEsq = this.movDir = false
        if (this.posY == this.p1 && this.posX == this.p2) {
            if (this.p1 != 230 && this.p2 != 110) {
                this.movDir = true
            } else {
                this.movBaixo = true
            }
        }
        if (this.posY == this.p3 && this.posX == this.p2) {
            if (this.p2 != 110 && this.p3 != 1120) {
                this.movCima = true
            } else {
                this.movDir = true
            }
        }
        if (this.posY == this.p3 && this.posX == this.p4) {

            if (this.p3 != 1120 && this.p4 != 1550) {
                this.movEsq = true
            } else {
                this.movCima = true
            }
        }
        if (this.posX == this.p4 && this.posY == this.p1) {
            if (this.p4 != 1550 && this.p1 != 230) {
                this.movBaixo = true
            } else {
                this.movEsq = true
            }
        }

    }
    //ev.posX = Math.max(100,Math.min(1000-ev.width,ev.posX))
    //ev.posY = Math.max(100,Math.min(1000-ev.height,ev.posY))

}