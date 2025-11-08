$("#novo_produto").submit(function (event) {
    event.preventDefault();
  
    var data = {
      codigo: $("#inputCodigo").val(),
      descricao: $("#inputDescricao").val(),
      preco: $("#inputPreco").val(),
      quantidade: $("#inputQuantidade").val(),
    };
  
    var request = {
      url: `http://localhost:3000/api/produtos/`,
      method: "POST",
      data: data,
    };
    $.ajax(request).done(function (response) {
      alert("Produto cadastrado com sucesso!");
      $("#inputCodigo").val(""),
        $("#inputDescricao").val(""),
        $("#inputPreco").val(""),
        $("#inputQuantidade").val("");
    });
  });
  
  $("#atualizar_produto").submit(function (event) {
    event.preventDefault();
  
    var unindexed_array = $(this).serializeArray();
    var data = {};
  
    $.map(unindexed_array, function (n, i) {
      data[n["name"]] = n["value"];
    });
  
    console.log(data);
  
    var request = {
      url: `http://localhost:3000/api/produtos/${data.id}`,
      method: "PUT",
      data: data,
    };
  
    $.ajax(request).done(function (response) {
      alert("Produto atualizado com sucesso!");
      window.location.href = "/";
    });
  });
  
  if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
      var id = $(this).attr("data-id");
  
      var request = {
        url: `http://localhost:3000/api/produtos/${id}`,
        method: "DELETE",
      };
  
      if (confirm("Deseja mesmo excluir este produto?")) {
        $.ajax(request).done(function (response) {
          alert("Produto excluido com sucesso!");
          location.reload();
        });
      }
    });
  }