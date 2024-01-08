import React from 'react'

export default function Deletereq() {
    const formData = new FormData();
    formData.append('reqID',data.requirementID)
    setShowBackdrop(true);
    DeleteReq.DELETE_REQ(formData)
    .then(res => {
      setReqlist(res.data.Requirements.results);
      setShowBackdrop(false);
      setOpenDialog(false)
      swal({
        text: 'Deleted Successfully',
        timer: 2000,
        buttons: false,
        icon: "success",
      })
      setErrors('')

    }
     )
    .catch(err => console.log(err));
}
