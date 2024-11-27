export  function formatNumber(value) {
    if (value > 1000) {
      const suffixes = ["", "K", "M", "B", "T"];
      let suffixIndex = 0;
      while (value >= 1000 && suffixIndex < suffixes.length - 1) {
        value /= 1000;
        suffixIndex++;
      }
      return `${value.toFixed(1)}${suffixes[suffixIndex]}`; // Оставляем одно десятичное значение
    }
  
    // Если число не больше 1000, проверяем на лишние знаки после запятой
      return value.toFixed(6).replace(/\.?0+$/, ""); // Убираем лишние нули
  
  }