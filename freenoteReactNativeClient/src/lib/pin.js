export const pin = {

  /**
   * @param {string} url
   * @param {{headers: Object<string,string>}} opts
   */
  async get(url, opts) {
    const resp = await fetch(url, {
      method: "GET",
      headers: opts.headers,
    })
    return _handleResponse(resp);
  },

  /**
   * @param {string} url
   * @param {Object<string,any>} body
   * @param {{headers: Object<string,string>}} opts
   */
  async post(url, body, opts) {
    const resp = await fetch(url, {
      method: "POST",
      headers: { ...opts?.headers, 'Content-Type': "application/json" },
      body: JSON.stringify(body)
    })
    return _handleResponse(resp);
  },

  /**
   * @param {string} url
   * @param {Object<string,any>} body
   * @param {{headers: Object<string,string>}} opts
   */
  async put(url, body, opts) {
    const resp = await fetch(url, {
      method: "PUT",
      headers: { ...opts?.headers, 'Content-Type': "application/json" },
      body: JSON.stringify(body)
    })
    return _handleResponse(resp);
  },

  /**
   * @param {string} url
   * @param {Object<string,any>} body
   * @param {{headers: Object<string,string>}} opts
   */
  async patch(url, body, opts) {
    const resp = await fetch(url, {
      method: "PATCH",
      headers: { ...opts?.headers, 'Content-Type': "application/json" },
      body: JSON.stringify(body)
    })
    return _handleResponse(resp);
  },

  /**
   * @param {string} url
   * @param {{headers: Object<string,string>}} opts
   */
  async delete(url, opts) {
    const resp = await fetch(url, {
      method: "Delete",
      headers: opts.headers,
    })
    return _handleResponse(resp);
  }

}

async function _handleResponse(resp) {
  const respJson = await resp.json();
  if (!resp.ok) {
    const msg = respJson.errors[0].message;
    throw new Error(msg);
  }
  return respJson;
}