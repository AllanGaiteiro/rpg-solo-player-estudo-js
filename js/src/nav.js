
class Nav extends React.Component {
    render() {
        return (
            <div>
                <a href='#'>Inicio</a>
                <a href='game/game.html'>Jogo</a>
                <a href='#'>sobre</a>
            </div>
        )
    }
}


ReactDOM.render(<Nav />, document.getElementById('nav'))