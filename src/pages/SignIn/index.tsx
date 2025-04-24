import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Input } from '../../components/Input';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const validateSchema = Yup.object().shape({
  email: Yup.string().required('Login obrigatório.'),
  password: Yup.string().required('Senha obrigatória.')
})

export interface ILogin {
  email: string,
  password: string
}

export function SignIn() {
  const navigate = useNavigate()
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { handleSignIn } = useAuth()

  const { register, handleSubmit, formState } = useForm<ILogin>({
    resolver: yupResolver(validateSchema),
  })

  const onSubmit = async (data: {email: string, password: string}) => {
    setLoading(true)
    try {
      await handleSignIn(data)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const handleSignUp = () => {
    navigate('/signup')
  }

  return (
    <div className="container justify-content-center align-items-center  d-flex vh-100">
      <div className="row justify-content-center col-md-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-12">Login</h2>
              {alertMessage && <div className="alert alert-danger">{alertMessage}</div>}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">Email</label>
                  <Input
                    {...register('email')}
                    placeholder="Usuário"
                    error={formState.errors.email?.message}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <Input
                    {...register('password')}
                    placeholder="Senha"
                  />
                </div>
                <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Carregando...' : 'Login'}
                </button>
                </div>
              </form>
              <div className='mt-4 d-flex' style={{ justifyContent: 'center' }}>
                <button className='btn' onClick={handleSignUp}>Não possui conta? Cadastre-se</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}