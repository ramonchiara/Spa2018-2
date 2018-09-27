$(document).ready(function () {
    console.log("Olá, mundo!");

    $('#preco-min').on('input', function () {
        var min = $('#preco-min').val();
        console.log(`preco-min: ${min}`);
        $('#valor-min').html(min);
        listarProdutos();
    });

    $('#preco-max').on('input', function () {
        var max = $('#preco-max').val();
        console.log(`preco-max: ${max}`);
        $('#valor-max').html(max);
        listarProdutos();
    });

    $.ajax({
        url: 'produtos.json',
        method: 'GET',
        success: function (data) {
            console.log(data);
            produtos = data;
            listarProdutos();
        }
    });

    var produtos = [];

    function listarProdutos() {
        var min = $('#preco-min').val();
        var max = $('#preco-max').val();
        $('#produtos').html('');
        for (var i = 0; i < produtos.length; i++) {
            var produto = produtos[i];
            if (produto.preco >= min && produto.preco <= max) {
                $('#produtos').append(`<li><a href="#${produto.id}">${produto.nome}</a> - R$ ${produto.preco}</li>`);
            }
        }
    }

});
