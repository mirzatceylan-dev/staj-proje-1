import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion' // Animasyon için
import './index.css'

function App() {
  // 1. MADDE: LocalStorage'dan verileri çekerek başla
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('kutuphane_verisi');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

const [formData, setFormData] = useState({ 
  title: '', 
  author: '', 
  borrower: '', 
  phone: '',    
  date: new Date().toISOString().split('T')[0], 
  category: 'Roman', 
  status: 'Ödünç Verildi' 
});
  
  // 2. MADDE: Arama ve Filtreleme State'leri
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Hepsi');

  // 1. MADDE: Her kitap değiştiğinde LocalStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('kutuphane_verisi', JSON.stringify(books));
  }, [books]);

const addBook = (e) => {
  e.preventDefault();
  if (formData.title && formData.borrower) {
    setBooks([{ ...formData, id: Date.now() }, ...books]);
    setFormData({ 
      title: '', 
      author: '', 
      borrower: '', 
      phone: '', 
      date: new Date().toISOString().split('T')[0], 
      category: 'Roman', 
      status: 'Ödünç Verildi' 
    });
  }
};

  const deleteBook = (id) => setBooks(books.filter(book => book.id !== id));

  const toggleStatus = (id) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, status: book.status === 'Rafta' ? 'Ödünç Verildi' : 'Rafta' } : book
    ));
  };

const filteredBooks = books.filter(book => {
  const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        book.borrower?.toLowerCase().includes(searchTerm.toLowerCase()) || // Borrower eklendi
                        book.author.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesCategory = filterCategory === 'Hepsi' || book.category === filterCategory;
  return matchesSearch && matchesCategory;
});

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-700 to-purple-800 rounded-[2rem] p-10 text-white shadow-2xl mb-8 flex flex-col md:flex-row justify-between items-center border-b-8 border-indigo-900/20">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2 flex items-center gap-3">
              <span>📚</span> Kitap Takip Sistemi
            </h1>   
          </div>
          <div className="flex gap-4 mt-6 md:mt-0 text-center">
             <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
                <span className="block text-2xl font-black">{books.length}</span>
                <span className="text-[10px] uppercase font-bold opacity-70">Toplam</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100 sticky top-10">
              <h2 className="text-xl font-bold text-indigo-900 mb-6 flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600">✍️</div> Yeni Kayıt
              </h2>
              <form onSubmit={addBook} className="space-y-4">
                <input 
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white p-4 rounded-2xl transition-all outline-none"
                  placeholder="Kitap Adı"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
                <input 
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white p-4 rounded-2xl transition-all outline-none"
                  placeholder="Yazar"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  required
                />
                <input 
                className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white p-4 rounded-2xl transition-all outline-none"
                placeholder="Teslim Alan (Ad Soyad)"
                value={formData.borrower}
                onChange={(e) => setFormData({...formData, borrower: e.target.value})}
                required
                />
                <input 
                className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white p-4 rounded-2xl transition-all outline-none"
                placeholder="Telefon Numarası"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                <input 
                type="date"
                className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white p-4 rounded-2xl transition-all outline-none text-gray-500"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
                <select 
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white p-4 rounded-2xl transition-all outline-none"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Hepsi">Tüm Kategoriler</option>
                <option value="Roman">Roman</option>
                <option value="Hikaye">Hikaye</option>
                <option value="Tarih">Tarih</option>
                <option value="Bilim">Bilim</option>
                <option value="Biyografi">Biyografi</option>
                <option value="Otobiyografi">Otobiyografi</option>
                <option value="Fantastik">Fantastik</option>
                <option value="Kişisel Gelişim">Kişisel Gelişim</option>
                <option value="Gastronomi">Gastronomi</option>
                </select>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl transition-all shadow-lg active:scale-95">
                  ENVANTERE EKLE
                </button>
              </form>
            </div>
          </div>

          {/* Liste ve Filtreleme */}
          <div className="lg:col-span-8">
            {/* 2. MADDE: Arama ve Filtreleme Barı */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                <input 
                  type="text"
                  placeholder="Kitap veya yazar ara..."
                  className="w-full bg-white p-4 pl-12 rounded-2xl shadow-sm border border-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-gray-600"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="Hepsi">Tüm Kategoriler</option>
                <option value="Roman">Roman</option>
                <option value="Hikaye">Hikaye</option>
                <option value="Tarih">Tarih</option>
                <option value="Bilim">Bilim</option>
                <option value="Biyografi">Biyografi</option>
                <option value="Otobiyografi">Otobiyografi</option>
                <option value="Fantastik">Fantastik</option>
                <option value="Kişisel Gelişim">Kişisel Gelişim</option>
                <option value="Gastronomi">Gastronomi</option>
                
              </select>
            </div>

            {/* 4. MADDE: Kart Listesi (Animasyonlu) */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode='popLayout'>
                {filteredBooks.map(book => (
                  <motion.div 
                    key={book.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-shadow group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${book.status === 'Rafta' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                        {book.status}
                      </span>
                      <button onClick={() => deleteBook(book.id)} className="text-gray-300 hover:text-rose-500 p-2 transition-colors">Sil</button>
                    </div>
                    <h3 className="text-xl font-black text-gray-800 leading-tight mb-1">{book.title}</h3>
                    <p className="text-gray-400 font-medium text-sm mb-4">{book.author}</p>
                    <div className="bg-slate-50 p-4 rounded-2xl mb-4 border border-gray-50">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Teslim Bilgileri</p>
                    <p className="text-sm font-bold text-gray-700">{book.borrower}</p>
                    <div className="flex justify-between mt-2 text-[11px] text-gray-500">
                        <span>📞 {book.phone || 'Yok'}</span>
                        <span>📅 {book.date}</span>
                    </div>
                    </div>
                    <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{book.category}</span>
                      <button 
                        onClick={() => toggleStatus(book.id)}
                        className="text-[11px] font-black text-indigo-600 hover:underline uppercase"
                      >
                        Durum Değiştir
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredBooks.length === 0 && (
              <div className="bg-white rounded-[2rem] p-20 text-center border-4 border-dashed border-gray-100">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Sonuç Bulunamadı</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App