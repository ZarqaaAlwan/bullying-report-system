import React from 'react';

export default function Home() {
  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* Hero Section */}
      <header style={{ backgroundColor: '#B22222', color: '#FFD700', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>SMK BINA WARGA</h1>
        <p style={{ fontSize: '1.2rem' }}>Hentikan Bullying, Ciptakan Prestasi Bersama!</p>
        <div style={{ marginTop: '30px' }}>
          <button style={{ backgroundColor: '#FFD700', color: '#B22222', padding: '15px 30px', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
            BUAT LAPORAN SEKARANG
          </button>
        </div>
      </header>

      {/* Jurusan Section */}
      <section style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#B22222' }}>Jurusan Unggulan Kami</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
          {['Teknik Komputer & Jaringan (TKJ)', 'Rekayasa Perangkat Lunak (RPL)', 'Multimedia'].map((jurusan) => (
            <div key={jurusan} style={{ border: '2px solid #FFD700', padding: '20px', borderRadius: '10px', width: '250px' }}>
              <p style={{ fontWeight: 'bold' }}>{jurusan}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', textAlign: 'center', position: 'fixed', bottom: 0, width: '100%' }}>
        <p>&copy; 2026 SMK Bina Warga - Anti Bullying System</p>
      </footer>
    </div>
  );
}
