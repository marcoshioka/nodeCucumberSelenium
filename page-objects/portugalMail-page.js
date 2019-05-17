var hooks = require('../commons/hooks')
var sleep = require('thread-sleep');

module.exports = {


    urlPortugalMail: 'http://www.portugalmail.pt/',
    elements: {
        nomeUsuario: by.id("horde_user"),
        senha: by.id("horde_pass"),
        botaoEntrar: by.id("horde_login"),
        mensagemBoasVindasLogado: by.id("welcome-message"),
        opcaoCorreio: by.xpath("//div[@class='Correio']"),
        tituloCaixaEntrada: by.xpath("//span[@id='folderName'][contains(text(), 'Recebidas')]"),
        ultimoEmailNaoLido: by.xpath("//div[@title='Por ler']//ancestor::div[@id='VProw_1']"),
        tituloEmail: by.xpath("//span[contains(text(), 'Seu código Pi.')]"),
        mensagemToken: by.xpath("//span[contains(text(), 'Seu código Pi é')]/b"),
        frameMensagem: by.xpath("//iframe[@class='htmlMsgData']")

    },

    var: emailPortugal = 'fundos.qa@portugalmail.com',
    var: senhaPortugal = 'teste#123',

    irParaPortugalMail: function () {
        hooks.abrirNovaAba();
        hooks.navegarParaNovaAba();
        return driver.get(this.urlPortugalMail);
    },


    realizarLoginMail: function () {
        var login = this.elements.nomeUsuario;
        var campoSenha = this.elements.senha;
        var botaoLogarMail = this.elements.botaoEntrar;
        var mensagemBoasVindas = this.elements.mensagemBoasVindasLogado;
        return driver.findElement(login).sendKeys(emailPortugal).then(() => {
            return driver.findElement(campoSenha).sendKeys(senhaPortugal).then(() => {
                return driver.findElement(botaoLogarMail).click().then(() => {
                    return driver.wait(until.elementsLocated(mensagemBoasVindas), 6000);
                })
            })
        })
    },

    selecionarCaixaCorreio: function () {

        var abaCorreio = this.elements.opcaoCorreio;
        var tituloEntrada = this.elements.tituloCaixaEntrada;
        return driver.findElement(abaCorreio).click().then(() => {
            return driver.wait(until.elementsLocated(tituloEntrada), 10000);
        })
    },

    /*selecionarUltimoEmail: function () {

        var ultimoEmail = this.elements.ultimoEmailNaoLido;
        return driver.wait(until.elementsLocated(ultimoEmail), 150000).then(() => {
            return driver.findElement(ultimoEmail).click();
        })
    },*/

    verificaNovoEmail: async function () {

        refresh: do {

            sleep(2000)
            await driver.navigate().refresh();

            if (await driver.findElements(this.elements.ultimoEmailNaoLido) !== 0) break;

        } while (await driver.findElements(this.elements.ultimoEmailNaoLido) == 0);


    },

    selecionarUltimoEmail: async function () {


        try {
            await this.verificaNovoEmail().then(async () => {
                await driver.wait(until.elementsLocated(this.elements.ultimoEmailNaoLido), 6000).then(async () => {
                    await driver.findElement(this.elements.ultimoEmailNaoLido).click();
                })
            })
        }

        catch {
            return console.log("Email com token apresentado.")
        }

    },

    coletarToken: function () {
        var titulo = this.elements.tituloEmail
        return driver.wait(until.elementsLocated(titulo), 6000).then(() => {
            return driver.switchTo().frame(driver.findElement(this.elements.frameMensagem)).then(() => {
                return driver.executeScript("arguments[0].scrollIntoView()", driver.findElement(this.elements.mensagemToken)).then(() => {
                    var tokenMensagem = driver.findElement(this.elements.mensagemToken)
                    return tokenMensagem.getText().then((token) => {
                        console.log(token)
                        return hooks.guardaToken(token)
                    })
                })
            })
        })
    },

}