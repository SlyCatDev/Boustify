import { useState, FormEvent, ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router'

export interface FormData {
    email: string;
    password: string;
}

interface ApiResponse {
    message?: string;
    [key: string]: any;
    };

export default function Register() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    })
    const [validationError, setValidationError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setValidationError(null)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setValidationError(null)
        
        if (!formData.email.includes('@')) {
            setValidationError('Email invalide')
            setIsLoading(false)
            return
        }

        try {
            const res = await fetch('http://localhost:3333/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data: ApiResponse = await res.json()
            if (res.ok) {
                // Inscription réussie
                navigate('/')
            }
            else {
                setValidationError(data.message || "Échec de l'inscription")
            }
        } catch (error) {
            setValidationError("Erreur de connexion au serveur")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input 
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                    />

                    <button 
                    type="button" onClick={() => setShowPassword(v => !v)} style={{ marginTop: 4 }}>
                        {showPassword ? "Masquer" : "Afficher"} le mot de passe
                    </button>
                </div>
                {validationError && <div style={{ color: 'red', marginBottom: 12 }}>{validationError}</div>}
                <button type="submit" disabled={isLoading} style={{ width: '100%', padding: 10 }}>
                    {isLoading ? "Inscription..." : "S'inscrire"}
                </button>
            </form>
            <div style={{ marginTop: 16 }}>
                <span>Déjà un compte ?</span>
                <Link to="/login">Connectez-vous</Link>
            </div>
        </div>
    )
}
