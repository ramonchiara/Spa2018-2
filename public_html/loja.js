$(document).ready(function () {
    console.log("Olá, mundo!");

    $('#preco-min').on('input', function () {
        min = $('#preco-min').val();
        console.log(`preco-min: ${min}`);
        $('#valor-min').html(min);
        listarProdutos();
    });

    $('#preco-max').on('input', function () {
        max = $('#preco-max').val();
        console.log(`preco-max: ${max}`);
        $('#valor-max').html(max);
        listarProdutos();
    });

    function carregaProdutos() {
        $.ajax({
            url: 'produtos.json',
            method: 'GET',
            success: function (data) {
                console.log(data);
                produtos = data;
                listarProdutos();
            }
        });
    }

    var min = 0;
    var max = 10000;
    var produtos = [];

    function listarProdutos() {
        $('#produtos').html('');
        for (var i = 0; i < produtos.length; i++) {
            var produto = produtos[i];
            if (produto.preco >= min && produto.preco <= max) {
                $('#produtos').append(`<li><a href="#${produto.id}">${produto.nome}</a> - R$ ${produto.preco}</li>`);
            }
        }
        if ($('#produtos').html() === '') {
            $('#produtos').append('<li class="alert alert-warning" role="alert">Nenhum produto encontrado!</li>');
        }
    }

    $(window).on('hashchange', function () {
        var hash = window.location.hash;
        var id = hash.substring(1);
        console.log(hash + ' -->' + id);

        if (id === '') {
            $('#view').load('views/principal.html', function () {
                carregaProdutos();
            });
        } else {
            $('#view').load('views/produto.html', function () {
                carregaProduto(id);
            });
        }
    });

    function carregaProduto(id) {
        for (var i = 0; i < produtos.length; i++) {
            var produto = produtos[i];
            if (produto.id == id) {
                $('#nome').html(produto.nome);
                $('#preco').html(produto.preco);
                break;
            }
        }
    }

    $('#view').load('views/principal.html', function () {
        carregaProdutos();
    });

});
