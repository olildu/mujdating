function handleInput(element) {
    var content = element.innerText.trim();

    if (content === '') {
        switch (element.classList[0]) {
            case 'date-entry':
                element.innerText = 'DD';
                break;
            case 'month-entry':
                element.innerText = 'MM';
                break;
            case 'year-entry':
                element.innerText = 'YYYY';
                break;
        }
    } else {
    }
}
