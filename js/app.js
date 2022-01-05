let lista = [0];
let listaDesconto = [0];
let listaCargoAtual = [0];
let listaCargoAtualDesconto = [0];
let listaRPPS = [0];
let listaRPPSDesconto = [0];
let listaRGPS = [0];
let listaRGPSDesconto = [0];
let listaMilitar = [0];
let listaMilitarDesconto = [0]
let listaPublico = [0];
let listaPublicoDesconto = [0];
let listaPrivado = [0];
let listaPrivadoDesconto = [0];
let listaMagisterio = [0];
let listaMagisterioDesconto = [0];
let listaSaude = [0];
let listaSaudeDesconto = [0];

class App {

    adicionarTempo(){
        event.preventDefault
        let organizacao = document.getElementById("organizacao").value
        let dataInicio = document.getElementById("dataInicio").value
        let dataFim = document.getElementById("dataFim").value
        let averbacaoCargoAtual = document.querySelector("input[name='averbacaoCargoAtual']:checked").value
        let natureza = document.querySelector("input[name='natureza']:checked").value
        let regime = document.querySelector("input[name='regime']:checked").value
        let magisterio = document.querySelector("input[name='magisterio']:checked").value
        let saude = document.querySelector("input[name='saude']:checked").value

        let d1 = new Date(dataInicio)
        let d2 = new Date(dataFim)
        let calc = Math.abs(d2 - d1)
        let tempo = (Math.ceil(calc / (1000 * 60 * 60 * 24)) +1)

        let verificaDesconto = false
        let desconto = 0
        let dataInicioDesconto = document.getElementById("dataInicioDesconto").value
        let dataFimDesconto = document.getElementById("dataFimDesconto").value
        if((dataInicioDesconto != "") && (dataInicioDesconto < dataInicio)){
            alert("Verifique a data de início do afastamento (Erro #1)")
        } else if(dataFimDesconto > dataFim){
            alert("Verifique a data do final do afastamento (Erro #2)")
        } else if (dataInicioDesconto != "" && dataFimDesconto == ""){
            alert("Verifique a data de final do afastamento (Erro #3)")
        } else if (dataFimDesconto != "" && dataInicioDesconto == ""){
            alert("Verifique a data de início do afastamento (Erro #4)")
        } else if (dataFimDesconto < dataInicioDesconto) {
            alert("Verifique as datas do período de afastamento (Erro #5)")
        } else if((dataInicioDesconto == "" && dataFimDesconto == "") || (dataInicioDesconto >= dataInicio && dataFimDesconto <= dataFim)){
            verificaDesconto = true
        }

        if (verificaDesconto == true){
            let inicioDesconto = new Date(dataInicioDesconto)
            let fimDesconto = new Date(dataFimDesconto)
            let calcDesconto = Math.abs(fimDesconto - inicioDesconto)
            desconto = (Math.ceil(calcDesconto / (1000 * 60 * 60 * 24)) + 1)
        
            if (dataInicioDesconto == "" && dataFimDesconto == "") {
                desconto = 0
            }

            let registro = new Registro(organizacao, dataInicio, dataFim, averbacaoCargoAtual, tempo, desconto, natureza, regime, magisterio, saude)

            //Verifica se todos os campos estão preenchidos corretamente
            this.verificaCadTempoVazio()
            if (organizacao == "" || dataInicio == "" || dataFim == "") {
                alert("ATENÇÃO!\nPreencha todos os campos antes de prosseguir.")
            } else if (dataFim < dataInicio) {
                alert("ATENÇÃO!\nVerifique a data inicial e a data final do tempo de serviço")
            } else {
                this.inserirNaLista(registro)       //Lista de registros
                this.inserirNaImpressao(registro)   //Relatório
                this.listaDetalhada(registro)       //Relatório e cenários
                this.limparItem()                   //Limpa os campos
                this.exibirBotoes()                 //Mostra painel de botões para finalizar
                
                lista.push(tempo)
                listaDesconto.push(desconto)

                //Inserir soma de tempo de serviço (na lista e na impressão)
                let soma = lista.reduce(function(soma, i){
                    return soma+i
                })
                document.getElementById("tdTempoSubtotal").innerHTML = soma

                //Inserir desconto de tempo de serviço (na lista e na impressão)
                let somaDesconto = listaDesconto.reduce(function(somaDesconto, i){
                    return somaDesconto+i
                })
                document.getElementById("tdDescontoSubtotal").innerHTML = somaDesconto

                //Inserir total = soma do tempo de contribuição - descontos
                let total = soma - somaDesconto
                document.getElementById("tdTempoTotal").innerHTML = total

                //Inserir Anos + Meses + Dias do Tempo Líquido Total (na impressão)
                let prtTTAno = Math.trunc(total/365)
                let prtTTSobra = total % 365
                let prtTTMes = Math.trunc(prtTTSobra/30)
                let prtTTDia = prtTTSobra % 30
                document.getElementById("prtTTAno").innerHTML = prtTTAno
                document.getElementById("prtTTMes").innerHTML = prtTTMes
                document.getElementById("prtTTDia").innerHTML = prtTTDia

                //Inserir Total Geral e inserir Anos + Meses + Dias (na impressão)
                let tempAdm = document.getElementById("dataAdm").value
                let calcAdm = new Date(tempAdm)
                let calcHoje = new Date()
                let calcSoma = Math.abs(calcHoje - calcAdm)
                let calcTotal = (Math.ceil(calcSoma / (1000 * 60 * 60 * 24)))

                let verificaCadDesconto = false
                let cadDesconto = 0
                let dataInicioCadDesconto = document.getElementById("dataInicioCadDesconto").value
                let dataFimCadDesconto = document.getElementById("dataFimCadDesconto").value
                if((dataInicioCadDesconto != "") && (dataInicioCadDesconto < tempAdm)){
                    alert("Verifique a data de início do afastamento no cadastro (Erro #1)")
                } else if (dataInicioCadDesconto != "" && dataFimCadDesconto == ""){
                    alert("Verifique a data de final do afastamento no cadastro (Erro #3)")
                } else if (dataFimCadDesconto != "" && dataInicioCadDesconto == ""){
                    alert("Verifique a data de início do afastamento no cadastro (Erro #4)")
                } else if (dataFimCadDesconto < dataInicioCadDesconto) {
                    alert("Verifique as datas do período de afastamento no cadastro (Erro #5)")
                } else if((dataInicioCadDesconto == "" && dataFimCadDesconto == "") || (dataInicioCadDesconto >= tempAdm)){
                    verificaCadDesconto = true
                }

                if (verificaDesconto == true){
                    let inicioCadDesconto = new Date(dataInicioCadDesconto)
                    let fimCadDesconto = new Date(dataFimCadDesconto)
                    let calcCadDesconto = Math.abs(fimCadDesconto - inicioCadDesconto)
                    cadDesconto = (Math.ceil(calcCadDesconto / (1000 * 60 * 60 * 24)) + 1)
                
                    if (dataInicioCadDesconto == "" && dataFimCadDesconto == "") {
                        cadDesconto = 0
                    }
                }
                let cadTotal = calcTotal - cadDesconto
                let totalGeral = cadTotal + total

                document.getElementById("prtTGTempo").innerHTML = totalGeral
                let prtTGAno = Math.trunc(totalGeral/365)
                let prtTGSobra = totalGeral % 365
                let prtTGMes = Math.trunc(prtTGSobra/30)
                let prtTGDia = prtTGSobra % 30
                document.getElementById("prtTGAno").innerHTML = prtTGAno
                document.getElementById("prtTGMes").innerHTML = prtTGMes
                document.getElementById("prtTGDia").innerHTML = prtTGDia
                
                //PREENCHENDO O RESUMO (na lista)
                document.getElementById("tempoCargoAtual").innerHTML = `${calcTotal} dias`
                document.getElementById("tempoDescCargoAtual").innerHTML = `${cadDesconto} dias`
                document.getElementById("tempoLiqCargoAtual").innerHTML = `${cadTotal} dias` //hr
                document.getElementById("tempoAverbacao").innerHTML = `${total} dias` //hr
                document.getElementById("tempoLiquidoTotal").innerHTML = `${totalGeral} dias`

                //Desabilitar botão "sem averbação"
                document.getElementById("semAverbar").disabled = true
            }
        }
    }

    verificaCadTempoVazio(){
        if (document.getElementById("organizacao").value == "") {
            document.getElementById("organizacao").classList.add("is-danger")   
        }    
        if (document.getElementById("dataInicio").value == "") {
            document.getElementById("dataInicio").classList.add("is-danger")   
        }
        if (document.getElementById("dataFim").value == "") {
            document.getElementById("dataFim").classList.add("is-danger")   
        }
        document.getElementById("organizacao").focus()
    }

    desmarcarOrganizacao(){
        document.getElementById("organizacao").classList.remove("is-danger")
    }
    desmarcarDataInicio(){
        document.getElementById("dataInicio").classList.remove("is-danger")
    }
    desmarcarDataFim(){
        document.getElementById("dataFim").classList.remove("is-danger")
    }

    inserirNaLista(registro){   //Acionado ao clicar no botão +Adicionar
        let linha = document.createElement("tr")
        linha.id = "adicionarCelulas"
        document.getElementById("adicionarLinhas").appendChild(linha)
        
        //Adicionar Organização
        let tdOrganizacao = document.createElement("td")
            tdOrganizacao.innerHTML += registro.organizacao
            linha.appendChild(tdOrganizacao)
        //Adicionar Data Início
        let tdDataInicio = document.createElement("td")
            var listDataInicio_aux = new Date(registro.dataInicio)
            var listDataInicio = new Date(listDataInicio_aux.getTime())
            listDataInicio.setDate(listDataInicio_aux.getDate() + 1)
            var diaDataInicio = String(listDataInicio.getDate()).padStart(2, '0')
            var mesDataInicio = String(listDataInicio.getMonth() + 1).padStart(2,'0')
            var anoDataInicio = listDataInicio.getFullYear()
            tdDataInicio.innerHTML += `${diaDataInicio}/${mesDataInicio}/${anoDataInicio}`
            linha.appendChild(tdDataInicio)
        //Adicionar Data Fim
        let tdDataFim = document.createElement("td")
            var listDataFim_aux = new Date(registro.dataFim)
            var listDataFim = new Date(listDataFim_aux.getTime())
            listDataFim.setDate(listDataFim_aux.getDate() + 1)
            var diaDataFim = String(listDataFim.getDate()).padStart(2, '0')
            var mesDataFim = String(listDataFim.getMonth() + 1).padStart(2,'0')
            var anoDataFim = listDataFim.getFullYear()
            tdDataFim.innerHTML += `${diaDataFim}/${mesDataFim}/${anoDataFim}`
            linha.appendChild(tdDataFim)
        //Adicionar contagem de Tempo
        let tdTempo = document.createElement("td")
            tdTempo.innerHTML += registro.tempo
            linha.appendChild(tdTempo)
        //Adicionar desconto
        let tdDesconto = document.createElement("td")
            tdDesconto.innerHTML += registro.desconto
            linha.appendChild(tdDesconto)
        //Adicionar Natureza
        let tdNatureza = document.createElement("td")
            tdNatureza.innerHTML += registro.natureza
            linha.appendChild(tdNatureza)
        //Adicionar Regime
        let tdRegime = document.createElement("td")
            tdRegime.innerHTML += registro.regime
            linha.appendChild(tdRegime)
        //Adicionar Magistério
        let tdMagisterio = document.createElement("td")
            tdMagisterio.innerHTML += registro.magisterio
            linha.appendChild(tdMagisterio)
        //Adicionar Saúde
        let tdSaude = document.createElement("td")
            tdSaude.innerHTML += registro.saude
            linha.appendChild(tdSaude)
        //Adicionar C. A.
        let tdAverbacaoCargoAtual = document.createElement("td")
            tdAverbacaoCargoAtual.innerHTML += registro.averbacaoCargoAtual
            linha.appendChild(tdAverbacaoCargoAtual)
        //Adicionar botão para excluir registro
        let tdRemover = document.createElement("td")
            linha.appendChild(tdRemover)
        //Criando botão remover
        let botaoRemover = document.createElement("span")
            botaoRemover.setAttribute("class", "icon")
            botaoRemover.setAttribute("id", "iconeRemover")
            botaoRemover.setAttribute("onclick", "app.remover()")
            tdRemover.appendChild(botaoRemover)
        //Selecionando o ícone de exclusão
        let iconRemover = document.createElement("ion-icon")
            iconRemover.setAttribute("name", "close-circle-outline")
            botaoRemover.appendChild(iconRemover)
    }

    inserirNaImpressao(registro){
        let linhaImpressao = document.createElement("tr")
            linhaImpressao.id = "adicionarCelulasImpressao"
            document.getElementById("inserir").appendChild(linhaImpressao)

        //Adicionar organização
        let prtOrganizacao = document.createElement("td")
            prtOrganizacao.innerHTML += registro.organizacao
            prtOrganizacao.classList.add("td2A")
            linhaImpressao.appendChild(prtOrganizacao)
        //Adicionar Data de Início
        let prtDataInicio = document.createElement("td")
            var listDataInicio_aux = new Date(registro.dataInicio)
            var listDataInicio = new Date(listDataInicio_aux.getTime())
            listDataInicio.setDate(listDataInicio_aux.getDate() + 1)
            var diaDataInicio = String(listDataInicio.getDate()).padStart(2, '0')
            var mesDataInicio = String(listDataInicio.getMonth() + 1).padStart(2,'0')
            var anoDataInicio = listDataInicio.getFullYear()
            prtDataInicio.innerHTML += `${diaDataInicio}/${mesDataInicio}/${anoDataInicio}`
            prtDataInicio.classList.add("td2B")
            linhaImpressao.appendChild(prtDataInicio)
        //Adicionar Data Fim
        let prtDataFim = document.createElement("td")
            var listDataFim_aux = new Date(registro.dataFim)
            var listDataFim = new Date(listDataFim_aux.getTime())
            listDataFim.setDate(listDataFim_aux.getDate() + 1)
            var diaDataFim = String(listDataFim.getDate()).padStart(2, '0')
            var mesDataFim = String(listDataFim.getMonth() + 1).padStart(2,'0')
            var anoDataFim = listDataFim.getFullYear()
            prtDataFim.innerHTML += `${diaDataFim}/${mesDataFim}/${anoDataFim}`
            prtDataFim.classList.add("td2C")
            linhaImpressao.appendChild(prtDataFim)
        //Adicionar Natureza
        let prtNatureza = document.createElement("td")
            prtNatureza.innerHTML += registro.natureza
            prtNatureza.classList.add("td2D")
            linhaImpressao.appendChild(prtNatureza)
        //Adicionar Regime
        let prtRegime = document.createElement("td")
            prtRegime.innerHTML += registro.regime
            prtRegime.classList.add("td2E")
            linhaImpressao.appendChild(prtRegime)
        //Adicionar Magistério
        let prtMagisterio = document.createElement("td")
            prtMagisterio.innerHTML += registro.magisterio
            prtMagisterio.classList.add("td2F")
            linhaImpressao.appendChild(prtMagisterio)
        //Adicionar Saúde
        let prtSaude = document.createElement("td")
            prtSaude.innerHTML += registro.saude
            prtSaude.classList.add("td2G")
            linhaImpressao.appendChild(prtSaude)
        //Adicionar Tempo de Contribuição (Anos + Meses + Dias + Total)
        let prtAnos = document.createElement("td")
            prtAnos.innerHTML += Math.trunc(registro.tempo/365)
            prtAnos.classList.add("td2H")
            linhaImpressao.appendChild(prtAnos)
        let sobra = registro.tempo % 365
        let prtMeses = document.createElement("td")
            prtMeses.innerHTML += Math.trunc(sobra/30)
            prtMeses.classList.add("td2I")
            linhaImpressao.appendChild(prtMeses)
        let prtDias = document.createElement("td")
            prtDias.innerHTML += sobra % 30
            prtDias.classList.add("td2J")
            linhaImpressao.appendChild(prtDias)
        let prtTempo = document.createElement("td")
            prtTempo.innerHTML += registro.tempo
            prtTempo.classList.add("td2K")
            linhaImpressao.appendChild(prtTempo)
        //Adicionar Descontos (Anos + Meses + Dias + Total)
        let prtAnosDesc = document.createElement("td")
            prtAnosDesc.innerHTML += Math.trunc(registro.desconto/365)
            prtAnosDesc.classList.add("td2H")
            linhaImpressao.appendChild(prtAnosDesc)
        let sobraDesc = registro.desconto % 365
        let prtMesesDesc = document.createElement("td")
            prtMesesDesc.innerHTML += Math.trunc(sobraDesc/30)
            prtMesesDesc.classList.add("td2I")
            linhaImpressao.appendChild(prtMesesDesc)
        let prtDiasDesc = document.createElement("td")
            prtDiasDesc.innerHTML += sobraDesc % 30
            prtDiasDesc.classList.add("td2J")
            linhaImpressao.appendChild(prtDiasDesc)
        let prtDesconto = document.createElement("td")
            prtDesconto.innerHTML += registro.desconto
            prtDesconto.classList.add("td2K")
            linhaImpressao.appendChild(prtDesconto)
    }

    listaDetalhada(registro){
        //Calculando o tempo de serviço no cadastro
        let dataAdmissao = document.getElementById("dataAdm").value
        let calcInicioAdmissao = new Date(dataAdmissao)
        let calcFinalAdmissao = new Date()
        let calcTempoAtual = Math.abs(calcFinalAdmissao - calcInicioAdmissao)
        let tempoAtual = (Math.ceil(calcTempoAtual / (1000 * 60 * 60 * 24)) + 1)

        //Calculando o tempo sem contribuição no cadastro
        let dataInicioCadDesc = document.getElementById("dataInicioCadDesconto").value
        let dataFimCadDesc = document.getElementById("dataFimCadDesconto").value
        let descontoAtual = 0
        if (dataInicioCadDesc != "" || dataFimCadDesc != "") {
            let calcInicioCadDesc = new Date(dataInicioCadDesc)
            let calcFimCadDesc = new Date(dataFimCadDesc)
            let calcCadDesc = Math.abs(calcFimCadDesc - calcInicioCadDesc)
            descontoAtual = (Math.ceil(calcCadDesc / (1000 * 60 * 60 * 24)) + 1)
        } else {
            descontoAtual = 0
        }

        let saldoCadAtual = (tempoAtual - descontoAtual) - 1

        let anoSaldoCadAtual = Math.trunc(saldoCadAtual/365)
        let sobraSaldoCadAtual = saldoCadAtual % 365
        let mesSaldoCadAtual = Math.trunc(sobraSaldoCadAtual/30)
        let diaSaldoCadAtual = sobraSaldoCadAtual % 30

        if (document.getElementById("somaCargoAtual").innerHTML == "0"){
            document.getElementById("anoCargoAtual").innerHTML = anoSaldoCadAtual
            document.getElementById("mesCargoAtual").innerHTML = mesSaldoCadAtual
            document.getElementById("diaCargoAtual").innerHTML = diaSaldoCadAtual
            document.getElementById("somaCargoAtual").innerHTML = saldoCadAtual
        }

        document.getElementById("anoPublico").innerHTML = anoSaldoCadAtual
        document.getElementById("mesPublico").innerHTML = mesSaldoCadAtual
        document.getElementById("diaPublico").innerHTML = diaSaldoCadAtual
        document.getElementById("somaPublico").innerHTML = saldoCadAtual

        if (document.querySelector("input[name='cadMagisterio']:checked").value == "Sim" && document.getElementById("somaMagisterio").innerHTML == "0") {
            document.getElementById("anoMagisterio").innerHTML = anoSaldoCadAtual
            document.getElementById("mesMagisterio").innerHTML = mesSaldoCadAtual
            document.getElementById("diaMagisterio").innerHTML = diaSaldoCadAtual
            document.getElementById("somaMagisterio").innerHTML = saldoCadAtual
        }

        if (document.querySelector("input[name='cadSaude']:checked").value == "Sim" && document.getElementById("somaSaude").innerHTML == "0") {
            document.getElementById("anoSaude").innerHTML = anoSaldoCadAtual
            document.getElementById("mesSaude").innerHTML = mesSaldoCadAtual
            document.getElementById("diaSaude").innerHTML = diaSaldoCadAtual
            document.getElementById("somaSaude").innerHTML = saldoCadAtual
        }

        if (document.getElementById("somaRPPS").innerHTML == "0"){
            document.getElementById("anoRPPS").innerHTML = anoSaldoCadAtual
            document.getElementById("mesRPPS").innerHTML = mesSaldoCadAtual
            document.getElementById("diaRPPS").innerHTML = diaSaldoCadAtual
            document.getElementById("somaRPPS").innerHTML = saldoCadAtual
        }

        //Separando pelo Cargo Atual
        if (registro.averbacaoCargoAtual == "Sim") {
            listaCargoAtual.push(registro.tempo)
            let somaCargoAtual = listaCargoAtual.reduce(function(somaCargoAtual, i){
                return somaCargoAtual+i
            })
            listaCargoAtualDesconto.push(registro.desconto)
            let descontoCargoAtual = listaCargoAtualDesconto.reduce(function(descontoCargoAtual, i){
                return descontoCargoAtual+i
            })
            
            somaCargoAtual += (saldoCadAtual - descontoCargoAtual)
            let anoCargoAtual = Math.trunc(somaCargoAtual/365)
            let sobraCargoAtual = somaCargoAtual % 365
            let mesCargoAtual = Math.trunc(sobraCargoAtual/30)
            let diaCargoAtual = sobraCargoAtual % 30
            document.getElementById("anoCargoAtual").innerHTML = anoCargoAtual
            document.getElementById("mesCargoAtual").innerHTML = mesCargoAtual
            document.getElementById("diaCargoAtual").innerHTML = diaCargoAtual
            document.getElementById("somaCargoAtual").innerHTML = somaCargoAtual
        }

        //Separando por natureza
        if (registro.natureza == "Público") {
            listaPublico.push(registro.tempo)
            let somaPublico = listaPublico.reduce(function(somaPublico, i){
                return somaPublico+i
            })
            listaPublicoDesconto.push(registro.desconto)
            let descontoPublico = listaPublicoDesconto.reduce(function(descontoPublico, i){
                return descontoPublico+i
            })
            somaPublico += (saldoCadAtual - descontoPublico)
            let anoPublico = Math.trunc(somaPublico/365)
            let sobraPublico = somaPublico % 365
            let mesPublico = Math.trunc(sobraPublico/30)
            let diaPublico = sobraPublico % 30
            document.getElementById("anoPublico").innerHTML = anoPublico
            document.getElementById("mesPublico").innerHTML = mesPublico
            document.getElementById("diaPublico").innerHTML = diaPublico
            document.getElementById("somaPublico").innerHTML = somaPublico
        } else if (registro.natureza == "Privado") {
            listaPrivado.push(registro.tempo)
            let somaPrivado = listaPrivado.reduce(function(somaPrivado, i){
                return somaPrivado+i
            })
            listaPrivadoDesconto.push(registro.desconto)
            let descontoPrivado = listaPrivadoDesconto.reduce(function(descontoPrivado, i){
                return descontoPrivado+i
            })
            somaPrivado -= descontoPrivado
            let anoPrivado = Math.trunc(somaPrivado/365)
            let sobraPrivado = somaPrivado % 365
            let mesPrivado = Math.trunc(sobraPrivado/30)
            let diaPrivado = sobraPrivado % 30
            document.getElementById("anoPrivado").innerHTML = anoPrivado
            document.getElementById("mesPrivado").innerHTML = mesPrivado
            document.getElementById("diaPrivado").innerHTML = diaPrivado
            document.getElementById("somaPrivado").innerHTML = somaPrivado
        }

        //Separando por Magistério (sim ou não)
        if (registro.magisterio == "Sim"){
            listaMagisterio.push(registro.tempo)
            let somaMagisterio = listaMagisterio.reduce(function(somaMagisterio, i){
                return somaMagisterio+i
            })
            listaMagisterioDesconto.push(registro.desconto)
            let descontoMagisterio = listaMagisterioDesconto.reduce(function(descontoMagisterio, i){
                return descontoMagisterio+i
            })
            somaMagisterio -= descontoMagisterio
            if (document.querySelector("input[name='cadMagisterio']:checked").value == "Sim") {
                somaMagisterio += saldoCadAtual
            }
            let anoMagisterio = Math.trunc(somaMagisterio/365)
            let sobraMagisterio = somaMagisterio % 365
            let mesMagisterio = Math.trunc(sobraMagisterio/30)
            let diaMagisterio = sobraMagisterio % 30
            document.getElementById("anoMagisterio").innerHTML = anoMagisterio
            document.getElementById("mesMagisterio").innerHTML = mesMagisterio
            document.getElementById("diaMagisterio").innerHTML = diaMagisterio
            document.getElementById("somaMagisterio").innerHTML = somaMagisterio
        }

        //Separando por Servidores da Saúde (sim ou não)
        if (registro.saude == "Sim"){
            listaSaude.push(registro.tempo)
            let somaSaude = listaSaude.reduce(function(somaSaude, i){
                return somaSaude+i
            })
            listaSaudeDesconto.push(registro.desconto)
            let descontoSaude = listaSaudeDesconto.reduce(function(descontoSaude, i){
                return descontoSaude+i
            })
            somaSaude -= descontoSaude
            if (document.querySelector("input[name='cadSaude']:checked").value == "Sim") {
                somaSaude += saldoCadAtual
            }
            let anoSaude = Math.trunc(somaSaude/365)
            let sobraSaude = somaSaude % 365
            let mesSaude = Math.trunc(sobraSaude/30)
            let diaSaude = sobraSaude % 30
            document.getElementById("anoSaude").innerHTML = anoSaude
            document.getElementById("mesSaude").innerHTML = mesSaude
            document.getElementById("diaSaude").innerHTML = diaSaude
            document.getElementById("somaSaude").innerHTML = somaSaude
        }

        //Separando por regime
        if (registro.regime == "RPPS"){
            listaRPPS.push(registro.tempo)
            let somaRPPS = listaRPPS.reduce(function(somaRPPS, i){
                return somaRPPS+i
            })
            listaRPPSDesconto.push(registro.desconto)
            let descontoRPPS = listaRPPSDesconto.reduce(function(descontoRPPS, i){
                return descontoRPPS+i
            })
            somaRPPS += (saldoCadAtual - descontoRPPS)
            let anoRPPS = Math.trunc(somaRPPS/365)
            let sobraRPPS = somaRPPS % 365
            let mesRPPS = Math.trunc(sobraRPPS/30)
            let diaRPPS = sobraRPPS % 30
            document.getElementById("anoRPPS").innerHTML = anoRPPS
            document.getElementById("mesRPPS").innerHTML = mesRPPS
            document.getElementById("diaRPPS").innerHTML = diaRPPS
            document.getElementById("somaRPPS").innerHTML = somaRPPS
        } else if (registro.regime == "RGPS"){
            listaRGPS.push(registro.tempo)
            let somaRGPS = listaRGPS.reduce(function(somaRGPS, i){
                return somaRGPS+i
            })
            listaRGPSDesconto.push(registro.desconto)
            let descontoRGPS = listaRGPSDesconto.reduce(function(descontoRGPS, i){
                return descontoRGPS+i
            })
            somaRGPS -= descontoRGPS
            let anoRGPS = Math.trunc(somaRGPS/365)
            let sobraRGPS = somaRGPS % 365
            let mesRGPS = Math.trunc(sobraRGPS/30)
            let diaRGPS = sobraRGPS % 30
            document.getElementById("anoRGPS").innerHTML = anoRGPS
            document.getElementById("mesRGPS").innerHTML = mesRGPS
            document.getElementById("diaRGPS").innerHTML = diaRGPS
            document.getElementById("somaRGPS").innerHTML = somaRGPS
        } else if (registro.regime == "Militar"){
            listaMilitar.push(registro.tempo)
            let somaMilitar = listaMilitar.reduce(function(somaMilitar, i){
                return somaMilitar+i
            })
            listaMilitarDesconto.push(registro.desconto)
            let descontoMilitar = listaMilitarDesconto.reduce(function(descontoMilitar, i){
                return descontoMilitar+i
            })
            somaMilitar -= descontoMilitar
            let anoMilitar = Math.trunc(somaMilitar/365)
            let sobraMilitar = somaMilitar % 365
            let mesMilitar = Math.trunc(sobraMilitar/30)
            let diaMilitar = sobraMilitar % 30
            document.getElementById("anoMilitar").innerHTML = anoMilitar
            document.getElementById("mesMilitar").innerHTML = mesMilitar
            document.getElementById("diaMilitar").innerHTML = diaMilitar
            document.getElementById("somaMilitar").innerHTML = somaMilitar
        }
    }

    limparItem(){   //Botão "Limpar"
        document.getElementById("organizacao").value = ""
        document.getElementById("organizacao").focus()
        document.getElementById("dataInicio").value = ""
        document.getElementById("dataFim").value = ""
        document.getElementById("dataInicioDesconto").value = ""
        document.getElementById("dataFimDesconto").value = ""
    }

    semAverbar(){   // Botão "Sem Averbação"
        
        if (document.getElementById("nomeDoServidor").value == "" ||
            document.getElementById("dataNasc").value == "" ||
            document.getElementById("CPF").value == "" ||
            document.getElementById("matricula").value == "" ||
            document.getElementById("dataAdm").value == "" ||
            document.getElementById("cargo").value == "" ||
            document.getElementById("lotacao").value == "") {
            alert("ATENÇÃO!\nPreencha todos os campos antes de prosseguir.")
            this.verificaDadosCadastrais()
        } else {
            let verifica = confirm("Tem certeza que deseja continuar sem averbar períodos anteriores?")
            if (verifica) {
                document.getElementById("secaoCadTempoAverbacao").style.display = "none"
                let elemento1 = document.getElementById("secao2")
                elemento1.parentNode.removeChild(elemento1)
                let elemento3 = document.getElementById("secaoRegTempoAverbacao")
                elemento3.parentNode.removeChild(elemento3)
                document.getElementById("finalizar").disabled = true

                let tempAdm2 = document.getElementById("dataAdm").value
                let calcAdm2 = new Date(tempAdm2)
                let calcHoje2 = new Date()
                let calcSoma2 = Math.abs(calcHoje2 - calcAdm2)
                let calcTotal2 = (Math.ceil(calcSoma2 / (1000 * 60 * 60 * 24)))

                let verificaCadDesconto2 = false
                let cadDesconto2 = 0
                let dataInicioCadDesconto2 = document.getElementById("dataInicioCadDesconto").value
                let dataFimCadDesconto2 = document.getElementById("dataFimCadDesconto").value
                if((dataInicioCadDesconto2 != "") && (dataInicioCadDesconto2 < tempAdm2)){
                    alert("Verifique a data de início do afastamento no cadastro (Erro #1)")
                } else if (dataInicioCadDesconto2 != "" && dataFimCadDesconto2 == ""){
                    alert("Verifique a data de final do afastamento no cadastro (Erro #3)")
                } else if (dataFimCadDesconto2 != "" && dataInicioCadDesconto2 == ""){
                    alert("Verifique a data de início do afastamento no cadastro (Erro #4)")
                } else if (dataFimCadDesconto2 < dataInicioCadDesconto2) {
                    alert("Verifique as datas do período de afastamento no cadastro (Erro #5)")
                } else if((dataInicioCadDesconto2 == "" && dataFimCadDesconto2 == "") || (dataInicioCadDesconto2 >= tempAdm2)){
                    verificaCadDesconto2 = true
                }

                if (verificaCadDesconto2 == true){
                    let inicioCadDesconto2 = new Date(dataInicioCadDesconto2)
                    let fimCadDesconto2 = new Date(dataFimCadDesconto2)
                    let calcCadDesconto2 = Math.abs(fimCadDesconto2 - inicioCadDesconto2)
                    cadDesconto2 = (Math.ceil(calcCadDesconto2 / (1000 * 60 * 60 * 24)) + 1)
                
                    if (dataInicioCadDesconto2 == "" && dataFimCadDesconto2 == "") {
                        cadDesconto2 = 0
                    }
                }
                
                //PREENCHENDO O RESUMO (na lista)
                document.getElementById("tempoCargoAtual2").innerHTML = `${calcTotal2} dias`
                document.getElementById("tempoDescCargoAtual2").innerHTML = `${cadDesconto2} dias`
                document.getElementById("tempoLiqCargoAtual2").innerHTML = `${calcTotal2 - cadDesconto2} dias`

                document.getElementById("resultadoSemAverbar").style.display = "block"

                this.finalizar()
            }
        }
    }

    finalizar(){
        //Verifica se todos os campos estão preenchidos corretamente
        this.verificaDadosCadastrais()
        if (document.getElementById("nomeDoServidor").value == "" ||
            document.getElementById("dataNasc").value == "" ||
            document.getElementById("CPF").value == "" ||
            document.getElementById("matricula").value == "" ||
            document.getElementById("dataAdm").value == "" ||
            document.getElementById("cargo").value == "" ||
            document.getElementById("lotacao").value == "") {
            alert("ATENÇÃO!\nPreencha todos os campos antes de prosseguir.")
        } else {
            this.desabilitarCampos()
            this.desabilitarBotoes()
            document.getElementById("secaoCadTempoAverbacao").style.display = "none"

            //DATA DE EMISSÃO
            var hoje = new Date()
            var diaHoje = String(hoje.getDate()).padStart(2, '0')
            var mesHoje = String(hoje.getMonth() + 1).padStart(2,'0')
            var anoHoje = hoje.getFullYear()
            var dataAtual = `${diaHoje}/${mesHoje}/${anoHoje}`
            document.getElementById("dataEmitido1").innerHTML = dataAtual
            document.getElementById("dataEmitido2").innerHTML = dataAtual

            //DADOS DO SERVIDOR
            let nome = document.getElementById("nomeDoServidor").value
                document.getElementById("prtNome").innerHTML = nome
                document.getElementById("prtNome2").innerHTML = nome
            let CPF = document.getElementById("CPF").value
                document.getElementById("prtCPF").innerHTML = CPF
                document.getElementById("prtCPF2").innerHTML = CPF
            let sexo = document.querySelector("input[name='sexo']:checked").value
                document.getElementById("prtSexo").innerHTML = sexo
                document.getElementById("prtSexo2").innerHTML = sexo
            let dataNasc = document.getElementById("dataNasc").value
                var prtDataNasc_aux = new Date(dataNasc)
                var prtDataNasc = new Date(prtDataNasc_aux.getTime())
                prtDataNasc.setDate(prtDataNasc_aux.getDate() + 1)
                var diaDataNasc = String(prtDataNasc.getDate()).padStart(2, '0')
                var mesDataNasc = String(prtDataNasc.getMonth() + 1).padStart(2, '0')
                var anoDataNasc = prtDataNasc.getFullYear()
                var infoDataNasc = `${diaDataNasc}/${mesDataNasc}/${anoDataNasc}`
                document.getElementById("prtDataNasc").innerHTML = infoDataNasc
                document.getElementById("prtDataNasc2").innerHTML = infoDataNasc
            let idade
                if ((mesHoje >= mesDataNasc) && (diaHoje >= diaDataNasc)) {
                    idade = String(anoHoje - anoDataNasc)
                } else {
                    idade = String((anoHoje - anoDataNasc) -1)
                }
                document.getElementById("prtIdade").innerHTML = idade
                document.getElementById("prtIdade2").innerHTML = idade
            let lotacao = document.getElementById("lotacao").value
                document.getElementById("prtLotacao").innerHTML = lotacao
                document.getElementById("prtLotacao2").innerHTML = lotacao
            let matricula = document.getElementById("matricula").value
                document.getElementById("prtMatricula").innerHTML = matricula
                document.getElementById("prtMatricula2").innerHTML = matricula
            let dataAdm = document.getElementById("dataAdm").value
                var prtDataAdm_aux = new Date(dataAdm)
                var prtDataAdm = new Date(prtDataAdm_aux.getTime())
                prtDataAdm.setDate(prtDataAdm_aux.getDate() + 1)
                var diaDataAdm = String(prtDataAdm.getDate()).padStart(2, '0')
                var mesDataAdm = String(prtDataAdm.getMonth() + 1).padStart(2, '0')
                var anoDataAdm = prtDataAdm.getFullYear()
                var infoDataAdm = `${diaDataAdm}/${mesDataAdm}/${anoDataAdm}`
                document.getElementById("prtDataAdm").innerHTML = infoDataAdm
                document.getElementById("prtDataAdm3").innerHTML = infoDataAdm
            let cargo = document.getElementById("cargo").value
                document.getElementById("prtCargo").innerHTML = cargo
                document.getElementById("prtCargo2").innerHTML = cargo

            //FREQUÊNCIA - TEMPO DE SERVIÇO ATUAL
            document.getElementById("prtDataAdm2").innerHTML = infoDataAdm
            document.getElementById("prtDataAtual").innerHTML = dataAtual

            document.getElementById("prtMagisterio").innerHTML = document.querySelector("input[name='cadMagisterio']:checked").value
            document.getElementById("prtSaude").innerHTML = document.querySelector("input[name='cadSaude']:checked").value

            // Soma do tempo líquido no contrato atual (A) =
            let dataAdm1 = new Date(dataAdm)
            let dataAtual1 = new Date()
            let calc = Math.abs(dataAtual1 - dataAdm1)
            let totalCargoAtual = (Math.ceil(calc / (1000 * 60 * 60 * 24)))
            document.getElementById("prtTempoCargoAtualTotal").innerHTML = totalCargoAtual
            let prtAnoTempoTotal = Math.trunc(totalCargoAtual/365)
            let sobra = totalCargoAtual % 365
            let prtMesTempoTotal = Math.trunc(sobra/30)
            let prtDiaTempoTotal = sobra % 30
            document.getElementById("prtAnoTempoTotal").innerHTML = prtAnoTempoTotal
            document.getElementById("prtMesTempoTotal").innerHTML = prtMesTempoTotal
            document.getElementById("prtDiaTempoTotal").innerHTML = prtDiaTempoTotal

            // Período sem contribuição =
            let dataInicioCadDesc = document.getElementById("dataInicioCadDesconto").value
            let dataFimCadDesc = document.getElementById("dataFimCadDesconto").value
            let dataDesc1 = new Date(dataInicioCadDesc)
            let dataDesc2 = new Date(dataFimCadDesc)
            let calcDesc = Math.abs(dataDesc2 - dataDesc1)
            let totalDesc = 0
            if (dataInicioCadDesc != "" && dataFimCadDesc != "") {
                totalDesc = (Math.ceil(calcDesc / (1000 * 60 * 60 * 24))) + 1
                document.getElementById("prtDescTempoCargoAtual").innerHTML = totalDesc
                let prtAnoDesc = Math.trunc(totalDesc/365)
                let sobraDesc = totalDesc % 365
                let prtMesDesc = Math.trunc(sobraDesc/30)
                let prtDiaDesc = sobraDesc % 30
                document.getElementById("prtDescAnoTempoLiq").innerHTML = prtAnoDesc
                document.getElementById("prtDescMesTempoLiq").innerHTML = prtMesDesc
                document.getElementById("prtDescDiaTempoLiq").innerHTML = prtDiaDesc
            }

            // Soma do tempo líquido no contrato atual (A) =
            let tempoCargoAtualLiq = totalCargoAtual - totalDesc
            document.getElementById("prtTempoCargoAtual").innerHTML = tempoCargoAtualLiq
            let prtAnoTempoLiq = Math.trunc(tempoCargoAtualLiq/365)
            let sobraLiq = tempoCargoAtualLiq % 365
            let prtMesTempoLiq = Math.trunc(sobraLiq/30)
            let prtDiaTempoLiq = sobra % 30
            document.getElementById("prtAnoTempoLiq").innerHTML = prtAnoTempoLiq
            document.getElementById("prtMesTempoLiq").innerHTML = prtMesTempoLiq
            document.getElementById("prtDiaTempoLiq").innerHTML = prtDiaTempoLiq

            //Adicionar tempo atual no "Tempo de Serviço Detalhado"
            lista.push(totalCargoAtual - totalDesc)             //Add Tempo Total
            listaCargoAtual.push(totalCargoAtual - totalDesc)   //Add Tempo no Cargo Atual
                let somaCargoAtual = listaCargoAtual.reduce(function(somaCargoAtual, i){
                    return somaCargoAtual+i
                })
                let anoCargoAtual = Math.trunc(somaCargoAtual/365)
                let sobraCargoAtual = somaCargoAtual % 365
                let mesCargoAtual = Math.trunc(sobraCargoAtual/30)
                let diaCargoAtual = sobraCargoAtual % 30
                document.getElementById("anoCargoAtual").innerHTML = anoCargoAtual
                document.getElementById("mesCargoAtual").innerHTML = mesCargoAtual
                document.getElementById("diaCargoAtual").innerHTML = diaCargoAtual
                document.getElementById("somaCargoAtual").innerHTML = somaCargoAtual

            listaPublico.push(totalCargoAtual - totalDesc)  //Tempo de Serviço Público
                let somaPublico = listaPublico.reduce(function(somaPublico, i){
                    return somaPublico+i
                })
                let anoPublico = Math.trunc(somaPublico/365)
                let sobraPublico = somaPublico % 365
                let mesPublico = Math.trunc(sobraPublico/30)
                let diaPublico = sobraPublico % 30
                document.getElementById("anoPublico").innerHTML = anoPublico
                document.getElementById("mesPublico").innerHTML = mesPublico
                document.getElementById("diaPublico").innerHTML = diaPublico
                document.getElementById("somaPublico").innerHTML = somaPublico
            
            let cadMagisterio = document.querySelector("input[name='cadMagisterio']:checked").value
            if (cadMagisterio == "Sim") {
                listaMagisterio.push(totalCargoAtual - totalDesc) //Tempo Atual de Magistério
                let somaMagisterio = listaMagisterio.reduce(function(somaMagisterio, i){
                    return somaMagisterio+i
                })
                let anoMagisterio = Math.trunc(somaMagisterio/365)
                let sobraMagisterio = somaMagisterio % 365
                let mesMagisterio = Math.trunc(sobraMagisterio/30)
                let diaMagisterio = sobraMagisterio % 30
                document.getElementById("anoMagisterio").innerHTML = anoMagisterio
                document.getElementById("mesMagisterio").innerHTML = mesMagisterio
                document.getElementById("diaMagisterio").innerHTML = diaMagisterio
                document.getElementById("somaMagisterio").innerHTML = somaMagisterio
            }

            let cadSaude = document.querySelector("input[name='cadSaude']:checked").value
            if (cadSaude == "Sim") {
                listaSaude.push(totalCargoAtual - totalDesc) //Tempo atual na saúde
                let somaSaude = listaSaude.reduce(function(somaSaude, i){
                    return somaSaude+i
                })
                let anoSaude = Math.trunc(somaSaude/365)
                let sobraSaude = somaSaude % 365
                let mesSaude = Math.trunc(sobraSaude/30)
                let diaSaude = sobraSaude % 30
                document.getElementById("anoSaude").innerHTML = anoSaude
                document.getElementById("mesSaude").innerHTML = mesSaude
                document.getElementById("diaSaude").innerHTML = diaSaude
                document.getElementById("somaSaude").innerHTML = somaSaude
            }

            listaRPPS.push(totalCargoAtual - totalDesc)  //Tempo atual de RPPS
                let somaRPPS = listaRPPS.reduce(function(somaRPPS, i){
                    return somaRPPS+i
                })
                let anoRPPS = Math.trunc(somaRPPS/365)
                let sobraRPPS = somaRPPS % 365
                let mesRPPS = Math.trunc(sobraRPPS/30)
                let diaRPPS = sobraRPPS % 30
                document.getElementById("anoRPPS").innerHTML = anoRPPS
                document.getElementById("mesRPPS").innerHTML = mesRPPS
                document.getElementById("diaRPPS").innerHTML = diaRPPS
                document.getElementById("somaRPPS").innerHTML = somaRPPS

            //Montar Cenários de Aposentadoria
            this.montarCenarios()
            
            //Exibir Resumo de Cenários
            this.exibirResumoCenarios()
        }
    }

    verificaDadosCadastrais(){
        if (document.getElementById("nomeDoServidor").value == "") {
            document.getElementById("nomeDoServidor").classList.add("is-danger")
        }
        if (document.getElementById("dataNasc").value == "") {
            document.getElementById("dataNasc").classList.add("is-danger")
        }
        if (document.getElementById("CPF").value == "") {
            document.getElementById("CPF").classList.add("is-danger")
        }
        if (document.getElementById("matricula").value == "") {
            document.getElementById("matricula").classList.add("is-danger")
        }
        if (document.getElementById("dataAdm").value == "") {
            document.getElementById("dataAdm").classList.add("is-danger")
        }
        if (document.getElementById("cargo").value == "") {
            document.getElementById("cargo").classList.add("is-danger")
        }
        if (document.getElementById("lotacao").value == "") {
            document.getElementById("lotacao").classList.add("is-danger")
        }
    }
    
    desmarcarNomeDoServidor(){
        document.getElementById("nomeDoServidor").classList.remove("is-danger")
    }
    desmarcarDataNasc(){
        document.getElementById("dataNasc").classList.remove("is-danger")
    }
    desmarcarCPF(){
        document.getElementById("CPF").classList.remove("is-danger")
    }
    desmarcarMatricula(){
        document.getElementById("matricula").classList.remove("is-danger")
    }
    desmarcarDataAdm(){
        document.getElementById("dataAdm").classList.remove("is-danger")
    }
    desmarcarCargo(){
        document.getElementById("cargo").classList.remove("is-danger")
    }
    desmarcarLotacao(){
        document.getElementById("lotacao").classList.remove("is-danger")
    }

    mascaraCPF(){
        var numCPF = document.getElementById("CPF")
        if (numCPF.value.length == 3 || numCPF.value.length == 7) {
            numCPF.value += "."
        } else if (numCPF.value.length == 11) {
            numCPF.value += "-"
        }
    }

    desabilitarCampos(){
        // Desabilitando botões e campos
        document.getElementById("nomeDoServidor").disabled = true
        document.getElementById("dataNasc").disabled = true
        document.getElementById("CPF").disabled = true
        document.getElementById("deficiencia").disabled = true
        document.getElementById("matricula").disabled = true
        document.getElementById("dataAdm").disabled = true
        document.getElementById("cargo").disabled = true
        document.getElementById("lotacao").disabled = true
        document.getElementById("dataInicioCadDesconto").disabled = true
        document.getElementById("dataFimCadDesconto").disabled = true
    }

    desabilitarBotoes(){
        document.getElementById("finalizar").disabled = true
        //document.getElementById("adicionar").disabled = true
    }


// CONTINUAR AQUI
    

    montarCenarios(){
        let sexo = document.querySelector("input[name='sexo']:checked").value
        let feminino = false
        let masculino = false
        let apGeral = false
        let apProfessor = false
        let apSaude = false
        let apDeficiencia = false
        let apPontos = false
        let apPontosProf = false
        let apPedagio = false
        let apPedagioProf = false
        let apCompulsoria = false
        
        // Captando o tempo de contribuição
        let tempoContribuicao = lista.reduce(function(soma, i){
            return soma+i
        })
        
        let dataAdm = document.getElementById("dataAdm").value
        let calcAdm = new Date(dataAdm)
        let calcHoje = new Date()
        let calcSoma = Math.abs(calcHoje - calcAdm)
        
        // Captando o tempo de serviço público
        let tempoServicoPublico = listaPublico.reduce(function(soma, i){
            return soma+i
        })

        // Captando o tempo no último cargo
        let tempoUltimoCargo = listaCargoAtual.reduce(function(soma, i){
            return soma+i
        })

        // Captando o tempo de magistério
        let tempoMagisterio = listaMagisterio.reduce(function(soma, i){
            return soma+i
        })

        // Captando o tempo de exposição na saúde
        let tempoSaude = listaSaude.reduce(function(soma, i){
            return soma+i
        })

        // Captando a idade
        let idade = Number(document.getElementById("prtIdade").innerHTML)

        if (sexo == "Masculino") {
            masculino = true
        } else if (sexo == "Feminino"){
            feminino = true
        }

        // Verificando Aposentadoria Geral
        document.getElementById("apGeralTCAtingido").innerHTML = `${tempoContribuicao} dias`
        document.getElementById("apGeralTCElegivel").innerHTML = `${9125 - tempoContribuicao} dias`
        if (tempoContribuicao >= 9125){
            document.getElementById("apGeralTCSituacao").innerHTML = "OK"
            document.getElementById("apGeralTCElegivel").innerHTML = "Atingido"
        }
        document.getElementById("apGeralTSPAtingido").innerHTML = `${tempoServicoPublico} dias`
        document.getElementById("apGeralTSPElegivel").innerHTML = `${3650 - tempoServicoPublico} dias`
        if (tempoServicoPublico >= 3650) {
            document.getElementById("apGeralTSPSituacao").innerHTML = "OK"
            document.getElementById("apGeralTSPElegivel").innerHTML = "Atingido"
        }
        document.getElementById("apGeralTUCAtingido").innerHTML = `${tempoUltimoCargo} dias`
        document.getElementById("apGeralTUCElegivel").innerHTML = `${1825 - tempoUltimoCargo} dias`
        if (tempoUltimoCargo >= 1825) {
            document.getElementById("apGeralTUCSituacao").innerHTML = "OK"
            document.getElementById("apGeralTUCElegivel").innerHTML = "Atingido"
        }
        document.getElementById("apGeralIAtingido").innerHTML = `${idade} anos`
        if (masculino) {
            document.getElementById("apGeralIExigido").innerHTML = "65 anos"
            document.getElementById("apGeralIElegivel").innerHTML = `${65 - idade} anos`
            if (idade >= 65){
                document.getElementById("apGeralISituacao").innerHTML = "OK"
                document.getElementById("apGeralIElegivel").innerHTML = "Atingido"
            }
            if (tempoContribuicao >= 9125 && tempoServicoPublico >= 3650 && tempoUltimoCargo >= 1825 && idade >= 65){
                document.getElementById("apGeralResultado").innerHTML = "DISPONÍVEL"
                apGeral = true
            } else {
                document.getElementById("apGeralResultado").innerHTML = "INDISPONÍVEL"
            }
        }
        if (feminino) {
            document.getElementById("apGeralIExigido").innerHTML = "62 anos"
            document.getElementById("apGeralIElegivel").innerHTML = `${62 - idade} anos`
            if (idade >= 62){
                document.getElementById("apGeralISituacao").innerHTML = "OK"
                document.getElementById("apGeralIElegivel").innerHTML = "Atingido"
            }
            if (tempoContribuicao >= 9125 && tempoServicoPublico >= 3650 && tempoUltimoCargo >= 1825 && idade >= 62){
                document.getElementById("apGeralResultado").innerHTML = "DISPONÍVEL"
                apGeral = true
            } else {
                document.getElementById("apGeralResultado").innerHTML = "INDISPONÍVEL"
            }
        }

        // Verificando Aposentadoria de Professor
        document.getElementById("apProfessorTCAtingido").innerHTML = `${tempoContribuicao} dias`
        document.getElementById("apProfessorTCElegivel").innerHTML = `${9125 - tempoContribuicao} dias`
        if (tempoContribuicao >= 9125){
            document.getElementById("apProfessorTCSituacao").innerHTML = "OK"
            document.getElementById("apProfessorTCElegivel").innerHTML = "Atingido"
        }
        document.getElementById("apProfessorTSPAtingido").innerHTML = `${tempoServicoPublico} dias`
        document.getElementById("apProfessorTSPElegivel").innerHTML = `${3650 - tempoServicoPublico} dias`
        if (tempoServicoPublico >= 3650) {
            document.getElementById("apProfessorTSPSituacao").innerHTML = "OK"
            document.getElementById("apProfessorTSPElegivel").innerHTML = "Atingido"
        }
        document.getElementById("apProfessorTUCAtingido").innerHTML = `${tempoUltimoCargo} dias`
        document.getElementById("apProfessorTUCElegivel").innerHTML = `${1825 - tempoUltimoCargo} dias`
        if (tempoUltimoCargo >= 1825) {
            document.getElementById("apProfessorTUCSituacao").innerHTML = "OK"
            document.getElementById("apProfessorTUCElegivel").innerHTML = "Atingido"
        }
        document.getElementById("apProfessorMagAtingido").innerHTML = `${tempoMagisterio} dias`
        document.getElementById("apProfessorMagElegivel").innerHTML = `${9125 - tempoMagisterio} dias`
        if (tempoMagisterio >= 9125){
            document.getElementById("apProfessorMagSituacao").innerHTML = "OK"
            document.getElementById("apProfessorMagElegivel").innerHTML = "Atingido"
        }
        document.getElementById("apProfessorIAtingido").innerHTML = `${idade} anos`
        if (masculino) {
            document.getElementById("apProfessorIExigido").innerHTML = "60 anos"
            document.getElementById("apProfessorIElegivel").innerHTML = `${60 - idade}`
            if (idade >= 60){
                document.getElementById("apProfessorISituacao").innerHTML = "OK"
                document.getElementById("apProfessorIElegivel").innerHTML = "Atingido"
            }
            if (tempoContribuicao >= 9125 && tempoServicoPublico >= 3650 && tempoUltimoCargo >= 1825 && tempoMagisterio >= 9125 && idade >= 60){
                document.getElementById("apProfessorResultado").innerHTML = "DISPONÍVEL"
                apProfessor = true
            } else {
                document.getElementById("apProfessorResultado").innerHTML = "INDISPONÍVEL"
            }
        }
        if (feminino) {
            document.getElementById("apProfessorIExigido").innerHTML = "57 anos"
            document.getElementById("apProfessorIElegivel").innerHTML = `${57 - idade} anos`
            if (idade >= 57){
                document.getElementById("apProfessorISituacao").innerHTML = "OK"
                document.getElementById("apProfessorIElegivel").innerHTML = "Atingido"
            }
            if (tempoContribuicao >= 9125 && tempoServicoPublico >= 3650 && tempoUltimoCargo >= 1825 && tempoMagisterio >= 9125 && idade >= 57){
                document.getElementById("apProfessorResultado").innerHTML = "DISPONÍVEL"
                apProfessor = true
            } else {
                document.getElementById("apProfessorResultado").innerHTML = "INDISPONÍVEL"
            }
        }

        // Verificando Aposentadoria de servidor da Saúde
        document.getElementById("apSaudeTCAtingido").innerHTML = `${tempoContribuicao} dias`
        document.getElementById("apSaudeTCElegivel").innerHTML = `${9125 - tempoContribuicao} dias`
        if (tempoContribuicao >= 9125){
            document.getElementById("apSaudeTCSituacao").innerHTML = "OK"
            document.getElementById("apSaudeTCElegivel").innerHTML = "Atingido"
        }
        document.getElementById("apSaudeTSPAtingido").innerHTML = `${tempoServicoPublico} dias`
        document.getElementById("apSaudeTSPElegivel").innerHTML = `${3650 - tempoServicoPublico} dias`
        if (tempoServicoPublico >= 3650) {
            document.getElementById("apSaudeTSPSituacao").innerHTML = "OK"
            document.getElementById("apSaudeTSPElegivel").innerHTML = "Atingido"
        }
        document.getElementById("apSaudeTUCAtingido").innerHTML = `${tempoUltimoCargo} dias`
        document.getElementById("apSaudeTUCElegivel").innerHTML = `${1825 - tempoUltimoCargo} dias`
        if (tempoUltimoCargo >= 1825) {
            document.getElementById("apSaudeTUCSituacao").innerHTML = "OK"
            document.getElementById("apSaudeTUCElegivel").innerHTML = "Atingido"
        }
        document.getElementById("apSaudeTEAtingido").innerHTML = `${tempoSaude} dias`
        document.getElementById("apSaudeTEElegivel").innerHTML = `${9125 - tempoSaude} dias`
        if (tempoSaude >= 9125) {
            document.getElementById("apSaudeTESituacao").innerHTML = "OK"
            document.getElementById("apSaudeTEElegivel").innerHTML = "Atingido"
        }
        document.getElementById("apSaudeIAtingido").innerHTML = `${idade} anos`
        document.getElementById("apSaudeIElegivel").innerHTML = `${60 - idade} anos`
        if (idade >= 60){
            document.getElementById("apSaudeISituacao").innerHTML = "OK"
            document.getElementById("apSaudeIElegivel").innerHTML = "Atingido"
        }
        if (tempoContribuicao >= 9125 && tempoServicoPublico >= 3650 && tempoUltimoCargo >= 1825 && tempoSaude >= 9125 && idade >= 60){
            document.getElementById("apSaudeResultado").innerHTML = "DISPONÍVEL"
            apSaude = true
        } else {
            document.getElementById("apSaudeResultado").innerHTML = "INDISPONÍVEL"
        }
        
        // Verificando Aposentadoria de servidor com deficiência
        var select = document.getElementById('deficiencia')
        var deficiencia = select.options[select.selectedIndex].value
        let tcDeficiencia = false
        document.getElementById("apDeficienciaTCAtingido").innerHTML = `${tempoContribuicao} dias`
        if (deficiencia == "Leve") {
            if (masculino){
                document.getElementById("apDeficienciaTCExigido").innerHTML = "12045 dias"
                document.getElementById("apDeficienciaTCElegivel").innerHTML = `${12045 - tempoContribuicao} dias`
                if (tempoContribuicao >= 12045) {
                    document.getElementById("apDeficienciaTCSituacao").innerHTML = "OK"
                    document.getElementById("apDeficienciaTCElegivel").innerHTML = "Atingido"
                    tcDeficiencia = true
                }
            } else if (feminino) {
                document.getElementById("apDeficienciaTCExigido").innerHTML = "10220 dias"
                document.getElementById("apDeficienciaTCElegivel").innerHTML = `${10220 - tempoContribuicao} dias`
                if (tempoContribuicao >= 10220) {
                    document.getElementById("apDeficienciaTCSituacao").innerHTML = "OK"
                    document.getElementById("apDeficienciaTCElegivel").innerHTML = "Atingido"
                    tcDeficiencia = true
                }
            }
        } else if (deficiencia == "Moderada") {
            if (masculino){
                document.getElementById("apDeficienciaTCExigido").innerHTML = "10585 dias"
                document.getElementById("apDeficienciaTCElegivel").innerHTML = `${10585 - tempoContribuicao} dias`
                if (tempoContribuicao >= 10585) {
                    document.getElementById("apDeficienciaTCSituacao").innerHTML = "OK"
                    document.getElementById("apDeficienciaTCElegivel").innerHTML = "Atingido"
                    tcDeficiencia = true
                }
            } else if (feminino) {
                document.getElementById("apDeficienciaTCExigido").innerHTML = "8760 dias"
                document.getElementById("apDeficienciaTCElegivel").innerHTML = `${8760 - tempoContribuicao} dias`
                if (tempoContribuicao >= 8760) {
                    document.getElementById("apDeficienciaTCSituacao").innerHTML = "OK"
                    document.getElementById("apDeficienciaTCElegivel").innerHTML = "Atingido"
                    tcDeficiencia = true
                }
            }
        } else if (deficiencia == "Grave") {
            if (masculino){
                document.getElementById("apDeficienciaTCExigido").innerHTML = "9125 dias"
                document.getElementById("apDeficienciaTCElegivel").innerHTML = `${9125 - tempoContribuicao} dias`
                if (tempoContribuicao >= 9125) {
                    document.getElementById("apDeficienciaTCSituacao").innerHTML = "OK"
                    document.getElementById("apDeficienciaTCElegivel").innerHTML = "Atingido"
                    tcDeficiencia = true
                }
            } else if (feminino) {
                document.getElementById("apDeficienciaTCExigido").innerHTML = "7300 dias"
                document.getElementById("apDeficienciaTCElegivel").innerHTML = `${7300 - tempoContribuicao} dias`
                if (tempoContribuicao >= 7300) {
                    document.getElementById("apDeficienciaTCSituacao").innerHTML = "OK"
                    document.getElementById("apDeficienciaTCElegivel").innerHTML = "Atingido"
                    tcDeficiencia = true
                }
            }
        }
        document.getElementById("apDeficienciaTSPAtingido").innerHTML = `${tempoServicoPublico} dias`
        document.getElementById("apDeficienciaTSPElegivel").innerHTML = `${3650 - tempoServicoPublico} dias`
        if (tempoServicoPublico >= 3650) {
            document.getElementById("apDeficienciaTSPSituacao").innerHTML = "OK"
            document.getElementById("apDeficienciaTSPElegivel").innerHTML = "Atingido"
        }
        document.getElementById("apDeficienciaTUCAtingido").innerHTML = `${tempoUltimoCargo} dias`
        document.getElementById("apDeficienciaTUCElegivel").innerHTML = `${1825 - tempoUltimoCargo} dias`
        if (tempoUltimoCargo >= 1825) {
            document.getElementById("apDeficienciaTUCSituacao").innerHTML = "OK"
            document.getElementById("apDeficienciaTUCElegivel").innerHTML = "Atingido"
        }
        if (tcDeficiencia && tempoServicoPublico >= 3650 && tempoUltimoCargo >= 1825) {
            document.getElementById("apDeficienciaResultado").innerHTML = "DISPONÍVEL"
            apDeficiencia = true
        } else {
            document.getElementById("apDeficienciaResultado").innerHTML = "INDISPONÍVEL"
        }

        // Verificando Aposentadoria Regra de Transição (Pontos)
        document.getElementById("apPontosTCAtingido").innerHTML = `${tempoContribuicao} dias`
        if (masculino) {
            document.getElementById("apPontosTCExigido").innerHTML = "12775 dias"
            document.getElementById("apPontosTCElegivel").innerHTML = `${12775 - tempoContribuicao} dias`
            if (tempoContribuicao >= 12775){
                document.getElementById("apPontosTCSituacao").innerHTML = "OK"
                document.getElementById("apPontosTCElegivel").innerHTML = "Atingido"
            }
        }
        if (feminino) {
            document.getElementById("apPontosTCExigido").innerHTML = "10950 dias"
            document.getElementById("apPontosTCElegivel").innerHTML = `${10950 - tempoContribuicao} dias`
            if (tempoContribuicao >= 10950){
                document.getElementById("apPontosTCSituacao").innerHTML = "OK"
                document.getElementById("apPontosTCElegivel").innerHTML = "Atingido"
            }
        }
        document.getElementById("apPontosTSPAtingido").innerHTML = `${tempoServicoPublico} dias`
        document.getElementById("apPontosTSPElegivel").innerHTML = `${7300 - tempoServicoPublico} dias`
        if (tempoServicoPublico >= 7300) {
            document.getElementById("apPontosTSPSituacao").innerHTML = "OK"
            document.getElementById("apPontosTSPElegivel").innerHTML = "Atingido"
        }
        document.getElementById("apPontosTUCAtingido").innerHTML = `${tempoUltimoCargo} dias`
        document.getElementById("apPontosTUCElegivel").innerHTML = `${1825 - tempoUltimoCargo} dias`
        if (tempoUltimoCargo >= 1825) {
            document.getElementById("apPontosTUCSituacao").innerHTML = "OK"
            document.getElementById("apPontosTUCElegivel").innerHTML = "Atingido"
        }
        let pontos = idade + Math.trunc(tempoContribuicao/365)
        document.getElementById("apPontosPAtingido").innerHTML = `${pontos} pontos`
        if (masculino) {
            document.getElementById("apPontosPExigido").innerHTML = "98 pontos"
            document.getElementById("apPontosPElegivel").innerHTML = `${Math.round(((105 - pontos)/2) / 2)} anos`
            if (pontos >= 98) {
                document.getElementById("apPontosPSituacao").innerHTML = "OK"
                document.getElementById("apPontosPElegivel").innerHTML = "Atingido"
            }
        }
        if (feminino) {
            document.getElementById("apPontosPExigido").innerHTML = "88 pontos"
            document.getElementById("apPontosPElegivel").innerHTML = `${Math.round(((105 - pontos)/2) / 2)} anos`
            if (pontos >= 88) {
                document.getElementById("apPontosPSituacao").innerHTML = "OK"
                document.getElementById("apPontosPElegivel").innerHTML = "Atingido"
            }
        }
        document.getElementById("apPontosIAtingido").innerHTML = `${idade} anos`
        if (masculino) {
            document.getElementById("apPontosIExigido").innerHTML = "62 anos"
            document.getElementById("apPontosIElegivel").innerHTML = `${62 - idade} anos`
            if (idade >= 62){
                document.getElementById("apPontosISituacao").innerHTML = "OK"
                document.getElementById("apPontosIElegivel").innerHTML = "Atingido"
            }
            if (tempoContribuicao >= 12775 && tempoServicoPublico >= 7300 && tempoUltimoCargo >= 1825 && pontos >= 98 && idade >= 62){
                document.getElementById("apPontosResultado").innerHTML = "DISPONÍVEL"
                apPontos = true
            } else {
                document.getElementById("apPontosResultado").innerHTML = "INDISPONÍVEL"
            }
        }
        if (feminino) {
            document.getElementById("apPontosIExigido").innerHTML = "57 anos"
            document.getElementById("apPontosIElegivel").innerHTML = `${57 - idade} anos`
            if (idade >= 57){
                document.getElementById("apPontosISituacao").innerHTML = "OK"
                document.getElementById("apPontosIElegivel").innerHTML = "Atingido"
            }
            if (tempoContribuicao >= 10950 && tempoServicoPublico >= 7300 && tempoUltimoCargo >= 1825 && pontos >= 88 && idade >= 57){
                document.getElementById("apPontosResultado").innerHTML = "DISPONÍVEL"
                apPontos = true
            } else {
                document.getElementById("apPontosResultado").innerHTML = "INDISPONÍVEL"
            }
        }
        
        // Verificando Aposentadoria Regra de Transição para Professores (Pontos)
        document.getElementById("apPontosProfTCAtingido").innerHTML = `${tempoContribuicao} dias`
        if (masculino) {
            document.getElementById("apPontosProfTCExigido").innerHTML = "10950 dias"
            document.getElementById("apPontosProfTCElegivel").innerHTML = `${10950 - tempoContribuicao} dias`
            if (tempoContribuicao >= 10950){
                document.getElementById("apPontosProfTCSituacao").innerHTML = "OK"
                document.getElementById("apPontosProfTCElegivel").innerHTML = "Atingido"
            }
        }
        if (feminino) {
            document.getElementById("apPontosProfTCExigido").innerHTML = "9125 dias"
            document.getElementById("apPontosProfTCElegivel").innerHTML = `${9125 - tempoContribuicao} dias`
            if (tempoContribuicao >= 9125){
                document.getElementById("apPontosProfTCSituacao").innerHTML = "OK"
                document.getElementById("apPontosProfTCElegivel").innerHTML = "Atingido"
            }
        }
        document.getElementById("apPontosProfTSPAtingido").innerHTML = `${tempoServicoPublico} dias`
        document.getElementById("apPontosProfTSPElegivel").innerHTML = `${7300 - tempoServicoPublico} dias`
        if (tempoServicoPublico >= 7300) {
            document.getElementById("apPontosProfTSPSituacao").innerHTML = "OK"
            document.getElementById("apPontosProfTSPElegivel").innerHTML = "Atingido"
        }
        document.getElementById("apPontosProfTUCAtingido").innerHTML = `${tempoUltimoCargo} dias`
        document.getElementById("apPontosProfTUCElegivel").innerHTML = `${1825 - tempoUltimoCargo} dias`
        if (tempoUltimoCargo >= 1825) {
            document.getElementById("apPontosProfTUCSituacao").innerHTML = "OK"
            document.getElementById("apPontosProfTUCElegivel").innerHTML = "Atingido"
        }
        pontos = (idade + Math.trunc(tempoContribuicao/365))
        document.getElementById("apPontosProfPAtingido").innerHTML = `${pontos} pontos`
        if (masculino) {
            document.getElementById("apPontosProfPExigido").innerHTML = "93 pontos"
            document.getElementById("apPontosProfPElegivel").innerHTML = `${Math.round(((105 - pontos)/2) / 2)} anos`
            if (pontos >= 93) {
                document.getElementById("apPontosProfPSituacao").innerHTML = "OK"
                document.getElementById("apPontosProfPElegivel").innerHTML = "Atingido"
            }
        }
        if (feminino) {
            document.getElementById("apPontosPExigido").innerHTML = "83 pontos"
            document.getElementById("apPontosPElegivel").innerHTML = `${Math.round(((105 - pontos)/2) / 2)} anos`
            if (pontos >= 83) {
                document.getElementById("apPontosProfPSituacao").innerHTML = "OK"
                document.getElementById("apPontosProfPElegivel").innerHTML = "Atingido"
            }
        }
        document.getElementById("apPontosProfMagAtingido").innerHTML = `${tempoMagisterio} dias`
        if (masculino) {
            document.getElementById("apPontosProfMagExigido").innerHTML = "10950 dias"
            document.getElementById("apPontosProfMagElegivel").innerHTML = `${10950 - tempoMagisterio} dias`
            if (tempoMagisterio >= 10950) {
                document.getElementById("apPontosProfMagSituacao").innerHTML = "OK"
                document.getElementById("apPontosProfMagElegivel").innerHTML = "Atingido"
            }
        }
        if (feminino) {
            document.getElementById("apPontosProfMagExigido").innerHTML = "9125 dias"
            document.getElementById("apPontosProfMagElegivel").innerHTML = `${9125 - tempoMagisterio} dias`
            if (tempoMagisterio >= 9125) {
                document.getElementById("apPontosProfMagSituacao").innerHTML = "OK"
                document.getElementById("apPontosProfMagElegivel").innerHTML = "Atingido"
            }
        }
        document.getElementById("apPontosProfIAtingido").innerHTML = `${idade} anos`
        if (masculino) {
            document.getElementById("apPontosProfIExigido").innerHTML = "57 anos"
            document.getElementById("apPontosProfIElegivel").innerHTML = `${57 - idade} anos`
            if (idade >= 57){
                document.getElementById("apPontosProfISituacao").innerHTML = "OK"
                document.getElementById("apPontosProfIElegivel").innerHTML = "Atingido"
            }
            if (tempoContribuicao >= 10950 && tempoServicoPublico >= 7300 && tempoUltimoCargo >= 1825 && pontos >= 93 && tempoMagisterio >= 10950 && idade >= 57){
                document.getElementById("apPontosProfResultado").innerHTML = "DISPONÍVEL"
                apPontosProf = true
            } else {
                document.getElementById("apPontosProfResultado").innerHTML = "INDISPONÍVEL"
            }
        }
        if (feminino) {
            document.getElementById("apPontosProfIExigido").innerHTML = "52 anos"
            document.getElementById("apPontosProfIElegivel").innerHTML = `${52 - idade} anos`
            if (idade >= 52){
                document.getElementById("apPontosProfISituacao").innerHTML = "OK"
                document.getElementById("apPontosProfIElegivel").innerHTML = "Atingido"
            }
            if (tempoContribuicao >= 9125 && tempoServicoPublico >= 7300 && tempoUltimoCargo >= 1825 && pontos >= 83 && tempoMagisterio >= 9125 && idade >= 52){
                document.getElementById("apPontosProfResultado").innerHTML = "DISPONÍVEL"
                apPontosProf = true
            } else {
                document.getElementById("apPontosProfResultado").innerHTML = "INDISPONÍVEL"
            }
        }
        
        // Verificando Aposentadoria Regra de Transição (Pedágio)
        document.getElementById("apPedagioTCAtingido").innerHTML = `${tempoContribuicao} dias`
        if (masculino) {
            document.getElementById("apPedagioTCExigido").innerHTML = "12775 dias"
            document.getElementById("apPedagioTCElegivel").innerHTML = `${12775 - tempoContribuicao} dias`
            if (tempoContribuicao >= 12775){
                document.getElementById("apPedagioTCSituacao").innerHTML = "OK"
                document.getElementById("apPedagioTCElegivel").innerHTML = "Atingido"
            }
        }
        if (feminino) {
            document.getElementById("apPedagioTCExigido").innerHTML = "10950 dias"
            document.getElementById("apPedagioTCElegivel").innerHTML = `${10950 - tempoContribuicao} dias`
            if (tempoContribuicao >= 10950){
                document.getElementById("apPedagioTCSituacao").innerHTML = "OK"
                document.getElementById("apPedagioTCElegivel").innerHTML = "Atingido"
            }
        }
        document.getElementById("apPedagioTSPAtingido").innerHTML = `${tempoServicoPublico} dias`
        document.getElementById("apPedagioTSPElegivel").innerHTML = `${7300 - tempoServicoPublico} dias`
        if (tempoServicoPublico >= 7300) {
            document.getElementById("apPedagioTSPSituacao").innerHTML = "OK"
            document.getElementById("apPedagioTSPElegivel").innerHTML = "Atingido"
        }
        document.getElementById("apPedagioTUCAtingido").innerHTML = `${tempoUltimoCargo} dias`
        document.getElementById("apPedagioTUCElegivel").innerHTML = `${1825 - tempoUltimoCargo} dias`
        if (tempoUltimoCargo >= 1825) {
            document.getElementById("apPedagioTUCSituacao").innerHTML = "OK"
            document.getElementById("apPedagioTUCElegivel").innerHTML = "Atingido"
        }
        let diaEC103 = new Date("2019-11-13 00:00:01")
        let diaHoje = new Date()
        let calc = Math.abs(diaHoje - diaEC103)
        let tempoEC_Hoje = (Math.ceil(calc / (1000 * 60 * 60 * 24)))
        document.getElementById("apPedagioPAtingido").innerHTML = tempoEC_Hoje
        let pedagio = 0
        if (masculino) {
            pedagio = 12775 - (tempoContribuicao - tempoEC_Hoje)
            if (pedagio > 0) {
                document.getElementById("apPedagioPExigido").innerHTML = `${pedagio} dias`
                document.getElementById("apPedagioPAtingido").innerHTML = `${tempoEC_Hoje} dias`
                document.getElementById("apPedagioPElegivel").innerHTML = `${(pedagio*2) - tempoEC_Hoje} dias`
                if ((tempoContribuicao - 12775) >= pedagio) {
                    document.getElementById("apPedagioPSituacao").innerHTML = "OK"
                    document.getElementById("apPedagioPElegivel").innerHTML = "Atingido"
                }
            } else {
                document.getElementById("apPedagioPExigido").innerHTML = "-"
                document.getElementById("apPedagioPAtingido").innerHTML = "-"
                document.getElementById("apPedagioPSituacao").innerHTML = "OK"
                document.getElementById("apPedagioPElegivel").innerHTML = "Atingido"
            }
        }
        if (feminino) {
            pedagio = 10950 - (tempoContribuicao - tempoEC_Hoje)
            if (pedagio > 0) {
                document.getElementById("apPedagioPExigido").innerHTML = `${pedagio} dias`
                document.getElementById("apPedagioPAtingido").innerHTML = `${tempoEC_Hoje} dias`
                document.getElementById("apPedagioPElegivel").innerHTML = `${(pedagio*2) - tempoEC_Hoje} dias`
                if ((tempoContribuicao - 10950) >= pedagio) {
                    document.getElementById("apPedagioPSituacao").innerHTML = "OK"
                    document.getElementById("apPedagioPElegivel").innerHTML = "Atingido"
                }
            } else {
                document.getElementById("apPedagioPExigido").innerHTML = "-"
                document.getElementById("apPedagioPAtingido").innerHTML = "-"
                document.getElementById("apPedagioPSituacao").innerHTML = "OK"
                document.getElementById("apPedagioPElegivel").innerHTML = "Atingido"
            }
        }
        document.getElementById("apPedagioIAtingido").innerHTML = `${idade} anos`
        if (masculino) {
            document.getElementById("apPedagioIExigido").innerHTML = "60 anos"
            document.getElementById("apPedagioIElegivel").innerHTML = `${60 - idade} anos`
            if (idade >= 60){
                document.getElementById("apPedagioISituacao").innerHTML = "OK"
                document.getElementById("apPedagioIElegivel").innerHTML = "Atingido"
            }
            if (tempoContribuicao >= 12775 && tempoServicoPublico >= 7300 && tempoUltimoCargo >= 1825 && pedagio <= 0 && idade >= 60){
                document.getElementById("apPedagioResultado").innerHTML = "DISPONÍVEL"
                apPedagio = true
            } else {
                document.getElementById("apPedagioResultado").innerHTML = "INDISPONÍVEL"
            }
        }
        if (feminino) {
            document.getElementById("apPedagioIExigido").innerHTML = "57 anos"
            document.getElementById("apPedagioIElegivel").innerHTML = `${57 - idade} anos`
            if (idade >= 57){
                document.getElementById("apPedagioISituacao").innerHTML = "OK"
                document.getElementById("apPedagioIElegivel").innerHTML = "Atingido"
            }
            if (tempoContribuicao >= 10950 && tempoServicoPublico >= 7300 && tempoUltimoCargo >= 1825 && pedagio <= 0 && idade >= 57){
                document.getElementById("apPedagioResultado").innerHTML = "DISPONÍVEL"
                apPedagio = true
            } else {
                document.getElementById("apPedagioResultado").innerHTML = "INDISPONÍVEL"
            }
        }
        
        // Verificando Aposentadoria Regra de Transição para Professor (Pedágio)
        document.getElementById("apPedagioProfTCAtingido").innerHTML = `${tempoContribuicao} dias`
        if (masculino) {
            document.getElementById("apPedagioProfTCExigido").innerHTML = "10950 dias"
            document.getElementById("apPedagioProfTCElegivel").innerHTML = `${10950 - tempoContribuicao} dias`
            if (tempoContribuicao >= 10950){
                document.getElementById("apPedagioProfTCSituacao").innerHTML = "OK"
                document.getElementById("apPedagioProfTCElegivel").innerHTML = "Atingido"
            }
        }
        if (feminino) {
            document.getElementById("apPedagioProfTCExigido").innerHTML = "9125 dias"
            document.getElementById("apPedagioProfTCElegivel").innerHTML = `${9125 - tempoContribuicao} dias`
            if (tempoContribuicao >= 9125){
                document.getElementById("apPedagioProfTCSituacao").innerHTML = "OK"
                document.getElementById("apPedagioProfTCElegivel").innerHTML = "Atingido"
            }
        }
        document.getElementById("apPedagioProfTSPAtingido").innerHTML = `${tempoServicoPublico} dias`
        document.getElementById("apPedagioProfTSPElegivel").innerHTML = `${7300 - tempoServicoPublico} dias`
        if (tempoServicoPublico >= 7300) {
            document.getElementById("apPedagioProfTSPSituacao").innerHTML = "OK"
            document.getElementById("apPedagioProfTSPElegivel").innerHTML = "Atingido"
        }
        document.getElementById("apPedagioProfTUCAtingido").innerHTML = `${tempoUltimoCargo} dias`
        document.getElementById("apPedagioProfTUCElegivel").innerHTML = `${1825 - tempoUltimoCargo} dias`
        if (tempoUltimoCargo >= 1825) {
            document.getElementById("apPedagioProfTUCSituacao").innerHTML = "OK"
            document.getElementById("apPedagioProfTUCElegivel").innerHTML = "Atingido"
        }
        let pedagioProf = 0
        if (masculino) {
            pedagioProf = 10950 - (tempoContribuicao - tempoEC_Hoje)
            if (pedagioProf > 0) {
                document.getElementById("apPedagioProfPExigido").innerHTML = `${pedagio} dias`
                if (tempoContribuicao >= 10950) {
                    document.getElementById("apPedagioProfPAtingido").innerHTML = `${tempoContribuicao - 10950} dias`
                }
                document.getElementById("apPedagioProfPElegivel").innerHTML = `${(pedagio*2) - tempoEC_Hoje} dias`
                if ((tempoContribuicao - 10950) >= pedagio) {
                    document.getElementById("apPedagioProfPSituacao").innerHTML = "OK"
                    document.getElementById("apPedagioProfPElegivel").innerHTML = "Atingido"
                }
            } else {
                document.getElementById("apPedagioProfPExigido").innerHTML = "-"
                document.getElementById("apPedagioProfPAtingido").innerHTML = "-"
                document.getElementById("apPedagioProfPSituacao").innerHTML = "OK"
                document.getElementById("apPedagioProfPElegivel").innerHTML = "Atingido"
            }
        }
        if (feminino) {
            pedagioProf = 9125 - (tempoContribuicao - tempoEC_Hoje)
            if (pedagioProf > 0) {
                document.getElementById("apPedagioPExigido").innerHTML = `${pedagio} dias`
                if (tempoContribuicao >= 9125) {
                    document.getElementById("apPedagioPAtingido").innerHTML = `${tempoContribuicao - 9125} dias`
                }
                document.getElementById("apPedagioPElegivel").innerHTML = `${(pedagio*2) - tempoEC_Hoje} dias`
                if ((tempoContribuicao - 9125) >= pedagio) {
                    document.getElementById("apPedagioPSituacao").innerHTML = "OK"
                    document.getElementById("apPedagioPElegivel").innerHTML = "Atingido"
                }
            } else {
                document.getElementById("apPedagioPExigido").innerHTML = "-"
                document.getElementById("apPedagioPAtingido").innerHTML = "-"
                document.getElementById("apPedagioPSituacao").innerHTML = "OK"
                document.getElementById("apPedagioPElegivel").innerHTML = "Atingido"
            }
        }
        document.getElementById("apPedagioProfMagAtingido").innerHTML = `${tempoMagisterio} dias`
        if (masculino) {
            document.getElementById("apPedagioProfMagExigido").innerHTML = "10950 dias"
            document.getElementById("apPedagioProfMagElegivel").innerHTML = `${10950 - tempoMagisterio} dias`
            if (tempoMagisterio >= 10950) {
                document.getElementById("apPedagioProfMagSituacao").innerHTML = "OK"
                document.getElementById("apPedagioProfMagElegivel").innerHTML = "Atingido"
            }
        }
        if (feminino) {
            document.getElementById("apPedagioProfMagExigido").innerHTML = "9125 dias"
            document.getElementById("apPedagioProfMagElegivel").innerHTML = `${9125 - tempoMagisterio} dias`
            if (tempoMagisterio >= 9125) {
                document.getElementById("apPedagioProfMagSituacao").innerHTML = "OK"
                document.getElementById("apPedagioProfMagElegivel").innerHTML = "Atingido"
            }
        }
        document.getElementById("apPedagioProfIAtingido").innerHTML = `${idade} anos`
        if (masculino) {
            document.getElementById("apPedagioProfIExigido").innerHTML = "55 anos"
            document.getElementById("apPedagioProfIElegivel").innerHTML = `${55 - idade} anos`
            if (idade >= 55){
                document.getElementById("apPedagioProfISituacao").innerHTML = "OK"
                document.getElementById("apPedagioProfIElegivel").innerHTML = "Atingido"
            }
            if (tempoContribuicao >= 10950 && tempoServicoPublico >= 7300 && tempoUltimoCargo >= 1825 && tempoMagisterio <= 10950 && pedagio <= 0 && idade >= 55){
                document.getElementById("apPedagioProfResultado").innerHTML = "DISPONÍVEL"
                apPedagioProf = true
            } else {
                document.getElementById("apPedagioProfResultado").innerHTML = "INDISPONÍVEL"
            }
        }
        if (feminino) {
            document.getElementById("apPedagioProfIExigido").innerHTML = "52 anos"
            document.getElementById("apPedagioProfIElegivel").innerHTML = `${52 - idade} anos`
            if (idade >= 52){
                document.getElementById("apPedagioProfISituacao").innerHTML = "OK"
                document.getElementById("apPedagioProfIElegivel").innerHTML = "Atingido"
            }
            if (tempoContribuicao >= 9125 && tempoServicoPublico >= 7300 && tempoUltimoCargo >= 1825 && tempoMagisterio >= 9125 && pedagio <= 0 && idade >= 52){
                document.getElementById("apPedagioProfResultado").innerHTML = "DISPONÍVEL"
                apPedagioProf = true
            } else {
                document.getElementById("apPedagioProfResultado").innerHTML = "INDISPONÍVEL"
            }
        }
        
        // Verificando Aposentadoria Compulsória
        document.getElementById("apCompulsoriaIAtingido").innerHTML = `${idade} anos`
        document.getElementById("apCompulsoriaIElegivel").innerHTML = `${75 - idade} anos`
        if (idade >= 75){
            document.getElementById("apCompulsoriaISituacao").innerHTML = "OK"
            document.getElementById("apCompulsoriaIElegivel").innerHTML = "Atingido"
            document.getElementById("apCompulsoriaResultado").innerHTML = "DISPONÍVEL"
            apCompulsoria = true
        } else {
            document.getElementById("apCompulsoriaResultado").innerHTML = "INDISPONÍVEL"
        }

        // Preenchendo o resumo de cenários + Exibindo tabelas de cenário
        if (apGeral){
            document.getElementById("cenarioGeral").innerHTML = "DISPONÍVEL"
        } else {
            document.getElementById("cenarioGeral").innerHTML = "INDISPONÍVEL"
        }
        let servProfessor = document.querySelector("input[name='cadMagisterio']:checked").value
        if (servProfessor == "Sim") {
            if (apProfessor){
                document.getElementById("cenarioProfessor").innerHTML = "DISPONÍVEL"
            } else {
                document.getElementById("cenarioProfessor").innerHTML = "INDISPONÍVEL"
            }
            if (apPontosProf) {
                document.getElementById("cenarioPontosProf").innerHTML = "DISPONÍVEL"
            } else {
                document.getElementById("cenarioPontosProf").innerHTML = "INDISPONÍVEL"
            }
            if (apPedagioProf) {
                document.getElementById("cenarioPedagioProf").innerHTML = "DISPONÍVEL"
            } else {
                document.getElementById("cenarioPedagioProf").innerHTML = "INDISPONÍVEL"
            }
        } else {
            document.getElementById("cenarioProfessor").innerHTML = "NÃO APLICÁVEL"
            document.getElementById("cenarioPontosProf").innerHTML = "NÃO APLICÁVEL"
            document.getElementById("cenarioPedagioProf").innerHTML = "NÃO APLICÁVEL"
            //Desabilitar quadros de magistério
            document.getElementById("secao6").style.display = "none"
            document.getElementById("secao10").style.display = "none"
            document.getElementById("secao12").style.display = "none"
        }
        let servSaude = document.querySelector("input[name='cadSaude']:checked").value
        if (servSaude == "Sim") {
            if (apSaude){
                document.getElementById("cenarioSaude").innerHTML = "DISPONÍVEL"
            } else {
                document.getElementById("cenarioSaude").innerHTML = "INDISPONÍVEL"
            }
        } else {
            document.getElementById("cenarioSaude").innerHTML = "NÃO APLICÁVEL"
            document.getElementById("secao7").style.display = "none"
        }
        var select = document.getElementById('deficiencia')
        var deficiencia = select.options[select.selectedIndex].value
        if (deficiencia != "Não") {
            if (apDeficiencia){
                document.getElementById("cenarioDeficiencia").innerHTML = "DISPONÍVEL"
            } else {
                document.getElementById("cenarioDeficiencia").innerHTML = "INDISPONÍVEL"
            }
        } else {
            document.getElementById("cenarioDeficiencia").innerHTML = "NÃO APLICÁVEL"
            document.getElementById("secao8").style.display = "none"
        }
        if (apPontos) {
            document.getElementById("cenarioPontos").innerHTML = "DISPONÍVEL"
        } else {
            document.getElementById("cenarioPontos").innerHTML = "INDISPONÍVEL"
        }
        if (apPedagio) {
            document.getElementById("cenarioPedagio").innerHTML = "DISPONÍVEL"
        } else {
            document.getElementById("cenarioPedagio").innerHTML = "INDISPONÍVEL"
        }
        if (apCompulsoria) {
            document.getElementById("cenarioCompulsoria").innerHTML = "DISPONÍVEL"
        }
        else {
            document.getElementById("cenarioCompulsoria").innerHTML = "INDISPONÍVEL"
        }
    }
    
    calcularTempoLiqCargoAtual(){
        document.getElementById("prtDataAdm2").innerHTML = infoDataAdm
        document.getElementById("prtDataAtual").innerHTML = dataAtual
        let dataAdm1 = new Date(dataAdm)
        let dataAtual1 = new Date()
        let calc = Math.abs(dataAtual1 - dataAdm1)
        let totalCargoAtual = (Math.ceil(calc / (1000 * 60 * 60 * 24)))
        document.getElementById("tempoCargoAtual").innerHTML = `${totalCargoAtual} dias`
    }
    
    exibirBotoes(){
        document.getElementById("FinalizarCancelar").style.display = "block"
    }

    exibirResumoCenarios(){
        document.getElementById("resumoCenarios").style.display = "block"
        document.getElementById("hrResumoCenarios").focus()
    }

    cancelar(){
        let verificador = confirm("Tem certeza que deseja cancelar o preenchimento?")
        if (verificador) {
            document.location.reload(true)
            document.getElementById("nomeDoServidor").focus()
        }
    }

    novaSimulacao(){
        let verificador = confirm("Deseja iniciar uma nova simulação?")
        if (verificador) {
            document.location.reload(true)
            document.getElementById("nomeDoServidor").focus()
        }
    }

    remover(){
        
    }

    

    visualizarImprimir(){
        // PÁGINA 02
        let pagina2 = document.getElementById("pagina2").innerHTML
        let janela2 = window.open()
        janela2.document.write('<html><head>')
        janela2.document.write('<title>Eficaz Previdência - Simulação de Aposentadoria</title>')
        janela2.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">')
        janela2.document.write('<link rel="stylesheet" href="style.css">')
        janela2.document.write('</head><body>')
        janela2.document.write(pagina2)
        janela2.document.write('</body></html>')
        janela2.document.close()
        setTimeout(function(){
            janela2.print()
        },1000)

        // PÁGINA 01
        let pagina1 = document.getElementById("pagina1").innerHTML
        let janela1 = window.open()
        janela1.document.write('<html><head>')
        janela1.document.write('<title>Eficaz Previdência - Simulação de Aposentadoria</title>')
        janela1.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">')
        janela1.document.write('<link rel="stylesheet" href="style.css">')
        janela1.document.write('</head><body>')
        janela1.document.write(pagina1)
        janela1.document.write('</body></html>')
        janela1.document.close()
        setTimeout(function(){
            janela1.print()
        },3000)
    }
}