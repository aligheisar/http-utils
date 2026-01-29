class HttpError extends Error {
  status: number;
  statusText: string;
  body: unknown;
  url: string;

  constructor(res: Response, body: unknown) {
    super(`HTTP ${res.status} ${res.statusText}`);
    this.name = "HttpError";

    this.status = res.status;
    this.statusText = res.statusText;
    this.body = body;
    this.url = res.url;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export { HttpError };
