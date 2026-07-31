module.exports = (requiredRoles = []) => {
  return async (request, reply) => {
    try {
      await request.jwtVerify(); 
      const { id, role } = request.user; 

      console.log(`BAŞARILI TOKEN ÇÖZÜMÜ - ID: ${id} Rol: ${role}`);

      if (role === 'SUPERADMIN') {
        return; 
      }

      if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
        console.log("YETKİ YETMEDİ - Rol:", role);
        return reply.code(403).send({ error: "Bu işlem için yetkiniz yok!" });
      }

      //KRİTİK: Rol uygunsa middleware'in başarıyla tamamlandığını belirtmek için return ekliyoruz
      return;

    } catch (err) {
      console.error("TOKEN PATLADI - Hata Mesajı:", err.message);
      return reply.code(401).send({ error: "Geçersiz veya eksik oturum token'ı!" });
    }
  };
};