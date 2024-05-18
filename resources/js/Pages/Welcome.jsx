import { Link, Head } from '@inertiajs/react';
import background from '@/img/background.svg';
import { HiClock, HiArrowRight, HiPhone } from 'react-icons/hi2';
import { useState } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion, canRegister, workers, companies }) {
    const [hoverState, setHoverState] = useState(false)

    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };
    const aboutLink = route('seller');
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px]"
                    src={background}
                />
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-indigo-500 selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:justify-center lg:col-start-2">
                                <svg
                                    className="h-12 w-auto text-white lg:h-16 lg:text-indigo-600"
                                    viewBox="0 0 62 65"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M61.8548 14.6253C61.8778 14.7102 61.8895 14.7978 61.8897 14.8858V28.5615C61.8898 28.737 61.8434 28.9095 61.7554 29.0614C61.6675 29.2132 61.5409 29.3392 61.3887 29.4265L49.9104 36.0351V49.1337C49.9104 49.4902 49.7209 49.8192 49.4118 49.9987L25.4519 63.7916C25.3971 63.8227 25.3372 63.8427 25.2774 63.8639C25.255 63.8714 25.2338 63.8851 25.2101 63.8913C25.0426 63.9354 24.8666 63.9354 24.6991 63.8913C24.6716 63.8838 24.6467 63.8689 24.6205 63.8589C24.5657 63.8389 24.5084 63.8215 24.456 63.7916L0.501061 49.9987C0.348882 49.9113 0.222437 49.7853 0.134469 49.6334C0.0465019 49.4816 0.000120578 49.3092 0 49.1337L0 8.10652C0 8.01678 0.0124642 7.92953 0.0348998 7.84477C0.0423783 7.8161 0.0598282 7.78993 0.0697995 7.76126C0.0884958 7.70891 0.105946 7.65531 0.133367 7.6067C0.152063 7.5743 0.179485 7.54812 0.20192 7.51821C0.230588 7.47832 0.256763 7.43719 0.290416 7.40229C0.319084 7.37362 0.356476 7.35243 0.388883 7.32751C0.425029 7.29759 0.457436 7.26518 0.498568 7.2415L12.4779 0.345059C12.6296 0.257786 12.8015 0.211853 12.9765 0.211853C13.1515 0.211853 13.3234 0.257786 13.475 0.345059L25.4531 7.2415H25.4556C25.4955 7.26643 25.5292 7.29759 25.5653 7.32626C25.5977 7.35119 25.6339 7.37362 25.6625 7.40104C25.6974 7.43719 25.7224 7.47832 25.7523 7.51821C25.7735 7.54812 25.8021 7.5743 25.8196 7.6067C25.8483 7.65656 25.8645 7.70891 25.8844 7.76126C25.8944 7.78993 25.9118 7.8161 25.9193 7.84602C25.9423 7.93096 25.954 8.01853 25.9542 8.10652V33.7317L35.9355 27.9844V14.8846C35.9355 14.7973 35.948 14.7088 35.9704 14.6253C35.9792 14.5954 35.9954 14.5692 36.0053 14.5405C36.0253 14.4882 36.0427 14.4346 36.0702 14.386C36.0888 14.3536 36.1163 14.3274 36.1375 14.2975C36.1674 14.2576 36.1923 14.2165 36.2272 14.1816C36.2559 14.1529 36.292 14.1317 36.3244 14.1068C36.3618 14.0769 36.3942 14.0445 36.4341 14.0208L48.4147 7.12434C48.5663 7.03694 48.7383 6.99094 48.9133 6.99094C49.0883 6.99094 49.2602 7.03694 49.4118 7.12434L61.3899 14.0208C61.4323 14.0457 61.4647 14.0769 61.5021 14.1055C61.5333 14.1305 61.5694 14.1529 61.5981 14.1803C61.633 14.2165 61.6579 14.2576 61.6878 14.2975C61.7103 14.3274 61.7377 14.3536 61.7551 14.386C61.7838 14.4346 61.8 14.4882 61.8199 14.5405C61.8312 14.5692 61.8474 14.5954 61.8548 14.6253ZM59.893 27.9844V16.6121L55.7013 19.0252L49.9104 22.3593V33.7317L59.8942 27.9844H59.893ZM47.9149 48.5566V37.1768L42.2187 40.4299L25.953 49.7133V61.2003L47.9149 48.5566ZM1.99677 9.83281V48.5566L23.9562 61.199V49.7145L12.4841 43.2219L12.4804 43.2194L12.4754 43.2169C12.4368 43.1945 12.4044 43.1621 12.3682 43.1347C12.3371 43.1097 12.3009 43.0898 12.2735 43.0624L12.271 43.0586C12.2386 43.0275 12.2162 42.9888 12.1887 42.9539C12.1638 42.9203 12.1339 42.8916 12.114 42.8567L12.1127 42.853C12.0903 42.8156 12.0766 42.7707 12.0604 42.7283C12.0442 42.6909 12.023 42.656 12.013 42.6161C12.0005 42.5688 11.998 42.5177 11.9931 42.4691C11.9881 42.4317 11.9781 42.3943 11.9781 42.3569V15.5801L6.18848 12.2446L1.99677 9.83281ZM12.9777 2.36177L2.99764 8.10652L12.9752 13.8513L22.9541 8.10527L12.9752 2.36177H12.9777ZM18.1678 38.2138L23.9574 34.8809V9.83281L19.7657 12.2459L13.9749 15.5801V40.6281L18.1678 38.2138ZM48.9133 9.14105L38.9344 14.8858L48.9133 20.6305L58.8909 14.8846L48.9133 9.14105ZM47.9149 22.3593L42.124 19.0252L37.9323 16.6121V27.9844L43.7219 31.3174L47.9149 33.7317V22.3593ZM24.9533 47.987L39.59 39.631L46.9065 35.4555L36.9352 29.7145L25.4544 36.3242L14.9907 42.3482L24.9533 47.987Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        {canRegister &&
                                            <Link
                                                href={route('register')}
                                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Register
                                            </Link>
                                        }
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                                <div
                                    className="md:row-span-3 flex flex-col justify-between items-center gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-indigo-800 hover:ring-indigo-300 focus:outline-none focus-visible:ring-indigo-700  lg:p-10 lg:pb-10 dark:bg-indigo-900 dark:ring-indigo-700 dark:hover:text-white/70 dark:hover:ring-indigo-700 dark:focus-visible:ring-indigo-600"
                                >
                                    <h2 className="text-4xl font-semibold text-indigo-800 dark:text-white">
                                        Turnify
                                    </h2>
                                    <p className="text-sm/relaxed text-center" style={{ textWrap: 'balance' }}>
                                        La herramienta perfecta para el control de turnos horarios disponible para todos nuestros clientes. La herramienta está a disposición de todos nuestros clientes por el mismo precio que cualquier otra ETT.
                                    </p>
                                    <a href='tel:+34941000000' className='bg-indigo-500 text-2xl sm:text-4xl p-4 w-full rounded-xl items-center flex flex-col text-white gap-2 hover:bg-indigo-600  hover:shadow-inner shadow-lg'>
                                        <div className=" font-semibold">
                                            LLÁMANOS
                                        </div>
                                        <h2 className=' font-bold flex flex-col sm:flex-row gap-2 items-center'><HiPhone className='text-8xl sm:text-4xl' /><span className='hidden sm:block'> 941 00 00 00</span></h2>
                                    </a>
                                    <h2 className="text-xl font-semibold text-indigo-800 dark:text-white">
                                        Descubre el poder del control
                                    </h2>
                                    <p className="text-sm/relaxed text-center" style={{ textWrap: 'balance' }}>
                                        Nuestra ETT tiene herramientas y precios que compiten con las mayores del mercado.
                                    </p>
                                    <a href={aboutLink} className='w-full text-center'>
                                        SABER MAS
                                    </a>
                                </div>
                                <a href={aboutLink}
                                    className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-indigo-800 hover:ring-indigo-300 focus:outline-none focus-visible:ring-indigo-700 md:row-span-3 lg:p-10 lg:pb-10 dark:bg-indigo-900 dark:ring-indigo-700 dark:hover:text-white/70 dark:hover:ring-indigo-700 dark:focus-visible:ring-indigo-600"
                                >
                                    <h2 className="text-xl font-semibold text-black dark:text-white">
                                        Control de turnos
                                    </h2>
                                    <p className="mt-4 text-sm/relaxed">
                                        Revisa facilmente los turnos de tus trabajadores y corrígelos en caso de errores.
                                        Herramienta de edición de turnos sencilla y con un interfaz sencilla.
                                    </p>
                                    <div className='w-full bg-slate-100 p-2 rounded-lg shadow'>
                                        <div className='flex flex-col gap-3'>
                                            <div>
                                                <div className="bg-white text-slate-700 hover:text-white rounded-lg p-2 w-full hover:bg-slate-600 hover:cursor-pointer">
                                                    <div className="flex flex-row items-center gap-6">
                                                        <div className="grid grid-rows-3 justify-center w-20 mx-1 p-2 bg-slate-200 rounded-lg text-slate-700">
                                                            <p className="text-xs text-center">
                                                                lun
                                                            </p>
                                                            <div className="row-span-2 text-2xl font-bold place-content-center">
                                                                21
                                                            </div>
                                                        </div>

                                                        <div className="flex-1">
                                                            <div className=" text-lg font-semibold">
                                                                7h 25m
                                                            </div>
                                                            <hr className="max-w-3/5" />
                                                            <div className="flex flex-row justify-start items-center gap-2 text-slate-400">
                                                                <HiClock />
                                                                <span>
                                                                    12:00
                                                                    {' - '}
                                                                    <span className='text-green-600 text-sm'>en curso</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <HiArrowRight />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="bg-white text-slate-700 hover:text-white rounded-lg p-2 w-full hover:bg-slate-600 hover:cursor-pointer">
                                                    <div className="flex flex-row items-center gap-6">
                                                        <div className="grid grid-rows-3 justify-center w-20 mx-1 p-2 bg-slate-200 rounded-lg text-slate-700">
                                                            <p className="text-xs text-center">
                                                                vie
                                                            </p>
                                                            <div className="row-span-2 text-2xl font-bold place-content-center">
                                                                18
                                                            </div>
                                                        </div>

                                                        <div className="flex-1">
                                                            <div className=" text-lg font-semibold">
                                                                8h 05m
                                                            </div>
                                                            <hr className="max-w-3/5" />
                                                            <div className="flex flex-row justify-start items-center gap-2 text-slate-400">
                                                                <HiClock />
                                                                <span>
                                                                    12:01
                                                                    {' - '}
                                                                    20:06
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <HiArrowRight />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="bg-white text-slate-700 hover:text-white rounded-lg p-2 w-full hover:bg-slate-600 hover:cursor-pointer">
                                                    <div className="flex flex-row items-center gap-6">
                                                        <div className="grid grid-rows-3 justify-center w-20 mx-1 p-2 bg-slate-200 rounded-lg text-slate-700">
                                                            <p className="text-xs text-center">
                                                                jue
                                                            </p>
                                                            <div className="row-span-2 text-2xl font-bold place-content-center">
                                                                17
                                                            </div>
                                                        </div>

                                                        <div className="flex-1">
                                                            <div className=" text-lg font-semibold">
                                                                8h 02m
                                                            </div>
                                                            <hr className="max-w-3/5" />
                                                            <div className="flex flex-row justify-start items-center gap-2 text-slate-400">
                                                                <HiClock />
                                                                <span>
                                                                    11:58
                                                                    {' - '}
                                                                    20:00
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <HiArrowRight />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="bg-white text-slate-700 hover:text-white rounded-lg p-2 w-full hover:bg-slate-600 hover:cursor-pointer">
                                                    <div className="flex flex-row items-center gap-6">
                                                        <div className="grid grid-rows-3 justify-center w-20 mx-1 p-2 bg-slate-200 rounded-lg text-slate-700">
                                                            <p className="text-xs text-center">
                                                                mié
                                                            </p>
                                                            <div className="row-span-2 text-2xl font-bold place-content-center">
                                                                17
                                                            </div>
                                                        </div>

                                                        <div className="flex-1">
                                                            <div className=" text-lg font-semibold">
                                                                7h 45m
                                                            </div>
                                                            <hr className="max-w-3/5" />
                                                            <div className="flex flex-row justify-start items-center gap-2 text-slate-400">
                                                                <HiClock />
                                                                <span>
                                                                    12:04
                                                                    {' - '}
                                                                    19:49
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <HiArrowRight />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full text-center'>
                                        SABER MAS
                                    </div>
                                </a>

                                <div
                                    className="flex flex-col col-span-1 lg:col-span-2 justify-between items-center gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-indigo-800 hover:ring-indigo-300 focus:outline-none focus-visible:ring-indigo-700 md:row-span-3 lg:p-10 lg:pb-10 dark:bg-indigo-900 dark:ring-indigo-700 dark:hover:text-white/70 dark:hover:ring-indigo-700 dark:focus-visible:ring-indigo-600"
                                >
                                    <h2 className="text-4xl font-semibold text-indigo-800 dark:text-white">
                                        Cuentan con Turnify:
                                    </h2>
                                    <div className='flex flex-row items-center gap-4 w-4/5 max-w-100'>
                                        <div>
                                            <img className='' src="https://imgs.search.brave.com/MUziv8kWiEezbw29PJloPK7ZGCeXxxPJ6ZRFH3qwtf4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZG93bmxvYWQub3Jn/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE0/LzA0L2FtYXpvbi1s/b2dvLnBuZw" alt="" />
                                        </div>
                                        <div>
                                            <img src="https://imgs.search.brave.com/348XjNusQIZfyh1VQS-AKRhkYrbJjDQJlUzEy785bBM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/ZW50ZXIuY28vd3At/Y29udGVudC91cGxv/YWRzLzIwMTIvMDgv/bG9nb21zXzY2MC02/NjB4NDMyLmpwZw" alt="" />
                                        </div>
                                        <div>
                                            <img src="https://imgs.search.brave.com/gwZVrRLYJZe2uX0D_rPl3L2mFqskVns0mz57L9_JX0I/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODU2OGQyMjRmNmFl/MjAyZmVkZjI3MjAu/cG5n" alt="" />
                                        </div>
                                        <div>
                                            <img src="https://imgs.search.brave.com/3JjoEyu2K4zzO41dzaMtWN1gqzF5e0qbRxClPI6A-LM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cmVhc29ud2h5LmVz/L21lZGlhL2xpYnJh/cnkvbG9nby1zYW50/YW5kZXItMjAxOC5w/bmc" alt="" />
                                        </div>
                                    </div>

                                    <div className='bg-indigo-500 text-white p-6 w-full rounded-xl'>
                                        <h2 className='text-lg font-bold  text-center'>
                                            Contamos con
                                        </h2>
                                        <h2 className='text-6xl text-indigo-100 text-center font-bold'>
                                            {companies}
                                        </h2>
                                        <p className='text-center'>
                                            empresas que trabajan con nosotros con
                                        </p>
                                        <h2 className='text-6xl text-indigo-100 text-center font-bold'>
                                            {workers}
                                        </h2>
                                        <p className='text-center'>
                                            trabajadores
                                        </p>
                                    </div>

                                </div>

                                <a href={aboutLink}
                                    className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-indigo-800 hover:ring-indigo-300 focus:outline-none focus-visible:ring-indigo-700 md:row-span-3 lg:p-10 lg:pb-10 dark:bg-indigo-900 dark:ring-indigo-700 dark:hover:text-white/70 dark:hover:ring-indigo-700 dark:focus-visible:ring-indigo-600"
                                >
                                    <h2 className="text-xl font-semibold text-black dark:text-white">
                                        Céntrate en lo importante
                                    </h2>
                                    <p className="mt-4 text-sm/relaxed">
                                        Sin información de más, sin complejas opciones. Deja la gestión de lo complicado en manos de nuestra ETT. Tu solamente preocupate de tu negocio.
                                    </p>
                                    <div className='w-full bg-slate-100 p-2 rounded-lg shadow'>
                                        <div className='flex flex-col gap-3 items-center'>

                                            <div className="w-full sm:w-4/5 bg-white transition-all shadow-lg rounded-lg dark:bg-gray-800 ">
                                                <div className="flex flex-col items-center justify-center p-4 mt-2">
                                                    <img
                                                        alt="profil"
                                                        src={`https://ui-avatars.com/api/?name=John%20Smith`}
                                                        className="mx-auto object-cover rounded-full h-16 w-16  border-2 border-white dark:border-gray-800" />

                                                    <p className="mt-2 text-xl font-medium text-gray-800 dark:text-white ">
                                                        John Smith
                                                    </p>
                                                    <p className="mb-4 text-xs text-gray-400 group-hover:text-slate-200">
                                                        12541266P
                                                    </p>
                                                    <p className="p-2 px-4 text-xs text-white bg-indigo-300 rounded-full ">
                                                        johnsmith@email.com
                                                    </p>
                                                    <div className="w-full p-2 mt-4 rounded-lg">
                                                        <div className="grid grid-rows-3 sm:grid-cols-3 sm:grid-rows-1 items-center justify-center text-sm text-gray-600 dark:text-gray-200 ">
                                                            <p className="flex flex-col text-center">
                                                                Horas totales
                                                                <span className="font-bold text-black dark:text-white ">
                                                                    124h12m
                                                                </span>
                                                            </p>
                                                            <div className="mx-1 px-2 text-center flex justify-center">

                                                                <button
                                                                    className={`w-28 p-1 px-2 rounded-lg justify-normal text-white ${hoverState ?
                                                                        'bg-red-400 text-red-800'
                                                                        :
                                                                        'bg-green-400 text-white'
                                                                        }`}
                                                                    onMouseEnter={() => { setHoverState(true) }}
                                                                    onMouseLeave={() => { setHoverState(false) }}
                                                                    style={{ fontSize: '0.5rem' }}
                                                                >
                                                                    {hoverState ?
                                                                        'SALIR' :
                                                                        'TRABAJANDO'
                                                                    }
                                                                </button>


                                                            </div>
                                                            <p className="flex flex-col text-center">
                                                                Horas este mes
                                                                <span className="font-bold text-black dark:text-white ">
                                                                    61h05m
                                                                </span>
                                                            </p>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                        </div>
                                    </div>
                                    <div className='w-full text-center'>
                                        SABER MAS
                                    </div>
                                </a>

                                <a href={aboutLink}
                                    className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-indigo-800 hover:ring-indigo-300 focus:outline-none focus-visible:ring-indigo-700 md:row-span-3 lg:p-10 lg:pb-10 dark:bg-indigo-900 dark:ring-indigo-700 dark:hover:text-white/70 dark:hover:ring-indigo-700 dark:focus-visible:ring-indigo-600"
                                >
                                    <h2 className="text-xl font-semibold text-black dark:text-white">
                                        También para tus trabajadores
                                    </h2>
                                    <p className="mt-4 text-sm/relaxed">
                                        Permite a tus trabajadores fichar con un simple clic, estén donde estén y con un simple login.
                                    </p>
                                    <div className='w-full bg-slate-100 p-2 rounded-lg shadow'>
                                        <div className='flex flex-col gap-3'>


                                            <div className="bg-white rounded-lg p-6 col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-3 text-2xl ">
                                                <div style={{ textWrap: 'balance' }} className="pb-2">
                                                    <span className="font-semi-bold">
                                                        Hola
                                                    </span>
                                                    <span className="text-indigo-600 font-bold">
                                                        {' John Smith, hora de salir?'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className='py-4'>
                                                        <div style={{ textWrap: 'balance' }}>
                                                            Tu turno ha empezado a las 12h 25m, llevas 6h y 54 minutos en tu puesto

                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="mt-2 bg-indigo-500 p-4 px-6 rounded-xl text-white hover:bg-indigo-300 hover:text-indigo-800 transition-all">
                                                    SALIR
                                                </button>
                                            </div>



                                        </div>
                                    </div>
                                    <div className='w-full text-center'>
                                        SABER MAS
                                    </div>
                                </a>









                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
