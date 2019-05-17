var hooks = require('../commons/hooks')
var sleep = require('thread-sleep');

module.exports = {


    urlSF: 'https://my-invistacompi--uat.my.salesforce.com/',
    elements: {
        nomeUsuario: by.id("username"),
        senha: by.id("password"),
        botaoLogin: by.id("Login"),
        usuarioLogado: by.xpath("//h1[@class='currentStatusUserName']"),

    },

    var: usuarioSF = 'marcos.ribeiro.hioka@somospi.com.br',
    var: senhaSF = 'teste#123',

    irParaSalesForce: function () {
        hooks.abrirNovaAba();
        hooks.navegarParaNovaAba();
        return driver.get(this.urlSF);
    },

    realizarLoginSF: function () {
        var login = this.elements.nomeUsuario;
        var campoSenha = this.elements.senha;
        var botaoLogarSF = this.elements.botaoLogin;
        var nomeUsuarioLogado = this.elements.usuarioLogado;
        return driver.findElement(login).sendKeys(usuarioSF).then(() => {
            return driver.findElement(campoSenha).sendKeys(senhaSF).then(() => {
                return driver.findElement(botaoLogarSF).click().then(() => {
                    return driver.wait(until.elementsLocated(nomeUsuarioLogado), 6000);
                })
            })
        })
    },

    clicarBotaoMenu: function () {
        var botaoMenu = page.quemSomosPage.elements.menu;
        var element = driver.findElement(botaoMenu)
        return driver.wait(until.elementsLocated(botaoMenu), 6000).then(() => {
            return driver.executeScript('arguments[0].click();', element);
        })
    },

    validaOpcaoLogin: function () {
        var opcaoLogin = page.quemSomosPage.elements.login;
        var fechar = page.quemSomosPage.elements.botaoFechar;
        var elementoFechar = driver.findElement(fechar);
        return driver.wait(until.elementsLocated(opcaoLogin), 3000).then(() => {
            return driver.wait(until.elementsLocated(fechar), 3000).then(() => {
                return driver.executeScript('arguments[0].click();', elementoFechar);
            })
        })
    },

    selecionarOpcaoLogin: function () {
        var opcaoLogin = page.quemSomosPage.elements.login;
        return driver.wait(until.elementsLocated(opcaoLogin), 3000).then(() => {
            return driver.findElement(opcaoLogin).click();
        })
    },

    selecionarEntendiCookies: function () {
        var cookies = page.quemSomosPage.elements.botaoCookies;
        return driver.wait(until.elementsLocated(cookies), 3000).then(() => {
            return driver.findElement(cookies).click();
        })
    },

}
