import React from 'react'
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
const PriceTag = ({amount , type}) => {
  return (
    <div>
          {type === 'expense' ? <p className='px-1 py-0.5 bg-red-300 text-red-800 flex items-center gap-x-0.5 rounded-sm'>-<span className='text-red-800'>&#8377;</span>{amount} <FaArrowTrendDown className='text-red-800' />   </p> : <p className='px-1 py-0.5 bg-green-300 text-green-800 flex items-center gap-x-0.5 rounded-sm'>-<span className='text-green-800'>&#8377;</span>{amount} <FaArrowTrendUp className='text-green-800' />   </p>}
    </div>
  )
}

export default PriceTag
