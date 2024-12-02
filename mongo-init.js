db = db.getSiblingDB('gym-management'); // Seleccionar la base de datos gym-management

db.createUser({
  user: 'admin',
  pwd: 'password123', // Cambia la contraseña aquí
  roles: [{ role: 'readWrite', db: 'gym-management' }],
});

print('Usuario admin creado con permisos en gym-management');
