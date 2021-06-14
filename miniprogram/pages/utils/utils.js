const test=msg=>{
  console.log(msg)
}

const compareDate = (d1, d2) => {
  let date1 = new Date(Date.parse(d1))
  let date2 = new Date(Date.parse(d2))
  return date1 < date2
}

module.exports ={
  test: test,
  compareDate: compareDate,
}