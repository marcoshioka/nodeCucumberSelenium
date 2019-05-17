var loginPage = require('../page-objects/catalogo-page')
var pdfGenerator = require('../commons/pdf-generator')
var hooks = require('../commons/hooks')
var sleep = require('thread-sleep');
const { forEach } = require('p-iteration');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
var loop = require('node-while-loop');
const pWhilst = require('p-whilst');
const pDoWhilst = require('p-do-whilst');



module.exports = {
    url: 'https://uat-invistacompi.cs17.force.com/s/',
    elements: {
        titulo: by.xpath("//h1[contains(text(),'Conheça a Pi')]"),
        mensagemBoasVindas: by.xpath("//h1[contains(text(), 'Olá')]"),
        botaoLogin: by.xpath("//button[contains(text(), 'Fazer login')]"),
        botaoCatalogo: by.xpath("//div[@class='header_ico bg-Header_icon_Catalogo_cinza new_icon']"),
        botaoCarrinho: by.xpath("//span[@class='produtos']//div"),
        botaoCookies: by.xpath("//button[contains(text(), 'Entendi')]"),
        quemSomos: by.xpath("//button[contains(text(), 'Quem somos')]"),
        imagemTutorial1: by.xpath("//div[@class='stepTutorial1']"),
        imagemTutorial2: by.xpath("//div[@class='stepTutorial2']"),
        numeroItensCarrinho: by.xpath("//span[@class='slds-avatar slds-avatar_circle qtdCarrinho']/abbr"),
        lixeiraCarrinho: by.xpath("//button[@title='Delete']"),
        botaoExcluir: by.xpath("//button[contains(text(), 'Sim, excluir')]"),
        procurarInvestimento: by.xpath("//button[contains(text(), 'Procurar um investimento')]"),
        botaoProcurarInvestimentos: by.xpath("//button[contains(text(), 'Procurar investimentos')]"),
        tituloCarrinho: by.xpath("//*[contains(text(), 'Carrinho de investimentos')]"),
        frameMenu: by.name("_hjRemoteVarsFrame")
    },



    irParaUrl: function () {

        var selector = page.homePage.url
        return driver.get(selector)

    },

    validaTela: function () {

        var selector = page.homePage.elements.titulo;
        var cookie = page.homePage.elements.botaoCookies;
        return driver.wait(until.elementsLocated(selector), 10000).then(() => {

        })
    },


    validaTelaLogada: function () {

        var selector = page.homePage.elements.mensagemBoasVindas;
        var cookie = page.homePage.elements.botaoCookies;
        return driver.wait(until.elementsLocated(selector), 25000).then(() => {

        })
    },

    validaBotaoLogin: function () {
        var botaoFazerLogin = page.homePage.elements.botaoLogin;
        return driver.findElement(botaoFazerLogin).then(() => {
            console.log('Botão validado com sucesso');
        })

    },

    clicaBotaoLogin: function () {
        var botaoFazerLogin = page.homePage.elements.botaoLogin;
        var mensagem = 'Não foi possível clicar no Botão Login';
        return driver.findElement(botaoFazerLogin).click().then(() => {

        })
    },

    verificaBanner: function () {

        if (driver.findElement(by.xpath("//div[@class='stepTutorial1']")).isEnabled()) {
            return driver.executeScript('arguments[0].click();', driver.findElement(this.elements.imagemTutorial1)).then(() => {
                return driver.executeScript('arguments[0].click();', driver.findElement(this.elements.imagemTutorial2));
            })
        } else {
            console.log("Tela sem Banner")
        }
    },

    clicaBotaoCatalogo: function () {
        return driver.wait(until.elementsLocated(this.elements.botaoCatalogo), 10000).then(() => {
            return driver.findElement(this.elements.botaoCatalogo).click();
        })
    },

    clicaBotaoCarrinho: function () {
        return driver.wait(until.elementsLocated(this.elements.botaoCarrinho), 10000).then(() => {
            return driver.executeScript('arguments[0].click();', driver.findElement(this.elements.botaoCarrinho));
        })
    },


    clicaQuemSomos: function () {
        var opcaoQuemSomos = page.homePage.elements.quemSomos;
        return driver.findElement(opcaoQuemSomos).click();
    },


    verificaProdutoCarrinho: async function () {

        driver.wait(until.elementsLocated(this.elements.tituloCarrinho), 6000)
        driver.wait(until.elementsLocated(this.elements.lixeiraCarrinho), 6000)
        limpeza: do {
            await driver.executeScript('arguments[0].click();', driver.findElement(this.elements.lixeiraCarrinho))//.then(async () => {
            await driver.executeScript('arguments[0].click();', driver.findElement(this.elements.botaoExcluir))
            if (await driver.findElements(this.elements.lixeiraCarrinho) == 0) break;

        } while (await driver.findElements(this.elements.lixeiraCarrinho));

    },

    verificaExistenciaProdutoCarrinho: async function () {

        driver.wait(until.elementsLocated(this.elements.tituloCarrinho), 6000)

        try {
            await driver.wait(until.elementsLocated(this.elements.lixeiraCarrinho), 6000).then(async () => {
                await this.verificaProdutoCarrinho()
            })
        }

        catch {
            return console.log("Carrinho vazio")
        }

    },

    clicaBotaoProcurarInvestimento: function (nome) {

        var botaoProcuraInvest = page.homePage.elements.procurarInvestimento
        return driver.wait(until.elementsLocated(botaoProcuraInvest), 3000).then(() => {
            return driver.findElement(botaoProcuraInvest).click().then(() => {
            })
        })

    },


}


