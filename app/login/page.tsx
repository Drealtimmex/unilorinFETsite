'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Page = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  })

    const storedData = localStorage.getItem('user');
    if (storedData) {
      const userData = JSON.parse(storedData);
      // use the userData object
    }
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/auth/signin`, {
      email: formData.identifier.includes('@') ? formData.identifier : undefined,
      matricNumber: !formData.identifier.includes('@') ? formData.identifier : undefined,
      password: formData.password,
    })
    if (response.status === 200) {
      router.push('/home')
    }
    console.log(response.data)
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  } catch (error) {
    console.error(error)
  }
}

  return (
    <div className='bg-secondary'>
      <div className="flex flex-col text-center mx-3 gap-3 bg-background shadow-lg my-16 m-1 p-5 rounded-lg">
        <img src="Logo.png" alt="EngrConnect Logo" className="h-36 animate-pulse w-36 mx-auto" />
        <p className="font-bold text-primary/80 mb-5">
          Please sign in to continue to the dashboard.
        </p>
        <form className='flex justify-center items-center flex-col gap-2' onSubmit={handleSubmit}>
          <Input
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            className="text-center text-lg w-full mx-2 border-2 border-secondary"
            placeholder="Matric No. or Email"
          />
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="text-center text-lg border-2 border-secondary"
            placeholder="Password"
          />
          <div className="d-flex d mb-4 text-end w-full">
            <Link href="#" className="text-primary/80">Forgot Password ?</Link>
          </div>
          <Button type="submit" className="w-full mx-5 font-bold text-xl">
            Sign In
          </Button>
        </form>
        
        <div className="mt-3">
          <div className="text-xs text-primary/80">
            <div>Don't have an account?</div> 
              <span><Link href="#" className='text-blue-500 underline underline-offset-2'> 
                Sign up
              </Link></span>
            </div>
        </div>
      </div>
    </div>
  )
}


export default Page