
const expect = require('chai').expect;
var homePage = require('../page-objects/home-page')
var catalogoPage = require('../page-objects/catalogo-page')
var hooks = require('../commons/hooks')
var pdfGenerator = require('../commons/pdf-generator')
var loginPage = require('../page-objects/login-page')
var quemSomosPage = require('../page-objects/quemSomos-page')
var carrinhoPage = require('../page-objects/carrinho-page')
var salesForcePage = require('../page-objects/salesForce-page')
var error = new Error();


module.exports = function () {
    this.Given(/^que estou na tela de detalhes de um produto de fundos$/, function () {
        var step = 'Dado que estou na tela de detalhes de um produto de fundos'
        hooks.guardaStep(step);
        return loginPage.irParaUrlLogin().then(function () {
            return loginPage.validaTela().then(function () {
                return loginPage.insereEmail().then(function () {
                    return loginPage.insereSenha().then(function () {
                        return loginPage.clicaBotaoLogin().then(function () {
                            return homePage.validaTelaLogada().then(function () {
                                return homePage.clicaBotaoCarrinho().then(function () {
                                    return homePage.verificaExistenciaProdutoCarrinho().then(function () {
                                        return catalogoPage.irParaPaginaCatalogo().then(function () {
                                            return catalogoPage.validaPaginaCatalogo().then(function () {
                                                return catalogoPage.clicarBotaoFundos().then(function () {
                                                    return catalogoPage.clicarBotaoFundos().then(function () {
                                                        return catalogoPage.clicarBotaoFundos().then(function () {
                                                            return catalogoPage.verificarPresencaCards().then(function () {
                                                                return catalogoPage.selecionarProdutoFundos().then(function () {
                                                                    hooks.getScreenshot();
                                                                    return pdfGenerator.conteudoPdf(step);
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    });

    this.When(/^eu clicar no botão \[Escolher investimento\]$/, function () {
        var step = 'Quando eu clicar no botão [Escolher investimento]';
        hooks.guardaStep(step);
        return catalogoPage.selecionarEscolherInvestimento().then(function () {
            hooks.getScreenshot();
            return pdfGenerator.conteudoPdf(step);
        })
    });

    this.Then(/^devo ser direcionado para o carrinho contendo o produto selecionado$/, function () {
        var step = 'Então devo ser direcionado para o carrinho contendo o produto selecionado';
        hooks.guardaStep(step);
        return carrinhoPage.validaPaginaCarrinho().then(function () {
            hooks.getScreenshot();
            return pdfGenerator.conteudoPdf(step);
        })
    });

}