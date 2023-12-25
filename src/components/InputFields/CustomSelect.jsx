import React from 'react'
import Select from 'react-select'

export const CustomSelect = ({ label, value, onChange, options,placeholder}) => {
  return (
    <div>
      <label className='block text-gray-900 text-sm mb-2'>
        {label}
      </label>
      <Select
        fullWidth
        className='h-full text-gray-900 text-sm'
        value={options.find((option) => option.value === value)}
        onChange={onChange}
        placeholder={placeholder}
        isSearchable={false}
        options={options}
      />
    </div>
  )
}
