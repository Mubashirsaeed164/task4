function Ruh() {
    const name = ['(RUH)الرياض']
    const arr = name[0].split(')')
    console.log('array is: ', arr)
    const final = arr[1]
    console.log(final, "final is: ")
    const finalarr = name[0].replace(final,"")
    console.log("finalarr", finalarr)

  return (
    <>
      <div className="container">
    
        <div className="box">
          {final}<br/>
        {finalarr }
        <br/>
        </div>
     
      </div>
    </>
  )
}

export default Ruh