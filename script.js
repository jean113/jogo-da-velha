(function()
{
    var tabuleiro = ['','','','','','','','',''];
    var game_over = false;    
    var intervalo = null;

    inicio();

    function inicio()
    {
        montarTabuleiro();  
    }

    function montarTabuleiro()
    {
        var tabuleiro_layout = document.getElementById("tabuleiro");
       
        for(var i=0; i < 9 ; i++)
        {
            var posicao = document.createElement('div');
            posicao.className = "posicao";
            posicao.setAttribute('id', i);
            posicao.addEventListener('click', jogador);
            tabuleiro_layout.appendChild(posicao);
        }
    }

    function jogador()
    {

        if ( game_over == true )
            return game_over
        else   
        {
            tabuleiro[this.getAttribute('id')] = 'X';
            this.textContent = 'X';
            this.removeEventListener('click', jogador);  
            fim('X');
            intervalo = setTimeout( pc() , 3000);
            
        }    

    }

    function pc()
    {
        var jogada;

        if ( game_over == true )
        {   
            clearTimeout(intervalo);
            return game_over;
        }
            
        else   
        {
            
            jogada = aleatorio();

            if (tabuleiro[jogada] == '')
            {
                tabuleiro[jogada] = 'O';
                document.getElementById(jogada).textContent = 'O';
                document.getElementById(jogada).removeEventListener('click', jogador);  
                fim('O');   
            }  
            else
            {
                clearTimeout(intervalo);
                intervalo = setTimeout( pc() , 3000);
            }
                  
            
        }  
          
    }

    function fim(peca)
    {

        var jogadasVencedoras = [

            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]; 
        
       
        jogadasVencedoras.some( item =>
        {
            
           if ((tabuleiro[item[0]] == peca) && (tabuleiro[item[1]] == peca) && 
                (tabuleiro[item[2]] == peca))
           { 
                game_over = true; 

                formatar_vencedor(peca, item);

                return game_over; //para impedir que assinale mais de uma combinação vitoriosa
           }

        } );

        //verifica se o tabuleiro está cheio e não achou vencedor
        if  (!tabuleiro_vazio() && game_over == false)
            game_over = true;
    }

    function aleatorio()
    {
        return Math.floor(Math.random() * 8 + 1);
    }

    function formatar_vencedor(peca, pos)
    {
        document.querySelector("span").textContent = "Vencedor é o " +  
                    (peca == 'X' ? 'Jogador' : 'Computador');

        document.getElementById(pos[0]).style.border = "5px solid red";
        document.getElementById(pos[1]).style.border = "5px solid red";
        document.getElementById(pos[2]).style.border = "5px solid red";
    }

    function tabuleiro_vazio()
    {
        return tabuleiro.some(item => item == '')
    }


})();
