import React from 'react';

import './app.less';
import GroupConfigurator from './group-configurator/group-configurator';
import { shuffle, getParameterByName } from '../utils';
import GroupsContainer from './groups-list/groups-container';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleConfigurationSubmission = this.handleConfigurationSubmission.bind(this);

    this.state = {
      groups: [],
    };
  }

  componentDidUpdate() {
    if (this.state.groups.length > 0) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }

  handleConfigurationSubmission({ people, config: { nogo }, groupCount }) {
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
      shuffle(women);
      shuffle(men);

      const shuffledPeople = women.concat(men);
      shuffledPeople.forEach(addToGroup);

      const nogoFound = groups.some((group) => {
        const peopleOnNoGoList =
          group.filter(person => Object.keys(nogo).indexOf(person.name) !== -1);

        return group
          .some(person => peopleOnNoGoList
            .some(noGoPerson => nogo[noGoPerson.name].indexOf(person.name) !== -1));
      });

      if (!nogoFound) {
        break;
      }
    }


    this.setState({
      groups,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>{window.lang.TITLE}</h1>
        </div>
        <GroupConfigurator
          defaultConfig={getParameterByName('config')}
          onSubmit={this.handleConfigurationSubmission}
        />
        <GroupsContainer groups={this.state.groups} />
      </div>
    );
  }
}

export default App;
