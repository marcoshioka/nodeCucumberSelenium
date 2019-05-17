var hooks = require('../commons/hooks')
var sleep = require('thread-sleep');

module.exports = {


    urlYandexMail: 'https://passport.yandex.com',
    elements: {
        nomeUsuario: by.id("passp-field-login"),
        submit: by.xpath("//button[@type='submit']"),
        senha: by.id("passp-field-passwd"),
        passport: by.xpath("//span[@class='dheader-logo']"),
        caixaMailTitulo: by.xpath("//a[@class='mail-Logo-Service ns-action']"),
        menu: by.xpath("//div[@class='dheader-user__wrapper']"),
        menuMail: by.xpath("//a[contains(text(), 'Mail')]"),
        ultimoEmailNaoLido: by.xpath("//*[@title='Mark as read']//..//span[contains(text(), 'Seu código Pi.')]"),
        tituloEmail: by.xpath("//div[contains(text(), 'Seu código Pi.')]"),
        mensagemToken: by.xpath("//span[contains(text(), 'Seu código Pi é')]/b"),
        frameMensagem: by.xpath("//iframe[@class='htmlMsgData']")

    },

    var: emailYandex = 'qa.fundos@yandex.com',
    var: senhaYandex = 'teste#123',

    irParaYandexMail: function () {
        hooks.abrirNovaAba();
        hooks.navegarParaNovaAba();
        return driver.get(this.urlYandexMail);
    },



    realizarLoginMail: function () {
        var login = this.elements.nomeUsuario;
        var campoSenha = this.elements.senha;
        var botaoSubmit = this.elements.submit;
        var tituloPassport = this.elements.passport;
        return driver.findElement(login).sendKeys(emailYandex).then(() => {
            return driver.findElement(botaoSubmit).click().then(() => {
                return driver.wait(until.elementsLocated(campoSenha), 6000).then(() => {
                    return driver.findElement(campoSenha).sendKeys(senhaYandex).then(() => {
                        return driver.findElement(botaoSubmit).click().then(() => {
                            return driver.wait(until.elementsLocated(tituloPassport), 6000);
                        })
                    })
                })
            })
        })
    },

    selecionarCaixaCorreio: function () {

        var menuPassort = this.elements.menu;
        var opcaoMail = this.elements.menuMail;
        var tituloCaixa = this.elements.caixaMailTitulo;
        return driver.findElement(menuPassort).click().then(() => {
            return driver.findElement(opcaoMail).click().then(() => {
                return driver.wait(until.elementsLocated(tituloCaixa), 6000);
            })
        })
    },

    selecionarUltimoEmail: function () {
        var titulo = this.elements.tituloEmail;
        var ultimaMensagem = this.elements.ultimoEmailNaoLido;
        return driver.navigate().refresh().then(() => {
            return driver.wait(until.elementsLocated(ultimaMensagem), 60000).then(() => {
                return driver.findElement(ultimaMensagem).click().then(() => {
                    return driver.wait(until.elementsLocated(titulo), 6000);
                })
            })
        })

    },

    coletarToken: function () {
        var titulo = this.elements.tituloEmail
        return driver.wait(until.elementsLocated(titulo), 6000).then(() => {
            //return driver.switchTo().frame(driver.findElement(this.elements.frameMensagem)).then(() => {
                return driver.executeScript("arguments[0].scrollIntoView()", driver.findElement(this.elements.mensagemToken)).then(() => {
                    var tokenMensagem = driver.findElement(this.elements.mensagemToken)
                    return tokenMensagem.getText().then((token) => {
                        console.log(token)
                        return hooks.guardaToken(token)
                    //})
                })
            })
        })
    },

}