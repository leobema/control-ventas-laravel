import { Link, Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';


export default function Welcome({ auth }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };


    return (
        <>
<Head title="Login" />
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen  items-center place-items-center">
        <div className="flex justify-center">
            <img 
            className='mx-auto w-auto'
            src="https://img.freepik.com/vector-gratis/gerente-recursos-humanos-empleado-entrevista-diagrama-flujo-empresarial-software-evaluacion-empleados-sistema-empresa-recursos-humanos-ilustracion-concepto-programa-verificacion-empleados_335657-2088.jpg?w=1380&t=st=1712004475~exp=1712005075~hmac=e9510a26d2ffe007b6bdcbc63794e8c278301a813bc60ade742b8b681b2cd61c" 
            />
        </div>
        <div className="w-full max-w-md space-y-8 p-10 rounded-lg">
          <div>
              <img 
              className='mx-auto w-auto'
              src="https://logovectorseek.com/wp-content/uploads/2023/04/control-com-logo-vector.png"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Signin to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <span
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                start your 14-day free trial
              </span>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={submit}>
            {/* <input type="hidden" name="remember" defaultValue="true" /> */}
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />
              </div>
              <div>
                <InputLabel htmlFor="password" value="Password" />
                <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="relative block w-full rounded-b-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                <InputError message={errors.password} className="mt-2" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                            href={route('password.request')}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Forgot your password?
                        </Link>
              </div>
            </div>

            <div>
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Ingresar
                        </Link>
                    ) : (
                        <>
              <button
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                href={route('login')}
                >
                Sign in
              </button>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "} Don't Have an Account, Please{" "}
                <span
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                 
                  <Link 
                  href={route('register')}
                  > Register now </Link>
                </span>
              </p>
              </>
                    )}
            </div>
          </form>
        </div>
      </div>
      </>
      );
}
