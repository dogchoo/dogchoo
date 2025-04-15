export type RequestOptions = {
  readonly method: "GET" | "PUT" | "POST" | "DELETE" | "OPTIONS" | "HEAD" | "PATCH";
  readonly url: string;
  readonly path?: Record<string, unknown>;
  readonly cookies?: Record<string, unknown>;
  readonly headers?: Record<string, unknown>;
  readonly query?: Record<string, unknown>;
  readonly formData?: Record<string, unknown>;
  readonly body?: any;
  readonly mediaType?: string;
  readonly responseHeader?: string;
  readonly errors?: Record<number | string, string>;
};

export const request = async <TData = any>(options: RequestOptions): Promise<TData> => {
  const { method, url, headers = {}, query, body, mediaType = "application/json", errors = {} } = options;

  let fullUrl = url;

  if (query && Object.keys(query).length > 0) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    }
    fullUrl += `?${searchParams.toString()}`;
  }

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": mediaType,
      ...headers,
    },
  };

  if (body && method !== "GET") {
    fetchOptions.body = mediaType === "application/json" ? JSON.stringify(body) : body;
  }

  try {
    const res = await fetch(fullUrl, fetchOptions);

    if (!res.ok) {
      const message = errors[res.status] || `Request failed with status ${res.status}`;
      throw new Error(message);
    }

    const contentType = res.headers.get("Content-Type") || "";
    if (contentType.includes("application/json")) {
      return await res.json();
    } else {
      return (await res.text()) as unknown as TData;
    }
  } catch (err) {
    throw err;
  }
};
