"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import contact from '@/data/cont';

const Audio = () => {
  return (
    <div className="flex flex-col items-center md:justify-center max-w-5xl mx-auto">
        <div className="flex flex-row items-center justify-between m-10 px-2 md:px-10 w-full">
          <div className="text-center text-4xl font-semibold">Audio</div>
          <Button variant={"outline"} className="border-accent text-accent text-lg  bg-transparent hover:text-slate-100 hidden md:flex">add audio admin</Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-5">
          {contact.team.map((member, index)=>{
            return (
              <div key={index} className="bg-secondary max-w-[170px] h-[20vh] rounded-lg p-5 flex flex-col justify-center">
                <div className="font-semibold text-center text-lg">{member.name}</div>
                <div className="text-center text-sm text-accent">{member.position}</div>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default Audio
