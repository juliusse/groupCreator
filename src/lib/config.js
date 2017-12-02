export default class ConfigurationManager {
  constructor(window) {
    this.window = window;
  }

  getAvailableConfigurations() {
    return Object.keys(this.window.configs);
  }

  has(configKey) {
    return this.window.configs[configKey] != null;
  }

  get(configKey) {
    return this.window.configs[configKey];
  }

  static getInstance() {
    if (this.instance == null) {
      this.instance = new ConfigurationManager(window);
    }

    return this.instance;
  }
}
