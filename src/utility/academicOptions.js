import React from 'react'

export const academicOptions = () => {   
    
    const currentYear = new Date().getFullYear();

    // Generate academic years dynamically
    const academicYears = [];
    for (let i = -1; i < 4; i++) {
      const startYear = currentYear + i;
      const endYear = startYear + 1;
      const academicYear = `${startYear}-${endYear}`;
      academicYears.push(academicYear);
    }
    return academicYears
}
