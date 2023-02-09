
function myFunction() {
  var x = document.getElementById("myCountySelect").value;
 if(x=="Sligo"){
  document.getElementById("weatherWidget").innerHTML=`
  <a class="weatherwidget-io" href="https://forecast7.com/en/54d16n8d61/sligo/" data-label_1="SLIGO"
          data-label_2="WEATHER" style="margin-bottom: 2%;" data-theme="original">SLIGO WEATHER</a>
  `;
 }else if(x=="Cork"){
  document.getElementById("weatherWidget").innerHTML=`
  <a class="weatherwidget-io" href="https://forecast7.com/en/51d90n8d49/cork/" data-label_1="CORK" data-label_2="WEATHER" data-theme="original" >CORK WEATHER</a>
  `;

 }else if(x=="Dublin"){
  document.getElementById("weatherWidget").innerHTML=`
  <a class="weatherwidget-io" href="https://forecast7.com/en/53d35n6d26/dublin/" data-label_1="DUBLIN" data-label_2="WEATHER" data-theme="original" >DUBLIN WEATHER</a>
  `;

}else if(x=="Donegal"){
document.getElementById("weatherWidget").innerHTML=`
<a class="weatherwidget-io" href="https://forecast7.com/en/54d65n8d11/donegal/" data-label_1="DONEGAL" data-label_2="WEATHER" data-theme="original" >DONEGAL WEATHER</a>
  `;

}else if(x=="Limerick"){
document.getElementById("weatherWidget").innerHTML=``;
document.getElementById("weatherWidget").innerHTML+=`
<a class="weatherwidget-io" href="https://forecast7.com/en/52d67n8d63/limerick/" data-label_1="LIMERICK" data-label_2="WEATHER" data-theme="original" >LIMERICK WEATHER</a>
  `;

}else if(x=="Leitrim"){
document.getElementById("weatherWidget").innerHTML=`
<a class="weatherwidget-io" href="https://forecast7.com/en/53d99n8d07/leitrim-village/" data-label_1="LEITRIM" data-label_2="WEATHER" data-theme="original" >LEITRIM WEATHER</a>

  `;

}else if(x=="Cavan"){
document.getElementById("weatherWidget").innerHTML=`
<a class="weatherwidget-io" href="https://forecast7.com/en/53d99n7d36/cavan/" data-label_1="CAVAN"
data-label_2="WEATHER" data-theme="original">CAVAN WEATHER</a>

`;
}

}

