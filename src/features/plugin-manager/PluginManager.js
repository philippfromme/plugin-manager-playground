export default class PluginManager {
  constructor() {
    this._plugins = {};

    this._activePlugin = null;
  }

  activatePlugin(id, exclusive = true) {
    if (!this._plugins[ id ]) {
      throw new Error('plugin not registered');
    }

    Object.entries(this._plugins).forEach(([ _id, plugin ]) => {
      if (_id === id) {
        plugin.activate();
      } else if (exclusive) {
        plugin.deactivate();
      }
    });

    this._activePlugin = id;
  }

  deactivatePlugin(id) {
    if (!this._plugins[ id ]) {
      throw new Error('plugin not registered');
    }

    if (this._activePlugin === id) {
      this._plugins[ id ].deactivate();

      this._activePlugin = null;
    }
  }

  getActivePlugin() {
    return this._activePlugin;
  }

  registerPlugin(id, plugin) {
    if (this._plugins[ id ]) {
      throw new Error('plugin already registered');
    }

    if (!plugin.activate || !plugin.deactivate) {
      throw new Error('plugins must implement activate and deactivate');
    }

    this._plugins[ id ] = plugin;
  }
}