var hooks = require('../commons/hooks')

module.exports = {


    url: 'https://uat-green.cs96.force.com/green/s/sobrenos',
    elements: {
        menu: by.xpath("//div[@class='header_ico bg-Header_icon_Menu_cinza new_icon']"),
        login: by.xpath("//li[@class='x-menu__item']//a[contains(text(), 'Login')]"),
        botaoFechar: by.xpath("//button[@title='Fechar']"),
        botaoCookies: by.xpath("//button[@title='Entendi']"),

    },

    validaPaginaQuemSomos: function () {
        var tituloPaginaAtual = 'Sobre Nós';
        return hooks.coletaTitulo(tituloPaginaAtual);

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
        //var fechar = page.quemSomosPage.elements.botaoFechar;
        //var elementoFechar = driver.findElement(fechar);
        return driver.wait(until.elementsLocated(opcaoLogin), 3000).then(() => {
            //return driver.wait(until.elementsLocated(fechar), 3000).then(() => {
                //return driver.executeScript('arguments[0].click();', elementoFechar);
            //})
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
