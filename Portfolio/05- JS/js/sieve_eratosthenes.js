/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

var sieve = function (n) {
    "use strict";

    var array = [], primes = [], i, j;
    for( i=1; i<=n; i++){
        array.push(i);
    }
    for( i=2; i*i<=n; i++){
        if( array[i]!='x'){
            for (j= i*i; j<=n; j+=i){
                array[j]='x';
            }
            primes.push(i);
        }
    }

    return primes;
};
/*
function showsieve() {
    "use strict";
    var sieve=[];
    sieve=sieve(1000000);
    var x = parseInt (document.getElementById("num").value);
    
    var fnl="";
    for( var i=0; sieve[i]<=x; i++){
        fnl= fnl.concat( sieve[i], " ");
    }
    document.getElementById("answ2").innerHTML = "El texto inicial es: ";
}
*/
console.log(sieve(1000000));