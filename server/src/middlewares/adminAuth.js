module.exports = async (request, reply) => {
  try {
    // İstek başlığındaki Bearer token'ı doğrula ve çöz
    await request.jwtVerify(); 
    
    // Çözülen token içindeki bilgilere request.user ile ulaşabiliriz
    const { role } = request.user; 

    if (role !== 'ADMIN') {
      return reply.code(403).send({ error: "Bu işlem için yetkiniz yok (Admin gerekli)!" });
    }
  } catch (err) {
    return reply.code(401).send({ error: "Geçersiz veya eksik token!" });
  }
};