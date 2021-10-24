/*ช่องเปลี่ยนหน่วยเงิน*/
const currency_one = document.getElementById('currency-one');
const currency_two = document.getElementById('currency-two');
/*ช่องรับเงิน*/
const amount_one = document.getElementById("amount-one");
const amount_two = document.getElementById("amount-two");

/*อัตราการเเลกเปลี่ยน*/
const ratetxt = document.getElementById("rate");

/*ปุ่นสลับสุกลเงิน Class*/
const swap = document.getElementById("btn")

currency_one.addEventListener("change",calculateMoney);
currency_two.addEventListener("change",calculateMoney);
amount_one.addEventListener("input",calculateMoney)
amount_two.addEventListener("input",calculateMoney)


function calculateMoney(){
    const one = currency_one.value;
    const two = currency_two.value;
    let url = `https://api.exchangerate-api.com/v4/latest/${one}`
    fetch(url).then(res=>res.json()).then(data=>{
        const rate = data.rates[two];
        ratetxt.innerText=`1 ${one} = ${rate} ${two}`;
        amount_two.value = (amount_one.value * rate).toFixed(2); //เอามาคูณกัน ช่อง 1 * API ---> ไปเเสดงผล ช่อง2
    })
}
swap.addEventListener("click",()=>{
    // THB => USD ---> THB ---> TEMP ---> USD ----> TEMP
    const TEMP = currency_one.value; // ต้นทาง
    currency_one.value = currency_two.value;
    currency_two.value = TEMP;
    calculateMoney();
})
calculateMoney();
