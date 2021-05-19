const PARTERN_HO_TEN = new RegExp(
  "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
);

const PARTERN_TAI_KHOAN = /^[a-zA-Z0-9_]+$/;
const PARTERN_EMAIL =
  "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" +
  "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
const PARTERN_SODT = /((09|03|07|08|05)+([0-9]{8})\b)/; //10 số đầu số 0

let passwordRef_1 = "";
let passwordRef_2 = "";

function validateForm(name, value) {
  let errorMessage = "";

  if (name === "taiKhoan") {
    if (!value) {
      errorMessage = "*Tài khoản không được để trống";
    } else if (value.length < 4 || value.length > 20) {
      errorMessage = "*Tài khoản phải từ 4 đến 20 ký tự";
    } else if (!value.match(PARTERN_TAI_KHOAN)) {
      errorMessage =
        "*Tài khoản không được chứa ký tự viết liền không dấu và số  ";
    }
  }

  if (name === "email") {
    if (!value) {
      errorMessage = "*Email không được để trống";
    } else if (!value.match(PARTERN_EMAIL)) {
      errorMessage = "*Email không hợp lệ";
    }
  }

  if (name === "matKhau" || name === "matKhau2") {
    if (!value) {
      errorMessage = "*Mật khẩu không được để trống";
    } else if (value.length < 6) {
      errorMessage = "*Mật khẩu từ 6 trở lên";
    }

    // Sau khi nhập đúng thông tin mk thì lưu vào biến passwordRef. Hàm này đc gọi khi blur nên value được lưu là value "hoàn thiện" sau khi người dùng nhập xong.
    if (name === "matKhau") {
      passwordRef_1 = value; //value này là của mk1
    } else if (name === "matKhau2") {
      passwordRef_2 = value; //value này là của mk2
    }
    //các lỗi chung đã pass rồi mới xét đến lỗi confirm
    if (
      passwordRef_1 &&
      passwordRef_2 &&
      errorMessage === "" &&
      passwordRef_1 !== passwordRef_2
    ) {
      errorMessage = "*Xác thực mật khẩu không chính xác";
    }
  }

  if (name === "soDT") {
    if (!value) {
      errorMessage = "*Số điện thoại không được để trống";
    } else if (!PARTERN_SODT.test(value)) {
      errorMessage =
        "*Số điện không hợp lệ! Hãy chắc rằng bạn nhập đúng 10 số. (VD: 0934567890)";
    }
  }

  if (name === "ho" || name === "ten") {
    if (!value) {
      errorMessage = "*Xin hãy điền thông tin";
    } else if (!PARTERN_HO_TEN.test(value)) {
      errorMessage = "*Họ tên không được chứa ký tự đặc biệt";
    }
  }

  return errorMessage;
}

export default validateForm;
