    .row.col.s12
      .col.s10.offset-s1
        .card
          .card-content.teal.lighten-5
            span.card-title
              a(href='VARticketLink' target="_blank")= VARticketTitle
            p(id='VARticket_id') VARticketDescription
          .card-action
            //TODO each loop in keywords, for the sorting functionalities later.
            span Keywords: VARticketKeywords
            a(href='VARTicketUrl').teal-text.text-darken-2.right Edit



'<div class="row col s12">
  <div class="col s10 offset-s1">
    <div class="card">
      <div class="card-content teal lighten-5"><span class="card-title"><a href="' + ticket.title + '" target="_blank">' + ticket.title + '</a></span>
        <p id="' + ticket._id + '">' + ticket.description + '</p>
      </div>
      <div class="card-action">
        <span>Keywords:' +  ticket.keywords + '</span><a class="teal-text text-darken-2 right" href="details/' + ticket._id + '">Edit</a>
      </div>
    </div>
  </div>
</div>'

.row.col.s12
  .col.s10.offset-s1
    .card
      .card-content.teal.lighten-5
        span.card-title
          //- a(href=ticket.url) !{ticket.title}
          a(href!=ticket.link target="_blank")!= ticket.title
        p(id=ticket._id) #{ticket.description}
      .card-action
        //TODO each loop in keywords, for the sorting functionalities later.
        span Keywords: #{ticket.keywords}
        a(href=ticket.url).teal-text.text-darken-2.right Edit
