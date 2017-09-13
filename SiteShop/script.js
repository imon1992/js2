var сurrentState = {};
var sortObj = {};
var sortResult = {};
function changeDropdown(selector) {
    var dropdownElements = document.querySelectorAll(selector);
    var selectorElement = selector.split(' ')[0]
    // console.log(selectorElement);
    var sortBy = document.querySelector(selectorElement).innerText;
    sortBy = sortBy.replace(' ', '');
    sortBy = sortBy.toLowerCase(sortBy);

    // console.log(sortBy);
    // console.log(x);
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
            var clickElementValue = this.innerHTML;
            sortObj[sortBy] = clickElementValue;
            var result = sortByCatSizeColor(sortObj, dataJson);
            showThings(result);
            sortByPrice();
            // console.log(sorObj);
            // sortByObj1.push({[sortBy]:clickElementValue});
            // sortAndShow(sortByObj1,сurrentState);
            // showThings(сurrentState);
            // console.log(sorObj);
        })
    })
}

// var dropdownElements = document.querySelectorAll('#dropdownCategori ul ');
// console.log(dropdownElements);
// console.log(dataJson);


// function getCategoriesSizeColor(dataJson) {

//     for (key in dataJson) {

//         dataJson[key].sizes.forEach(function (value) {
//             sizes.push(value);
//         });
//         dataJson[key].colors.forEach(function (value) {
//             colors.push(value);
//         });
//         categories.push(dataJson[key].categori);

//     }

//     categories = unique(categories);
//     sizes = unique(sizes);
//     colors = unique(colors);
// }

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

        mainDiv.setAttribute('class', 'row');
        div.setAttribute('class', 'thumbnail');

        img.setAttribute('src', dataJson[key]['img'][0]);
        p.innerText = dataJson[key]['description'];

        mainDiv.appendChild(div);
        div.appendChild(img);
        div.appendChild(p);

        mainConteiner.appendChild(mainDiv);
    }
}

var sortByCatSizeColor = function (sortObj, data) {
    var objCount = 0;

    console.log(sortObj)
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

var sortByPrice = function () {
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
    a(sortObj);
    function a(sortObj) {

        for (var i = 0; i < Object.keys(sortObj).length; i++) {
            console.log(i)
            var x = i + 1;
            if (x >= Object.keys(sortObj).length)
                break
            if (sortObj[i].price < sortObj[x].price) {
                var x = sortObj[i];
                var y = sortObj[i + 1]
                sortObj[i + 1] = x
                sortObj[i] = y
                a(sortObj)
            }
        }
    }

    showThings(sortObj);

    console.log(sortObj);

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
// getCategoriesSizeColor(dataJson);
addDropdownInfo('#dropdownCategori', categories);
addDropdownInfo('#dropdownSize', sizes);
addDropdownInfo('#dropdownColor', colors);
showThings(dataJson);
// sortAndShow([{'color': 'red'},{'size': 'M'}], dataJson)

changeDropdown('#dropdownCategori li');
changeDropdown('#dropdownSize li');
changeDropdown('#dropdownColor li');
changeDropdown('#dropdownSortPrice li');