import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Input } from '../../components/Input';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório.'),
  email: Yup.string().email('E-mail inválido.').required('Email obrigatório.'),
  password: Yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres.').required('Senha obrigatória.')
})

export interface ISignUp {
  name: string;
  email: string;
  password: string;
}

export function SignUp() {
  const navigate = useNavigate()
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { handleSignUp } = useAuth()

  const { register, handleSubmit, formState } = useForm<ISignUp>({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = async (data: ISignUp) => {
    setLoading(true)
    setAlertMessage('')
    try {
      await handleSignUp(data)
      navigate('/') // ou /login se quiser mandar pra login
    } catch (error: any) {
      console.error(error)
      setAlertMessage(error?.response?.data?.message || 'Erro ao cadastrar.')
    }
    setLoading(false)
  }

  const handleBackToLogin = () => {
    navigate('/')
  }

  return (
    <div className="container justify-content-center align-items-center d-flex vh-100">
      <div className="row justify-content-center col-md-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Cadastro</h2>
              {alertMessage && <div className="alert alert-danger">{alertMessage}</div>}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nome</label>
                  <Input
                    {...register('name')}
                    placeholder="Nome completo"
                    error={formState.errors.name?.message}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <Input
                    {...register('email')}
                    placeholder="Email"
                    error={formState.errors.email?.message}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Senha</label>
                  <Input
                    {...register('password')}
                    type="password"
                    placeholder="Senha"
                    error={formState.errors.password?.message}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                  </button>
                </div>
              </form>
              <div className="mt-4 d-flex justify-content-center">
                <button className="btn" onClick={handleBackToLogin}>
                  Já tem conta? Fazer login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
