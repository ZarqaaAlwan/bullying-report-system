"use client"
import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    nama_pelapor: '', nama_korban: '', nama_pelaku: '', detail_kejadian: '', kategori: 'Verbal'
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('🔄 Memproses pengaduan...')

    const { error } = await supabase.from('laporan_kasus').insert([formData])

    if (error) {
      setStatus('❌ Gagal! Cek koneksi atau database.')
    } else {
      setStatus('✅ Laporan Berhasil Terkirim! Privasi Anda terjaga.')
      setFormData({ nama_pelapor: '', nama_korban: '', nama_pelaku: '', detail_kejadian: '', kategori: 'Verbal' })
    }
    setLoading(false)
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', color: '#1e293b' }}>
      
      {/* HEADER / HERO SECTION */}
      <header style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #0284c7 100%)', 
        color: '#fff', 
        padding: showForm ? '40px 20px' : '100px 20px', 
        textAlign: 'center', 
        transition: 'all 0.5s ease',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)' 
      }}>
        <h1 style={{ margin: 0, fontSize: showForm ? '2rem' : '3.5rem', fontWeight: '800', letterSpacing: '-1px' }}>
          SMK PRIMA UNGGUL
        </h1>
        <p style={{ fontSize: showForm ? '1rem' : '1.5rem', opacity: '0.9', marginTop: '10px', fontWeight: '300', fontStyle: 'italic' }}>
          Skill, Creative, Advance
        </p>
        
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            style={{ 
              marginTop: '40px', 
              padding: '15px 40px', 
              fontSize: '1.2rem', 
              fontWeight: 'bold', 
              color: '#0f172a', 
              backgroundColor: '#0ea5e9', 
              border: 'none', 
              borderRadius: '50px', 
              cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(14,165,233,0.4)',
              transition: '0.3s'
            }}>
            MULAI LAPOR SEKARANG 🚀
          </button>
        )}
      </header>

      {/* FORM SECTION (Muncul setelah tombol diklik) */}
      {showForm && (
        <main style={{ 
          maxWidth: '650px', 
          margin: '-30px auto 50px', 
          padding: '35px', 
          backgroundColor: '#fff', 
          borderRadius: '24px', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          animation: 'fadeIn 0.5s ease-in-out'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a' }}>Formulir Pengaduan</h2>
            <p style={{ color: '#64748b' }}>Suara Anda langkah awal hentikan bullying</p>
          </div>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>👤 Nama Pelapor</label>
              <input type="text" required value={formData.nama_pelapor} onChange={(e) => setFormData({...formData, nama_pelapor: e.target.value})} placeholder="Inisial atau Nama Lengkap" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #e2e8f0', outlineColor: '#0ea5e9' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>🎯 Nama Korban</label>
                <input type="text" required value={formData.nama_korban} onChange={(e) => setFormData({...formData, nama_korban: e.target.value})} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #e2e8f0' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>⚠️ Nama Pelaku</label>
                <input type="text" required value={formData.nama_pelaku} onChange={(e) => setFormData({...formData, nama_pelaku: e.target.value})} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #e2e8f0' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>📂 Jenis Bullying</label>
              <select value={formData.kategori} onChange={(e) => setFormData({...formData, kategori: e.target.value})} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #e2e8f0', backgroundColor: '#fff' }}>
                <option value="Verbal">🗣️ Verbal (Ejekan/Hinaan)</option>
                <option value="Fisik">👊 Fisik (Kekerasan)</option>
                <option value="Sosial">🚫 Sosial (Pengucilan)</option>
                <option value="Cyber">📱 Cyber (Media Sosial)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>📝 Kronologi Kejadian</label>
              <textarea required rows="4" value={formData.detail_kejadian} onChange={(e) => setFormData({...formData, detail_kejadian: e.target.value})} placeholder="Jelaskan secara detail kejadian..." style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #e2e8f0', resize: 'none' }}></textarea>
            </div>

            <button type="submit" disabled={loading} style={{ 
              background: 'linear-gradient(to right, #0f172a, #0284c7)', 
              color: '#fff', padding: '18px', 
              borderRadius: '14px', 
              border: 'none', 
              fontSize: '1.1rem', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              transition: '0.3s'
            }}>
              {loading ? 'Sedang Mengirim...' : 'KIRIM PENGADUAN SEKARANG'}
            </button>
            
            <button type="button" onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.9rem' }}>
              ← Kembali ke Beranda
            </button>
          </form>

          {status && (
            <div style={{ marginTop: '25px', padding: '15px', borderRadius: '12px', textAlign: 'center', backgroundColor: status.includes('✅') ? '#f0fdf4' : '#fef2f2', color: status.includes('✅') ? '#166534' : '#991b1b', fontWeight: 'bold' }}>
              {status}
            </div>
          )}
        </main>
      )}

      <footer style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontSize: '0.9rem' }}>
        © 2026 SMK PRIMA UNGGUL <br/> 
        <strong>Skill, Creative, Advance</strong>
      </footer>

      {/* CSS Animasi Sederhana */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
        }
        
