// Local Storage ile veri işleme fonksiyonları

// Veri ekleme: Veriyi localStorage'a kaydeder
export const saveToLocalStorage = (key: string, value: any) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Veri kaydedilirken bir hata oluştu:", error);
  }
};

// Veri okuma: localStorage'dan veriyi okur
export const loadFromLocalStorage = (key: string) => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return undefined;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error("Veri okunurken bir hata oluştu:", error);
    return undefined;
  }
};

// Veri silme: localStorage'dan veriyi siler
export const removeFromLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Veri silinirken bir hata oluştu:", error);
  }
};

// Tüm verileri temizleme: localStorage'daki tüm verileri siler
export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("LocalStorage temizlenirken bir hata oluştu:", error);
  }
};
