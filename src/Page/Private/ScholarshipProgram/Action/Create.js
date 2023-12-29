import React from 'react'

export default function Create() {

    event.preventDefault();
    if(title === '' || description === '' || status === ''){
      swal({
        text: 'Please Provide necessary Information',
        timer: 2000,
        buttons: false,
        icon: "warning",
      })
      return
    }
    if(icon === null){
      swal("Error!", "Image must be selected and have a valid file format(PNG or JPEG only).", "error");
      return
    }
    const fileExtension = icon.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg')  {
      swal({
        text: 'Please upload a PNG or JPG image only.',
        timer: 2000,
        buttons: false,
        icon: "error",
      });
      setSchoimg(null)
      return false;
    }
    const start = dayjs(startDate).format('YYYY-MM-DD')
    const end = dayjs(endDate).format('YYYY-MM-DD')
    const formData = new FormData();
    formData.append('icon',icon)
    formData.append('title',title)
    formData.append('description',description)
    formData.append('status',status)
    formData.append('startDate',start)
    formData.append('endDate',end)
    setOpen(false)
    setShowBackdrop(true);
    CreateSchoProg.CREATE_SCHOPROG(formData)
    .then(res => {
      const list = res.data.SchoCat?.map((data) =>{
        const start = dayjs(data.startDate).format('MMMM DD, YYYY');
        const end = dayjs(data.endDate).format('MMMM DD, YYYY');
        return({
          ...data,
          startDate: start,
          endDate: end
        })
      })
      setSchocat(list)
      setSchodesc('')
      setSchoimg('')
      setStatusCheck('');
      setSchotitle('')
      setStartDate(null)
      setEndDate(null)
      setShowBackdrop(false);
      swal({
        title: "Success",
        text: "Scholarship Program has been Added!",
        icon: "success",
        button: "OK",
      });
    }
     )
    .catch(err => console.log(err));
  
}
