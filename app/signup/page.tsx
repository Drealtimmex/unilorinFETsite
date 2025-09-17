'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'

const Page = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    matricNumber: '',
    level: '100',
    department: '',
    securityQuestions: [{ question: '', answer: '' }],
  })

  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSecurityQuestionChange = (index, field, value) => {
    const newSecurityQuestions = [...formData.securityQuestions]
    newSecurityQuestions[index][field] = value
    setFormData({ ...formData, securityQuestions: newSecurityQuestions })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/auth/signup`, {
      email: formData.email,
      password: formData.password,
      role: formData.role,
      matricNumber: formData.matricNumber,
      level: Number(formData.level), // or +formData.level
      department: formData.department,
      securityQuestions: formData.securityQuestions.map((sq) => ({ question: sq.question, answer: sq.answer })),
    })
    if (response.status === 201) { // Note: The status code for created resources is usually 201, not 200
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        matricNumber: '',
        level: '100',
        department: '',
        securityQuestions: [{ question: '', answer: '' }],
      })
      alert('User signed up successfully!')
    }
  } catch (error) {
    setError(error.response.data.message)
    console.error(error)
  }
}

  return (
    <div className='bg-secondary'>
      <div className="flex flex-col text-center mx-3 gap-3 bg-background shadow-lg my-16 m-1 p-5 rounded-lg">
        <img src="Logo.png" alt="EngrConnect Logo" className="animate-pulse h-36 w-36 mx-auto" />
        <p className="font-bold text-primary/80 mb-5">
          Create your account.
        </p>
        <form className='flex justify-center items-center flex-col gap-2' onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="text-center text-lg w-full mx-2 border-2 border-secondary"
            placeholder="Email"
          />
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="text-center text-lg border-2 border-secondary"
            placeholder="Password"
          />
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="text-center text-lg border-2 border-secondary"
            placeholder="Confirm Password"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="text-center text-lg w-full max-w-sm gap-2 h-10"
          >
            <option value="" disabled>Select Role</option>
            <option value="hod">HOD</option>
            <option value="levelAdviser">Level Adviser</option>
            <option value="facultyofficer">Faculty Officer</option>
            <option value="dean">Dean</option>
            <option value="subdean">Sub-Dean</option>
            <option value="facultyPresident">Faculty President</option>
            <option value="facultyPRO">Faculty PRO</option>
            <option value="lecturer">Lecturer</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
          <Input
            type="text"
            name="matricNumber"
            value={formData.matricNumber}
            onChange={handleChange}
            className="text-center text-lg w-full mx-2 border-2 border-secondary"
            placeholder="Matric Number"
          />
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="text-center text-lg w-full max-w-sm gap-2 h-10"
          >
            <option value="" disabled>Select Level</option>
            <option value="100">100-level</option>
            <option value="200">200-level</option>
            <option value="300">300-level</option>
            <option value="400">400-level</option>
            <option value="500">500-level</option>
          </select>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="text-center text-lg w-full max-w-sm gap-2 h-10"
          >
            <option value="" disabled>Select Department</option>
            <option value="Agricultural and Bio Systems Engineering">
              Agricultural and Bio Systems Engineering
            </option>
            <option value="Water Resources and Environmental Engineering">
              Water Resources and Environmental Engineering
            </option>
            <option value="Chemical Engineering">
              Chemical Engineering
            </option>
            <option value="Food Engineering">Food Engineering</option>
            <option value="Computer Engineering">
              Computer Engineering
            </option>
            <option value="Electrical Engineering">
              Electrical Engineering
            </option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
            <option value="Biomedical Engineering">
              Biomedical Engineering
            </option>
            <option value="Material and Metallurgical Engineering">
              Material and Metallurgical Engineering
            </option>
          </select>
          {formData.securityQuestions.map((sq, index) => (
            <div key={index}>
              <select
                value={sq.question}
                onChange={(e) => handleSecurityQuestionChange(index, 'question', e.target.value)}
                className="text-center text-lg w-full max-w-sm gap-2 h-10"
              >
                <option value="" disabled>Select a Security Question</option>
                <option value="What is your mother's maiden name?">
                  What is your mother's maiden name?
                </option>
                <option value="What was the name of your first pet?">
                  What was the name of your first pet?
                </option>
                <option value="What is your favorite color?">
                  What is your favorite color?
                </option>
              </select>
              <Input
                type="text"
                value={sq.answer}
                onChange={(e) => handleSecurityQuestionChange(index, 'answer', e.target.value)}
                className="text-center text-lg w-full mx-2 border-2 border-secondary"
                placeholder="Your Answer"
              />
            </div>
          ))}
          <div className="d-flex d mb-4 text-end w-full">
            <Link href="#" className="text-primary/80">Already have an account?</Link>
          </div>
          <Button type="submit" className="w-full mx-5 font-bold text-xl">
            Sign Up
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Page












// const Page = () => {
//   const [formData, setFormData] = useState({
//     matricNoOrEmail: '',
//     password: '',
//     confirmPassword: '',
//     adminRole: '',
//     level: '',
//     department: '',
//     securityQuestion: '',
//     securityAnswer: '',
//     role: '',
//   })

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       console.log(`${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/auth/signup`)
//       const response = await axios.post(`${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/auth/signup`, formData)
      
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   return (
//     <div className='bg-secondary'>
//       <div className="flex flex-col text-center mx-3 gap-3 bg-background shadow-lg my-16 m-1 p-5 rounded-lg">
//         <img src="Logo.png" alt="EngrConnect Logo" className="animate-pulse h-36 w-36 mx-auto" />
//         <p className="font-bold text-primary/80 mb-5">
//           Create your account.
//         </p>
//         <form className='flex justify-center items-center flex-col gap-2' onSubmit={handleSubmit}>
//           <Input
//             type="text"
//             name="matricNoOrEmail"
//             value={formData.matricNoOrEmail}
//             onChange={handleChange}
//             className="text-center text-lg w-full mx-2 border-2 border-secondary"
//             placeholder="Matric No. or Email"
//           />
//           <Input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="text-center text-lg border-2 border-secondary"
//             placeholder="Password"
//           />
//           <Input
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             className="text-center text-lg border-2 border-secondary"
//             placeholder="Confirm Password"
//           />
//           <select
//             name="adminRole"
//             value={formData.adminRole}
//             onChange={handleChange}
//             className="text-center text-lg w-full max-w-sm gap-2 h-10"
//           >
//             <option value="" disabled>Select Admin Role</option>
//             <option value="Level Adviser">Level Adviser</option>
//             <option value="HOD">HOD</option>
//             <option value="Faculty Officer">Faculty Officer</option>
//             <option value="Lecturer">Lecturer</option>
//             <option value="Associate Professor">Associate Professor</option>
//           </select>
//           <select
//             name="level"
//             value={formData.level}
//             onChange={handleChange}
//             className="text-center text-lg w-full max-w-sm gap-2 h-10"
//           >
//             <option value="" disabled>Select Level</option>
//             <option value="100">100-level</option>
//             <option value="200">200-level</option>
//             <option value="300">300-level</option>
//             <option value="400">400-level</option>
//             <option value="500">500-level</option>
//           </select>
//           <select
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//             className="text-center text-lg w-full max-w-sm gap-2 h-10"
//           >
//             <option value="" disabled>Select Department</option>
//             <option value="Agricultural and Bio Systems Engineering">
//               Agricultural and Bio Systems Engineering
//             </option>
//             <option value="Water Resources and Environmental Engineering">
//               Water Resources and Environmental Engineering
//             </option>
//             <option value="Chemical Engineering">
//               Chemical Engineering
//             </option>
//             <option value="Food Engineering">Food Engineering</option>
//             <option value="Computer Engineering">
//               Computer Engineering
//             </option>
//             <option value="Electrical Engineering">
//               Electrical Engineering
//             </option>
//             <option value="Civil Engineering">Civil Engineering</option>
//             <option value="Mechanical Engineering">
//               Mechanical Engineering
//             </option>
//             <option value="Biomedical Engineering">
//               Biomedical Engineering
//             </option>
//             <option value="Material and Metallurgical Engineering">
//               Material and Metallurgical Engineering
//             </option>
//           </select>
//           <select
//             name="securityQuestion"
//             value={formData.securityQuestion}
//             onChange={handleChange}
//             className="text-center text-lg w-full max-w-sm gap-2 h-10"
//           >
//             <option value="" disabled>Select a Security Question</option>
//             <option value="What is your mother's maiden name?">
//               What is your mother's maiden name?
//             </option>
//             <option value="What was the name of your first pet?">
//               What was the name of your first pet?
//             </option>
//             <option value="What is your favorite color?">
//               What is your favorite color?
//             </option>
//           </select>
//           <Input
//             type="text"
//             name="securityAnswer"
//             value={formData.securityAnswer}
//             onChange={handleChange}
//             className="text-center text-lg w-full mx-2 border-2 border-secondary"
//             placeholder="Your Answer"
//           />
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="text-center text-lg w-full max-w-sm gap-2 h-10"
//           >
//             <option value="student">Student</option>
//             <option value="admin">Admin</option>
//           </select>
//           <div className="d-flex d mb-4 text-end w-full">
//             <Link href="#" className="text-primary/80">Already have an account?</Link>
//           </div>
//           <Button type="submit" className="w-full mx-5 font-bold text-xl">
//             Sign Up
//           </Button>
//         </form>
//       </div>
//     </div>
//   )
// }
