const formatCurrencyVN = (value: number): string => {
    return value.toLocaleString("vi-VN"); // Hoặc thêm đơn vị nếu muốn: + " ₫"
  };

const formatCurrency = {
    formatCurrencyVN,
}

export default formatCurrency;