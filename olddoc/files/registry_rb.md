# registry.rb

**Path**: `lib/discord_rda/plugin/registry.rb`

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/plugin/registry.rb:3`*

#### Classes

- `PluginRegistry`

---

## Methods

### unregister

**public** `instance.unregister(name)` - instance method

Unregister a plugin
@param name [Symbol] Plugin name
@return [Boolean] True if unregistered

*Defined at: `lib/discord_rda/plugin/registry.rb:51`*

---

### unregister

**public** `instance.unregister(name)` - instance method

*Defined at: `lib/discord_rda/plugin/registry.rb:51`*

---

### get

**public** `instance.get(name)` - instance method

Get a plugin by name
@param name [Symbol] Plugin name
@return [Plugin, nil] Plugin or nil

*Defined at: `lib/discord_rda/plugin/registry.rb:69`*

---

### get

**public** `instance.get(name)` - instance method

*Defined at: `lib/discord_rda/plugin/registry.rb:69`*

---

### registered?

**public** `instance.registered?(name)` - instance method

Check if plugin is registered
@param name [Symbol] Plugin name
@return [Boolean] True if registered

*Defined at: `lib/discord_rda/plugin/registry.rb:76`*

---

### registered?

**public** `instance.registered?(name)` - instance method

*Defined at: `lib/discord_rda/plugin/registry.rb:76`*

---

### names

**public** `instance.names()` - instance method

Get all registered plugin names
@return [Array<Symbol>] Plugin names

*Defined at: `lib/discord_rda/plugin/registry.rb:82`*

---

### names

**public** `instance.names()` - instance method

*Defined at: `lib/discord_rda/plugin/registry.rb:82`*

---

### all

**public** `instance.all()` - instance method

Get all plugins
@return [Array<Plugin>] Plugins

*Defined at: `lib/discord_rda/plugin/registry.rb:88`*

---

### all

**public** `instance.all()` - instance method

*Defined at: `lib/discord_rda/plugin/registry.rb:88`*

---

### enabled

**public** `instance.enabled()` - instance method

Get enabled plugins
@return [Array<Plugin>] Enabled plugins

*Defined at: `lib/discord_rda/plugin/registry.rb:94`*

---

### enabled

**public** `instance.enabled()` - instance method

*Defined at: `lib/discord_rda/plugin/registry.rb:94`*

---

### clear

**public** `instance.clear()` - instance method

Clear all plugins
@return [void]

*Defined at: `lib/discord_rda/plugin/registry.rb:100`*

---

### clear

**public** `instance.clear()` - instance method

*Defined at: `lib/discord_rda/plugin/registry.rb:100`*

---

### count

**public** `instance.count()` - instance method

Get plugin count
@return [Integer] Number of plugins

*Defined at: `lib/discord_rda/plugin/registry.rb:112`*

---

### count

**public** `instance.count()` - instance method

*Defined at: `lib/discord_rda/plugin/registry.rb:112`*

---

### stats

**public** `instance.stats()` - instance method

Get registry statistics
@return [Hash] Statistics

*Defined at: `lib/discord_rda/plugin/registry.rb:118`*

---

### stats

**public** `instance.stats()` - instance method

*Defined at: `lib/discord_rda/plugin/registry.rb:118`*

---

