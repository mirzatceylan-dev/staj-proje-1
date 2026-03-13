# 📚 Kitap Emanet Takip Sistemi (Staj Proje-1)

Bu proje, bir kütüphane veya kişisel kitap koleksiyonu için geliştirilmiş, modern arayüze sahip bir **Kitap Emanet Takip** uygulamasıdır. Kullanıcıların kitap envanterini yönetmesini, emanet verilen kişilerin bilgilerini tutmasını ve bu verileri tarayıcı hafızasında saklamasını sağlar.

## 🚀 Özellikler

- **Tam CRUD Operasyonları:** Kitap ekleme, listeleme, durum güncelleme ve silme işlemleri.
- **Gelişmiş Emanet Takibi:** Kitabı alan kişinin isim-soyisim, telefon ve teslim tarihi bilgilerini kaydetme.
- **Dinamik Arama ve Filtreleme:** Kitap adına, yazara veya emanet alan kişiye göre anlık arama yapabilme. Ayrıca kategorilere göre filtreleme seçeneği.
- **Kalıcı Veri (LocalStorage):** Sayfa yenilense veya tarayıcı kapatılsa dahi verilerin kaybolmaması için `localStorage` entegrasyonu.
- **Modern Animasyonlar:** Kartların eklenmesi, silinmesi ve filtrelenmesi sırasında `Framer Motion` ile sağlanan akıcı geçişler.
- **Responsive Tasarım:** Tailwind CSS kullanılarak oluşturulmuş, mobil ve masaüstü uyumlu (Dashboard tipi) arayüz.

## 🛠️ Kullanılan Teknolojiler

- **Frontend Framework:** React (Vite 8)
- **Styling:** Tailwind CSS (v4)
- **Animations:** Framer Motion
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Version Control:** Git & GitHub

## 🔧 Kurulum ve Çalıştırma

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

1. Projeyi klonlayın:   >  git clone [https://github.com/mirzatceylan-dev/staj-proje-1.git](https://github.com/mirzatceylan-dev/staj-proje-1.git)
2. Proje dizinine gidin:  >  cd proje1
3. Gerekli paketleri yükleyin:  > npm install --legacy-peer-deps
4. Uygulamayı başlatın:   >   npm run dev
