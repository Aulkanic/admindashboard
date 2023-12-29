import React from 'react'

export default function Edit() {
    if(icon1){
        const fileExtension = icon1.name.split('.').pop().toLowerCase();
        if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg')  {
          swal({
            text: 'Please upload a PNG or JPG image only.',
            timer: 2000,
            buttons: false,
            icon: "error",
          });
        
          return false;
        }
      }
      const start = dayjs(startDate || olddata.startDate).format('YYYY-MM-DD')
      const end = dayjs(endDate || olddata.endDate).format('YYYY-MM-DD')
      const schoid =  olddata.schoProgId;
      const icon = icon1 || olddata.icon;
      const title1 = titleu || olddata.name;
      const description1 = descriptionu || olddata.description;
      const status1 = statusu || olddata.status; 
      const formData = new FormData();
      formData.append('title',title1);
      formData.append('description',description1);
      formData.append('status',status1);
      formData.append('icon',icon);
      formData.append('schoid',schoid);
      formData.append('startDate',start)
      formData.append('endDate',end)
      setOpen1(false)
      setShowBackdrop(true);
      UpdateSchoProg.UPDATE_SCHOPROG(formData)
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
        setStartDate(null)
        setEndDate(null)
        setShowBackdrop(false);
        swal({
          title: "Success",
          text: "Scholarship Program has been Changed!",
          icon: "success",
          button: "OK",
        });
    
      }
       )
      .catch(err => console.log(err));
}
