# async_runtime.rb

**Path**: `lib/discord_rda/core/async_runtime.rb`

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/core/async_runtime.rb:6`*

#### Methods

**public** `instance.stop()` - instance method

Stop all running tasks
@return [void]

*Defined at: `lib/discord_rda/core/async_runtime.rb:48`*

**public** `instance.after(delay, &block)` - instance method

Create a timer that fires after a delay
@param delay [Float] Delay in seconds
@yield The block to execute after the delay
@return [Timers::Timer] The timer object

*Defined at: `lib/discord_rda/core/async_runtime.rb:57`*

#### Classes

- `AsyncRuntime`

---

## Methods

### every

**public** `instance.every(interval, &block)` - instance method

Create a periodic timer
@param interval [Float] Interval in seconds
@yield The block to execute periodically
@return [void]

*Defined at: `lib/discord_rda/core/async_runtime.rb:68`*

---

### every

**public** `instance.every(interval, &block)` - instance method

*Defined at: `lib/discord_rda/core/async_runtime.rb:68`*

---

### run

**public** `instance.run(&block)` - instance method

Run a block within the async runtime
@yield The block to run
@return [void]

*Defined at: `lib/discord_rda/core/async_runtime.rb:81`*

---

### run

**public** `instance.run(&block)` - instance method

*Defined at: `lib/discord_rda/core/async_runtime.rb:81`*

---

### await_all

**public** `instance.await_all(*tasks)` - instance method

Run multiple tasks concurrently and wait for all
@param tasks [Array<Proc>] Tasks to run
@return [Array] Results from all tasks

*Defined at: `lib/discord_rda/core/async_runtime.rb:88`*

---

### await_all

**public** `instance.await_all(*tasks)` - instance method

*Defined at: `lib/discord_rda/core/async_runtime.rb:88`*

---

### await_any

**public** `instance.await_any(*tasks)` - instance method

Run tasks concurrently and return first result
@param tasks [Array<Proc>] Tasks to run
@return [Object] First completed result

*Defined at: `lib/discord_rda/core/async_runtime.rb:99`*

---

### await_any

**public** `instance.await_any(*tasks)` - instance method

*Defined at: `lib/discord_rda/core/async_runtime.rb:99`*

---

