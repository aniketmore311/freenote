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
  if (resp.ok) {
    const respJson = await resp.json();
    return respJson;
  } else {
    try {
      const respJson = await resp.json();
      const message = respJson.errors[0].message;
      const err = new Error(message);
      return Promise.reject(err);
    } catch (err) {
      console.log(err);
      return Promise.reject(new Error('an error occured'));
    }
  }
}