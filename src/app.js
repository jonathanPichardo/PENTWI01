$(function () {

    let url = 'https://jsonplaceholder.typicode.com';

    $.get(`${url}/posts`)
        .then(res =>{
            res.map(buildPostDiv).forEach(div => $('.container').append(div));
            arrangeGrid()
        })
        .then(_ =>
            $('.post').click((e) => {
                e.currentTarget.remove();
                arrangeGrid();
            })
        )
        .catch(err => console.log(err));

});

function buildPostDiv(post, i) {

    return `<article class="post">
        <h4>${post.title}</h4>
        <p>${post.body}</p>
        <span>${post.id}</span>
    </article>`;

}

function arrangeGrid() {
    $('.container > .post').css('grid-column', idx => ((idx + 1) % 4 || 4) + " / auto");
}