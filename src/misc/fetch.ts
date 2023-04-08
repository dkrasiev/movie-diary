export default {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(import.meta.env.APP_URL + url, {
      method: "GET",
    });
    const data: T = await response.json();
    return data;
  },
};
