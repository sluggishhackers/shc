async function read<T>(tableName: string) {
  const apiKey = Deno.env.get("SUPABASE_SERVICE_KEY")?.trim() || "";
  const result = await fetch(
    `${Deno.env.get("SUPABASE_API_HOST")}/rest/v1/${tableName}?select=*`,
    {
      method: "GET",
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  if (result.error) {
    throw result.error;
  }

  if (result) {
    return result as T[];
  }

  return null;
}

async function readById<T>(tableName: string, id: string) {
  const apiKey = Deno.env.get("SUPABASE_SERVICE_KEY")?.trim() || "";
  const result = await fetch(
    `${Deno.env.get(
      "SUPABASE_API_HOST"
    )}/rest/v1/${tableName}?id=eq.${id}&select=*`,
    {
      method: "GET",
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Range: "0-1",
      },
    }
  ).then((res) => res.json());

  if (result.error) {
    throw result.error;
  }

  if (result && result[0]) {
    return result[0] as T;
  }

  return null;
}

function insertMany<T>(tableName: string, body: T[]) {
  const apiKey = Deno.env.get("SUPABASE_SERVICE_KEY")?.trim() || "";
  return fetch(`${Deno.env.get("SUPABASE_API_HOST")}/rest/v1/${tableName}`, {
    method: "POST",
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

function updateById<T>(tableName: string, id: string, body: T[]) {
  const apiKey = Deno.env.get("SUPABASE_SERVICE_KEY")?.trim() || "";
  return fetch(
    `${Deno.env.get("SUPABASE_API_HOST")}/rest/v1/${tableName}?id=eq.${id}`,
    {
      method: "PATCH",
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(body),
    }
  );
}

export default {
  read,
  readById,
  insertMany,
  updateById,
};
