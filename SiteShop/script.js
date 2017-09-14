var сurrentState = {};
var sortObj = {};
var sortResult = {};
function changeDropdown(selector) {
    var dropdownElements = document.querySelectorAll(selector);
    var selectorElement = selector.split(' ')[0];

    var sortBy = document.querySelector(selectorElement).innerText;
    sortBy = sortBy.replace(' ', '');
    sortBy = sortBy.toLowerCase(sortBy);
    if (selector != '#dropdownThingSize li') {
        var showFlag = true;
    } else {
        var showFlag = false;
    }
    if (showFlag == true) {
        var clearButton = document.querySelector('#clearFilter');
        clearButton.addEventListener('click', clearFilter);

    }

    dropdownElements.forEach(function (value, key) {
        value.addEventListener('click', function () {
            var clickElementValue = this.innerHTML;

            var dropdownButton = document.querySelector(selectorElement + ' button');
            dropdownButton.innerText = clickElementValue;
            var span = document.createElement('span');
            span.setAttribute('class', 'caret');
            dropdownButton.appendChild(span);
        })
        value.addEventListener('click', function () {
            liEvent(sortBy, this, showFlag);




        })
    })
}
function liEvent(sortBy, thisElement, f = false) {

    var clickElementValue = thisElement.innerHTML;
    sortObj[sortBy] = clickElementValue;

    var result = sortByCatSizeColor(sortObj, dataJson);

    if (f === true) {
        showThings(result);
    }
}

function addPriceSort(selector) {
    var dropdownElements = document.querySelectorAll(selector);
    var selectorElement = selector.split(' ')[0];
    var sortResult = [];
    dropdownElements.forEach(function (value, key) {
        value.addEventListener('click', function () {
            var clickElementValue = this.innerHTML;

            var dropdownButton = document.querySelector(selectorElement + ' button');
            dropdownButton.innerText = clickElementValue;
            var span = document.createElement('span');
            span.setAttribute('class', 'caret');
            dropdownButton.appendChild(span);

            if (clickElementValue == 'Lowest price first') {
                sortResult = sortByPrice(true);
            } else {
                sortResult = sortByPrice();
            }
            showThings(sortResult);
        })
    })
}

function clearFilter() {

    var categori = document.querySelector('#dropdownCategori button');
    categori.innerText = 'Categori';
    var span = document.createElement('span');
    span.setAttribute('class', 'caret');
    categori.appendChild(span);

    var size = document.querySelector('#dropdownSize button');
    size.innerText = 'Size';
    var span = document.createElement('span');
    span.setAttribute('class', 'caret');
    size.appendChild(span);

    var color = document.querySelector('#dropdownColor button');
    color.innerText = 'Color';
    var span = document.createElement('span');
    span.setAttribute('class', 'caret');
    color.appendChild(span);

    var priceSort = document.querySelector('#dropdownSortPrice button');
    priceSort.innerText = 'Sort';
    var span = document.createElement('span');
    span.setAttribute('class', 'caret');
    priceSort.appendChild(span);

    sortObj = {};
    sortResult = {};

    showThings(dataJson);

}




// function unique(arr) {
//     var obj = {};

//     for (var i = 0; i < arr.length; i++) {
//         var str = arr[i];
//         obj[str] = true;
//     }

//     return Object.keys(obj);
// }

function addDropdownInfo(selector, dropdownData) {
    var necessaryDropdown = document.querySelector(selector);
    var dropdownUl = necessaryDropdown.querySelector('ul');
    for (var i = 0; i < dropdownData.length; i++) {
        var li = document.createElement('li');
        li.innerText = dropdownData[i];
        dropdownUl.appendChild(li);

    }

}

function showThings(dataJson) {
    var mainConteiner = document.querySelector('.mainContent');
    mainConteiner.innerHTML = '';
    for (key in dataJson) {
        var mainDiv = document.createElement('div');
        var div = document.createElement('div');
        var img = document.createElement('img');
        var p = document.createElement('p');
        var a = document.createElement('a');

        mainDiv.setAttribute('class', 'row');
        div.setAttribute('class', 'thumbnail');
        a.setAttribute('class', 'thumbnail');
        a.setAttribute('href', 'thing.html?thing=' + key);

        img.setAttribute('src', dataJson[key]['img'][0]);
        p.innerText = dataJson[key]['description'] + ' ' + dataJson[key]['price'] + "EUR";

        mainDiv.appendChild(div);
        a.appendChild(img);
        div.appendChild(a);
        div.appendChild(p);

        mainConteiner.appendChild(mainDiv);
    }
}

var sortByCatSizeColor = function (sortObj, data) {
    var objCount = 0;
    delete sortObj['sort'];
    for (sortKey in sortObj) {
        objCount++;
    }

    if (objCount > 1) {
        data = sortResult;
    }

    for (sortKey in sortObj) {

        for (key in data) {
            if (find(data[key][sortKey], sortObj[sortKey]) >= 0) {
                sortResult[key] = data[key];
            } else {
                delete sortResult[key];
            }
        }
    }

    return sortResult;

}

var sortByPrice = function (reverse = false) {
    var sortObj = {};
    if (Object.keys(sortResult).length == 0) {
        sortObj = dataJson;
    } else {
        sortObj = sortResult;
    }
    var i = 0;
    for (key in sortObj) {
        sortObj[i] = sortObj[key];
        delete sortObj[key];
        i++;
    }
    priceSort(sortObj);
    function priceSort(sortObj) {

        for (var i = 0; i < Object.keys(sortObj).length; i++) {
            var x = i + 1;
            if (x >= Object.keys(sortObj).length) {
                break
            }
            if (sortObj[i].price < sortObj[x].price) {
                var x = sortObj[i];
                var y = sortObj[i + 1]
                sortObj[i + 1] = x
                sortObj[i] = y
                priceSort(sortObj)
            }
        }
    }

    if (reverse === false) {
        return sortObj;
    } else {
        return Object.assign([], sortObj).reverse();
    }

}


if ([].indexOf) {

    var find = function (array, value) {
        return array.indexOf(value);
    }

} else {
    var find = function (array, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === value) return i;
        }

        return -1;
    }
}

function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}

function $_GET(key) {
    var s = window.location.search;
    s = s.match(new RegExp(key + '=([^&=]+)'));
    return s ? s[1] : false;
}


function addPrice(selector) {
    var thingId = $_GET('thing');
    var price = dataJson[thingId].price;
    var priceElement = document.querySelector(selector)
    var p = document.createElement('p');
    var after = priceElement.querySelector('p');

    p.innerText = price + ' EUR';
    insertAfter(p, after);
}

function dropdownThing(selector, param) {
    var thingId = $_GET('thing');

    addDropdownInfo(selector, param);
    changeDropdown(selector + ' li');



}

function addButtonAdd(selector) {

    var mainElement = document.querySelector(selector)
    var button = document.createElement('button');
    button.innerText = 'Add to bag';
    button.setAttribute('class', 'btn btn-default');

    mainElement.appendChild(button);

    button.addEventListener('click', addToBug)

}

function addToBug() {
    var thingId = $_GET('thing');
    localStorage['bag'] = JSON.stringify(dataJson[thingId]);
}

if ($_GET('thing')) {
    dropdownThing('#dropdownThingSize', dataJson[$_GET('thing')].size);
    addPrice('.rightContainer');
    addButtonAdd('.rightContainer');
} else if (window.location.search == "") {
    addDropdownInfo('#dropdownCategori', categories);
    addDropdownInfo('#dropdownSize', sizes);
    addDropdownInfo('#dropdownColor', colors);

    changeDropdown('#dropdownSortPrice li');
    changeDropdown('#dropdownCategori li');
    changeDropdown('#dropdownSize li');
    changeDropdown('#dropdownColor li');
    addPriceSort('#dropdownSortPrice li ');
    showThings(dataJson);
}


