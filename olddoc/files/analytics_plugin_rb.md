# analytics_plugin.rb

**Path**: `lib/discord_rda/plugin/analytics_plugin.rb`

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:3`*

#### Methods

**public** `instance.get_metric(category, metric, window)` - instance method

Get metric value (sum in time window)
@param category [Symbol] Metric category
@param metric [Symbol] Metric name
@param window [Integer] Time window in seconds
@return [Numeric] Sum of metric values

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:87`*

#### Classes

- `AnalyticsPlugin`

---

## Methods

### get_average

**public** `instance.get_average(category, metric, window)` - instance method

Get average metric value
@param category [Symbol] Metric category
@param metric [Symbol] Metric name
@param window [Integer] Time window in seconds
@return [Float] Average value

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:102`*

---

### get_average

**public** `instance.get_average(category, metric, window)` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:102`*

---

### summary

**public** `instance.summary()` - instance method

Get all metrics summary
@return [Hash] Metrics summary

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:117`*

---

### summary

**public** `instance.summary()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:117`*

---

### pretty_report

**public** `instance.pretty_report()` - instance method

Generate pretty formatted report
@return [String] Formatted report

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:131`*

---

### pretty_report

**public** `instance.pretty_report()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:131`*

---

### to_json

**public** `instance.to_json()` - instance method

Export metrics to JSON
@return [String] JSON string

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:163`*

---

### to_json

**public** `instance.to_json()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:163`*

---

### dashboard_data

**public** `instance.dashboard_data()` - instance method

Get real-time dashboard data
@return [Hash] Dashboard data

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:169`*

---

### dashboard_data

**public** `instance.dashboard_data()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:169`*

---

### run_health_checks

**public** `instance.run_health_checks()` - instance method

Run comprehensive health checks
@return [Hash] Health check results

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:187`*

---

### run_health_checks

**public** `instance.run_health_checks()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:187`*

---

### check_gateway_health

**public** `instance.check_gateway_health()` - instance method

Check gateway health
@return [Hash] Gateway health status

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:214`*

---

### check_gateway_health

**public** `instance.check_gateway_health()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:214`*

---

### check_rest_health

**public** `instance.check_rest_health()` - instance method

Check REST API health
@return [Hash] REST health status

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:238`*

---

### check_rest_health

**public** `instance.check_rest_health()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:238`*

---

### check_cache_health

**public** `instance.check_cache_health()` - instance method

Check cache health
@return [Hash] Cache health status

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:263`*

---

### check_cache_health

**public** `instance.check_cache_health()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:263`*

---

### check_rate_limiter_health

**public** `instance.check_rate_limiter_health()` - instance method

Check rate limiter health
@return [Hash] Rate limiter health status

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:285`*

---

### check_rate_limiter_health

**public** `instance.check_rate_limiter_health()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:285`*

---

### system_metrics

**public** `instance.system_metrics()` - instance method

Get system metrics
@return [Hash] System metrics

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:305`*

---

### system_metrics

**public** `instance.system_metrics()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:305`*

---

### memory_usage

**public** `instance.memory_usage()` - instance method

Get memory usage
@return [Hash] Memory usage info

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:316`*

---

### memory_usage

**public** `instance.memory_usage()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:316`*

---

### cpu_usage

**public** `instance.cpu_usage()` - instance method

Get CPU usage (simplified)
@return [Hash] CPU usage info

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:328`*

---

### cpu_usage

**public** `instance.cpu_usage()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:328`*

---

### health_report

**public** `instance.health_report()` - instance method

Generate health check report
@return [String] Formatted health report

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:335`*

---

### health_report

**public** `instance.health_report()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:335`*

---

### emoji_for_status

**public** `instance.emoji_for_status(status)` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:364`*

---

### initialize_metrics

**public** `instance.initialize_metrics()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:374`*

---

### setup_event_tracking

**public** `instance.setup_event_tracking(bot)` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:382`*

---

### setup_rest_tracking

**public** `instance.setup_rest_tracking(bot)` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:388`*

---

### setup_cache_tracking

**public** `instance.setup_cache_tracking(bot)` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:395`*

---

### start_metrics_collection

**public** `instance.start_metrics_collection()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:402`*

---

### collect_periodic_metrics

**public** `instance.collect_periodic_metrics()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:412`*

---

### clean_old_data

**public** `instance.clean_old_data(key)` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:428`*

---

### valid_metric?

**public** `instance.valid_metric?(category, metric)` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:433`*

---

### uptime_seconds

**public** `instance.uptime_seconds()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:437`*

---

### gateway_metrics

**public** `instance.gateway_metrics()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:441`*

---

### rest_metrics

**public** `instance.rest_metrics()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:448`*

---

### cache_metrics

**public** `instance.cache_metrics()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:456`*

---

### shard_metrics

**public** `instance.shard_metrics()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:467`*

---

### calculate_cache_hit_rate

**public** `instance.calculate_cache_hit_rate(window)` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:475`*

---

### health_status

**public** `instance.health_status()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:483`*

---

### detect_issues

**public** `instance.detect_issues()` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:495`*

---

### format_duration

**public** `instance.format_duration(seconds)` - instance method

*Defined at: `lib/discord_rda/plugin/analytics_plugin.rb:516`*

---

