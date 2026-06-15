const getDetailUrl = (apiUrl, id) => {
  if (apiUrl.endsWith('/')) {
    return `${apiUrl}${id}/`;
  }
  return `${apiUrl}/${id}`;
};

export const fetchBooks = async ({ apiUrl, authToken, page, pageSize, title, author }) => {
  const params = new URLSearchParams();
  params.append('page', page);
  params.append('page_size', pageSize);
  if (title && title.trim()) params.append('title', title.trim());
  if (author && author.trim()) params.append('author', author.trim());

  const headers = {};
  if (authToken && authToken.trim()) {
    headers['Authorization'] = `Bearer ${authToken.trim()}`;
  }

  const response = await fetch(`${apiUrl}?${params.toString()}`, {
    method: 'GET',
    headers: headers
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized: Yêu cầu JWT Token. Vui lòng bật JWT cấu hình hoặc cấu hình AllowAny ở backend.');
    }
    throw new Error(`Lỗi kết nối API: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const createBook = async ({ apiUrl, authToken, title, author, price, quantity }) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  if (authToken && authToken.trim()) {
    headers['Authorization'] = `Bearer ${authToken.trim()}`;
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ title, author, price, quantity })
  });

  if (!response.ok) {
    let errData;
    try {
      errData = await response.json();
    } catch (e) {
      errData = {};
    }
    throw {
      status: response.status,
      data: errData,
      message: 'Thêm sách thất bại. Vui lòng kiểm tra các lỗi ở form.'
    };
  }

  return response.json();
};

export const fetchBookDetail = async ({ apiUrl, authToken, id }) => {
  const headers = {};
  if (authToken && authToken.trim()) {
    headers['Authorization'] = `Bearer ${authToken.trim()}`;
  }

  const response = await fetch(getDetailUrl(apiUrl, id), {
    headers: headers
  });

  if (!response.ok) {
    throw new Error(`Không thể lấy chi tiết sách. Mã lỗi: ${response.status}`);
  }

  return response.json();
};

export const updateBook = async ({ apiUrl, authToken, id, title, author, price, quantity }) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  if (authToken && authToken.trim()) {
    headers['Authorization'] = `Bearer ${authToken.trim()}`;
  }

  const response = await fetch(getDetailUrl(apiUrl, id), {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({ title, author, price, quantity })
  });

  if (!response.ok) {
    let errData;
    try {
      errData = await response.json();
    } catch (e) {
      errData = {};
    }
    throw {
      status: response.status,
      data: errData,
      message: 'Cập nhật sách thất bại. Vui lòng kiểm tra các lỗi ở form.'
    };
  }

  return response.json();
};

export const deleteBook = async ({ apiUrl, authToken, id }) => {
  const headers = {};
  if (authToken && authToken.trim()) {
    headers['Authorization'] = `Bearer ${authToken.trim()}`;
  }

  const response = await fetch(getDetailUrl(apiUrl, id), {
    method: 'DELETE',
    headers: headers
  });

  if (!response.ok) {
    throw new Error(`Xóa sách thất bại. Mã lỗi: ${response.status}`);
  }
};

export const login = async ({ apiUrl, username, password }) => {
  let loginUrl = 'http://localhost:8000/token';
  try {
    if (apiUrl.includes('/api/')) {
      const idx = apiUrl.indexOf('/api/');
      loginUrl = apiUrl.substring(0, idx) + '/token';
    } else {
      const urlObj = new URL(apiUrl);
      loginUrl = `${urlObj.origin}/token`;
    }
  } catch (e) {
    // ignore
  }

  const response = await fetch(loginUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 400) {
      throw new Error('Sai tài khoản hoặc mật khẩu.');
    }
    throw new Error(`Lỗi đăng nhập: ${response.status}`);
  }
  return response.json();
};

export const register = async ({ apiUrl, username, email, password }) => {
  let registerUrl = 'http://localhost:8000/api/register';
  try {
    if (apiUrl.includes('/api/')) {
      const idx = apiUrl.lastIndexOf('/');
      registerUrl = apiUrl.substring(0, idx) + '/register';
    } else {
      const urlObj = new URL(apiUrl);
      registerUrl = `${urlObj.origin}/api/register`;
    }
  } catch (e) {
    // ignore
  }

  const response = await fetch(registerUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  if (!response.ok) {
    let errorMsg = 'Đăng ký thất bại.';
    try {
      const data = await response.json();
      if (data.username) {
        errorMsg = `Tên tài khoản: ${data.username[0]}`;
      } else if (data.email) {
        errorMsg = `Email: ${data.email[0]}`;
      } else if (data.password) {
        errorMsg = `Mật khẩu: ${data.password[0]}`;
      }
    } catch (e) {
      // ignore
    }
    throw new Error(errorMsg);
  }
  return response.json();
};
