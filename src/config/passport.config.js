import passport  from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy } from 'passport-jwt';
import { registerUser, loginUser } from '../services/users.service.js';
import { UserDTO } from '../dto/user.dto.js';
import { JWT_SECRET } from './config.jwt.js';

const extractCookie = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['currentUser'];
  }
  return token;
};

const options = {
  jwtFromRequest: extractCookie,
  secretOrKey: JWT_SECRET,
};

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

// estrategia JWT
export const currentStrategy = new JWTStrategy(
  options,
  async (payload, done) => {
    try {
      return done(null, payload);
    } catch (error) {
      return done(error);
    }
  }
);
passport.use('current', currentStrategy);
