const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

export async function exportDbtoPublic() {
  const res = await fetch(`${apiDomain}/export-db`);

  const text = await res.text();

  if (res.ok) {
    return text;
  } else {
    throw new Error(text);
  }
}
