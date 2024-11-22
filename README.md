# Hesap Takibi Uygulaması

Bu proje, kullanıcıların harcamalarını takip etmelerini sağlayan bir **React** uygulamasıdır. Kullanıcılar, gerçekleştirdikleri işlemleri (harcama, gelir vb.) girerek, PDF formatında rapor alabilirler. Uygulama ayrıca, **light** ve **dark mode** temaları arasında geçiş yapabilme özelliğine sahiptir.

## Özellikler

- **Tema Değiştirme**: Light ve dark tema arasında geçiş yapabilirsiniz.
- **PDF Raporu**: Harcamalarınızın raporunu **PDF** formatında indirebilirsiniz.
- **LocalStorage**: Harcamalarınız, tarayıcınızda saklanır, böylece verileriniz kaybolmaz.

## Kullanım

### Başlangıç

1. Projeyi klonlayın:

   ```bash
   git clone https://github.com/kullaniciadi/hesap-takibi.git
   ```

Bağımlılıkları yükleyin:

bash
Kodu kopyala
npm install
Uygulamayı başlatın:

bash
Kodu kopyala
npm start

## Dark Mode

Tema değiştirme butonuna tıklayarak uygulamanın light ve dark modları arasında geçiş yapabilirsiniz.
Tema tercihiniz tarayıcınızda saklanır ve tekrar giriş yaptığınızda seçtiğiniz tema yüklenir.

## PDF Raporu

Harcamalarınızı girip PDF Raporu İndir butonuna tıklayarak, işlemlerinizin yer aldığı PDF dosyasını indirebilirsiniz.

## Teknolojiler

React: Kullanıcı arayüzünü oluşturmak için.
TypeScript: Statik tip denetimi için.
jsPDF: PDF raporu oluşturmak için.
CSS: Stilinizi kontrol etmek için.
React Icons: Tema değiştirme ikonları için.
