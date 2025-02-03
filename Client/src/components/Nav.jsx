import React from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PATHROUTES from '../helpers/PathRoutes.helper';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../redux/actions';
import styles from "./styles/ButtonDefault.module.sass"

const navigation = [
  { name: 'Autogestion', href: '#', current: true },
  { name: 'SEO', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example({ isAdmin, imagePerfil }) {
  const userLoggedInfo = useSelector(state => state.UserLogued);
  // console.log(isAdmin);
  //console.log(imagePerfil);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      localStorage.clear();
      await dispatch(logOutUser()); // Asegúrate de que postUser retorna una promesa
      await navigate(PATHROUTES.LANDING);
      //console.log("Estado global después del logout", userLoggedInfo); // Puede que este valor no esté actualizado inmediatamente
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-[#194da0] fixed z-10 w-full">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center  sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to={isAdmin === undefined ? `${PATHROUTES.LANDING}` : `${PATHROUTES.HOME}`}>
                  <img
                    className="h-12 w-auto"
                    src="https://www.unsta.edu.ar/wp-content/uploads/2019/10/UNSTA_isologotipo-1.png"
                    alt="Your Company"
                  /></Link>
                </div>
                <div className="hidden sm:ml-6 sm:block sm:items-center">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? ' text-white hover:text-gray-950 hover:bg-[#b0ddff]'
                            : 'text-white hover:text-gray-950 hover:bg-[#b0ddff]',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {location.pathname === PATHROUTES.LANDING ? (
                <Link to={PATHROUTES.LOGIN}>
                  <button className={styles.buttonInvert}>
                    Login
                  </button>
                </Link>
              ) : (
                location.pathname !== PATHROUTES.LOGIN && location.pathname !== PATHROUTES.SIGNIN && (
                  // Profile dropdown
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton button-menu-id="menu" className="text-white relative py-2 px-2 pr-5 pl-5 flex rounded-xl bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        {/* <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={imagePerfil}
                          alt=""
                        /> */}
                      {userLoggedInfo.fullName}
                      </MenuButton>
                    </div>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {isAdmin ? (
                          <>
                            <MenuItem button-dashboard-id="dashboard">
                              {({ active }) => (
                                <Link to={PATHROUTES.DASHBOARD}>
                                  <a
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Dashboard
                                  </a>
                                </Link>
                              )}
                            </MenuItem>
                            <MenuItem button-newPublish-id="newPublish">
                              {({ active }) => (
                                <Link to={PATHROUTES.PUBLISH}>
                                  <a
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Nueva Publicacion
                                  </a>
                                </Link>
                              )}
                            </MenuItem>
                            <MenuItem button-newCompanie-id="newCompanie">
                              {({ active }) => (
                                <Link to={PATHROUTES.FORM_ADD_COMPANIES}>
                                  <a
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Nueva Empresa
                                  </a>
                                </Link>
                              )}
                            </MenuItem>
                            <MenuItem button-newCarrer-id="newCarrer">
                              {({ active }) => (
                                <Link to={PATHROUTES.FORM_ADD_CARRER}>
                                  <a
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Nueva Carrera
                                  </a>
                                </Link>
                              )}
                            </MenuItem>
                            <MenuItem button-logout-id="logout">
                              {({ active }) => (
                                <a
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                  onClick={handleLogout}
                                >
                                  Sign out
                                </a>
                              )}
                            </MenuItem>
                          </>
                        ) : (
                          <>
                            <MenuItem button-perfil-id="perfil">
                              {({ active }) => (
                                <Link to={PATHROUTES.PERFIL}>
                                  <a
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Your Profile
                                  </a>
                                </Link>
                              )}
                            </MenuItem>
                            <MenuItem button-logout-id="logout">
                              {({ active }) => (
                                <a
                                  onClick={handleLogout}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Sign out
                                </a>
                              )}
                            </MenuItem>
                          </>
                        )}
                      </MenuItems>
                    </Transition>
                  </Menu>
                )
              )}
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? ' text-gray-300  hover:text-white hover:bg-[#3d6ab3]'
                      : ' text-gray-300 hover:text-white hover:bg-[#3d6ab3]',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
