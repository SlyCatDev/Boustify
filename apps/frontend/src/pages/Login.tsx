import { Link, useNavigate } from 'react-router'
import { useState, FormEvent, ChangeEvent } from 'react'
import { useAuth } from '../hooks/useAuth'

interface FormData {
    email: string;
    password: string;
}

interface LoginResponse {
    message: string;
    token: string;
    type: string;
    user: {
        id: number;
        email: string;
        password?: string;
        [key: string]: any;
    };
}

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    })
    const [validationError, setValidationError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setValidationError(null)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        setValidationError(null)

        if (!formData.email.includes('@')) {
            setValidationError('Email invalide')
            setIsLoading(false)
            return
        }

        try {
            const res = await fetch('http://localhost:3333/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data: LoginResponse = await res.json()
            if (res.ok) {
            await login(formData.email, formData.password)

            navigate('/')
            } else {
                setValidationError(data.message || "Échec de la connexion")
            }
        } catch (error){
            setValidationError("Erreur de connexion au serveur")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="login-container" style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #eee', borderRadius: 8}}>
            <h2>Connectez-vous</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                    />
                    <button type="button" onClick={() => setShowPassword(v => !v)} style={{ marginTop: 4 }}>
                        {showPassword ? "Masquer" : "Afficher"} le mot de passe
                    </button>
                </div>
                {validationError && <div style={{ color: 'red', marginBottom: 12 }}>{validationError}</div>}
                <button type="submit" disabled={isLoading} style={{ width: '100%', padding: 10 }}>
                    {isLoading ? "Connexion..." : "Se connecter"}
                </button>
            </form>
            <div style={{ marginTop: 16 }}>
                <span>Pas encore de compte ? </span>
                <Link to="/register">Inscrivez-vous</Link>
            </div>
        </div>
    )
}

