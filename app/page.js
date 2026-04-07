"use client"
import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Home() {
  const [formData, setFormData] = useState({
    nama_pelapor: '',
    nama_korban: '',
    nama_pelaku: '',
    detail_kejadian: '',
    kategori: 'Verbal'
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('Sedang mengirim laporan...')

    const { data, error } = await supabase
      .from('laporan_kasus')
      .insert([formData])

    if (error) {
      console.error(error)
      setStatus('Gagal mengirim laporan. Cek koneksi atau database!')
    } else {
      setStatus('Laporan Berhasil Terkirim! Terima kasih keberaniannya.')
      setFormData({ nama_pelapor: '', nama_korban: '', nama_pelaku: '', detail_kejadian: '', kategori: 'Verbal' })
    }
    setLoading(false)
  }

  return (
    <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Header Ala SMK */}
      <header style={{ backgroundColor: '#b22222', color: '#ffd700', padding: '40px 20px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>SMK BINA WARGA</h1>
        <p style={{ fontSize: '1.1rem', marginTop: '10px' }}>Hentikan Bullying, Ciptakan Prestasi Bersama!</p>
      </header>

      <main style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#333', textAlign: 'center', marginBottom: '30px' }}>Formulir Laporan Kasus</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nama Pelapor (Bisa Inisial):</label>
            <input type="text" required value={formData.nama_pelapor} onChange={(e) => setFormData({...formData, nama_pelapor: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nama Korban:</label>
              <input type="text" required value={formData.nama_korban} onChange={(e) => setFormData({...formData, nama_korban: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nama Pelaku:</label>
              <input type="text" required value={formData.nama_pelaku} onChange={(e) => setFormData({...formData, nama_pelaku: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Kategori Bullying:</label>
            <select value={formData.kategori} onChange={(e) => setFormData({...formData, kategori: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}>
              <option value="Verbal">Verbal (Ejekan/Hinaan)</option>
              <option value="Fisik">Fisik (Pukulan/Dorongan)</option>
              <option value="Sosial">Sosial (Dikucilkan)</option>
              <option value="Cyber">Cyber (Media Sosial)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Detail Kejadian:</label>
            <textarea required rows="4" value={formData.detail_kejadian} onChange={(e) => setFormData({...formData, detail_kejadian: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }} placeholder="Ceritakan apa yang terjadi..."></textarea>
          </div>

          <button type="submit" disabled={loading} style={{ backgroundColor: '#b22222', color: '#fff', padding: '15px', borderRadius: '8px', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}>
            {loading ? 'Mengirim...' : 'KIRIM LAPORAN SEKARANG'}
          </button>
        </form>

        {status && (
          <div style={{ marginTop: '20px', padding: '15px', borderRadius: '6px', textAlign: 'center', backgroundColor: status.includes('Berhasil') ? '#d4edda' : '#f8d7da', color: status.includes('Berhasil') ? '#155724' : '#721c24' }}>
            {status}
          </div>
        )}
      </main>

      <footer style={{ textAlign: 'center', padding: '20px', color: '#666', fontSize: '0.9rem' }}>
        &copy; 2026 SMK Bina Warga - Satgas Anti-Bullying
      </footer>
    </div>
  )
}
