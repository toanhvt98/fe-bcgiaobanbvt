# The Project Title

Tổng hợp báo cáo bệnh viện

# The Project Description

Ứng dụng giải quyết 1 bài toán độc lập trong bệnh viện chia làm 2 chức năng độc lập nhau Tổng hợp báo cáo giao ban chuyên môn và Tổng hợp báo cáo sự cố y khoa
Đối với tổng hợp báo cáo giao ban chuyên môn.
các khoa phòng cần cập nhật dữ liệu báo cáo chuyên môn hàng ngày, phần mềm thực hiện tổng hợp dữ liệu và trình bày trực quan theo cấu trúc báo cáo cần thiết, và có khả năng xuất file báo cáo power point tổng hợp để trình chiếu trong các buổi giao ban chuyên môn hàng ngày.
Các khoa trong bệnh viện được chia thành nhiều loại khoa, mỗi 1 loại khoa sẽ báo cáo các trường số liệu khác nhau
Đối với khoa lâm sàng (tức là có điều trị bệnh nhân), khoa sẽ báo cáo thêm chi tiết về bệnh nhân phát sinh hàng ngày, các loại bệnh nhân cần báo cáo chi tiết bao gồm tử vong, chuyển viện, nặng xin về, can thiệp, phẫu thuật, vào viện ngoài giờ ... Các thông tin báo cáo bao gồm thông tin bệnh nhân, diễn biến, xử lý .. có thể đính kèm nhiều ảnh.

Đối với tổng hợp sự cố y khoa
Ứng dụng giúp bệnh viện vận hành theo thông tư 43/2018/TT-BYT của bộ y tế hướng dẫn phòng ngừa sự cố y khoa trong các cơ sở khám bệnh, chữa bệnh. Khi có sự cố y khoa xảy ra trong bệnh viện, cán bộ trong bệnh viện sẽ nhập thông báo sự cố y khoa, cán bộ chuyên trách phân tích sự cố ý khoa sẽ tiếp nhận hoặc không, nếu tiếp nhận sẽ tiến hành phân tích, cập nhật các thông tin phân tích, ứng dụng sẽ cho phép xem các kết quả tổng hợp phân tích dưới dạng chart. 

# User Stories
## Nomal
Là người dùng, tôi muốn thông báo sự cố y khoa khi xảy ra 
Là người dùng, tôi muốn cập nhật báo cáo của khoa mình hàng ngày 
Là người dùng, tôi muốn xem báo cáo của khoa mình và khoa khác bất kỳ ngày nào nhưng không sửa được
Là người dùng tôi muốn xem báo cáo toàn viện một cách trực quan
Là người dùng, tôi muốn download file báo cáo tổng hợp.

## Quality manager
Là nhân viên quản lý chất lượng, tôi muốn nhìn danh sách tất cả các thông báo sự cố y khoa
Là nhân viên quản lý chất lượng, tôi muốn tiếp nhận và phân tích sự cố y khoa
Là nhân viên quản lý chất lượng, tôi muốn nhìn báo cáo tổng hợp tất cả sự cố y khoa.

## Manager
Là tổng trực, tôi muốn có đầy đủ quyền như của Nomal
Là tổng trực, tôi muốn có quyền duyệt và gỡ duyệt báo cáo tổng hợp hàng ngày

## Admin
Là admin, tôi muốn có quyền như Manager và Quality manager
Là admin, tôi muốn tự cập nhật/xoá và phân quyền cho các user mới
Là admin, tôi muốn cập nhật lịch tổng trực
Là admin, tôi muốn cập nhật danh mục các khoa, phòng

Background


# How to set up and run the application locally

npm i
add .env 
REACT_APP_BACKEND_API
REACT_APP_CLOUDINARY_CLOUD_NAME
REACT_APP_CLOUDINARY_UPLOAD_PRESET

npm start

Third-party libraries used in the project 
