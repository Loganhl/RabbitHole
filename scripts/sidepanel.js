const selection = () => {
    if (window.getSelection)
        return window.getSelection();
}

const getSelectedText = () => {
    document.getElementById("selection").innerText = selection();
}



