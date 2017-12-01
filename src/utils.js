// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function initConfigSelector(configSelectElement, defaultConfig) {
    var keys = Object.keys(window.groups);

    keys.forEach(function (configKey) {
        var opt = document.createElement('option');
        opt.value = configKey;
        opt.innerHTML = configKey;
        opt.selected = configKey === defaultConfig;
        configSelectElement.appendChild(opt);
    })
}


function loadConfig(peopleTextArea) {
    return function (configId) {
        var configName = configId || getParameterByName('config') || null;
        var config = window.groups[configName]
        window.currentConfig = config ? config : {people: [], nogo: []};
        peopleTextArea.value = window.currentConfig.people.join('\n');
    };
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

function createGroupCard(people) {
    var groupDiv = document.createElement('div');
    groupDiv.classList.add('group-card');

    people.forEach(function (person) {
        var personDiv = document.createElement('div');
        personDiv.classList.add('person', person.gender);
        personDiv.innerText = person.name;

        groupDiv.appendChild(personDiv);
    });

    return groupDiv;
}

module.exports = {
    getParameterByName,
    initConfigSelector,
    loadConfig,
    shuffle,
    createGroupCard
};