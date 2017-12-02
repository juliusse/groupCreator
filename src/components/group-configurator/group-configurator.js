import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import configs from '../../config';
import './group-configurator.less';

function getPeopleListValue(configKey) {
  return (configKey && configs[configKey]) ? configs[configKey].people.join('\n') : '';
}

export class GroupConfigurator extends React.Component {
  constructor(props) {
    super(props);

    this.handleCountChange = this.handleCountChange.bind(this);
    this.handleConfigChange = this.handleConfigChange.bind(this);
    this.handlePeopleListChange = this.handlePeopleListChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSubmit = props.onSubmit;

    this.state = {
      groupCount: 6,
      configKey: this.props.defaultConfig,
      peopleList: getPeopleListValue(this.props.defaultConfig),
    };
  }

  handleCountChange(event) {
    this.setState({
      groupCount: event.target.value,
    });
  }

  handleConfigChange(event) {
    const configKey = event.target.value;

    this.setState({
      configKey,
      peopleList: getPeopleListValue(configKey),
    });
  }

  handlePeopleListChange(event) {
    const newListValue = event.target.value;
    this.setState({
      peopleList: newListValue,
    });
  }

  handleSubmit() {
    const people = this.state.peopleList
      .split('\n')
      .map(person => person.split(','))
      .map((personProps) => {
        const name = personProps[0].trim();
        const gender = _.get(personProps, '[1]', 'M').trim() === 'M' ? 'male' : 'female';
        return { name, gender };
      });
    const config = configs[this.state.configKey];

    this.onSubmit({ config, people, groupCount: this.state.groupCount });
  }

  render() {
    const configOptions = Object.keys(configs)
      .map(key => <option key={key} value={key}>{key}</option>);

    return (
      <div>
        <div className="row">
          <div className="column">
            <div className="row">
              <div className="column">
                {window.lang.NUM_GROUPS}:
              </div>
              <div className="column">
                <input
                  defaultValue={this.state.groupCount}
                  onChange={this.handleCountChange}
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="row">
              <div className="column">
                {window.lang.CLASS}:
              </div>
              <div className="column">
                <select
                  className="config-selector"
                  value={this.state.configKey}
                  onChange={this.handleConfigChange}
                >
                  <option value="empty" />
                  {configOptions}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="column">
                <textarea
                  className="people-names"
                  value={this.state.peopleList}
                  onChange={this.handlePeopleListChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div
              role="button"
              tabIndex="0"
              onKeyDown={this.handleSubmit}
              onClick={this.handleSubmit}
              className="btn btn-success"
            >
              {window.lang.CREATE_GROUPS}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GroupConfigurator.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultConfig: PropTypes.string,
};

GroupConfigurator.defaultProps = {
  defaultConfig: '',
};

export default {
  GroupConfigurator,
};
