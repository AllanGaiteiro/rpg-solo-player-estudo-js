
function conteudo(item) {
    var visivel = 'block'
    var notVisivel = 'none'
    var item = item
    for (var i = 1; i < 5; i++) {
        var slot = `item${i}`
        if (item == slot) {
            document.getElementById(slot).style.display = visivel
        } else {
            document.getElementById(slot).style.display = notVisivel
        }
    }
}