# member.rb

**Path**: `lib/discord_rda/entity/member.rb`

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/entity/member.rb:3`*

#### Methods

**public** `instance.deaf?()` - instance method

Check if member is server deafened
@return [Boolean] True if deafened

*Defined at: `lib/discord_rda/entity/member.rb:108`*

**public** `instance.mute?()` - instance method

Check if member is server muted
@return [Boolean] True if muted

*Defined at: `lib/discord_rda/entity/member.rb:114`*

**public** `instance.pending?()` - instance method

Check if member has pending membership screening
@return [Boolean] True if pending

*Defined at: `lib/discord_rda/entity/member.rb:120`*

**public** `instance.timed_out?()` - instance method

Check if member is currently timed out
@return [Boolean] True if timed out

*Defined at: `lib/discord_rda/entity/member.rb:126`*

**public** `instance.boosting?()` - instance method

Check if member is boosting
@return [Boolean] True if boosting

*Defined at: `lib/discord_rda/entity/member.rb:134`*

**public** `instance.boost_since()` - instance method

Get boost start time
@return [Time, nil] When boosting started

*Defined at: `lib/discord_rda/entity/member.rb:140`*

**public** `instance.duration_in_guild()` - instance method

Get how long member has been in the guild
@return [Float] Duration in seconds

*Defined at: `lib/discord_rda/entity/member.rb:146`*

**public** `instance.boost_duration()` - instance method

Get how long member has been boosting
@return [Float, nil] Duration in seconds or nil if not boosting

*Defined at: `lib/discord_rda/entity/member.rb:154`*

**public** `instance.guild_id()` - instance method

Get guild ID
@return [Snowflake, nil] Guild ID

*Defined at: `lib/discord_rda/entity/member.rb:162`*

**public** `instance.permission_set()` - instance method

Get permission set for this member
@return [Permission, nil] Permissions

*Defined at: `lib/discord_rda/entity/member.rb:168`*

**public** `instance.has_role?(role_id)` - instance method

Check if member has a specific role
@param role_id [String, Snowflake] Role ID to check
@return [Boolean] True if has role

*Defined at: `lib/discord_rda/entity/member.rb:177`*

**public** `instance.highest_role_position(guild_roles)` - instance method

Get the highest role position
@param guild_roles [Array<Role>] All guild roles
@return [Integer] Highest position

*Defined at: `lib/discord_rda/entity/member.rb:185`*

**public** `instance.can_act_on?(target, guild_roles)` - instance method

Check if member can perform action on target
Compares roles and permissions
@param target [Member] Target member
@param guild_roles [Array<Role>] Guild roles for comparison
@return [Boolean] True if this member outranks target

*Defined at: `lib/discord_rda/entity/member.rb:195`*

**public** `instance.created_at()` - instance method

Get creation time (from user)
@return [Time, nil] Account creation time

*Defined at: `lib/discord_rda/entity/member.rb:204`*

**public** `instance.method_missing(method, *args, &block)` - instance method

Delegate methods to user

*Defined at: `lib/discord_rda/entity/member.rb:209`*

#### Classes

- `Member`

---

## Methods

### respond_to_missing?

**private** `instance.respond_to_missing?(method, include_private = false)` - instance method

*Defined at: `lib/discord_rda/entity/member.rb:217`*

---

### owner?

**public** `instance.owner?(guild_owner_id)` - instance method

Check if this member is the guild owner
@param guild_owner_id [Snowflake] Guild owner ID
@return [Boolean] True if owner

*Defined at: `lib/discord_rda/entity/member.rb:224`*

---

### owner?

**public** `instance.owner?(guild_owner_id)` - instance method

*Defined at: `lib/discord_rda/entity/member.rb:224`*

---

### member_flags

**public** `instance.member_flags()` - instance method

Get member flags
@return [MemberFlags] Member flags

*Defined at: `lib/discord_rda/entity/member.rb:230`*

---

### member_flags

**public** `instance.member_flags()` - instance method

*Defined at: `lib/discord_rda/entity/member.rb:230`*

---

### completed_onboarding?

**public** `instance.completed_onboarding?()` - instance method

Check if member has completed onboarding
@return [Boolean] True if completed

*Defined at: `lib/discord_rda/entity/member.rb:236`*

---

### completed_onboarding?

**public** `instance.completed_onboarding?()` - instance method

*Defined at: `lib/discord_rda/entity/member.rb:236`*

---

### bypasses_verification?

**public** `instance.bypasses_verification?()` - instance method

Check if member has bypassed verification
@return [Boolean] True if bypassed

*Defined at: `lib/discord_rda/entity/member.rb:242`*

---

### bypasses_verification?

**public** `instance.bypasses_verification?()` - instance method

*Defined at: `lib/discord_rda/entity/member.rb:242`*

---

### started_onboarding?

**public** `instance.started_onboarding?()` - instance method

Check if member started onboarding
@return [Boolean] True if started

*Defined at: `lib/discord_rda/entity/member.rb:248`*

---

### started_onboarding?

**public** `instance.started_onboarding?()` - instance method

*Defined at: `lib/discord_rda/entity/member.rb:248`*

---

### display_color

**public** `instance.display_color(guild_roles)` - instance method

Get member's display color from highest colored role
@param guild_roles [Array<Role>] All guild roles
@return [Color] Display color

*Defined at: `lib/discord_rda/entity/member.rb:255`*

---

### display_color

**public** `instance.display_color(guild_roles)` - instance method

*Defined at: `lib/discord_rda/entity/member.rb:255`*

---

