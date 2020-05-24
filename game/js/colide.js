// teste
/*function testeColide() {
    alert('colide.js is Ok')
}
*/
/*
function gravity(cnv,bola) {
    let gravidade = 0.1
    // essa gravidade nao tem valores reais.
    let obj = bola
    obj.vY += gravidade
    obj.posY += obj.vY
    obj.posX += obj.vX

    if (obj.posY + obj.radius >= cnv.height || obj.posY - obj.radius <= 0) {
        if (obj.posY - obj.radius <= 0) {
            obj.posY = obj.radius
            obj.vY *= -1
        } else {
            obj.posY = cnv.height - obj.radius
            obj.vY *= -1
        }
    }
    if (obj.posX + obj.radius >= cnv.width || obj.posX - obj.radius<= 0) {
        if (obj.posX - obj.radius <= 0) {
            obj.posX = obj.radius
            obj.vX *= -1
        } else {
            obj.posX = cnv.width - obj.radius
            obj.vX *= -1
        }
    }

 
    
}
*/
function colizao(spr) {
    // colizao 
    for (let i = 1; i < spr.length; i++) {
        let obj1 = spr[0]
        let obj2 = spr[i]
        let difX = obj1.centerX() - obj2.centerX() // diferença X
        let difY = obj1.centerY() - obj2.centerY() // diferença Y
        let somaWidth = obj1.halfWidth() / 2 + obj2.halfWidth() / 2 // soma das metades X
        let somaHeight = obj1.halfHeight() / 1.2 + obj2.halfHeight() / 1.2 // soma das metades Y

        if (Math.abs(difX) < somaWidth && Math.abs(difY) < somaHeight) {
            let colidX = somaWidth - Math.abs(difX)
            let colidY = somaHeight - Math.abs(difY)
            /// texte dano
            
            if (colidX > colidY) {
                
                if (difY > 0) {
                    obj1.posY += colidY
                    obj1.vida(colidY)
                } else {
                    obj1.posY -= colidY
                    obj1.vida(colidY)
                }
            } else {
                
                if (difX > 0) {
                    obj1.posX += colidX
                    obj1.vida(colidX)
                } else {
                    obj1.posX -= colidX
                    obj1.vida(colidX)
                }
                

            }
            
        }

    }/*
    if (obj1.bola) {
        let difX = obj1.posX - obj2.centerX() // diferença X
        let difY = obj1.posY - obj2.centerY() // diferença Y
        let somaWidth = obj1.radius + obj2.halfWidth() // soma das metades X
        let somaHeight = obj1.radius + obj2.halfHeight() // soma das metades Y

        if (Math.abs(difX) < somaWidth && Math.abs(difY) < somaHeight) {
            let colidX = somaWidth - Math.abs(difX)
            let colidY = somaHeight - Math.abs(difY)
            if (colidX > colidY) {
                if (difY > 0) {
                    obj1.vY *= -1
                } else {
                    obj1.vY *= -1
                }
            } else {
                if (difX > 0) {
                    obj1.vX += -1  
                } else {
                    obj1.vX *= -1  
                }   
            }
        }
    } else {
        ///// objetos quadradoa ou retangulos
  
    }*/
}
