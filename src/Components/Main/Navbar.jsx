import React, { useEffect, useState, useContext } from 'react'
import { Navbar, Avatar } from 'flowbite-react'
import AppSettings from '../../app.settings.json'
import userProfile from '../../assets/user.png'
import { capitalizeFirstLetter } from '../../App'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../App'

export const HomeNavbar = () => {
  const { pendingTransfer, prices, balance, setBalance } = useContext(GlobalContext)
  const [showProfile, setShowProfile] = useState(false)
  const [userInfo, setUserInfo] = useState({
    username: "",
    balance: 0.00
  })
  const navigate = useNavigate()

  useEffect(() => {
    let info = JSON.parse(localStorage.getItem('usr_info'))
    const check_balance = async () => {
      await fetch(`${AppSettings.APIserver}/check_balance/${info.id}`).then(res => res.json())
        .then(res => {
          setBalance(res.balance)
          setUserInfo({ username: info.username, account_type: info.account_type })
        })
    }
    check_balance()
  }, [])



  useEffect(() => {
    var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Change the icons inside the button based on previous settings
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      if (themeToggleLightIcon !== null) themeToggleLightIcon.classList.remove('hidden');
    } else {
      if (themeToggleDarkIcon !== null) themeToggleDarkIcon.classList.remove('hidden');
    }

    var themeToggleBtn = document.getElementById('theme-toggle');

    themeToggleBtn.addEventListener('click', function () {

      // toggle icons inside button
      themeToggleDarkIcon.classList.toggle('hidden');
      themeToggleLightIcon.classList.toggle('hidden');

      // if set via local storage previously
      if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        }

        // if NOT set via local storage previously
      } else {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        }
      }

    });
  }, [])

  return (
    <Navbar
      fluid
      rounded
    >
      <Navbar.Brand >
        <img
          alt="Flowbite Logo"
          className="mr-3 h-6 sm:h-9"
          src="https://flowbite.com/docs/images/logo.svg"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          SafeCoin
        </span>

      </Navbar.Brand>


      <Navbar.Brand className="flex-1 flex justify-end mr-2 ">
        <button id="theme-toggle" type="button" class="bg-gray-50 mr-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
          <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
          <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
        </button>

        <img onClick={() => setShowProfile(!showProfile)} type="button" class="w-10 h-10 rounded-full cursor-pointer" src={userProfile} alt="User dropdown" />

        {showProfile && <div id="userDropdown" class="z-10 absolute top-16 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
          <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div class="font-medium text-md truncate">{capitalizeFirstLetter(userInfo.username)}</div>
          </div>
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">

            <li>
              <span href="#" class="block px-4 font-bold py-2 dark:hover:bg-gray-600 dark:hover:text-white">
                Balance: {balance} ฿
              </span>
            </li>
            <li>
              <span class="block px-4 py-2 font-bold dark:hover:bg-gray-600 dark:hover:text-white">Account: {userInfo.account_type}</span>
            </li>
          </ul>
          <div class="py-1">
            <a onClick={() => {
              localStorage.clear()
              navigate("/login")
              window.location.reload()
            }} href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
          </div>
        </div>
        }


      </Navbar.Brand>


    </Navbar>
  )
}