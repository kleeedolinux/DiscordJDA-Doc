# rest_client.rb

**Path**: `lib/discord_rda/connection/rest_client.rb`

## Classes

### APIError

**Inherits from**: `StandardError`

REST API Errors

*Defined at: `lib/discord_rda/connection/rest_client.rb:290`*

#### Methods

**public** `instance.initialize(status, data)` - instance method

*Defined at: `lib/discord_rda/connection/rest_client.rb:293`*

---

### BadRequestError

**Inherits from**: `APIError`

*Defined at: `lib/discord_rda/connection/rest_client.rb:302`*

---

## Modules

### DiscordRDA

*Defined at: `lib/discord_rda/connection/rest_client.rb:8`*

#### Methods

**public** `instance.put(path, body, nil, params, headers, files, nil)` - instance method

Make a PUT request
@param path [String] API path
@param body [Object] Request body
@param params [Hash] Query parameters
@param headers [Hash] Additional headers
@param files [Hash] Files to upload (field_name => File or IO)
@return [Hash] Response data

*Defined at: `lib/discord_rda/connection/rest_client.rb:80`*

#### Classes

- `RestClient`

---

## Methods

### patch

**public** `instance.patch(path, body, nil, params, headers, files, nil)` - instance method

Make a PATCH request
@param path [String] API path
@param body [Object] Request body
@param params [Hash] Query parameters
@param headers [Hash] Additional headers
@param files [Hash] Files to upload (field_name => File or IO)
@return [Hash] Response data

*Defined at: `lib/discord_rda/connection/rest_client.rb:95`*

---

### patch

**public** `instance.patch(path, body, nil, params, headers, files, nil)` - instance method

*Defined at: `lib/discord_rda/connection/rest_client.rb:95`*

---

### delete

**public** `instance.delete(path, params, headers)` - instance method

Make a DELETE request
@param path [String] API path
@param params [Hash] Query parameters
@param headers [Hash] Additional headers
@return [Hash] Response data

*Defined at: `lib/discord_rda/connection/rest_client.rb:108`*

---

### delete

**public** `instance.delete(path, params, headers)` - instance method

*Defined at: `lib/discord_rda/connection/rest_client.rb:108`*

---

### request

**public** `instance.request(method, path, body, nil, params, headers)` - instance method

*Defined at: `lib/discord_rda/connection/rest_client.rb:114`*

---

### build_url

**public** `instance.build_url(path, params)` - instance method

*Defined at: `lib/discord_rda/connection/rest_client.rb:139`*

---

### build_headers

**public** `instance.build_headers(additional = {})` - instance method

*Defined at: `lib/discord_rda/connection/rest_client.rb:147`*

---

### extract_route

**public** `instance.extract_route(method, path)` - instance method

*Defined at: `lib/discord_rda/connection/rest_client.rb:156`*

---

### make_http_request

**public** `instance.make_http_request(method, url, body, headers)` - instance method

*Defined at: `lib/discord_rda/connection/rest_client.rb:163`*

---

### request_multipart

**public** `instance.request_multipart(method, path, body, nil, files, params, headers)` - instance method

*Defined at: `lib/discord_rda/connection/rest_client.rb:182`*

---

### build_multipart_field

**public** `instance.build_multipart_field(name, value, boundary)` - instance method

*Defined at: `lib/discord_rda/connection/rest_client.rb:234`*

---

### build_multipart_file

**public** `instance.build_multipart_file(field_name, file, boundary)` - instance method

*Defined at: `lib/discord_rda/connection/rest_client.rb:241`*

---

### make_multipart_http_request

**public** `instance.make_multipart_http_request(method, url, body, headers)` - instance method

*Defined at: `lib/discord_rda/connection/rest_client.rb:252`*

---

### handle_response

**public** `instance.handle_response(response)` - instance method

*Defined at: `lib/discord_rda/connection/rest_client.rb:265`*

---

