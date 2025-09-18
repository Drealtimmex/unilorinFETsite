"use client"
import React from 'react'
import { motion } from 'framer-motion';

const Logobg = () => {
  return (
    <motion.div className='animate-pulse '
        // initial = {{ scale: 1 }}
        // animate = {{
        //     scale : 1.2,
        //     transition : { duration: 2.0, repeat: Infinity}
        // }}
    >
        <div className='flex justify-center items-center -z-10 relative md:absolute top-0 right-0 contain-content'>
            <img src={"./logo 2.png"} alt="" className='w-[620px] /absolute -z-10' />
        </div>
    </motion.div>
  )
}

export default Logobg
