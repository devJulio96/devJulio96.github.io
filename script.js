let operador;
let valores = [0];
let decimal = false;
let calculouRes = false;

const teclaRes = document.getElementById("tRes");
const display = document.querySelector(".display");
const teclaApag = document.getElementById("tApag");
const teclaLimp = document.getElementById("tLimp");
const teclaPonto = document.getElementById("tPonto");
const teclasOp = [...document.querySelectorAll(".oper")];
const teclasNum = [...document.querySelectorAll(".num")];

//Calcula o Resultado da operação
const obterRes = () => {
    let resultado;
    calculouRes = true;

    if(valores[1] != undefined){
        if(display.innerHTML.includes(".")){
            decimal = false;
        }
    
        switch (operador) {
            case "+":
                resultado = (valores[0] + valores[1]);
                break;
            case "-":
                resultado = (valores[0] - valores[1]);
                break;
            case "x":
                resultado = (valores[0] * valores[1]);
                break;
            case "/":
                resultado = (valores[0] / valores[1]);
                break;
        }
        
        //Verifica a saída numérica do resultado
        display.innerHTML = resultado.toLocaleString("en-US");
        
        if(display.innerHTML.includes("Infinity") ||display.innerHTML.includes("NaN")|| display.innerHTML.includes("∞")){
            display.innerHTML = "#####Erro#####"
            operador = undefined;
            valores.length = 0;
        } else{
            operador = undefined;
            valores.length = 0;
        }
    }
}

//"Zera" todas as variáveis
const zerarCalc = () => {
    display.innerHTML ="0";
    decimal = false;
    operador = undefined;
    valores.length = 0;
    calculouRes = false;
}

//Insere os valores dos numeros pressionados nos botões
teclasNum.forEach((el)=>{
    el.addEventListener("click", (evt)=>{
        const btnNum = evt.target.innerHTML;
        
        if(calculouRes == true){
            alert("Clique no botão C")
        } else {
            if(display.innerHTML == "0"){
                display.innerHTML ="";
                display.innerHTML += btnNum;     
            } else {
                display.innerHTML += btnNum;
            }
            
            if(valores[0] >= 0){
                valores = display.innerHTML.split(/\-|\/|\x|\+/).map(Number);
            } else {
                if(operador == undefined){
                    valores = display.innerHTML.split(/\/|\x|\+/).map(Number);
                } else {
                    valores[1] += btnNum;
                    valores[1] = Number(valores[1].replace('undefined',""));
                }
            }
        }
    })
})

//Insere os valores das operações pressionadas nos botões
teclasOp.forEach((el)=>{
    el.addEventListener("click", (evt)=>{
        let btnOp = evt.target.innerHTML;
        decimal = false;

        if(calculouRes == true){
            alert("Clique no botão C")
        } else {
            if(operador != undefined){
                if(valores[1] == undefined){
                    operador = btnOp;
                    display.innerHTML = display.innerHTML.slice(0,display.innerHTML.length-1) + `${operador}`;
                } else {
                    obterRes();
                    calculouRes = false;
                    valores[0] = Number(display.innerHTML);
                    operador = btnOp;
                    display.innerHTML += operador;
                } 
            } else {
                operador = btnOp;
                display.innerHTML += btnOp;
            }
        }
    })
})

//Insere ponto no display
teclaPonto.addEventListener("click", () =>{
    if(calculouRes == true){
        alert("Clique no botão C")
    } else {
        if(!decimal) {
            decimal = true;
            display.innerHTML += ".";
        }
    }
})

//Apaga o display e o display e os valores recebidos
teclaApag.addEventListener("click", zerarCalc)

//Limpa o ultimo numero do display
teclaLimp.addEventListener("click",()=>{
    if(calculouRes == true) {
        alert("Clique no botão C")
    } else {
        if(display.innerHTML.length == 1 ){
            display.innerHTML ="0"
        } else {
            display.innerHTML = display.innerHTML.slice(0,display.innerHTML.length-1)
        }
    
        if(valores[1] == "" || valores[1] == undefined){
            operador = undefined;
        }
        valores = display.innerHTML.split(/\-|\/|\x|\+/).map(Number);
    }
})

//Insere o resultado da operação no display
teclaRes.addEventListener("click",obterRes);

