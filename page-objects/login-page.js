var homePage = require('../page-objects/home-page')
var pdfGenerator = require('../commons/pdf-generator')
var hooks = require('../commons/hooks');

module.exports = {
    url: 'https://uat-invistacompi.cs17.force.com/s',
    elements: {
        opcaoLogin: by.xpath("//button[contains(text(), 'Fazer login')]"),
        campoEmail: by.xpath("//input[@type='email']"),
        campoSenha: by.xpath("//input[@type='tel']"),
        mensagemBoasVindas: by.xpath("//h1[contains(text(), 'Olá')]"),
        botaoLogin: by.xpath("//button//span[contains(text(), 'Fazer Login')]"),

    },

    var: emailBase = 'fundos.qa@portugalmail.com',
    var: senhaBase = '140319',
    var: emailSemInvest = 'kxwgnyyn@sharklasers.com',
    var: senhaSemInvest = '140319',


    irParaUrlLogin: function () {
        var urlLogin = page.loginPage.url
        return driver.get(urlLogin)

    },

    validaTela: function () {

        var menuLogin = page.loginPage.elements.opcaoLogin;
        return driver.wait(until.elementsLocated(menuLogin), 3000);

    },

    clicaBotaoFazerLogin: function (nome) {

        var opcaoMenuLogin = page.loginPage.elements.opcaoLogin;
        return driver.wait(until.elementsLocated(opcaoMenuLogin), 3000).then(() => {
            return driver.findElement(opcaoMenuLogin).click().then(() => {
            })
        })

    },

    insereEmail: function (email) {

        var email = page.loginPage.elements.campoEmail
        return driver.wait(until.elementsLocated(email), 3000).then(() => {
            return driver.findElement(email).sendKeys(emailBase).then(() => {
                return email;
            })
        })

    },

    insereSenha: function (senha) {

        var senha = page.loginPage.elements.campoSenha
        return driver.wait(until.elementsLocated(senha), 3000).then(() => {
            return driver.findElement(senha).sendKeys(senhaBase).then(() => {
                return senha;
            })
        })
    },

    clicaBotaoLogin: function (nome) {

        var login = page.loginPage.elements.botaoLogin
        return driver.wait(until.elementsLocated(login), 3000).then(() => {
            return driver.executeScript('arguments[0].click();', driver.findElement(login));
        })

    },

    clicaBotaoCatalogo: function () {
        var opcaoCatalogo = page.homePage.elements.botaoCatalogo
        return driver.findElement(opcaoCatalogo).click();
    },


    insereEmailSemInvestimentos: function (email) {

        var email = page.loginPage.elements.campoEmail
        return driver.wait(until.elementsLocated(email), 3000).then(() => {
            return driver.findElement(email).sendKeys(emailSemInvest).then(() => {
                return email;
            })
        })

    },

    insereSenhaSemInvestimentos: function (senha) {

        var senha = page.loginPage.elements.campoSenha
        return driver.wait(until.elementsLocated(senha), 3000).then(() => {
            return driver.findElement(senha).sendKeys(senhaSemInvest).then(() => {
                return senha;
            })
        })
    },


}