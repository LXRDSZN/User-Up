import { z } from 'zod';

export const signupSchema = z.object({
  nombre: z.string().min(4, 'Nombre muy corto'),
  edad: z.number().max(99, 'Edad muy larga'),
  usuario: z.string().min(3, 'Usuario muy corto'),
  email: z.string().email('Email inválido'),
  contrasena: z.string().min(6, 'Contraseña muy corta'),
});

export const loginSchema = z.object({
  usuario: z.string(),
  contrasena: z.string().min(6, 'Contraseña muy corta'),
});