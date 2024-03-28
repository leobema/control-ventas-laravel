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
            <svg 
            width="36" 
            height="36" 
            xmlns="http://www.w3.org/2000/svg" 
            >
                <path d="M16 2v7h-2v-5h-12v16h12v-5h2v7h-16v-20h16zm2 9v-4l6 5-6 5v-4h-10v-2h10z"/>
                </svg>
        </div>
        <div className="w-full max-w-md space-y-8 p-10 rounded-lg">
          <div>
              <svg 
              
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg">
                <path 
                d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" 
                />
                </svg>
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
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
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
