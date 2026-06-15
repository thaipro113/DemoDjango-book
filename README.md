# Book Management System (Hệ thống Quản lý Sách)

Dự án hoàn chỉnh bao gồm **Django REST Framework (Backend)** và **ReactJS Vite (Frontend)**, hỗ trợ đầy đủ các tính năng quản lý danh sách sách, phân trang, bộ lọc tìm kiếm, xác thực tài khoản qua JWT, và các thao tác CRUD (Thêm, Đọc, Sửa, Xóa).

---

## 1. Cấu trúc dự án
* `book_manage/` - Thư mục chứa mã nguồn Backend Django.
* `book-frontend/` - Thư mục chứa mã nguồn Frontend ReactJS (Vite).

---

## 2. Cấu hình & Khởi chạy Django Backend

### 2.1 Cài đặt môi trường ảo & Thư viện
Mở terminal tại thư mục gốc của project và chạy các lệnh sau:

1. Kích hoạt môi trường ảo:
   ```powershell
   venv\Scripts\Activate.ps1
   ```
2. Cài đặt các thư viện cần thiết:
   ```powershell
   pip install -r requirements.txt
   pip install django-cors-headers
   ```

### 2.2 Cấu hình Database PostgreSQL
Tạo file `.env` nằm ở thư mục gốc của project (nếu chưa có) với nội dung:
```env
DB_NAME=demojango
DB_USER=postgres
DB_PASSWORD=12345
DB_HOST=127.0.0.1
DB_PORT=5432
SECRET_KEY=replace-with-your-secret-key
DEBUG=True
```
*Lưu ý: Không commit file `.env` lên Git.*

### 2.3 Cấu hình CORS và JWT trong `settings.py`
Để Frontend React (cổng `5173`) gọi được API sang Backend (cổng `8000`), mở file `book_manage/settings.py` và cấu hình:
1. Thêm `'corsheaders'` vào danh sách `INSTALLED_APPS`.
2. Thêm `'corsheaders.middleware.CorsMiddleware'` vào dòng **đầu tiên** của `MIDDLEWARE`.
3. Thêm cấu hình cho phép các kết nối ở cuối file:
   ```python
   CORS_ALLOW_ALL_ORIGINS = True
   ```

### 2.4 Thực hiện Migrations & Chạy server
1. Chạy migrate dữ liệu:
   ```bash
   python manage.py migrate
   ```
2. Tạo tài khoản quản trị (để sử dụng đăng nhập JWT):
   ```bash
   python manage.py createsuperuser
   ```
3. Chạy server:
   ```bash
   python manage.py runserver 8000
   ```

---

## 3. Cấu hình & Khởi chạy React Frontend

### 3.1 Cài đặt dependencies
Mở một terminal mới tại thư mục `book-frontend/` và chạy lệnh:
```bash
cd book-frontend
npm install
```

### 3.2 Khởi chạy Frontend
Chạy lệnh sau để bật môi trường phát triển:
```bash
npm run dev
```
Trình duyệt sẽ tự động chạy ứng dụng tại địa chỉ: `http://localhost:5173`.

---

## 4. Các tính năng nổi bật trên Frontend ReactJS

1. **Đăng nhập bảo mật qua JWT**:
   * Tự động hiển thị màn hình Login khi chưa có Token xác thực.
   * Gửi thông tin đăng nhập đến endpoint `/token` của Backend, nhận JWT và lưu trữ trong `localStorage`.
   * Hỗ trợ nút **Đăng xuất** để xóa phiên làm việc.
2. **Quản lý danh sách sách (CRUD)**:
   * **Hiển thị**: Danh sách sách hiển thị đầy đủ tiêu đề, tác giả, giá tiền và số lượng.
   * **Chi tiết**: Xem thông tin cụ thể của sách qua hộp thoại xem nhanh.
   * **Thêm mới & Sửa đổi**: Form nhập liệu có kiểm tra tính hợp lệ dữ liệu (validate giá tiền, số lượng không âm) và hiển thị lỗi trả về từ Backend.
   * **Xóa**: Hộp thoại cảnh báo thông tin sách trước khi bấm xác nhận xóa.
3. **Phân trang dữ liệu**:
   * Hỗ trợ lựa chọn hiển thị 20 hoặc 100 bản ghi trên mỗi trang.
   * Các nút Next, Previous chuyển trang mượt mà kèm hiển thị số lượng trang hiện tại.
4. **Tìm kiếm & Bộ lọc**:
   * Lọc danh sách theo Tiêu đề hoặc Tác giả thời gian thực qua API.
5. **Giao diện hiện đại (Sky Blue / Ice Blue Theme)**:
   * Thiết kế phẳng, tối giản, thanh lịch, loại bỏ các dải màu tím và dải màu chuyển sắc.
   * Hỗ trợ chuyển đổi nhanh chế độ Light Mode / Dark Mode.
   * Tích hợp bảng quản trị thống kê nhanh: Tổng đầu sách, Tổng số cuốn, Tổng giá trị kho hàng, Số lượng sách đã hết hàng.
