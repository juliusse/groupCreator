import * as _ from 'lodash';

export function generateGroups({ people, nogos = {}, groupCount }) {
  const women = people.filter(person => person.gender === 'female');
  const men = people.filter(person => person.gender === 'male');

  let retries = 2000;
  let groups;

  function addToGroup(person, index) {
    const groupIndex = index % groupCount;
    if (!groups[groupIndex]) {
      groups[groupIndex] = [];
    }

    groups[groupIndex].push(person);
  }

  while (retries !== 0) {
    retries -= 1;
    groups = [];
    const shuffledWomen = _.shuffle(women);
    const shuffledMen = _.shuffle(men);

    const shuffledPeople = shuffledWomen.concat(shuffledMen);
    shuffledPeople.forEach(addToGroup);

    const nogoFound = groups.some((group) => {
      const peopleOnNoGoList =
        group.filter(person => Object.keys(nogos).indexOf(person.name) !== -1);

      return group
        .some(person => peopleOnNoGoList
          .some(noGoPerson => nogos[noGoPerson.name].indexOf(person.name) !== -1));
    });

    if (!nogoFound) {
      break;
    }
  }

  groups.forEach((group) => {
    const leaderIndex = _.random(0, group.length - 1);
    const leader = group[leaderIndex];
    leader.isGroupLeader = true;
  });

  return groups;
}

export default {
  generateGroups,
};
