//SCRAPE
// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});

$("#scrape-btn").on("click", function() {
  $.ajax({
      method: "GET",
      url: "/scrape",
  }).done(function(data) {
      console.log(data)
      window.location = "/"
  })
});

//SAVE ARTICLE
$(".save").on("click", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
      method: "POST",
      url: "/articles/save/" + thisId
  }).done(function(data) {
      window.location = "/"
  })
});

//DELETE ARTICLE
$(".delete").on("click", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
      method: "POST",
      url: "/articles/delete/" + thisId
  }).done(function(data) {
      window.location = "/saved"
  })
});

//SAVE NOTE
$(".save-note").on("click", function() {
  var thisId = $(this).attr("data-id");
  if (!$("#note-Body" + thisId).val()) {
      alert("please enter a note to save")
  }else {
    $.ajax({
          method: "POST",
          url: "/notes/save/" + thisId,
          data: {
            text: $("#note-Body" + thisId).val()
          }
        }).done(function(data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#note-Body" + thisId).val("");
            $(".modalNote").modal("hide");
            window.location = "/saved"
        });
  }
});

//DELTE NOTE
$(".delete-note-btn").on("click", function() {
  var noteId = $(this).attr("data-note-id");
  var articleId = $(this).attr("data-article-id");
  $.ajax({
      method: "DELETE",
      url: "/notes/delete/" + noteId + "/" + articleId
  }).done(function(data) {
      console.log(data)
      $(".modalNote").modal("hide");
      window.location = "/saved"
  })
});

//DELETE BUTTON
$("#delete-btn").on("click", function() {
  $.ajax({
      method: "GET",
      url: "/clear"
  }).done(function(data) {
      console.log("CLEAR")
      window.location = '/'
  })
})