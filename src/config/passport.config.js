import passport  from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { registerUser, loginUser } from '../services/users.service.js';
import { UserDTO } from '../dto/user.dto.js';



// estrategia de registro

export const registerStrategy = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
  async (req, email, password, done) => {
    try {
          const {
            first_name,
            last_name,
          } = req.body;
        const createdUser = await registerUser({ email, password, first_name, last_name });
    
        return done(null, new UserDTO(createdUser));
    }
    catch (error) {
        return done(error);
    }
  });
  passport.use('register', registerStrategy);

// estrategia de login

export const loginStrategy = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      const user = await loginUser({ email, password });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
passport.use('login', loginStrategy);
