const form = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('.message-1')
const messageTwo = document.querySelector('.message-2') 


form.addEventListener('submit',(e)=>{
    e.preventDefault()
   const location = searchElement.value
   console.log(location)

   fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
 response.json().then((data)=>{
    if(data.error){
    messageTwo.textContent = data.error+" "+'!'
    }else{
      console.log(data.weather)
      messageOne.textContent = data.location
      messageTwo.textContent=data.weather
    }
    
 })
})

})