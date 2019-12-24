export function addDnd(elem) {
    let currentDrag;

    elem.draggable = true;    

    elem.addEventListener('dragstart', (e) => {
        currentDrag = { position: [e.clientX, e.clientY] };  
    });
    
    document.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    document.addEventListener('drop', (e) => {
        if (currentDrag) {
            // let firstPosition = elem.dataset.position.split(','); 
            let firstPosition = e.clientX + ',' + e.clientY;
            let newPosition = [(firstPosition[0] - currentDrag.position[0] + e.clientX),
                (firstPosition[1] - currentDrag.position[1] + e.clientY)];

            elem.setAttribute('data-position', newPosition);

            elem.style.left = newPosition[0] + 'px';
            elem.style.top = newPosition[1] + 'px';
            elem.style.transform = 'none';
        }
    });   
}