# @aligheisar/http-utils

A small collection of HTTP-related utilities for modern JavaScript and
TypeScript applications.

This package focuses on improving error handling and developer
ergonomics when working with the Fetch API and HTTP responses.

## Installation

``` bash
npm install @aligheisar/http-utils
```

or

``` bash
pnpm add @aligheisar/http-utils
```

or

``` bash
yarn add @aligheisar/http-utils
```

## HttpError

`HttpError` is a custom error class designed for HTTP requests. It wraps
a `Response` object and exposes useful metadata such as status code,
status text, response body, and request URL.

### Why use HttpError?

The native `fetch` API does **not** throw errors for non-2xx responses.
`HttpError` gives you a structured, typed way to represent HTTP failures
and handle them consistently across your app.

### API

``` ts
class HttpError extends Error {
  status: number;
  statusText: string;
  body: unknown;
  url: string;

  constructor(res: Response, body: unknown);
}
```

### Properties

-   **status** -- HTTP status code (e.g. `404`, `500`)
-   **statusText** -- HTTP status text (e.g. `"Not Found"`)
-   **body** -- Parsed response body (JSON, text, etc.)
-   **url** -- Request URL
-   **message** -- Automatically set to `HTTP <status> <statusText>`

### Example usage

``` ts
import { HttpError } from "@aligheisar/http-utils";

async function fetchUser(id: string) {
  const res = await fetch(`/api/users/${id}`);
  const body = await res.json();

  if (!res.ok) {
    throw new HttpError(res, body);
  }

  return body;
}
```

### Handling the error

``` ts
try {
  const user = await fetchUser("123");
} catch (err) {
  if (err instanceof HttpError) {
    console.error(err.status);
    console.error(err.statusText);
    console.error(err.body);
    console.error(err.url);
  } else {
    throw err;
  }
}
```

## TypeScript support

This package is written in TypeScript and ships with type definitions
out of the box.

## Scope and philosophy

`http-utils` is intentionally small and focused. Each utility solves a
specific HTTP-related problem without adding abstractions or
dependencies you don't need.