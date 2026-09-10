import passport  from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { findUserByEmail, saveUser } from '../repositories/users.repository.js';
import { hashPassword } from '../utils/hash.js';

export const registerStrategy = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
  async (req, email, password, done) => {
    try {
          const {
            first_name,
            last_name,
          } = req.body;
          if (!first_name || !last_name || !email || !password) {
            const error = new Error("Faltan campos obligatorios");
            error.statusCode = 400;
            return done(error);
          }
          const normalizedEmail = email.trim().toLowerCase();
      
          const minLengthPassword = 8;
          if (password.length < minLengthPassword) {
            const error = new Error(`La contraseña debe tener al menos ${minLengthPassword} caracteres`);
            error.statusCode = 400;
            return done(error);
          }

          const emailRegex = /^[^\s@]+@[^\s@]+[.][^\s@]+$/;
        if (!emailRegex.test(normalizedEmail)) {
          const error = new Error("Formato de email inválido");
          error.statusCode = 400;
          return done(error);
        }
        const existingUser = await findUserByEmail(normalizedEmail);
        if (existingUser) {
        const error = new Error("El email ya está registrado");
        error.statusCode = 409;
        return done(error);
        };
    
        const hashedPassword = await hashPassword(password);
            const newUser = {
            first_name,
            last_name,
            email: normalizedEmail,
            password: hashedPassword,
            role: 'user',
        };
    
        const createdUser = await saveUser(newUser);
    
        return done(null, {
            id: createdUser._id,
            first_name: createdUser.first_name,
            last_name: createdUser.last_name,
            email: createdUser.email,
            role: createdUser.role,
        });
    }
    catch (error) {
        return done(error);
    }
  });
  passport.use('register', registerStrategy);