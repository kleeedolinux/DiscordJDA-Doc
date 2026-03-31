# color.rb

**Path**: `lib/discord_rda/entity/color.rb`

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/entity/color.rb:3`*

#### Methods

**public** `instance.hue_to_rgb(p, q, t)` - instance method

*Defined at: `lib/discord_rda/entity/color.rb:104`*

#### Classes

- `Color`

---

## Methods

### initialize

**public** `instance.initialize(value = 0)` - instance method

Initialize with a color value
@param value [Integer] Color value (0-0xFFFFFF)

*Defined at: `lib/discord_rda/entity/color.rb:116`*

---

### initialize

**public** `instance.initialize(value = 0)` - instance method

*Defined at: `lib/discord_rda/entity/color.rb:116`*

---

### r

**public** `instance.r()` - instance method

Get red component
@return [Integer] Red (0-255)

*Defined at: `lib/discord_rda/entity/color.rb:122`*

---

### r

**public** `instance.r()` - instance method

*Defined at: `lib/discord_rda/entity/color.rb:122`*

---

### g

**public** `instance.g()` - instance method

Get green component
@return [Integer] Green (0-255)

*Defined at: `lib/discord_rda/entity/color.rb:129`*

---

### g

**public** `instance.g()` - instance method

*Defined at: `lib/discord_rda/entity/color.rb:129`*

---

### b

**public** `instance.b()` - instance method

Get blue component
@return [Integer] Blue (0-255)

*Defined at: `lib/discord_rda/entity/color.rb:136`*

---

### b

**public** `instance.b()` - instance method

*Defined at: `lib/discord_rda/entity/color.rb:136`*

---

### rgb

**public** `instance.rgb()` - instance method

Get RGB array
@return [Array<Integer>] RGB values

*Defined at: `lib/discord_rda/entity/color.rb:143`*

---

### rgb

**public** `instance.rgb()` - instance method

*Defined at: `lib/discord_rda/entity/color.rb:143`*

---

### to_hex

**public** `instance.to_hex(prefix, true)` - instance method

Get hex string
@param prefix [Boolean] Include # prefix
@return [String] Hex string

*Defined at: `lib/discord_rda/entity/color.rb:150`*

---

### to_hex

**public** `instance.to_hex(prefix, true)` - instance method

*Defined at: `lib/discord_rda/entity/color.rb:150`*

---

### to_rgb_string

**public** `instance.to_rgb_string()` - instance method

Convert to RGB tuple string
@return [String] RGB string

*Defined at: `lib/discord_rda/entity/color.rb:157`*

---

### to_rgb_string

**public** `instance.to_rgb_string()` - instance method

*Defined at: `lib/discord_rda/entity/color.rb:157`*

---

### to_i

**public** `instance.to_i()` - instance method

Get integer value
@return [Integer] Color value

*Defined at: `lib/discord_rda/entity/color.rb:163`*

---

### to_i

**public** `instance.to_i()` - instance method

*Defined at: `lib/discord_rda/entity/color.rb:163`*

---

### to_s

**public** `instance.to_s()` - instance method

Convert to decimal color string (for Discord)
@return [String] Decimal string

*Defined at: `lib/discord_rda/entity/color.rb:169`*

---

### to_s

**public** `instance.to_s()` - instance method

*Defined at: `lib/discord_rda/entity/color.rb:169`*

---

### valid?

**public** `instance.valid?()` - instance method

Check if color is valid (non-zero)
@return [Boolean] True if has color

*Defined at: `lib/discord_rda/entity/color.rb:175`*

---

### valid?

**public** `instance.valid?()` - instance method

*Defined at: `lib/discord_rda/entity/color.rb:175`*

---

### default?

**public** `instance.default?()` - instance method

Check if color is the default (0)
@return [Boolean] True if default

*Defined at: `lib/discord_rda/entity/color.rb:181`*

---

### default?

**public** `instance.default?()` - instance method

*Defined at: `lib/discord_rda/entity/color.rb:181`*

---

### brightness

**public** `instance.brightness()` - instance method

Get brightness (0-255)
@return [Integer] Brightness

*Defined at: `lib/discord_rda/entity/color.rb:187`*

---

### brightness

**public** `instance.brightness()` - instance method

*Defined at: `lib/discord_rda/entity/color.rb:187`*

---

### light?

**public** `instance.light?()` - instance method

Check if color is light (brightness > 128)
@return [Boolean] True if light

*Defined at: `lib/discord_rda/entity/color.rb:193`*

---

### light?

**public** `instance.light?()` - instance method

*Defined at: `lib/discord_rda/entity/color.rb:193`*

---

### dark?

**public** `instance.dark?()` - instance method

Check if color is dark (brightness <= 128)
@return [Boolean] True if dark

*Defined at: `lib/discord_rda/entity/color.rb:199`*

---

### dark?

**public** `instance.dark?()` - instance method

*Defined at: `lib/discord_rda/entity/color.rb:199`*

---

### blend

**public** `instance.blend(other, ratio = 0.5)` - instance method

Blend with another color
@param other [Color] Other color
@param ratio [Float] Blend ratio (0-1)
@return [Color] Blended color

*Defined at: `lib/discord_rda/entity/color.rb:207`*

---

### blend

**public** `instance.blend(other, ratio = 0.5)` - instance method

*Defined at: `lib/discord_rda/entity/color.rb:207`*

---

### darken

**public** `instance.darken(amount = 0.2)` - instance method

Darken the color
@param amount [Float] Amount to darken (0-1)
@return [Color] Darkened color

*Defined at: `lib/discord_rda/entity/color.rb:217`*

---

### darken

**public** `instance.darken(amount = 0.2)` - instance method

*Defined at: `lib/discord_rda/entity/color.rb:217`*

---

### lighten

**public** `instance.lighten(amount = 0.2)` - instance method

Lighten the color
@param amount [Float] Amount to lighten (0-1)
@return [Color] Lightened color

*Defined at: `lib/discord_rda/entity/color.rb:224`*

---

### lighten

**public** `instance.lighten(amount = 0.2)` - instance method

*Defined at: `lib/discord_rda/entity/color.rb:224`*

---

### complementary

**public** `instance.complementary()` - instance method

Get complementary color
@return [Color] Complementary color

*Defined at: `lib/discord_rda/entity/color.rb:230`*

---

### complementary

**public** `instance.complementary()` - instance method

*Defined at: `lib/discord_rda/entity/color.rb:230`*

---

### hash

**public** `instance.hash()` - instance method

Hash code
@return [Integer] Hash code

*Defined at: `lib/discord_rda/entity/color.rb:243`*

---

### hash

**public** `instance.hash()` - instance method

*Defined at: `lib/discord_rda/entity/color.rb:243`*

---

### inspect

**public** `instance.inspect()` - instance method

Inspect
@return [String] Inspect string

*Defined at: `lib/discord_rda/entity/color.rb:249`*

---

### inspect

**public** `instance.inspect()` - instance method

*Defined at: `lib/discord_rda/entity/color.rb:249`*

---

