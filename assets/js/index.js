let col

newColor = () => {
    col = '#'+Math.floor(Math.random()*16777215).toString(16).toUpperCase()
    document.getElementById('col').innerHTML = col
    document.getElementsByClassName('color')[0].style.background = col
}

window.onload = function() {
    newColor()
    if(!localStorage.getItem('colorlist')) {
        localStorage.setItem('colorlist', JSON.stringify([]))
    }
    let colors = JSON.parse(localStorage.getItem('colorlist'))
    loadColors(colors)
}

loadColors = colors => {
    for(var color of colors) {
        createColor(color)
    }
}

toClipboard = () => {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = col;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

createColor = color => {
    const temp = document.getElementsByTagName("template")[0]
    const item = temp.content.querySelector("div");
    const a = document.importNode(item, true);
    a.children[0].style.background = color
    a.children[1].innerHTML = color
    document.getElementsByClassName('favList')[0].prepend(a);
}

saveColor = () => {
    let colors = JSON.parse(localStorage.getItem('colorlist'))
    colors.push(col)
    localStorage.setItem('colorlist', JSON.stringify(colors))
    createColor(col)
}

clearColors = () => {
    localStorage.clear()
    localStorage.setItem('colorlist', JSON.stringify([]))
    document.getElementsByClassName('favList')[0].innerHTML = ''
}
