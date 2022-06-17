const bill = document.getElementById('bill'),
numberOfPeople = document.getElementById('number-people'),
tipRate =document.getElementById('tip-rate'),
tipAmount = document.getElementById('tip-amount'),
total =document.getElementById('total'),
form = document.getElementById('form-calculator'),
btnsTip = document.querySelectorAll('.btn-tip'),
reset =document.getElementById('reset')
let btnActive,tipValue,billValue,peopleValue

btnsTip.forEach(el=>{
    el.addEventListener('click',e=>{
        btnsTip.forEach(el=>el.classList.remove('active'))
        tipRate.value=''
        el.classList.add('active')
        btnActive=e.target
    })
})
const cleanErrors = ()=>{
    if(document.getElementById('error-bill')!==null) document.getElementById('error-bill').remove()
    if(document.getElementById('error-tip')!==null) document.getElementById('error-tip').remove()
    if(document.getElementById('error-people')!==null) document.getElementById('error-people').remove()
}
const showErrors = ()=>{
    if(bill.value===''){
        bill.closest('.input-bill').querySelector('label').insertAdjacentHTML('afterend',`<span id="error-bill" class="text-light-error">Can't be zero</span>`)
    }
    if(btnActive===undefined && tipRate.value===''){
        document.getElementById('label-tip').insertAdjacentHTML('afterend',`<span id="error-tip" class="text-light-error">Select a tip</span>`)
    }
    if(numberOfPeople.value=='') {
        numberOfPeople.closest('.input-people').querySelector('label').insertAdjacentHTML('afterend',`<span id="error-people" class="text-light-error">Can't be zero</span>`)
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    cleanErrors()
    showErrors()

    if(tipRate.value!==''){
        tipValue=parseFloat(tipRate.value) 
        btnsTip.forEach(el=>el.classList.remove('active'))
    }
    if(btnActive!==undefined && tipRate.value===''){
        tipValue = parseFloat(btnActive.textContent)
    }
    billValue = parseFloat(bill.value)
    peopleValue = parseInt(numberOfPeople.value)

    if(isNaN(billValue) || isNaN(tipValue) || isNaN(peopleValue)){
        tipAmount.textContent = (0).toFixed(2)
        total.textContent = (0).toFixed(2)
    }else{
        tipAmount.textContent = (billValue*tipValue/(100*peopleValue)).toFixed(2)
        total.textContent = (billValue*(100+tipValue)/(100*peopleValue)).toFixed(2)
    }

    
    console.log(isNaN(billValue))
})

reset.addEventListener('click',e=>{
    tipAmount.textContent = (0).toFixed(2)
    total.textContent = (0).toFixed(2)
    bill.value=''
    numberOfPeople.value=''
    tipRate.value=''
    btnsTip.forEach(el=>el.classList.remove('active'))
})