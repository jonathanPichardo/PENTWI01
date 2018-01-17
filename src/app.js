const url = 'https://jsonplaceholder.typicode.com';


$(function () {

    $.get(`${url}/posts`)
        .then(res => {
            res.map(buildPostArticle).forEach(art => $('.container').append(art));
            arrangeGrid()
        })
        .then(_ =>
            $('.post').click((e) => {

                const id = (e.target !== this ? e.target.parentElement : e.target).id;

                $(`#${id}`).replaceWith(buildPostComments(id));

                $.get(`${url}/posts/${id}/comments`)
                    .then(res => {
                        res.map(buildCommentArticle).forEach(art => $(`#${id}`).append(art));
                    });

            })
        )
        .catch(err => console.log(err));

});

function buildPostArticle(post) {

    return `<article id=${post.id} class="post">
        <h4>${post.title}</h4>
        <p>${post.body}</p>
        <span>${post.id}</span>
    </article>`;

}

function buildPostComments(id) {
    return `<article id=${id} class="post-comments"></article>`;
}

function buildCommentArticle(comment) {
    return `<article>
        <h4>${comment.name}</h4>
        <h6>${comment.email}</h6>
        <p>${comment.body}</p>
    </article>`
}

function closeCurrentDetails(post) {
    $('#post-details').replaceWith(buildPostArticle(post));
}

function arrangeGrid() {
    $('.container > .post').css('grid-column', idx => ((idx + 1) % 4 || 4) + " / auto");
}