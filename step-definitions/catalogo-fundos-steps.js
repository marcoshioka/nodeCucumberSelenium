const expect = require('chai').expect;
var homePage = require('../page-objects/home-page')
var loginPage = require('../page-objects/login-page')
var catalogoPage = require('../page-objects/catalogo-page')
var hooks = require('../commons/hooks')
var pdfGenerator = require('../commons/pdf-generator')
var quemSomosPage = require('../page-objects/quemSomos-Page')
var error = new Error();


module.exports = function () {

  this.Given(/^que abri o app$/, function () {
    var step = 'Dado que abri o app'
    hooks.guardaStep(step);
    return homePage.irParaUrl().then(function () {
      return homePage.validaTela().then(function () {
        hooks.getScreenshot();
        return pdfGenerator.conteudoPdf(step);
      })
    })
  })

  this.Given(/^estou deslogado$/, function () {
    var step = 'E estou deslogado'
    hooks.guardaStep(step);
    return homePage.clicaQuemSomos().then(function () {
      //return quemSomosPage.selecionarEntendiCookies().then(function () {
        //return quemSomosPage.clicaBotaoFazerLogin().then(function () {
          return quemSomosPage.validaOpcaoLogin().then(function () {
            hooks.getScreenshot();
            return pdfGenerator.conteudoPdf(step);
          //})
        //})
      })
    })
  })


  this.When(/^eu clicar no ícone de catálogo$/, function () {
    var step = 'Quando eu clicar no ícone de catálogo'
    hooks.guardaStep(step);
    return homePage.clicaBotaoCatalogo().then(function () {
      hooks.getScreenshot();
      return pdfGenerator.conteudoPdf(step);
    })
  })

  this.When(/^eu acessar a página de catálogo$/, function () {
    var step = 'Quando eu acessar a página de catálogo'
    hooks.guardaStep(step);
    return catalogoPage.irParaPaginaCatalogo().then(function () {
      return catalogoPage.validaPaginaCatalogo().then(function () {
        hooks.getScreenshot();
        return pdfGenerator.conteudoPdf(step);
      })
    })
  });

  this.Then(/^devo visualizar o catálogo de produtos disponíveis na plataforma$/, function () {
    var step = 'Então devo visualizar o catálogo de produtos disponíveis na plataforma'
    hooks.guardaStep(step);
    return catalogoPage.validaPaginaCatalogo().then(function () {
      hooks.getScreenshot();
      return pdfGenerator.conteudoPdf(step);
    })
  })

  this.Given(/^finalizar o cenario$/, function () {
    return hooks.valida().then(function () {
      hooks.getScreenshot();
      return pdfGenerator.ultimaEvidenciaPdf();
    })
  })

  this.Given(/^que estou no catálogo de produtos deslogado$/, function () {
    var step = 'Dado que estou no catálogo de produtos deslogado'
    hooks.guardaStep(step);
    return catalogoPage.irParaPaginaCatalogo().then(function () {
      return catalogoPage.validaPaginaCatalogo().then(function () {
        hooks.getScreenshot();
        return pdfGenerator.conteudoPdf(step);
      })
    })
  });

  this.Given(/^que estou no catálogo de produtos logado$/, function () {
    var step = 'Dado que estou no catálogo de produtos logado'
    hooks.guardaStep(step);
    return loginPage.irParaUrlLogin().then(function () {
      return loginPage.validaTela().then(function () {
        return loginPage.insereEmail().then(function () {
          return loginPage.insereSenha().then(function () {
            return loginPage.clicaBotaoLogin().then(function () {
              return homePage.clicaBotaoCatalogo().then(function () {
                return catalogoPage.validaPaginaCatalogo().then(function () {
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

  this.When(/^eu clicar na aba Fundos de Investimentos$/, function () {
    var step = 'Quando eu clicar na aba Fundos de Investimentos'
    hooks.guardaStep(step);
    return catalogoPage.clicarBotaoFundos().then(function () {
      hooks.getScreenshot();
      return pdfGenerator.conteudoPdf(step);
    })
  });

  this.Then(/^devo visualizar produtos de fundos disponíveis na plataforma$/, function () {
    var step = 'Então devo visualizar produtos de fundos disponíveis na plataforma'
    hooks.guardaStep(step);
    return catalogoPage.verificarProdutoTituloFundo().then(function () {
      return catalogoPage.verificarProdutoTituloCarteira().then(function () {
        hooks.getScreenshot();
        return pdfGenerator.conteudoPdf(step);
      })
    })
  });

  this.Given(/^que estou na home logada com um usuário sem investimentos$/, function () {
    var step = 'Dado que estou na home logada com um usuário sem investimentos'
    hooks.guardaStep(step);
    return loginPage.irParaUrlLogin().then(function () {
      return loginPage.validaTela().then(function () {
        return loginPage.insereEmailSemInvestimentos().then(function () {
          return loginPage.insereSenhaSemInvestimentos().then(function () {
            return loginPage.clicaBotaoLogin().then(function () {
              hooks.getScreenshot();
              return pdfGenerator.conteudoPdf(step);
            })
          })
        })
      })
    })
  });

  this.When(/^eu clicar em Procurar um investimento$/, function () {
    var step = 'Quando eu clicar em Procurar um investimento'
    hooks.guardaStep(step);
    return homePage.clicaBotaoProcurarInvestimento().then(function () {
      hooks.getScreenshot();
      return pdfGenerator.conteudoPdf(step);
    })
  });

}
