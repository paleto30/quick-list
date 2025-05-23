import { useRouter } from "vue-router";
import { useAuthStore } from "../common/stores/authStore";
import { config } from "../config";

const authStore = useAuthStore();
const router = useRouter();

export const tryRefreshToken = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${config.apiBaseUrl}/user-login/refresh-tokens`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) return false;

    const json = await res.json().catch(() => null);

    if (!json || !json.data?.accessToken) return false;

    authStore.setAccessToken(json.data.accessToken);
    return true;
  } catch (err) {
    console.error("Error al refrescar token:", err);
    return false;
  }
};

export const apiFetch = async (
  url: string,
  options: RequestInit = {},
  auth: boolean = true,
  retry: boolean = true
): Promise<any> => {
  const rawHeaders = normalizeHeaders(options.headers);
  const headers: Record<string, string> = {
    ...rawHeaders,
  };

  if (auth) {
    headers["Authorization"] = `Bearer ${authStore.accessToken}`;
  }

  if (
    options.method !== "GET" &&
    !headers["Content-Type"] &&
    !(options.body instanceof FormData)
  ) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const res = await fetch(`${config.apiBaseUrl}${url}`, {
      ...options,
      credentials: "include",
      headers,
    });

    const json = await res.json().catch(() => null);

    // Si hay expiración de token y se puede intentar refrescar
    if (res.status === 401 && retry) {
      const refreshed = await tryRefreshToken();
      if (refreshed) {
        return apiFetch(url, options, true, false);
      } else {
        authStore.clearAccesstoken();
        router.push({ name: "login" });
        return {
          success: false,
          statusCode: 401,
          error: { message: "Sesión expirada" },
        };
      }
    }

    // Devuelve exactamente lo que responde tu backend
    return json;
  } catch (error) {
    console.error("Error de red o conexión:", error);
    return {
      success: false,
      statusCode: 0,
      error: { message: "Error de red o servidor no disponible" },
    };
  }
};

function normalizeHeaders(
  headers: HeadersInit | undefined
): Record<string, string> {
  if (!headers) return {};

  if (headers instanceof Headers) {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  if (Array.isArray(headers)) {
    return Object.fromEntries(headers);
  }

  return headers;
}
