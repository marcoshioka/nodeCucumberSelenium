var hooks = require('../commons/hooks')
var sleep = require('thread-sleep');
var fs = require("fs");


module.exports = {


    url: 'https://uat-green.cs96.force.com/green/s/produtosprincipal',
    elements: {
        titulo: by.xpath("//b[contains(text(), 'Carrinho de investimentos')]"),
        termos: by.xpath("//input[@type='checkbox']"),
        continuar: by.xpath("//button[contains(text(), 'Continuar')]"),
        campoToken: by.xpath("//input[@type='tel']"),
        validacao: by.xpath("//div[contains(text(), 'Validação')]"),
        confirmar: by.xpath("//button[@title='Confirmar']"),
        sucesso: by.xpath("//*[contains(text(), 'Código Pi validado com sucesso!')]"),
        processamento: by.xpath("//span[contains(text(), 'Em processamento')]"),
        produtoFundos: by.xpath("//span[contains(text(), 'TESTE MARISON')]")
    },


    validaPaginaCarrinho: function () {
        var tituloPagina = page.carrinhoPage.elements.titulo;
        return driver.wait(until.elementsLocated(tituloPagina), 6000).then(() => {
        })

    },

    selecionaTermos: function () {
        var termosCondicoes = page.carrinhoPage.elements.termos;
        return driver.wait(until.elementsLocated(termosCondicoes), 3000).then(() => {
            return driver.executeScript('arguments[0].click();', driver.findElement(by.xpath("//input[@type='checkbox']")));
        })

    },

    selecionaContinuar: function () {
        var botaoContinuar = page.carrinhoPage.elements.continuar;
        var elementoContinuar = driver.findElement(botaoContinuar)
        return driver.executeScript("arguments[0].scrollIntoView()", elementoContinuar).then(() => {
            return driver.executeScript('arguments[0].click();', elementoContinuar);
        })

    },

    retornarParaCarrinho: function () {
        hooks.navegarParaAntigaAba();
        return driver.wait(until.elementsLocated(this.elements.validacao), 3000).then(() => {
        })
    },


    inserirTokenColetado: function () {
        var campoSenhaToken = this.elements.campoToken;
        var campoImplementaToken = driver.findElement(campoSenhaToken)
        var contents = fs.readFileSync("./files/token.txt", { "encoding": "utf8" });
        return driver.executeScript("arguments[0].scrollIntoView()", campoImplementaToken).then(() => {
            return campoImplementaToken.sendKeys(contents).then(() => {
                return console.log("Inserido o token: " + contents)
            })
        })
    },

    acionarBotaoConfirmar: function () {
        var botaoConfirmar = this.elements.confirmar;
        var mensagemSucesso = this.elements.sucesso;
        return driver.wait(until.elementsLocated(botaoConfirmar), 3000).then(() => {
            return driver.executeScript('arguments[0].click();', driver.findElement(botaoConfirmar)).then(() => {
                return driver.wait(until.elementsLocated(mensagemSucesso), 6000)
            })
        })
    },

    validarProdutoEmProcessamento: function () {
        var produtoProcessamento = this.elements.processamento;
        return driver.wait(until.elementsLocated(produtoProcessamento), 10000).then(() => {
        })
    },

    validarProdutoFundos: function () {
        var produtoFundos = this.elements.produtoFundos;
        return driver.wait(until.elementsLocated(produtoFundos), 6000).then(() => {
        })
    }

}