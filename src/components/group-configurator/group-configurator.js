import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'react-codemirror';

import ConfigurationManager from '../../lib/config';
import './group-configurator.less';
import { Select } from '../select/select';

const configs = () => ConfigurationManager.getInstance();

function getPeopleListValue(configKey) {
  const people = configs().has(configKey) ? configs().get(configKey).people : [];
  return people.join('\n');
}

function updateCodeMirrorClasses(codemirror) {
  const doc = codemirror.getDoc();
  doc.eachLine((lineHandle) => {
    doc.removeLineClass(lineHandle, 'background');

    const { text } = lineHandle;
    const commaPosition = text.indexOf(',');
    const gender = lineHandle.text.substring(commaPosition + 1).trim().toLowerCase();

    if (commaPosition === -1 || _.isEmpty(gender)) {
      return;
    }

    doc.addLineClass(lineHandle, 'background', `g-${gender}`);
  });
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

  componentDidMount() {
    updateCodeMirrorClasses(this.cmComponent.getCodeMirror());
  }

  handleCountChange(event) {
    this.setState({
      groupCount: event.target.value,
    });
  }

  handleConfigChange({ value: configKey }) {
    const codemirror = this.cmComponent.getCodeMirror();
    const newList = getPeopleListValue(configKey);
    codemirror.setValue(newList);
    updateCodeMirrorClasses(codemirror);
    this.setState({
      configKey,
      peopleList: getPeopleListValue(configKey),
    });
  }

  handlePeopleListChange(peopleList) {
    updateCodeMirrorClasses(this.cmComponent.getCodeMirror());
    this.setState({ peopleList });
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
    const config = configs().get(this.state.configKey);

    this.onSubmit({ config, people, groupCount: this.state.groupCount });
  }

  render() {
    const configOptions = configs()
      .getAvailableConfigurations()
      .map(key => ({ value: key, label: key }));
    configOptions.unshift({ value: '', label: '---' });

    const selectStyle = {
      zIndex: 100,
    };

    return (
      <div>
        <div className="row">
          <div className="column">
            <div className="row">
              <div className="column" data-basis="66">
                <div className="m-text">
                  {window.lang.NUM_GROUPS}:
                </div>
              </div>
              <div className="column c-25" data-basis="33">
                <input
                  className="m-input rtl"
                  defaultValue={this.state.groupCount}
                  onChange={this.handleCountChange}
                />
              </div>
            </div>
          </div>
          <div className="column c-40">
            <div className="row">
              <div className="column">
                <div className="m-text">
                  {window.lang.CLASS}:
                </div>
              </div>
              <div className="column" style={selectStyle}>
                <Select
                  rtl
                  value={this.state.configKey}
                  onChange={this.handleConfigChange}
                  options={configOptions}
                />
              </div>
            </div>
            <div className="row">
              <div className="column">
                <CodeMirror
                  // eslint-disable-next-line no-return-assign
                  ref={component => this.cmComponent = component}
                  className="people-names"
                  value={this.state.peopleList}
                  onChange={this.handlePeopleListChange}
                  options={{ lineNumbers: true }}
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
              className="m-button-create"
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
