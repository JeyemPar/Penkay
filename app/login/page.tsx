'use client';

import { FormEvent, useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Leaf, LoaderCircle, LockKeyhole, Mail, UserRound } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const demoUser = {
  email: 'productor@penkay.ec',
  password: 'Penkay2026',
};

export default function LoginPage() {
  const [email, setEmail] = useState(demoUser.email);
  const [password, setPassword] = useState(demoUser.password);
  const [role, setRole] = useState('productor');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Completa el correo o teléfono y la contraseña.');
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      window.location.href = role === 'productor' ? '/perfil' : '/comunidad';
    }, 650);
  };

  return (
    <main className="login-page">
      <section className="login-visual" aria-label="Paisaje de cultivo de penco">
        <img src="/penco-andes-hero.png" alt="Cultivo de penco en los Andes al amanecer" />
        <div className="login-message">
          <a className="app-brand" href="/">
            <span><Leaf /></span>
            <strong>Penkay</strong>
          </a>
          <h1>Tu parcela, su historia y lo que viene.</h1>
          <p>Consulta el estado del cultivo, registra actividades y demuestra el impacto de tu trabajo desde un solo lugar.</p>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-card">
          <Button render={<a href="/" />} nativeButton={false} variant="ghost" size="sm" className="login-back">
            <ArrowLeft data-icon="inline-start" /> Volver al inicio
          </Button>
          <div className="login-icon"><UserRound /></div>
          <p className="eyebrow">Acceso seguro</p>
          <h2>Iniciar sesión</h2>
          <p>Ingresa con tu cuenta de la red Penkay.</p>

          <form className="login-form" onSubmit={submit} noValidate>
            <div className="form-field">
              <Label htmlFor="role">Tipo de usuario</Label>
              <select id="role" value={role} onChange={(event) => setRole(event.target.value)}>
                <option value="productor">Productor</option>
                <option value="pencotech">Joven PencoTech</option>
                <option value="academia">Academia</option>
                <option value="proveedor">Proveedor</option>
                <option value="distribuidor">Distribuidor</option>
                <option value="institucion">Aliado institucional</option>
              </select>
            </div>

            <div className="form-field">
              <Label htmlFor="email">Correo o teléfono</Label>
              <div className="login-input-wrap">
                <Mail aria-hidden="true" />
                <Input
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="nombre@ejemplo.ec"
                  autoComplete="username"
                  aria-invalid={Boolean(error && !email)}
                />
              </div>
            </div>

            <div className="form-field">
              <div className="field-heading">
                <Label htmlFor="password">Contraseña</Label>
                <a href="#recuperar">¿La olvidaste?</a>
              </div>
              <div className="login-input-wrap">
                <LockKeyhole aria-hidden="true" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  aria-invalid={Boolean(error && !password)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <label className="remember-row">
              <Checkbox defaultChecked />
              <span>Mantener mi sesión en este dispositivo</span>
            </label>

            {error && <p className="login-error" role="alert">{error}</p>}

            <Button type="submit" size="lg" disabled={loading}>
              {loading ? <><LoaderCircle className="animate-spin" /> Ingresando…</> : 'Ingresar a mi cuenta'}
            </Button>
          </form>

          <div className="demo-credentials">
            <strong>Cuenta de demostración</strong>
            <span>Correo: {demoUser.email}</span>
            <span>Contraseña: {demoUser.password}</span>
            <small>Los campos ya están completos para explorar el prototipo.</small>
          </div>

          <div className="login-register">
            <span>¿Aún no formas parte de la red?</span>
            <a href="#registro">Crear cuenta de productor</a>
          </div>
        </div>
      </section>
    </main>
  );
}
