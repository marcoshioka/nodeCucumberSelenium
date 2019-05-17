
const expect = require('chai').expect;
var homePage = require('../page-objects/home-page')
var catalogoPage = require('../page-objects/catalogo-page')
var hooks = require('../commons/hooks')
var pdfGenerator = require('../commons/pdf-generator')
var loginPage = require('../page-objects/login-page')
var quemSomosPage = require('../page-objects/quemSomos-page')
var carrinhoPage = require('../page-objects/carrinho-page')
var salesForcePage = require('../page-objects/salesForce-page')
var portugalMailPage = require('../page-objects/portugalMail-page')
//var yandexMailPage = require('../page-objects/yandexMail-page')
var error = new Error();


module.exports = function () {

    this.Given(/^acesse Quem Somos$/, function () {
        var step = 'E acesse Quem Somos'
        hooks.guardaStep(step);
        return homePage.clicaQuemSomos().then(function () {
            return quemSomosPage.validaPaginaQuemSomos().then(function () {
                hooks.getScreenshot();
                return pdfGenerator.conteudoPdf(step);
            })
        })
    });

    this.Given(/^não tenha nenhum item no carrinho$/, function () {
        var step = 'E não tenha nenhum item no carrinho'
        hooks.guardaStep(step);
        return homePage.clicaBotaoCarrinho().then(function () {
            return homePage.verificaExistenciaProdutoCarrinho().then(function () {
                hooks.getScreenshot();
                return pdfGenerator.conteudoPdf(step);
            })
        })
    });

    this.Given(/^acesse a opção de login no menu$/, function (callback) {
        var step = 'E acesse a opção de login no menu'
        hooks.guardaStep(step);
        return quemSomosPage.clicarBotaoMenu().then(function () {
            return quemSomosPage.selecionarOpcaoLogin().then(function () {
                hooks.getScreenshot();
                return pdfGenerator.conteudoPdf(step);
            })
        })
    });


    this.Given(/^que realize login$/, function () {
        var step = 'Dado que realize login'
        hooks.guardaStep(step);
        return loginPage.irParaUrlLogin().then(function () {
            return loginPage.validaTela().then(function () {
                return loginPage.clicaBotaoFazerLogin().then(function () {
                    return loginPage.insereEmail().then(function () {
                        return loginPage.insereSenha().then(function () {
                            return loginPage.clicaBotaoLogin().then(function () {
                                return homePage.validaTelaLogada().then(function () {
                                    hooks.getScreenshot();
                                    return pdfGenerator.conteudoPdf(step);
                                })
                            })
                        })
                    })
                })
            })
        })
    });


    this.Given(/^realize login$/, function () {
        var step = 'E realize login'
        hooks.guardaStep(step);
        return homePage.clicaBotaoLogin().then(function () {
            return loginPage.validaTela().then(function () {
                return loginPage.insereEmail().then(function () {
                    return loginPage.insereSenha().then(function () {
                        return loginPage.clicaBotaoLogin().then(function () {
                            hooks.getScreenshot();
                            return pdfGenerator.conteudoPdf(step);
                        })
                    })
                })
            })
        })
    });

    this.Given(/^selecionar o catálogo de Fundos$/, function () {
        var step = 'E selecionar o catálogo de Fundos'
        hooks.guardaStep(step);
        return catalogoPage.validaPaginaCatalogo().then(function () {
            return catalogoPage.clicarBotaoFundos().then(function () {
                hooks.getScreenshot();
                return pdfGenerator.conteudoPdf(step);
            })
        })
    });

    this.When(/^escolher um produto$/, function () {
        var step = 'E escolher um produto';
        hooks.guardaStep(step);
        return catalogoPage.verificarPresencaCards().then(function () {
            return catalogoPage.selecionarProdutoFundos().then(function () {
                hooks.getScreenshot();
                return pdfGenerator.conteudoPdf(step);
            })
        })
    });

    this.Given(/^encaminhar para o carrinho$/, function () {
        var step = 'E encaminhar para o carrinho';
        hooks.guardaStep(step);
        return catalogoPage.selecionarEscolherInvestimento().then(function () {
            hooks.getScreenshot();
            return pdfGenerator.conteudoPdf(step);
        })
    });

    this.Given(/^confirmar o item no carrinho$/, function () {
        var step = 'E confirmar o item no carrinho';
        hooks.guardaStep(step);
        return carrinhoPage.validaPaginaCarrinho().then(function () {
            return carrinhoPage.selecionaTermos().then(function () {
                return carrinhoPage.selecionaContinuar().then(function () {
                    hooks.getScreenshot();
                    return pdfGenerator.conteudoPdf(step);
                })
            })
        })
    });

    this.Given(/^colete o token gerado em Sales Force$/, function () {
        var step = 'E colete o token gerado em Sales Force';
        hooks.guardaStep(step);
        return salesForcePage.irParaSalesForce().then(function () {
            return salesForcePage.realizarLoginSF().then(function () {
                hooks.getScreenshot();
                return pdfGenerator.conteudoPdf(step);
            })
        })
    });


    this.Given(/^coletar o token enviado no email$/, function () {
        var step = 'E coletar o token enviado no email';
        hooks.guardaStep(step);
        return portugalMailPage.irParaPortugalMail().then(function () {
            return portugalMailPage.realizarLoginMail().then(function () {
                return portugalMailPage.selecionarCaixaCorreio().then(function () {
                    return portugalMailPage.selecionarUltimoEmail().then(function () {
                        return portugalMailPage.coletarToken().then(function () {
                            hooks.getScreenshot();
                            return pdfGenerator.conteudoPdf(step);
                        })
                    })
                })
            })
        })
    });


    /*this.Given(/^coletar o token enviado no email$/, function () {
        var step = 'E coletar o token enviado no email';
        hooks.guardaStep(step);
        return yandexMailPage.irParaYandexMail().then(function () {
            return yandexMailPage.realizarLoginMail().then(function () {
                return yandexMailPage.selecionarCaixaCorreio().then(function () {
                    return yandexMailPage.selecionarUltimoEmail().then(function () {
                        return yandexMailPage.coletarToken().then(function () {
                            hooks.getScreenshot();
                            return pdfGenerator.conteudoPdf(step);
                        })
                    })
                })
            })
        })
    });*/

    this.Given(/^validar a operação com o token coletado$/, function () {
        var step = 'E validar a operação com o token coletado';
        hooks.guardaStep(step);
        return carrinhoPage.retornarParaCarrinho().then(function () {
            return carrinhoPage.inserirTokenColetado().then(function () {
                return carrinhoPage.acionarBotaoConfirmar().then(function () {
                    hooks.getScreenshot();
                    return pdfGenerator.conteudoPdf(step);
                })
            })
        })
    });

    this.Then(/^devo visualizar que o produto está em processamento$/, function () {
        var step = 'Então devo visualizar que o produto está em processamento';
        hooks.guardaStep(step);
        return carrinhoPage.validarProdutoEmProcessamento().then(function () {
            return carrinhoPage.validarProdutoFundos().then(function () {
                hooks.getScreenshot();
                return pdfGenerator.conteudoPdf(step);
            })
        })
    });

}