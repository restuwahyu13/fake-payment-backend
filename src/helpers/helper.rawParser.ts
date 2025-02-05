export function rawParser<T = any>(body: any): T {
  if (
    Object.keys(body)
      .join("")
      .match(/\.*[({}:.\s)]|([]).*/g) !== null
  )
    return JSON.parse(Object.keys(body).join(""));
  else return body;
}
