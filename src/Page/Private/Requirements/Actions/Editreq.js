import React from 'react'

export default function Editreq() {
    let errors = {};
    const currentDate = moment();
    if(!newDeadline || newDeadline === ''){
      errors.newdate = 'Select A Deadline Date First'
      swal({
        text: 'Select A Deadline Date First',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    else{
    const date = new Date(newDeadline).toDateString();
    const targetDate = moment(date);
    if (targetDate.isBefore(currentDate)) {
      swal({
        text: 'Selected Deadline is less than the current date!',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
    const formData = new FormData();
    formData.append('newDeadline',date);
    formData.append('reqid',selected.requirementID)
    setOpenDialog(false)
    setShowBackdrop(true);
    NewDeadline.NEW_DEADLINE(formData)
    .then(res => {
      setReqlist(res.data.Requirements.results);
      setOpenDialog(false)
      setShowBackdrop(false);
      swal({
        text: 'Updated Successfully',
        timer: 2000,
        buttons: false,
        icon: "success",
      })
      setErrors('')

    }
     )
    .catch(err => console.log(err));
}
}
