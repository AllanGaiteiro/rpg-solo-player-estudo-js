///// ainda sem eventos //// 


function eventos(carros) {
    eventCarros(carros)
}

function eventCarros(carros) {
    //y270
    //x170
    //y1060
    //x1480
    for (var i in carros) {
        let p1 = 230
        let p2 = 110
        let p3 = 1120
        let p4 = 1550
        let c = carros[i]
        if (/// presiso diminuir
            c.posX == 170 && (c.posY != 1120 && c.posY != 230) || 
            c.posX == 1480 && (c.posY != 1120 && c.posY != 230)|| 
            c.posY == 270 && (c.posX != 110 && c.posX != 1550) || 
            c.posY == 1060 && (c.posX != 110 && c.posX != 1550)
            ) {
            p1 = 270
            p2 = 170
            p3 = 1060
            p4 = 1480
        }else{
            p1 = 230
            p2 = 110
            p3 = 1120
            p4 = 1550
        }
        c.event_1(p1,p2,p3,p4)
    }
    
}

