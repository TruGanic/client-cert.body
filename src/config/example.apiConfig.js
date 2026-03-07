import { signedRequest } from "../auth/signedClient";

const AGENT_PATH_PREFIX = "/api/agents";

// Build full gateway path so screens keep using relative paths (e.g. /dashboard-stats, /login)
function buildAgentPath(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p.startsWith(AGENT_PATH_PREFIX)) return p;
  return `${AGENT_PATH_PREFIX}${p}`;
}

// All calls go through signedRequest (DID + signature, via Gateway). No Authorization header.
export async function apiRequest(method, path, body) {
  const fullPath = buildAgentPath(path);
  const { status, data } = await signedRequest(method, fullPath, body, undefined);
  return { status, data };
}

function toAxiosResponse(status, data) {
  return {
    data,
    status,
    statusText: status === 200 ? "OK" : status === 201 ? "Created" : "",
  };
}

export const apiClient = {
  get: (path) =>
    apiRequest("GET", path, undefined).then(({ status, data }) =>
      toAxiosResponse(status, data)
    ),
  post: (path, body) =>
    apiRequest("POST", path, body).then(({ status, data }) =>
      toAxiosResponse(status, data)
    ),
  put: (path, body) =>
    apiRequest("PUT", path, body).then(({ status, data }) =>
      toAxiosResponse(status, data)
    ),
  patch: (path, body) =>
    apiRequest("PATCH", path, body).then(({ status, data }) =>
      toAxiosResponse(status, data)
    ),
  delete: (path) =>
    apiRequest("DELETE", path, undefined).then(({ status, data }) =>
      toAxiosResponse(status, data)
    ),
};
