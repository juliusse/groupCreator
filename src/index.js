import { config } from './config';
import {
    getParameterByName,
    initConfigSelector,
    loadConfig,
    shuffle,
    createGroupCard
} from './utils';

import 'bootstrap/less/bootstrap.less';
import './index.less';
function createGroups() {
    groupsContainer.innerHTML = '';

    var groupCount = config_count.value;
    var people = configTextArea.value
        .split('\n')
        .map(function (person) {
            var vals = person.split(',');
            var gender = vals[1] ? vals[1].trim() : 'M';
            return {
                name: vals[0].trim(),
                gender: gender === 'W' ? 'female' : 'male'
            }
        });

    var women = people.filter(function (person) {
        return person.gender === 'female';
    });

    var men = people.filter(function (person) {
        return person.gender === 'male';
    });

    var retries = 2000;
    var groups;
    while (retries-- !== 0) {
        groups = [];
        shuffle(women);
        shuffle(men);

        var shuffledPeople = women.concat(men);
        shuffledPeople.forEach(function (person, index) {
            var groupIndex = index % groupCount;
            if (!groups[groupIndex]) {
                groups[groupIndex] = [];
            }

            groups[groupIndex].push(person);
        });

        var nogoFound = groups.some(function (group) {
            var peopleOnNoGoList = group.filter(function (person) {
                return Object.keys(window.currentConfig.nogo).indexOf(person.name) !== -1;
            });

            return group.some(function (person) {
                return peopleOnNoGoList.some(function (noGoPerson) {
                    return window.currentConfig.nogo[noGoPerson.name].indexOf(person.name) !== -1;
                })
            });
        });

        if (!nogoFound) {
            break;
        }
    }
    ;

    groups.forEach(function (group) {
        var groupDiv = createGroupCard(group);
        groupsContainer.appendChild(groupDiv);
    })

    window.scrollTo(0,document.body.scrollHeight);
}

// elements
var configurationsSelect = document.querySelector('.config-selector');
var configTextArea = document.querySelector('.people-names');
var config_count = document.querySelector('.group-count');
var createGroupsButton = document.querySelector('.create-groups');
var groupsContainer = document.querySelector('.groups-container');

var loadConfigMethod = loadConfig(configTextArea);

// event listeners
createGroupsButton.addEventListener("click", createGroups);
configurationsSelect.addEventListener("change", function (element) {
    loadConfigMethod(element.currentTarget.value)
});

// init
initConfigSelector(configurationsSelect, getParameterByName('config'));
loadConfigMethod();
