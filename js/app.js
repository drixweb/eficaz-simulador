let lista = [0];
let listaRPPS = [0];
let listaRGPS = [0];
let listaMilitar = [0];
let listaPublico = [0];
let listaPrivado = [0];
let listaMagisterio = [0];
let listaSaude = [0];

class App {

    adicionarTempo(){
        event.preventDefault
        let organizacao = document.getElementById("organizacao").value
        let dataInicio = document.getElementById("dataInicio").value
        let dataFim = document.getElementById("dataFim").value
        let natureza = document.querySelector("input[name='natureza']:checked").value
        let regime = document.querySelector("input[name='regime']:checked").value
        let magisterio = document.querySelector("input[name='magisterio']:checked").value
        let saude = document.querySelector("input[name='saude']:checked").value

        let d1 = new Date(dataInicio)
        let d2 = new Date(dataFim)
        let calc = Math.abs(d2 - d1)
        let tempo = (Math.ceil(calc / (1000 * 60 * 60 * 24)) +1)
        
        let registro = new Registro(organizacao, dataInicio, dataFim, tempo, natureza, regime, magisterio, saude)

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
            //Inserir soma de tempo de serviço (na lista e na impressão)
            let soma = lista.reduce(function(soma, i){
                return soma+i
            })
            document.getElementById("tdTempoTotal").innerHTML = soma
            document.getElementById("prtTempoTotal").innerHTML = soma

            //Inserir Anos + Meses + Dias do Tempo Líquido Total (na impressão)
            let prtTTAno = Math.trunc(soma/365)
            let prtTTSobra = soma % 365
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
            let totalGeral = calcTotal + soma
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
            document.getElementById("tempoAverbacao").innerHTML = `${soma} dias`
            document.getElementById("tempoLiquidoTotal").innerHTML = `${totalGeral} dias`
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

    inserirNaLista(registro){
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
        //Adicionar Anos + Meses + Dias + Tempo
        let prtAnos = document.createElement("td")
            prtAnos.innerHTML += Math.trunc(registro.tempo/365)
            prtAnos.classList.add("td2H")
            linhaImpressao.appendChild(prtAnos)
        let prtMeses = document.createElement("td")
            let sobra = registro.tempo % 365
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
    }

    listaDetalhada(registro){
        //Separando por natureza
        if (registro.natureza == "Público") {
            listaPublico.push(registro.tempo)
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
        } else if (registro.natureza == "Privado") {
            listaPrivado.push(registro.tempo)
            let somaPrivado = listaPrivado.reduce(function(somaPrivado, i){
                return somaPrivado+i
            })
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
            alert("Saúde OK")
            listaSaude.push(registro.tempo)
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

        //Separando por regime
        if (registro.regime == "RPPS"){
            listaRPPS.push(registro.tempo)
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
        } else if (registro.regime == "RGPS"){
            listaRGPS.push(registro.tempo)
            let somaRGPS = listaRGPS.reduce(function(somaRGPS, i){
                return somaRGPS+i
            })
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
    }

    semAverbar(){   // Botão "Sem Averbação"
        let verifica = confirm("Tem certeza que deseja continuar sem averbar períodos anteriores?")
        if (verifica) {
            let elemento1 = document.getElementById("secao2")
            elemento1.parentNode.removeChild(elemento1)
            let elemento2 = document.getElementById("secaoCadTempoAverbacao")
            elemento2.parentNode.removeChild(elemento2)
            let elemento3 = document.getElementById("secaoRegTempoAverbacao")
            elemento3.parentNode.removeChild(elemento3)
            this.exibirBotoes()
            this.finalizar()
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
            // Desabilita o botão finalizar
            document.getElementById("finalizar").disabled = true
            //botao.innerHTML = '<ion-icon name="reload-outline"></ion-icon>Atualizar'

            //DATA DE EMISSÃO
            var hoje = new Date()
            var diaHoje = String(hoje.getDate()).padStart(2, '0')
            var mesHoje = String(hoje.getMonth() + 1).padStart(2,'0')
            var anoHoje = hoje.getFullYear()
            var dataAtual = `${diaHoje}/${mesHoje}/${anoHoje}`
            document.getElementById("dataEmitido").innerHTML = dataAtual

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
                var prtDataNasc = new Date(dataNasc)
                var diaDataNasc = String(prtDataNasc.getDate() + 1).padStart(2, '0')
                var mesDataNasc = String(prtDataNasc.getMonth() + 1).padStart(2,'0')
                var anoDataNasc = prtDataNasc.getFullYear()
                document.getElementById("prtDataNasc").innerHTML = `${diaDataNasc}/${mesDataNasc}/${anoDataNasc}`
                document.getElementById("prtDataNasc2").innerHTML = `${diaDataNasc}/${mesDataNasc}/${anoDataNasc}`
            let idade = String(anoHoje - anoDataNasc)
                document.getElementById("prtIdade").innerHTML = idade
                document.getElementById("prtIdade2").innerHTML = idade
            let lotacao = document.getElementById("lotacao").value
                document.getElementById("prtLotacao").innerHTML = lotacao
                document.getElementById("prtLotacao2").innerHTML = lotacao
            let matricula = document.getElementById("matricula").value
                document.getElementById("prtMatricula").innerHTML = matricula
                document.getElementById("prtMatricula2").innerHTML = matricula
            let dataAdm = document.getElementById("dataAdm").value
                var prtDataAdm_aux = new Date(dataAdm) //VERIFICAR: Verificar dia 01 de cada mês
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

            //FREQUÊNCIA
            document.getElementById("prtDataAdm2").innerHTML = infoDataAdm
            document.getElementById("prtDataAtual").innerHTML = dataAtual

            let dataAdm1 = new Date(dataAdm)
            let dataAtual1 = new Date()
            let calc = Math.abs(dataAtual1 - dataAdm1)
            let totalCargoAtual = (Math.ceil(calc / (1000 * 60 * 60 * 24)))
            document.getElementById("prtTempoCargoAtual").innerHTML = totalCargoAtual
            
            let prtAnoTempoLiq = Math.trunc(totalCargoAtual/365)
            let sobra = totalCargoAtual % 365
            let prtMesTempoLiq = Math.trunc(sobra/30)
            let prtDiaTempoLiq = sobra % 30
            document.getElementById("prtAnoTempoLiq").innerHTML = prtAnoTempoLiq
            document.getElementById("prtMesTempoLiq").innerHTML = prtMesTempoLiq
            document.getElementById("prtDiaTempoLiq").innerHTML = prtDiaTempoLiq

            //Adicionar tempo atual no "Tempo de Serviço Detalhado"
            lista.push(totalCargoAtual) //Tempo Atual
                let soma = lista.reduce(function(soma, i){
                    return soma+i
                })

            listaPublico.push(totalCargoAtual)  //Tempo de Serviço Público
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
                listaMagisterio.push(totalCargoAtual) //Tempo Atual de Magistério
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
                listaSaude.push(totalCargoAtual) //Tempo atual na saúde
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

            listaRPPS.push(totalCargoAtual)  //Tempo atual de RPPS
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
    desmarcarLocacao(){
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

    montarCenarios(){
        let sexo = document.querySelector("input[name='sexo']:checked").value
        let feminino = false
        let masculino = false
        let apIdade = false
        let apTempo = false
        let apGeral = false
        let apProfessor = false
        let apEC40 = false
        let apEC40Professor = false
        let apSaude = false
        let apDeficiencia = false
        let apEC103Pontos = false
        let apEC103PontosProf = false
        let apEC103Pedagio = false
        let apEC103PedagioProf = false
        
        // Captando o tempo de contribuição
        let tc_aux1 = lista.reduce(function(soma, i){
            return soma+i
        })
        let dataAdm = document.getElementById("dataAdm").value
        let calcAdm = new Date(dataAdm)
        let calcHoje = new Date()
        let calcSoma = Math.abs(calcHoje - calcAdm)
        let tx_aux2 = Math.ceil(calcSoma / (1000 * 60 * 60 * 24))
        let tempoContribuicao = tc_aux1 + tx_aux2
        
        // Captando o tempo de serviço público
        let tempoServicoPublico = listaPublico.reduce(function(soma, i){
            return soma+i
        }) + tx_aux2

        // Captando o tempo de carreira
        let tempoCarreira = Math.ceil(calcSoma / (1000 * 60 * 60 * 24))

        // Captando o tempo no último cargo
        let tempoUltimoCargo = Math.ceil(calcSoma / (1000 * 60 * 60 * 24))

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
            document.getElementById("apProfessorIElegivel").innerHTML = `${57 - idade}`
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
        document.getElementById("apSaudeElegivel").innerHTML = `${60 - idade} anos`
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
        


        // Preenchendo o resumo de cenários + Exibindo tabelas de cenário
        if (apIdade){
            document.getElementById("cenarioAPIdade").innerHTML = "DISPONÍVEL"
        } else {
            document.getElementById("cenarioAPIdade").innerHTML = "INDISPONÍVEL"
        }
        if (apTempo){
            document.getElementById("cenarioAPTempo").innerHTML = "DISPONÍVEL"
        } else {
            document.getElementById("cenarioAPTempo").innerHTML = "INDISPONÍVEL"
        }
        if (apProfessor){
            document.getElementById("cenarioAPProfessor").innerHTML = "DISPONÍVEL"
        } else {
            document.getElementById("cenarioAPProfessor").innerHTML = "INDISPONÍVEL"
        }
        if (apEC40){
            document.getElementById("cenarioEC40").innerHTML = "DISPONÍVEL"
        } else {
            document.getElementById("cenarioEC40").innerHTML = "INDISPONÍVEL"
        }
        if (apEC40Professor){
            document.getElementById("cenarioEC40Professor").innerHTML = "DISPONÍVEL"
        } else {
            document.getElementById("cenarioEC40Professor").innerHTML = "INDISPONÍVEL"
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
        //janela2.print()

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
        //janela1.print()
    }
}