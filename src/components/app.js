import React from 'react';

import './app.less';
import { GroupConfigurator } from './group-configurator/group-configurator';
import { getParameterByName } from '../lib/utils';
import { GroupsContainer } from './groups-list/groups-container';
import { generateGroups } from '../lib/generate-groups';

export class App extends React.Component {
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

  handleConfigurationSubmission({ people, config: { nogos }, groupCount }) {
    const groups = generateGroups({ people, nogos, groupCount });
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

export default {
  App,
};
