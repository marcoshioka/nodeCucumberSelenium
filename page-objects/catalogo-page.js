var hooks = require('../commons/hooks')

module.exports = {


    url: 'https://uat-invistacompi.cs17.force.com/s/produtosprincipal',
    elements: {
        abaTodos: by.xpath("//button[contains(text(), 'Todos')]"),
        abaRendaFixa: by.xpath("//button[@title='Renda Fixa']"),
        abaCatalogo: by.xpath("//nav[@class='cProdutos_Principal']"),
        abaFundos: by.xpath("//button[@title='Fundos de Investimentos']"),
        abaTesouroDireto: by.xpath("//button[@title='Tesouro Direto']"),
        botaoCatalogo: by.xpath("//div[@class='estiloIconMenu visualizacao'][1]//div[@class='header_icon']"),
        cardFundos: by.xpath("//div[@class='card slds-col']"),
        produtoFundos: by.xpath("//p//span[contains(text(), 'TESTE MARISON')]//..//ancestor::div[@class='card slds-col']"),
        escolherInvestimento: by.xpath("//button[contains(text(), 'Escolher investimento')]"),
        produtoTituloFundo: by.xpath("//div//span[contains(text(), 'Fundo')]"),
        produtoTituloCarteira: by.xpath("//div//span[contains(text(), 'Carteira')]"),

    },


    validaPaginaCatalogo: function () {
        var catalogo = page.catalogoPage.elements.abaCatalogo;
        return driver.wait(until.elementsLocated(catalogo), 6000)

    },

    irParaPaginaCatalogo: function () {
        var urlCatalogo = page.catalogoPage.url
        return driver.get(urlCatalogo)
    },


    clicarBotaoFundos: function () {
        var opcaoFundos = page.catalogoPage.elements.abaFundos;
        var element = driver.findElement(opcaoFundos)
        return driver.wait(until.elementsLocated(opcaoFundos), 6000).then(() => {
            //return driver.executeScript('arguments[0].click();', driver.findElement(this.elements.abaFundos));
            return driver.findElement(this.elements.abaFundos).click();

        })
    },

    clicarBotaoTesouro: function () {
        var opcaoTesouro = page.catalogoPage.elements.abaTesouroDireto;
        var element = driver.findElement(opcaoTesouro)
        return driver.wait(until.elementsLocated(opcaoTesouro), 6000).then(() => {
            return driver.executeScript('arguments[0].click();', element);
            //return driver.findElement(this.elements.abaTesouroDireto).click();

        })
    },

    clicarBotaoRendaFixa: function () {
        var opcaoRendaFixa = page.catalogoPage.elements.abaRendaFixa;
        var element = driver.findElement(opcaoRendaFixa)
        return driver.wait(until.elementsLocated(opcaoRendaFixa), 6000).then(() => {
            return driver.executeScript('arguments[0].click();', element);
            //return driver.findElement(this.elements.abaTesouroDireto).click();

        })
    },


    verificarPresencaCards: function () {
        var cards = page.catalogoPage.elements.cardFundos;
        return driver.wait(until.elementsLocated(cards), 6000).then(() => {

        })

    },


    selecionarProdutoFundos: function () {
        var produto = page.catalogoPage.elements.produtoFundos;
        return driver.wait(until.elementsLocated(produto), 6000).then(() => {
            return driver.findElement(produto).click();
            //return driver.executeScript('arguments[0].click();', driver.findElement(this.elements.produtoFundos));
        })
    },


    selecionarEscolherInvestimento: function () {
        var botaoEscolherInvestimento = page.catalogoPage.elements.escolherInvestimento;
        var investimento = driver.findElement(botaoEscolherInvestimento)
        return driver.wait(until.elementsLocated(botaoEscolherInvestimento), 6000).then(() => {
            return driver.executeScript("arguments[0].scrollIntoView()", investimento).then(() => {
                return driver.executeScript('arguments[0].click();', investimento);
            })
        })
    },

    verificarProdutoTituloFundo: function () {
        var tituloFundo = page.catalogoPage.elements.produtoTituloFundo;
        return driver.wait(until.elementsLocated(tituloFundo), 10000)
    },

    verificarProdutoTituloCarteira: function () {
        var tituloCarteira = page.catalogoPage.elements.produtoTituloCarteira;
        return driver.wait(until.elementsLocated(tituloCarteira), 10000)
    }


}
