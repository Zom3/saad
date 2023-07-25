let  title =  document.getElementById('title');
let  ads =  document.getElementById('ads');
let  taxes =  document.getElementById('taxes');
let  discount =  document.getElementById('discount');
let  total =  document.getElementById('total');
let  price =  document.getElementById('price');
let  small =  document.getElementById('small');
let  count =  document.getElementById('count');
let  category =  document.getElementById('category');
let  sumbit =  document.getElementById('sumbit');
let mood =  'create';

let tmp ;


function gettotal(){

if(price.value !=''){

let result = (+price.value + +taxes.value + +ads.value) - +discount.value;

total.innerHTML = result;
total.style.background= '#040' ;


}else{
total.innerHTML ='';
total.style.background= 'darkred' ;
}
}

let datapro;
if(localStorage.product !=null){
datapro = JSON.parse(localStorage.product)
}else{
datapro = [];

}




sumbit.onclick = function()
{

let newpro = {
    title:title.value.toLowerCase(),
    price:price.value,
    ads:ads.value,
    taxes:taxes.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),

}
if(title.value != '',
price.value !='' , 
category.value !='',newpro.count < 100){

if(mood ==='create'){

if(newpro.count > 1){

for( let i = 0 ; i < newpro.count;i++){

datapro.push(newpro);

}

}else{

datapro.push(newpro);

}

}else{ 
    clearData()
}

datapro[   tmp   ] = newpro ;
mood = 'create';
sumbit.innerHTML = 'create';
count.style.display = 'block';


}

localStorage.setItem('product'  ,  JSON.stringify(datapro)  )

showdata() 
}


function clearData(){
title.value = '';
ads.value = '';
taxes.value = '';
price.value = '';
category.value = '';
total.innerHTML = '';
count.value ='';

}

function showdata(){

let table = '';
for(i = 0; i < datapro.length ;i++ ){
table += `

<tr>
<td>${i+1}</td>
<td>${datapro[i].title}</td>
<td>${datapro[i].price}</td>
<td>${datapro[i].taxes}</td>
<td>${datapro[i].discount}</td>
<td>${datapro[i].total}</td>
<td>${datapro[i].category}</td>
<td>${datapro[i].ads}</td>
<td><button onclick ='updatedata ( ${i} )'  id="Update">Update</button></td>
<td><button onclick=' deletedata( ${i} ) ' id="Delete">Delete</button></td>
</tr>

`
}


document.getElementById('tbody').innerHTML = table ;
let btndelete = document.getElementById('delteAll');
if(datapro.length > 0){
    btndelete.innerHTML=`
    
    <button onclick="deleteAll()">Delete All(${datapro.length})</button>
    
    
    `

}else{
    btndelete.innerHTML='';

}


}



showdata()

function deletedata(i){

console.log(i)
datapro.splice(i,1);
localStorage.product = JSON.stringify ( datapro );
showdata()
}

function deleteAll(){

localStorage.clear()
datapro.splice(0)

showdata()

}



function updatedata(i){


    console.log(i)

title.value = datapro[i].title;
price.value = datapro[i].price;
ads.value = datapro[i].ads;
taxes.value = datapro[i].taxes;
discount.value = datapro[i].discount;
category.value = datapro[i].category;
gettotal()
count.style.display = 'none'
sumbit.innerHTML = 'update'

mood = 'update';
tmp = i ;

scroll({


top:0,
behavior:'smooth'



})
}


let searchmood = 'title';

function getsearchmood(id)
{

let search = document.getElementById('search');

if(id =='search title'){
searchmood = 'title';


}else{

searchmood = 'category'

}
search.placeholder = 'Search By ' + searchmood;
search.focus()
console.log(searchmood)
search.value = '';
showdata()
}



function searchdata(value)
{
let table ='';
for(let i = 0; i < datapro.length ; i++){
if(searchmood == 'title'){


    if(datapro[i].title.includes(value.toLowerCase())){
        table += `
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td>${datapro[i].ads}</td>
        <td><button onclick ='updatedata ( ${i} )'  id="Update">Update</button></td>
        <td><button onclick=' deletedata( ${i} ) ' id="Delete">Delete</button></td>
        </tr>
        
        `;
    

}


}else{
    
if(datapro[i].category.includes(value.toLowerCase())){
            table += `
    
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td>${datapro[i].ads}</td>
            <td><button onclick ='updatedata ( ${i} )'  id="Update">Update</button></td>
            <td><button onclick=' deletedata( ${i} ) ' id="Delete">Delete</button></td>
            </tr>
            
            `;
}

}
}
document.getElementById('tbody').innerHTML = table ;

}
    